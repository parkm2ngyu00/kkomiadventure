from fastapi import FastAPI, HTTPException, UploadFile, File, BackgroundTasks, Form
from fastapi.responses import (
    FileResponse,
    JSONResponse,
)
from fastapi.staticfiles import StaticFiles
import shutil
import os
from io import BytesIO
from a_course.model_cartoon.cartoon import cartoonize
from a_course.model_soomuk.soomuk import soomuk
from a_course.model_animation.animation import animation
import os
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

# AVX2오류 무시
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 프론트엔드 서버 주소
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메소드 허용
    allow_headers=["*"],  # 모든 헤더 허용
)

## A코스 백엔드 API

# A코스 마운트
app.mount("/static", StaticFiles(directory="./a_course/public"), name="static")

scheduler = BackgroundScheduler()


@app.get("/")
async def root():
    return FileResponse("./a_course/public/StartPage/start.html")


@app.get("/course")
async def course():
    return FileResponse("./a_course/public/course/course.html")


@app.get("/practice")
async def start():
    return FileResponse("./a_course/public/main.html")


# 코스를 불러오는 API
@app.get("/json/{course:int}코스.json")
async def course_json(course: int):
    if 1 <= course <= 13:
        return FileResponse(f"public/{course}코스.json")
    else:
        raise HTTPException(status_code=404, detail="Course not found")


# 원본 사진을 저장 API
def save_original(file, path):
    with open(path, "wb") as f:
        f.write(file.file.read())


# 파일 업로드 시 원본, 모네 이미지 저장 API
@app.post("/upload_image/{missionNum}")
async def img_convert(
    file: UploadFile = File(...),
    missionNum: int = 1,
    userId: int = 0,
    styleNum: int = 0,
):
    try:
        original_filename = str(missionNum) + "_" + str(userId) + "_original.jpg"
        convert_filename = str(missionNum) + "_" + str(userId) + "_convert.jpg"

        original_path = f"./a_course/public/benefit/img/{original_filename}"
        convert_path = f"./a_course/public/benefit/img/{convert_filename}"

        save_original(file, original_path)
        if styleNum == 1:
            soomuk(original_path, convert_path)
        elif styleNum == 2:
            cartoonize(original_path, convert_path)
        elif styleNum == 3:
            animation(original_path, convert_path)

        return {"original_path": original_path}
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


# 파일 업로드 시 원본, 수묵화 저장 API (백그라운드)
@app.post("/upload_image/background/{missionNum}")
async def img_convert(
    background_task: BackgroundTasks,
    file: UploadFile = File(...),
    missionNum: int = 1,
    userId: int = 0,
):
    try:
        original_filename = str(missionNum) + "_" + str(userId) + "_original.jpg"
        monet_filename = str(missionNum) + "_" + str(userId) + "_convert.jpg"

        original_path = f"./a_course/public/benefit/img/{original_filename}"
        convert_path = f"./a_course/public/benefit/img/{monet_filename}"

        # 이미지 저장 백그라운드 작업
        background_task.add_task(save_original, file, original_path)
        # 모델 백그라운드 작업
        background_task.add_task(soomuk, original_path, convert_path)

        return {"original_path": original_path}
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


# 이미지 폴더를 클리닝 API
@app.delete("/delete_all")
def remove_files():
    directory_to_cleanup = "./public/benefit/img"
    # 현재 시간 출력
    print(f"Cleaning up directory {directory_to_cleanup} at {datetime.now()}")
    # 디렉토리 내 모든 파일 삭제
    for filename in os.listdir(directory_to_cleanup):
        if filename == '.gitkeep':
            continue
        file_path = os.path.join(directory_to_cleanup, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
            print(f"Deleted: {file_path}")
        except Exception as e:
            print(f"Failed to delete {file_path}. Reason: {e}")


# 매일 자정에 img 파일에 담긴 이미지 삭제 (개인정보 보호)
@app.on_event("startup")
def start_scheduler():
    scheduler.add_job(remove_files, "cron", hour=0)
    scheduler.start()
    print("Scheduler has been started.")


# B코스 백엔드 API

from b_course.model_cartoon.cartoon import cartoonize
from b_course.model_sumug.sumug import sumug,seg_sumug
from b_course.model_animation.animation import animation

# B코스 마운트
app.mount(
    "/watertoad",
    StaticFiles(
        directory="./b_course/dist",
        html=True,
    ),
    name="watertoad",
)

#시작페이지 제공
@app.get("/watertoad")
async def gotowatertoad():
    return FileResponse("./b_course/dist/index.html")

# 파일 삭제 함수
def remove_file(path: str):
    try:
        os.remove(path)
    except Exception as e:
        print(f"Error while deleting file {path}: {e}")

# aipainter 요청시, 수묵화,애니메이션,만화풍 + 가족사진(세그멘테이션) 수묵화 변환 기능 제공
@app.post("/aipainter")
async def aipainter(background_tasks: BackgroundTasks, file: UploadFile = File(...),convertoption: int = Form(...)):
    try:
        # 업로드된 사진 경로 설정해서 저장.
        input_image_path = f"./b_course/input/watertoad_{convertoption}_{file.filename}"
        with open(input_image_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        # 변환 이미지 파일명, 경로 설정.
        # 폴더가 없으면 생성.
        convert_path = "./b_course/output/"
        os.makedirs(convert_path, exist_ok=True)
        convert_image_path = f"{convert_path}watertoad_{convertoption}_converted_{file.filename}"
        
        # Aipainting 옵션
        if (convertoption==1):
            #수묵화 변환 함수 호출
            sumug(input_image_path,convert_image_path)
        elif (convertoption==2):
            #애니메이션 변환 함수 호출
            cartoonize(input_image_path,convert_image_path)
        elif (convertoption==3):
            #만화 변환 함수 호출
            animation(input_image_path,convert_image_path)
        elif (convertoption==4):
            #가족사진(세그멘테이션) 수묵화 변환 함수 호출
            seg_sumug(input_image_path,convert_image_path)

        response = FileResponse(convert_image_path,media_type="media/jpeg")
        
        # 파일 전송 후 백그라운드에서 삭제
        background_tasks.add_task(remove_file, input_image_path)
        background_tasks.add_task(remove_file, convert_image_path)

        return response
    
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
