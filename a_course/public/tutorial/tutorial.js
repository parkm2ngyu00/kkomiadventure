const backGroundImg = [
	"/static/image/tutorial_background_1.png",
	"/static/image/tutorial_background_2.png",
	"/static/image/tutorial_background_3.png",
	"/static/image/tutorial_background_4.png",
	"/static/image/tutorial_background_5.png",
	"/static/image/tutorial_background_6.png",
	"/static/image/tutorial_background_7.png",
	"/static/image/tutorial_background_8.png",
	"/static/image/tutorial_background_9.png",
	"/static/image/tutorial_background_10.png",
	"/static/image/tutorial_background_11.png",
	"/static/image/tutorial_background_12.png",
	"/static/image/tutorial_background_13.png",
	"/static/image/tutorial_background_14.png",
	"/static/image/tutorial_background_15.png",
	"/static/image/tutorial_background_16.png",
];

const descrip_nametag = [
	"꼬미",
	"꼬미",
	"꼬미",
	"꼬미",
	"꼬미",
	"꼬미",
	"꼬미",
	"초롱이",
	"꼬미",
	"초롱이",
	"초롱이",
	"초롱이",
	"꼬미",
	"초롱이",
	"꼬미",
	"꼬미",
];

const descriptions = [
	"오른쪽 버튼을 누르면 이야기가 시작되니 소리를 꼭 켜줘!",
	"@, 안녕! 만나서 반가워~! 나는 국립공원 마스코트 꼬미라고 해~!",
	"나와 함께 치악산 둘레길 산책을 해보자~~ 치악산 국립공원의 아름다움을 @에게 소개해줄게!!!",
	"우와~ 치악산 국립공원 공기 정말 좋지 않아!? 산책하기에 너무 좋은 것 같아!!",
	"어라? 저건 뭐지!? 치악산국립공원 깃대종 초롱이잖아!",
	"그런데 왜 슬프게 울고 있을까? 같이 무슨 일인지 물어보러 가자!",
	"초롱아 왜울어? 무슨 일 있어??",
	"요즘 너무 많은 비가 와서 치악산 주변으로 나의 꽃잎들이 다 날아가 버렸어...",
	"뭐라구?! 무슨일이야 그게",
	"그러니까... 비가 너무 자주 오거든... 전에는 이렇게 자주 오지 않았어...",
	"최근들어 이상기후가 너무 심해서 비와 태풍이 자주 오고 있어",
	"꽃잎이 있어야 벌들이 찾아오고 그 벌들이 꽃가루를 날라서 내년에도 예쁜 꽃을 피울 수 있는데... 어떡하지?",
	"초롱아 울지마... 우리가 너를 도와줄 방법이 없을까?",
	"치악산 둘레길을 돌며 미션들을 수행하면 내 흩어진 꽃잎들을 찾을 수 있을거야..! 나를 도와줘 얘들아",
	"그래 나와 @, 우리 두명이 너의 꽃잎을 찾아볼게!!",
	"@! 지금부터 나와 같이 미션을 수행하며 초롱이의 꽃잎을 찾으러 가볼까?!",
];

const dubbing = [
	"",
	"/static/dubbing/1.mp3",
	"/static/dubbing/2.mp3",
	"/static/dubbing/3.mp3",
	"/static/dubbing/4.mp3",
	"/static/dubbing/5.mp3",
	"/static/dubbing/6.mp3",
	"/static/dubbing/7.mp3",
	"/static/dubbing/8.mp3",
	"/static/dubbing/9.mp3",
	"/static/dubbing/10.mp3",
	"/static/dubbing/11.mp3",
	"/static/dubbing/12.mp3",
	"/static/dubbing/13.mp3",
	"/static/dubbing/14.mp3",
	"/static/dubbing/15.mp3",
];

const character = document.getElementById("character");

//현재 인덱스를 추적하기 위한 변수
let currentIndex = 0;
let background = 0;
let typed;

//이미지와 text의 상태를 업데이트 해줌
function updateDescriptionAndButtons() {
	if (background == 1) {
		var audio = document.getElementById("background");
		audio.play();
	}
	document.getElementById("descrip_nametag").textContent =
		descrip_nametag[currentIndex];
	document.getElementById("imageDisplay").src = backGroundImg[currentIndex];

	if (typed) {
		typed.destroy();
	}

	var audioElement = document.getElementById("dubbing");
	audioElement.src = dubbing[currentIndex];
	audioElement.play();

	//현재 사용자의 닉네임을 가져오기
	const userNickname = sessionStorage.getItem("userNickname");

	//@를 사용자의 닉네임으로 변경하여 출력
	let currentSentence = descriptions[currentIndex]
		.trim()
		.replace("@", userNickname);

	if (
		document.querySelector("#description").textContent.trim() !==
		currentSentence
	) {
		typed = new Typed(document.querySelector("#description"), {
			strings: [currentSentence],
			typeSpeed: 50,
			showCursor: false,
			backDelay: 0,
		});
	}
	updateButtonState();
}

document
	.querySelector("#description")
	.addEventListener("click", function (event) {
		event.preventDefault(); // 기본 동작 방지
	});

//버튼이 보여지는 상태를 update해줌
function updateButtonState() {
	const descriptionBtn = document.getElementById("descriptionBtn");
	const previousDescriptionBtn = document.getElementById(
		"previousDescriptionBtn"
	);
	const nextButton = document.getElementById("next");

	//기존에 default상태 -> 미션시작하러가기 버튼을 제외한 버튼은 보여짐
	previousDescriptionBtn.style.visibility = "visible";
	descriptionBtn.style.visibility = "visible";
	nextButton.style.display = "none";

	//스킵버튼은 항상 보여지게 설정
	const startButton = document.getElementById("startButton");
	startButton.style.display = "block";

	if (currentIndex === 0) {
		// Hide "Previous" button when at the first description
		previousDescriptionBtn.style.visibility = "hidden";
	} else if (currentIndex === descriptions.length - 1) {
		// Hide "Next" button and show "Start" button at the last description
		nextButton.style.display = "block";
		descriptionBtn.style.visibility = "hidden";
		previousDescriptionBtn.classList.remove("bounceAnimation");
		descriptionBtn.classList.remove("bounceAnimation");
		startButton.style.display = "none";
	} else {
		previousDescriptionBtn.classList.add("bounceAnimation");
		descriptionBtn.classList.add("bounceAnimation");
	}
}

//이후로가기 버튼 누르면 index 늘려줌
document
	.getElementById("descriptionBtn")
	.addEventListener("click", function () {
		currentIndex++;
		background++;
		updateDescriptionAndButtons();
	});

//이전으로 가기 버튼 누르면 이전 상태가 보여지도록 index 줄여줌
document
	.getElementById("previousDescriptionBtn")
	.addEventListener("click", function () {
		if (currentIndex > 0) {
			currentIndex--;
			background++;
			updateDescriptionAndButtons();
		}
	});

//미션시작하러가기 버튼 누르면 다음 html로 연결
document.getElementById("next").addEventListener("click", function () {
	window.location.href = "/practice"; // Redirects to practice.html
});

//스킵버튼 누르면 바로 다음 html로 연결
document.getElementById("startButton").addEventListener("click", function () {
	window.location.href = "/practice";
});

//초기 상태 실행
updateDescriptionAndButtons();
