const missionLocation = document.getElementById("missionLocation");
const locationBox = document.getElementById("locationBox");
const overLay = document.getElementById("overLay");
const locatonClose = document.getElementById("locatonClose");
const locationHead = document.getElementById("locationHead");
const locationImg = document.getElementById("locationImg");
let isSubmit = "";

locationHead.style.display = "none";

missionLocation.addEventListener("click", () => {
	overLay.style.display = "block";
	locationBox.style.display = "block";
	locationHead.style.display = "flex";
	locationImg.style.display = "block";
});

locationClose.addEventListener("click", () => {
	overLay.style.display = "none";
	locationBox.style.display = "none";
	locationHead.style.display = "none";
	locationImg.style.display = "none";
});

//sessionStorage에서 데이터 추출
const currentItem = JSON.parse(sessionStorage.getItem("currentItem"));

window.onload = function () {
	if (currentItem) {
		if (document.getElementById("sound")) {
			document.getElementById("sound").src = currentItem.sound;
		}
		document.getElementById("missionNum").textContent = currentItem.mission_num;
		document.getElementById("title").textContent = currentItem.title;
		document.getElementById("description").dataset.fullDescription =
			JSON.stringify(currentItem.description);
		document.getElementById("image").dataset.fullDescription = JSON.stringify(
			currentItem.imageUrl
		);
		document.getElementById("npc-name").dataset.fullDescription =
			JSON.stringify(currentItem.name);

		document.getElementById("npc-name").textContent = currentItem.name[0];
		document.getElementById("image").src = currentItem.imageUrl[0];

		document.getElementById("questionDescription").textContent =
			currentItem.sentence;
		if (currentItem.warning == undefined) {
			document.getElementById("warning").style.display = "none";
		}
		document.getElementById("warning").textContent = currentItem.warning;
		document.getElementById("chooseFile").style.display = "none";
		document.getElementById("submitButton").style.display = "none";
		isSubmit = currentItem.isSubmitModel;

		//descriptionBtn의 초기 상태 설정
		const descriptionBtn = document.getElementById("descriptionBtn");
		descriptionBtn.style.display = "block";

		//previousdescriptionBtn의 초기 상태 설정
		const previousDescriptionBtn = document.getElementById(
			"previousDescriptionBtn"
		);
		previousDescriptionBtn.style.display = "none";

		//현재 사용자의 닉네임을 가져오기
		const userNickname = sessionStorage.getItem("userNickname");

		//@를 사용자의 닉네임으로 변경하여 출력
		let currentSentence = currentItem.description[0]
			.trim()
			.replace("@", userNickname);

		//Typed.js로 타이핑 효과
		if (
			document.querySelector("#description").textContent.trim() !==
			currentSentence
		) {
			typed = new Typed(document.querySelector("#description"), {
				strings: [currentSentence],
				typeSpeed: 25,
				showCursor: false,
				backDelay: 0,
			});
		}
	} else {
		console.error("아이템 정보를 가져올 수 없습니다.");
	}
};

function loadFile(input) {
	const file = input.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = function (event) {
			document.querySelector(".file-input label").textContent =
				"사진을 제출하셨습니다!";
			const imageURL = event.target.result;
		};
		reader.readAsDataURL(file);
	}
	window.opener.submitForm(missionNum.innerText);
}

//해당 진행상태를 담은 배열의 값으로 update해줌
function saveCourseProgress(progress) {
	sessionStorage.setItem(`courseProgress`, JSON.stringify(progress));
}

// sessionStorage에서 코스의 진행 상태에 해당하는 배열 반환 -> 각 코스별 배열을 로드 해줌
function loadCourseProgress() {
	//해당하는 코스의 배열을 가져옴
	let courseProgress = sessionStorage.getItem(`courseProgress`);
	//이미 코스 배열 만들어져 있으면, 해당 배열을 반환함
	if (courseProgress) {
		return JSON.parse(courseProgress);
		//배열 만들어져 있지 않으면 배열 만들어줌
	}
}

const missionNum = document.getElementById("missionNum");

function openNewPopup() {
	let courseProgress = loadCourseProgress();
	//해당하는 미션의 배열 값을 1로 변경해줌
	courseProgress[missionNum.innerText] = 1;

	//새로운 배열로 sessionstorage에 저장하기 위한 함수 실행
	saveCourseProgress(courseProgress);

	//마지막으로 1인 값의 index를 찾음
	let lastCompletedIndex = courseProgress.lastIndexOf(1);

	//sessionStorage에 마지막으로 완료한 미션 번호를 저장
	sessionStorage.setItem(`lastCompletedMission`, lastCompletedIndex - 1);

	const currentItem = JSON.parse(sessionStorage.getItem("currentItem"));
	let url = "/static/mission_complete/complete.html";

	if (currentItem.last === "True") {
		url = "/static/mission_complete/last.html";
	}

	// 현재 창의 위치를 새로운 URL로 변경
	window.location.href = url;
}

let currentIndex = 0;
let typed;
const descriptionBtn = document.getElementById("descriptionBtn");
const pictures = document.getElementById("image");
const submitButton = document.getElementById("submitButton");
const chooseFile = document.getElementById("chooseFile");

const submitForm = document.getElementById("submitForm");

const previousDescriptionBtn = document.getElementById(
	"previousDescriptionBtn"
);

chooseFile.addEventListener("change", () => {
	submitButton.style.display = "block";
});

