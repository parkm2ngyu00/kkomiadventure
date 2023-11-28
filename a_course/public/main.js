const map = L.map("map", {
	attributionControl: false,
	center: [37.40901, 128.04667],
	zoom: 20,
	minZoom: 15, // 이 줌 레벨 이하로는 줌 아웃되지 않음
	maxZoom: 18,
	maxBounds: [
		[37.3, 127.8], // 남서쪽 경계 좌표
		[37.6, 128.3], // 북동쪽 경계 좌표
	],
	maxBoundsViscosity: 1.0, // 경계를 넘어서는 움직임을 얼마나 강하게 제한할 것인지 (1이면 완전히 제한)
	zoomControl: false,
});

map.setView([37.40901, 128.04667], 15);

// openstreetmap
const tiles = L.tileLayer(
	"https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
	{
		maxZoom: 19,
		attribution:
			'&copy; <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> ' +
			'&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
	}
).addTo(map);

let currentLocationMarker;
let currentMarkerIndex = 0;
//버튼 눌렀을 때 뜨는 이미지 인덱스 추적
let currentImageIndex = 0;

const newIcon = L.icon({
	iconUrl: "/static/image/foot.png",
	iconSize: [90, 80],
	iconAnchor: [19, 38],
	popupAnchor: [0, -38],
	className: "pulsing-marker",
});

//geolocation사용하여 사용자의 현재 위치 실시간 반환 -> geolocation사용
let currentLocationCircle; // 현재 위치를 나타내는 원을 저장할 변수

function success({ coords }) {
	const { latitude, longitude } = coords;

	if (!currentLocationCircle) {
		// 원을 생성하고 지도에 추가
		currentLocationCircle = L.circle([latitude, longitude], {
			color: "#FFFFFF", // 원의 선 색상
			fillColor: "#FC5230", // 원 내부의 채움 색상
			fillOpacity: 0.5, // 원 내부의 채움 투명도
			radius: 30, // 원의 반지름 (미터 단위)
		}).addTo(map);
		map.setView([latitude, longitude], 15);
	} else {
		currentLocationCircle.setLatLng([latitude, longitude]);
	}
}

function getUserLocation() {
	if (!navigator.geolocation) {
		alert("위치 정보가 지원되지 않습니다.");
		return;
	}
	navigator.geolocation.watchPosition(success);
}

//실행될 때 나의 위치 항상 뜨게 함
// getUserLocation();

//버튼 클릭 시 getUserLocation 함수 호출
document
	.getElementById("currentLocation")
	.addEventListener("click", getUserLocation);

function openPopup(item, index) {
	//데이터를 문자열로 변환하여 sessionStorage에 저장
	sessionStorage.setItem("currentItem", JSON.stringify(item));
	currentMarkerIndex = index;

	setTimeout(() => {
		const type = item.game;

		if (type == "picture") {
			newUrl = "/static/mission/picture.html";
		} else if (type == "experience") {
			newUrl = "/static/mission/experience.html";
		} else if (type == "answer") {
			newUrl = "/static/mission/answer.html";
		} else if (type == "check") {
			newUrl = "/static/mission/answer_check.html";
		} else if (type == "OX") {
			newUrl = "/static/mission/answer_OX.html";
		} else if (type == "picture_sound") {
			newUrl = "/static/mission/picture_sound.html";
		} else if (type == "check_sound") {
			newUrl = "/static/mission/answer_check_sound.html";
		}
		window.location.href = newUrl;
	}, 500);
}

let markersGroup = L.layerGroup().addTo(map);
let linesGroup = L.layerGroup().addTo(map);
const user_nickname = document.getElementById("user_nickname");
user_nickname.innerText = sessionStorage.getItem("userNickname") + " 님";

// 코스의 미션 개수
const missionsCount = 10;

// 코스 배열 생성하는 함수
// 맛보기미션, 첫번째 미션은 초기에 떠 있어야하므로 배열의 인덱스 값을 초기에 1로 설정함
function loadCourseProgress() {
	let courseProgress = sessionStorage.getItem("courseProgress");
	if (courseProgress) {
		return JSON.parse(courseProgress);
	} else {
		let progress = new Array(missionsCount).fill(0);
		progress[0] = 1;
		progress[1] = 1;
		sessionStorage.setItem("courseProgress", JSON.stringify(progress));
		return progress;
	}
}

