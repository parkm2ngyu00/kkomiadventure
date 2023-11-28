# kkomiadventure_A
국립공원공단 대국민 탐방서비스 치악산 A코스

## 개발환경 (아나콘다)
```
python==3.7.16
```

## 필요 패키지
```
tensorflow==1.15
scikit-learn
pandas
numpy==1.19.2
fastapi
uvicorn[standard]
opencv-python
apscheduler==3.10.4
pillow
python-multipart
torch==1.7.1
torchvision
```

## 실행 방법
```
git clone https://github.com/parkm2ngyu00/kkomiadventure_A.git
cd kkomiadventure_A/
uvicorn main:app --reload (In the directory containing main.py)
```

## 주요 사용 기술
- FrontEnd : HTML / CSS / JS (Vanilla)
- BackEnd : FastAPI
- Model : Tensorflow, Pytorch, GAN, CV

## 서비스 개요
- 주요 타겟 : 어린이가 포함된 가족
- 치악산 둘레길을 돌며 지도 기반의 탐방 서비스를 Interactive하게 즐길 수 있는 모바일 웹 프로그램
- 둘레길을 돌며 미션을 수행하는 방식으로, 미션 도중 찍은 사진은 모델을 활용해 이미지 변환
- 한국화, 만화, 캐릭터 총 3개의 이미지 변환 모델을 탑재해 사용자가 직접 이미지 변환 가능

## 주요 UI

