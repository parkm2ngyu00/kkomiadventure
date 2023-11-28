window.onload = function () {
	//sessionStorage에서 데이터 추출
	const currentItem = JSON.parse(sessionStorage.getItem("currentItem"));

	if (currentItem) {
		document.getElementById("description").dataset.fullDescription =
			JSON.stringify(currentItem.last_description);
		document.getElementById("image").dataset.fullDescription = JSON.stringify(
			currentItem.last_imageUrl
		);
		document.getElementById("image").src = currentItem.last_imageUrl[0];

		document.getElementById("descrip_nametag").dataset.fullDescription =
			JSON.stringify(currentItem.last_name);

		document.getElementById("dubbing").dataset.fullDescription = JSON.stringify(
			currentItem.dubbing
		);

		document.getElementById("descrip_nametag").textContent =
			currentItem.last_name[0];

		//descriptionBtn의 초기 상태 설정
		const descriptionBtn = document.getElementById("descriptionBtn");
		//previousdescriptionBtn의 초기 상태 설정
		const previousDescriptionBtn = document.getElementById(
			"previousDescriptionBtn"
		);
		previousDescriptionBtn.style.visibility = "hidden";
		descriptionBtn.style.visibility = "visible";

		//현재 사용자의 닉네임을 가져오기
		const userNickname = sessionStorage.getItem("userNickname");

		//@를 사용자의 닉네임으로 변경하여 출력
		let currentSentence = currentItem.last_description[0]
			.trim()
			.replace("@", userNickname);

		//Typed.js로 타이핑 효과
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
	} else {
		console.error("아이템 정보를 가져올 수 없습니다.");
	}
};

function calculateCropArea(img) {
	const targetAspectRatio = 4 / 3;
	let newWidth, newHeight;

	//이미지 비율 계산 -> 비율 계산을 하여 적절하게 이미지 비율을 조절한 후에 crop을 해야함
	const originalAspectRatio = img.width / img.height;

	//기존 비율과 4:3 비율간의 계산
	if (originalAspectRatio > targetAspectRatio) {
		//이미지가 너무 넓으면 너비를 조절
		newHeight = img.height;
		newWidth = newHeight * targetAspectRatio;
	} else {
		//이미지가 너무 좁으면 높이를 조절
		newWidth = img.width;
		newHeight = newWidth / targetAspectRatio;
	}

	// 중앙에서 자르기 시작할 위치 계산
	let startX = (img.width - newWidth) / 2;
	let startY = (img.height - newHeight) / 2;

	return { sx: startX, sy: startY, sWidth: newWidth, sHeight: newHeight };
}

document.addEventListener("DOMContentLoaded", function () {
	const canvas = document.getElementById("imageCanvas");
	const ctx = canvas.getContext("2d");

	//캔버스의 크기를 정의 -, 프레임 픽셀로 지정함
	canvas.width = 952;
	canvas.height = 1530;

	const frameImage = new Image();
	const img1 = new Image();
	const img2 = new Image();
	let imagesLoaded = 0;

	function checkImagesLoaded() {
		imagesLoaded++;
		if (imagesLoaded === 3) {
			// img1, img2, 그리고 frameImage가 모두 로드되었는지 확인
			drawImages();
		}
	}

	frameImage.onload = checkImagesLoaded;
	img1.onload = checkImagesLoaded;
	img2.onload = checkImagesLoaded;

	function drawImages() {
		// img1과 img2에 대해 중앙 크롭 영역 계산
		const cropArea1 = calculateCropArea(img1);
		const cropArea2 = calculateCropArea(img2);
		let width = 680 * (4 / 3); //4:3 비율에 따른 너비
		let height = 680; // 높이는 그대로 유지
		let x = 35;
		let y1 = 50; // 첫 번째 사진의 y 좌표
		let y2 = 760; // 두 번째 사진의 y 좌표

		// 캔버스에 img1과 img2 그리기
		ctx.drawImage(
			img1,
			cropArea1.sx,
			cropArea1.sy,
			cropArea1.sWidth,
			cropArea1.sHeight,
			x,
			y1,
			width,
			height
		);
		ctx.drawImage(
			img2,
			cropArea2.sx,
			cropArea2.sy,
			cropArea2.sWidth,
			cropArea2.sHeight,
			x,
			y2,
			width,
			height
		);

		// 마지막에 frameImage 그리기
		ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

		// 결과 이미지 URL을 sessionStorage에 저장
		const resultImage = document.getElementById("resultImage");
		resultImage.src = canvas.toDataURL();
		sessionStorage.setItem("resultImg", resultImage.src);
	}

	// 이미지 소스 설정
	frameImage.src = "/static/image/twocut.png";
	img1.src = `/static/benefit/img/6_${sessionStorage.getItem(
		"userId"
	)}_convert.jpg`;
	img2.src = `/static/benefit/img/4_${sessionStorage.getItem(
		"userId"
	)}_original.jpg`;
});

let currentIndex = 0;
let background = 0;
let typed;
const descriptionBtn = document.getElementById("descriptionBtn");
const pictures = document.getElementById("image");
const submitButton = document.getElementById("submitButton");
const previousDescriptionBtn = document.getElementById(
	"previousDescriptionBtn"
);
const next = document.getElementById("next");

//버튼 상태 update
function updateButtonState() {
	let sentences = JSON.parse(
		document.getElementById("description").dataset.fullDescription || "[]"
	);

	if (currentIndex == 0) {
		previousDescriptionBtn.style.visibility = "hidden";
		descriptionBtn.style.visibility = "visible";
	} else if (currentIndex == sentences.length - 1) {
		previousDescriptionBtn.style.visibility = "visible";
		descriptionBtn.style.visibility = "hidden";
		descriptionBtn.classList.remove("bounceAnimation");
		previousDescriptionBtn.classList.remove("bounceAnimation");
		next.style.display = "flex";
	} else {
		previousDescriptionBtn.style.visibility = "visible";
		descriptionBtn.style.visibility = "visible";
		descriptionBtn.classList.add("bounceAnimation");
		previousDescriptionBtn.classList.add("bounceAnimation");
		next.style.display = "none";
	}
}

//버튼을 눌렀을 때 대사, 이미지,버튼 등의 상태 update시켜줌
function updateDescriptionAndButtons() {
	if (background == 1) {
		var audio = document.getElementById("background");
		audio.play();
	}

	let sentences = JSON.parse(
		document.getElementById("description").dataset.fullDescription || "[]"
	);
	let imageUrls = JSON.parse(
		document.getElementById("image").dataset.fullDescription || "[]"
	);
	let names = JSON.parse(
		document.getElementById("descrip_nametag").dataset.fullDescription || "[]"
	);

	let dubbing = JSON.parse(
		document.getElementById("dubbing").dataset.fullDescription || "[]"
	);
	if (typed) {
		typed.destroy();
	}

	let currentImageUrl = imageUrls[currentIndex];
	if (currentImageUrl) {
		pictures.src = currentImageUrl;
	}
	document.getElementById("descrip_nametag").textContent = names[currentIndex];

	var audioElement = document.getElementById("dubbing");
	audioElement.src = dubbing[currentIndex];
	audioElement.play();

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
			typeSpeed: 50,
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
		background++;
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
		background++;
	}
	updateDescriptionAndButtons();
});
