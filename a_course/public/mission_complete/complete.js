window.onload = function () {
	//sessionStorage에서 데이터 추출
	const currentItem = JSON.parse(sessionStorage.getItem("currentItem"));

	if (currentItem) {
		document.getElementById("description").dataset.fullDescription =
			JSON.stringify(currentItem.complete_description);
		document.getElementById("image").dataset.fullDescription = JSON.stringify(
			currentItem.complete_imageUrl
		);
		document.getElementById("descrip_nametag").dataset.fullDescription =
			JSON.stringify(currentItem.complete_name);
		document.getElementById("descrip_nametag").textContent =
			currentItem.complete_name[0];
		document.getElementById("image").src = currentItem.complete_imageUrl[0];

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
		let currentSentence = currentItem.complete_description[0]
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

let currentIndex = 0;
let typed;
const descriptionBtn = document.getElementById("descriptionBtn");
const pictures = document.getElementById("image");
const previousDescriptionBtn = document.getElementById(
	"previousDescriptionBtn"
);

document.getElementById("next").addEventListener("click", function () {
	window.location.href = "/practice";
});

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
		document.getElementById('next').classList.add("scaleAnimation");
	} else {
		previousDescriptionBtn.style.visibility = "visible";
		descriptionBtn.style.visibility = "visible";
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
		document.getElementById("descrip_nametag").dataset.fullDescription || "[]"
	);
	if (typed) {
		typed.destroy();
	}

	let currentImageUrl = imageUrls[currentIndex];
	if (currentImageUrl) {
		pictures.src = currentImageUrl;
	}
	document.getElementById("descrip_nametag").textContent = names[currentIndex];

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
