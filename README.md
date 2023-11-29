# kkomiadventure
국립공원공단 치악산 대국민 탐방서비스

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
torch==1.13.1
torchvision==0.10.0
protobuf==3.20
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

## 프로젝트 정보
- 기관: 국립공원공단
- 개발 기간: 2023.10.20 ~ 2023.11.29
- 프로젝트 목적: 

## 서비스 개요
- 주요 타겟 : 어린이가 포함된 가족
- 치악산 둘레길을 돌며 지도 기반의 탐방 서비스를 Interactive하게 즐길 수 있는 모바일 웹 프로그램
- 둘레길을 돌며 미션을 수행하는 방식으로, 미션 도중 찍은 사진은 모델을 활용해 이미지 변환
- 한국화, 만화, 캐릭터 총 3개의 이미지 변환 모델을 탑재해 사용자가 직접 이미지 변환 가능

## 페이지 설명
|닉네임 입력 페이지|튜토리얼 페이지|


## 주요 기능

## 이미지 변환 모델
### P2GAN (한국화 변환 시 사용)
<div style="display: flex; justify-content: center;">
    <img src="images/P2GAN/example1_origin.jpg" alt="P2GAN_example1_origin" width="180" height="180" />
    <img src="images/P2GAN/example1.jpg" alt="P2GAN_example1" width="180" height="180" />
    <img src="images/P2GAN/example2_origin.jpg" alt="P2GAN_example2_origin" width="180" height="180" />
    <img src="images/P2GAN/example2.jpg" alt="P2GAN_example2"width="180" height="180" />
</div>

### AnimeGANv2 (캐릭터 변환 시 사용)
<div style="display: flex; justify-content: center;">
    <img src="images/AnimeGANv2/woman2_origin.jpg" alt="Animeganv2_woman2" width="180" height="180" />
    <img src="images/AnimeGANv2/woman2.jpg" alt="Animeganv2_woman2"width="180" height="180" />
    <img src="images/AnimeGANv2/man2_origin.jpg" alt="Animeganv2_man2" width="180" height="180" />
    <img src="images/AnimeGANv2/man2.jpg" alt="Animeganv2_man2"width="180" height="180" />
</div>

### Cartoonizer (만화 변환 시 사용)
<div style="display: flex; justify-content: center;">
    <img src="images/Cartoonizer/example1_origin.jpg" alt="Cartoonizer_example1_origin" width="180" height="180" />
    <img src="images/Cartoonizer/example1.jpg" alt="Cartoonizer_example1" width="180" height="180" />
    <img src="images/Cartoonizer/example2_origin.jpg" alt="Cartoonizer_example2_origin" width="180" height="180" />
    <img src="images/Cartoonizer/example2.jpg" alt="Cartoonizer_example2"width="180" height="180" />
</div>


### Citation
<div>
   @misc{pascal-voc-2007,
    author = "Everingham, M. and Van~Gool, L. and Williams, C. K. I. and Winn, J. and Zisserman, A.",
    title = "The {PASCAL} {V}isual {O}bject {C}lasses {C}hallenge 2007 {(VOC2007)} {R}esults",
    howpublished = "http://www.pascal-network.org/challenges/VOC/voc2007/workshop/index.html"}
</div>