// 해당하는 코스 번호를 sessionstorage에 저장함 -> 마커를 그려주기 위한 함수 실행
function loadCourse() {
	getMarkerAndCourses();

	// sessionStorage에서 현재 코스의 마지막 완료된 미션 번호를 가져옴
	let lastCompletedMissionNumber =
		sessionStorage.getItem(`lastCompletedMission`);
	// 새로운 코스가 로드될 때 해당 값을 미션 번호 요소에 설정함
	let missionElement = document.getElementById("mission_num");
	if (missionElement) {
		missionElement.innerHTML = `꽃잎 ${lastCompletedMissionNumber || "/9"}`;
	}
}

// 맛보기 미션 아이콘
const Icon1 = L.icon({
	iconUrl: "/static/image/icon1.png",
	iconSize: [70, 70],
	popupAnchor: [0, -38],
});

// 물음표 아이콘(현재 수행해야할 미션)
const Icon2 = L.icon({
	iconUrl: "/static/image/next_mission.png",
	iconSize: [50, 50],
	popupAnchor: [0, -38],
});

// 미션완료후 뜨는 초롱꽃을 든 꼬미 아이콘
const Icon3 = L.icon({
	iconUrl: "/static/image/icon3.png",
	iconSize: [50, 50],
	popupAnchor: [0, -38],
});

const Map1 = L.icon({
	iconUrl: "/static/image/map_1.png",
	iconSize: [80, 80],
	popupAnchor: [0, -38],
});

const Map2 = L.icon({
	iconUrl: "/static/image/map_2.png",
	iconSize: [80, 80],
	popupAnchor: [0, -38],
});

const Map3 = L.icon({
	iconUrl: "/static/image/map_3.png",
	iconSize: [80, 80],
	popupAnchor: [0, -38],
});

const Map4 = L.icon({
	iconUrl: "/static/image/map_4.png",
	iconSize: [80, 80],
	popupAnchor: [0, -38],
});

const Map5 = L.icon({
	iconUrl: "/static/image/map_5.png",
	iconSize: [80, 80],
	popupAnchor: [0, -38],
});

const Map6 = L.icon({
	iconUrl: "/static/image/map_6.png",
	iconSize: [80, 80],
	popupAnchor: [0, -38],
});

const Map7 = L.icon({
	iconUrl: "/static/image/map_7.png",
	iconSize: [80, 80],
	popupAnchor: [0, -38],
});

// 지도상에 띄워질 아이콘 추가
L.marker([37.415178702643, 128.050192594528], { icon: Map1 }).addTo(map);
L.marker([37.408346344485, 128.044876456261], { icon: Map2 }).addTo(map);
L.marker([37.3996361550487, 128.049114346504], { icon: Map5 }).addTo(map);
L.marker([37.3941725939312, 128.054344654083], { icon: Map7 }).addTo(map);

// 마커와 코스 정보를 업데이트 -> 마커가 그려야하는 개수가 변경될 때 마다 새로 그려짐
function getMarkerAndCourses() {
	// sessionstorage에 초기에는 start값에 0 지정함
	if (sessionStorage.getItem("start") === null) {
		sessionStorage.setItem("start", true);
	}
	let courseProgress = loadCourseProgress();
	let lastCompletedNumber = parseInt(
		sessionStorage.getItem("lastCompletedMission"),
		10
	);
	if (isNaN(lastCompletedNumber)) {
		lastCompletedNumber = 0; // 기본값 설정
	}

	$.ajax({
		method: "GET",
		url: `/static/json/1코스.json`,
		dataType: "json",
	}).done(function (data) {
		//그릴 때 마다 기존 마커와 라인을 초기화 시켜줌
		markersGroup.clearLayers();
		linesGroup.clearLayers();
		//코스별 진행 상태에 따라 마커를 그림
		//1인 인덱스까지만 마커를 생성
		data.datas.some((item, index) => {
			if (courseProgress[index] === 1) {
				let icon;
				if (index === 0) {
					icon = Icon1;
				} else if (index <= lastCompletedNumber) {
					icon = Icon3;
				} else if (index === lastCompletedNumber + 1) {
					icon = Icon2;
				}

				if (icon) {
					let marker = L.marker([item.lat, item.lng], { icon: icon }).on(
						"click",
						function () {
							openPopup(item, index);
						}
					);

					if (icon === Icon2) {
						marker.on("add", function () {
							// 마커 추가 후 DOM 요소에 애니메이션 적용
							applyAnimationToMarker(marker);
						});
					}
					markersGroup.addLayer(marker);
				}
			}
		});
		//라인 그려줌
		$.each(data.courses, function (index, course) {
			let line = L.polyline(course, { color: "#456E2A", weight: 12 });
			linesGroup.addLayer(line);
		});

		//새로운 마커와 line을 다시 map에 그려줌
		markersGroup.addTo(map);
		linesGroup.addTo(map);
	});
}
getMarkerAndCourses();

