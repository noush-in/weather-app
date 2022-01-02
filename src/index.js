/** @format */

function formatDate(currentTime) {
	let date = currentTime.getDay();
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thusrday",
		"Friday",
		"Saturday",
	];
	let day = days[date];
	let hour = currentTime.getHours();
	if (hour < 10) {
		hour = `0${hour}`;
	}
	let minute = currentTime.getMinutes();
	if (minute < 10) {
		minute = `0${minute}`;
	}
	return `${day} ${hour}:${minute}`;
}

function showWeather(response) {
	document.querySelector("#city").innerHTML = response.data.name;
	document.querySelector("#temperature").innerHTML = Math.round(
		response.data.main.temp
	);
	document.querySelector("#description").innerHTML =
		response.data.weather[0].main;
	document.querySelector("#feels-like").innerHTML = Math.round(
		response.data.main.feels_like
	);
	document.querySelector("#humidity").innerHTML = response.data.main.humidity;

	document.querySelector("#wind").innerHTML = Math.round(
		response.data.wind.speed
	);
	let temp = Math.round(response.data.main.temp);
	function celsiusChangeUnit(event) {
		event.preventDefault();
		document.querySelector("#temperature").innerHTML = temp;
	}
	function fahrenheitChangeUnit(event) {
		event.preventDefault();
		document.querySelector("#temperature").innerHTML = Math.round(
			(temp * 9) / 5 + 32
		);
	}
	document
		.querySelector("#celsius-link")
		.addEventListener("click", celsiusChangeUnit);
	document
		.querySelector("#fahrenheit-link")
		.addEventListener("click", fahrenheitChangeUnit);
}

function searchCity(city) {
	let apiKey = "3dec6cd6ea83e67d96c00c2a25d00b2a";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(showWeather);
}
function handleSubmit(event) {
	event.preventDefault();
	let city = document.querySelector("#search-text-input").value;
	searchCity(city);
}
function searchLocation(position) {
	let apiKey = "3dec6cd6ea83e67d96c00c2a25d00b2a";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(showWeather);
}
function getCurrentLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(searchLocation);
}

//feature #1
let timeElement = document.querySelector("#date");
let currentTime = new Date();
timeElement.innerHTML = formatDate(currentTime);

//feature #2
let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", handleSubmit);

let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentLocation);

searchCity("Toronto");