//버튼 상태 update
function updateButtonState() {
	let sentences = JSON.parse(
		document.getElementById("description").dataset.fullDescription || "[]"
	);

	if (currentIndex == 0) {
		previousDescriptionBtn.style.display = "none";
		descriptionBtn.style.display = "block";
	} else if (currentIndex == sentences.length - 1) {
		previousDescriptionBtn.style.display = "block";
		descriptionBtn.style.display = "none";
	} else {
		previousDescriptionBtn.style.display = "block";
		descriptionBtn.style.display = "block";
	}
}

//버튼을 눌렀을 때 대사, 이미지,버튼 등의 상태 update시켜줌
function updateDescriptionAndButtons() {
	let sentences = JSON.parse(
		document.getElementById("description").dataset.fullDescription || "[]"
	);
	let imageUrls = JSON.parse(
		document.getElementById("image").dataset.fullDescription || "[]"
	);
	let names = JSON.parse(
		document.getElementById("npc-name").dataset.fullDescription || "[]"
	);
	if (typed) {
		typed.destroy();
	}

	let currentImageUrl = imageUrls[currentIndex];
	if (currentImageUrl) {
		pictures.src = currentImageUrl;
	}
	document.getElementById("npc-name").textContent = names[currentIndex];

	//현재 사용자의 닉네임을 가져오기
	const userNickname = sessionStorage.getItem("userNickname");

	//@를 사용자의 닉네임으로 변경하여 출력
	let currentSentence = sentences[currentIndex]
		.trim()
		.replace("@", userNickname);

	//Typed.js로 타이핑 효과
	if (
		document.querySelector("#description").textContent.trim() !==
		currentSentence
	) {
		typed = new Typed(document.querySelector("#description"), {
			strings: [currentSentence],
			typeSpeed: 25,
			showCursor: false,
			backDelay: 0,
		});
	}
	updateButtonState();
}

//다음 버튼 누르기
descriptionBtn.addEventListener("click", function () {
	let sentences = JSON.parse(
		document.getElementById("description").dataset.fullDescription || "[]"
	);

	if (currentIndex < sentences.length - 1) {
		currentIndex++;
	}
	updateDescriptionAndButtons();
});

// 이전 버튼 누르기
previousDescriptionBtn.addEventListener("click", function () {
	let sentences = JSON.parse(
		document.getElementById("description").dataset.fullDescription || "[]"
	);

	if (currentIndex > 0) {
		currentIndex--;
	}
	updateDescriptionAndButtons();
});

// 이미지의 인덱스를 나타내는 변수 추가
let currentImageIndex = 0;

// 이미지 경로들을 배열로 저장
const imagePaths = currentItem.location;

const nextImageBtn = document.getElementById("nextImage");
const prevImageBtn = document.getElementById("prevImage");

missionLocation.addEventListener("click", () => {
	overLay.style.display = "block";
	locationBox.style.display = "block";
	locationHead.style.display = "flex";
	locationImg.style.display = "block";

	// 초기 이미지 설정
	showImage(currentImageIndex);

	// 이미지가 여러 개인 경우 다음 이미지 버튼 보이기
	if (imagePaths.length > 1) {
		nextImageBtn.style.display = "block";
	} else {
		// 이미지가 하나뿐이라면 다음 이미지 버튼 숨기기
		nextImageBtn.style.display = "none";
	}

	// 첫 이미지인 경우 이전 이미지 버튼 숨기기
	if (currentImageIndex === 0) {
		prevImageBtn.style.display = "none";
	} else {
		// 첫 이미지가 아닌 경우 이전 이미지 버튼 보이기
		prevImageBtn.style.display = "block";
	}
});

nextImageBtn.addEventListener("click", () => {
	// 다음 이미지로 이동
	currentImageIndex = (currentImageIndex + 1) % imagePaths.length;
	// 다음 이미지 표시
	showImage(currentImageIndex);

	// 이미지가 마지막인 경우 다음 이미지 버튼 숨기기
	if (currentImageIndex === imagePaths.length - 1) {
		nextImageBtn.style.display = "none";
	}

	// 첫 이미지가 아닌 경우 이전 이미지 버튼 보이기
	prevImageBtn.style.display = "block";
});

prevImageBtn.addEventListener("click", () => {
	// 이전 이미지로 이동
	currentImageIndex =
		(currentImageIndex - 1 + imagePaths.length) % imagePaths.length;
	// 이전 이미지 표시
	showImage(currentImageIndex);

	// 첫 이미지가 아닌 경우 다음 이미지 버튼 보이기
	nextImageBtn.style.display = "block";

	// 첫 이미지인 경우 이전 이미지 버튼 숨기기
	if (currentImageIndex === 0) {
		prevImageBtn.style.display = "none";
	}
});

function showImage(index) {
	// 현재 인덱스에 해당하는 이미지 표시
	locationImg.src = imagePaths[index];
}

// 이미지 제출 버튼에 이벤트를 바인딩합니다.
submitButton.addEventListener("click", submitFunc);
async function submitFunc(event) {
	event.preventDefault();
	if (isSubmit == "true") {
		// 백엔드로 데이터를 POST로 전송합니다.
		const formData = new FormData(document.querySelector(".file-input"));
		const getUserId = sessionStorage.getItem("userId");
		const response = await fetch(
			`/upload_image/background/${missionNum.innerText}/?userId=${getUserId}`,
			{
				method: "POST",
				body: formData,
			}
		);
	}
	openNewPopup();
}