function applyAnimationToMarker(marker) {
	// 마커의 DOM 요소 접근
	var iconElement = marker._icon;
	if (iconElement) {
		// CSS transition 속성 설정
		iconElement.style.transition = "margin-top 0.7s ease-in-out";

		var moveUp = true; // 초기 방향을 위로 설정

		setInterval(function () {
			if (moveUp) {
				iconElement.style.marginTop = "-50px"; // 위로 이동
			} else {
				iconElement.style.marginTop = "-30px"; // 아래로 이동
			}
			moveUp = !moveUp; // 방향 전환
		}, 700); // 0.7초마다 반복
	}
}

document.addEventListener("DOMContentLoaded", (event) => {
	// 해당하는 코스의 배열 반환
	loadCourseProgress();
	loadCourse();
	// sessionstorage에서 마지막으로 완료한 미션 번호 가져옴
	let lastCompletedMissionNumber =
		sessionStorage.getItem(`lastCompletedMission`);
	// sessionStorage에 값이 없으면 0으로 설정
	lastCompletedMissionNumber = lastCompletedMissionNumber
		? parseInt(lastCompletedMissionNumber)
		: 0;

	// 미션 번호 요소에 값을 설정
	document.getElementById("mission_num").innerHTML =
		"꽃잎 " + lastCompletedMissionNumber + "/9";

	const gameInformationPopup = document.getElementById("game_information");

	// 세션 스토리지에서 'first' 값을 가져옴
	if (sessionStorage.getItem("first") === null) {
		sessionStorage.setItem("first", true);
	}

	const first = sessionStorage.getItem("first");

	// 'first' 값이 'True'인 경우에만 팝업을 표시
	if (first === "true") {
		gameInformationPopup.style.display = "block";
		sessionStorage.setItem("first", "false");
	}

	//이미지 슬라이더 초기화
	initializeSlider("information");
	initializeSlider("safe_information");
	initializeSlider("game_information");
});

// 드롭다운으로 뜨는 것 열어줌
function showPopup(popupId) {
	var popup = document.getElementById(popupId);
	if (popup) {
		popup.style.display = "block";
	}
}

// 드롭다운으로 뜨는 것 닫음
function closePopup(popupId) {
	var popup = document.getElementById(popupId);
	if (popup) {
		popup.style.display = "none";
	}
}

// 페이지의 다른 부분을 클릭하면 드롭다운 닫기
window.onclick = function (event) {
	if (!event.target.matches("#dropdown-btn")) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		for (var i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains("show")) {
				openDropdown.classList.remove("show");
			}
		}
	}
};

// AI화가 누르면 이미지 변환 페이지로 연결
document.getElementById("navBtnLast").addEventListener("click", function () {
	window.location.href = "/static/benefit/imgconvert.html";
});

// 이미지 슬라이더 초기화해주는 함수
function initializeSlider(sliderId) {
	let currentImageIndex = 0;
	const slider = document.querySelector("#" + sliderId);
	const images = slider.querySelectorAll(".slide img");
	const nextButton = slider.querySelector(".slide .next");
	const backButton = slider.querySelector(".slide .back");

	function updateSlideShow() {
		images.forEach((img, index) => {
			img.style.display = index === currentImageIndex ? "block" : "none";
		});

		nextButton.style.display =
			currentImageIndex === images.length - 1 ? "none" : "block";
		backButton.style.display = currentImageIndex === 0 ? "none" : "block";
	}

	nextButton.onclick = function () {
		if (currentImageIndex < images.length - 1) {
			currentImageIndex++;
			updateSlideShow();
		}
	};

	backButton.onclick = function () {
		if (currentImageIndex > 0) {
			currentImageIndex--;
			updateSlideShow();
		}
	};

	updateSlideShow();
}
