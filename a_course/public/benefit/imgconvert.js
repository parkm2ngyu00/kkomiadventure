const submitButton = document.getElementById("submitButton");
const imageSelect = document.getElementById("imageSelect");
const delayContent = ["../image/dalay_ggomi.GIF"];

const textElement = document.getElementById("text");
const imgElement = document.getElementById("uploadedImage");
const downloadBtn = document.getElementById("downloadBtn");
const downloadBtnReal = document.getElementById("downloadBtnReal");
const loadingBox = document.getElementById("loadingBox");
const delayImg = document.getElementById("delayImg");
const bar = document.querySelector(".indeterminate-progress-bar");
const progress = document.querySelector(
	".indeterminate-progress-bar__progress"
);
const buttonDescription = document.getElementById("buttonDescription");
const buttonBox = document.getElementById("buttonBox");
const info1 = document.getElementById("info1");
const infoTitle1 = document.getElementById("infoTitle1");
const infoDescript1 = document.getElementById("infoDescript1");

//드롭다운 메뉴 내의 모든 링크 요소 선택
var dropdownItems = document.querySelectorAll(".dropdown-item");
let delayIndex = 0;
let imageNum = 100;
let styleNum = 0;
let timeoutId;
let isLoading = false;

//각 링크에 클릭 이벤트
dropdownItems.forEach(function (item) {
	item.addEventListener("click", function () {
		//text 변경
		buttonDescription.textContent = item.textContent;

		//드롭다운 메뉴를 닫음
		document.getElementById("dropdown-content").style.display = "none";
	});
});

document.getElementById("selectPicture").addEventListener("click", function () {
	var dropdown = document.getElementById("dropdown-content");
	dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
});

function showLoading() {
	loadingBox.style.display = "flex";
	delayImg.style.display = "block";
	bar.style.display = "block";
	progress.style.display = "block";

	document.getElementById("text").style.display = "block";
}

function hideLoading() {
	loadingBox.style.display = "none";
	delayImg.style.display = "none";

	bar.style.display = "none";
	progress.style.display = "none";

	document.getElementById("text").style.display = "none";
}

// 이미지 제출 버튼에 이벤트를 바인딩합니다.
submitButton.addEventListener("click", submitFunc);

downloadBtn.addEventListener("click", () => {
	downloadBtnReal.click();
});

function submitFunc(event) {
	event.preventDefault();
	const option1 = buttonDescription.textContent;
	const option2 = imageSelect.textContent;
	if (option1 == "화풍 선택") {
		alert("화풍을 골라주세요");
		return;
	}
	if (option2 == "이미지 선택") {
		alert("이미지를 넣어주세요");
		return;
	}
	delayIndex = 0;

	showLoading();
	info1.style.display = "none";
	// showNextText();
	isLoading = true;
	imgElement.style.display = "none";
	downloadBtn.style.display = "none";
	buttonBox.style.display = "none";

	const getUserId = sessionStorage.getItem("userId");
	// 백엔드로 데이터를 POST로 전송합니다.
	const formData = new FormData(document.querySelector(".file-input"));
	fetch(`/upload_image/${imageNum}/?userId=${getUserId}&styleNum=${styleNum}`, {
		method: "POST",
		body: formData,
	})
		.then((response) => {
			if (response.ok) {
				hideLoading();
				clearTimeout(timeoutId);
				buttonBox.style.display = "flex";
				// 이미지를 가져와서 <img> 요소에 표시
				imgElement.src = `./img/${imageNum}_${getUserId}_convert.jpg`;
				downloadBtnReal.href = `./img/${imageNum}_${getUserId}_convert.jpg`;
			} else {
				// 이미지 업로드가 실패하면 경고 메시지를 표시합니다.
				alert("이미지 업로드에 실패했습니다.");
				window.location.reload();
			}
		})
		.then(() => {
			imgElement.style.display = "block";
			downloadBtn.style.display = "block";
			imageNum++;
			isLoading = false;
		});
}

// 파일업로드 버튼 꾸미기
document.getElementById("chooseFile").addEventListener("change", function () {
	if (this.files && this.files.length > 0) {
		imageSelect.textContent = "다시 고르기"; // This will replace the content of the label
	} else {
		imageSelect.textContent = "이미지 선택";
	}
});

document.getElementById("backButton").addEventListener("click", function () {
	if (isLoading == true) {
		let goBack = confirm(
			"이미지 변환 도중 나가면 변경사항이 저장이 되지 않을 수 있습니다."
		);
		if (goBack == true) {
		} else {
			return;
		}
	}
	window.location.href = "/practice";
});

document.getElementById("style1").addEventListener("click", () => {
	styleNum = 1;
	info1.style.display = "flex";
	info1.style.border = "3px solid #fece8a";
	infoTitle1.style.display = "block";
	infoDescript1.style.display = "block";
	infoTitle1.innerText = "한국화를 선택하셨어요!";
	infoDescript1.innerHTML = "※치악산의 자연 경치를 사진으로 찍어봐요.";
	imgElement.style.display = "none";
	downloadBtn.style.display = "none";
});

document.getElementById("style2").addEventListener("click", () => {
	styleNum = 2;
	info1.style.display = "flex";
	info1.style.border = "3px solid #fece8a";
	infoTitle1.style.display = "block";
	infoDescript1.style.display = "block";
	infoTitle1.innerText = "만화를 선택하셨어요!";
	infoDescript1.innerHTML = "※만화 스타일의 나만의 그림을 만들어봐요.";
	imgElement.style.display = "none";
	downloadBtn.style.display = "none";
});

document.getElementById("style3").addEventListener("click", () => {
	styleNum = 3;
	info1.style.display = "flex";
	info1.style.border = "3px solid #fece8a";
	infoTitle1.style.display = "block";
	infoDescript1.style.display = "flex";
	infoTitle1.innerText = "캐릭터를 선택하셨어요!";
	infoDescript1.innerHTML =
		"<span>※자신의 얼굴을 찍어 나만의 캐릭터를 만들어봐요.</span><span>가까이 찍을수록 멋진 캐릭터가 만들어져요.</span>";
	imgElement.style.display = "none";
	downloadBtn.style.display = "none";
});
