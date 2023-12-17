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
```
pip install -r requirements.txt
```

## 실행 방법
```
git clone https://github.com/parkm2ngyu00/kkomiadventure_A.git
cd kkomiadventure_A/
uvicorn main:app --reload (In the directory containing main.py)
```

## 주요 사용 기술
- FrontEnd : HTML / CSS / JS (Vanilla) / Leaflet.js (지도 서비스)
- BackEnd : FastAPI
- Model : Tensorflow, Pytorch, GAN, CV

## 프로젝트 정보
- 기관: 국립공원공단
- 개발 기간: 2023.10.20 ~ 2023.11.29
- 프로젝트 목적: 생성형 AI와 모바일 웹 서비스를 결합하여 사용자 친화적이고 인터랙티브한 탐방서비스 개발

## 팀원 소개
- 황주선(팀장) : 기획, 모델링
- 배연지(부팀장) : 기획, 모델링
- 김규리 : 기획, 웹 페이지 개발
- 박민규 : 기획, 웹 페이지 개발
- 윤아현: 기획, 모델링

## 서비스 개요
- 주요 타겟 : 어린이가 포함된 가족
- 치악산 둘레길을 돌며 지도 기반의 탐방 서비스를 Interactive하게 즐길 수 있는 모바일 웹 프로그램

## 주요 기능
1. 게임 방식의 GPS 탐방서비스
2. 다양한 버튼 이벤트를 사용하여 동적인 효과 증대
3. 사용자가 탐방 중 찍은 사진을 생성형 AI를 활용해 이미지 변환, 이를 활용해 마지막에 숲속필름(스티커 사진) 제공
4. 한국화, 만화, 캐릭터 3개의 모델을 탑재해 사용자로 하여금 다양한 이미지 변환 유도

## 주요 UI
| 닉네임 입력 페이지 | 튜토리얼 페이지 | 메인 지도 페이지 | 미션 페이지 |
| :-----------------: | :---------------: |:-----------------: | :---------------: |
|![image](https://github.com/parkm2ngyu00/kkomiadventure_A/assets/80877176/d8f679b3-14bb-4b4b-8283-0c44ee4059ee)|![image](https://github.com/parkm2ngyu00/kkomiadventure_A/assets/80877176/395cc510-6bb8-4a3d-9ceb-9e23744430b4)|![image](https://github.com/parkm2ngyu00/kkomiadventure_A/assets/80877176/478ba132-7d90-4693-a9b4-1e198bd31837)|![image](https://github.com/parkm2ngyu00/kkomiadventure_A/assets/80877176/b9aff47c-fe44-43d7-8383-d2d7ade82791)|
| 미션 완료 페이지 | 숲속필름 증정 페이지 | AI화가 수묵화 변환 선택 | AI화가 수묵화 변환 |
|![image](https://github.com/parkm2ngyu00/kkomiadventure_A/assets/80877176/5039363a-660a-4886-be23-f1b0145507d7)|![image](https://github.com/parkm2ngyu00/kkomiadventure_A/assets/80877176/e49e57f7-069d-4f93-a234-4d8bfef07ecc)|![image](https://github.com/parkm2ngyu00/kkomiadventure_A/assets/80877176/1baebb28-b6e3-45ad-b5eb-a7f022cc34ea)|![image](https://github.com/parkm2ngyu00/kkomiadventure_A/assets/80877176/5de7b1ad-ed20-4f64-8064-8b3f815c2eac)|

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
