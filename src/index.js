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
function displayForcast() {
	let forcastElement = document.querySelector("#forcast");
	forcastHTML = `<div class="row justify-content-center">`;
	let days = ["Thu","Fri","Sat","Sun","Mon"];
	days.forEach(function(day){

		forcastHTML =
			forcastHTML +
			`			
							<div class="col-2 border m-2 shadow-lg">
								<div class="date">${day}</div>
								<img
									src="images/partly_cloudy.png"
									alt="partly cloudy icon"
									class="weather-icon float-left"
								/>
								<div class="weather-temperature">
									<span class="weather-temp-max">16°</span>
									<span class="weather-temp-min">-3°</span>
								</div>
							</div>
						`;
	})
	forcastHTML = forcastHTML + `</div>`;
	forcastElement.innerHTML = forcastHTML;
}

function showWeather(response) {
	document.querySelector("#city").innerHTML = response.data.name;
	document.querySelector("#temperature").innerHTML = Math.round(
		response.data.main.temp
	);
	document.querySelector("#description").innerHTML =
		response.data.weather[0].description;
	document.querySelector("#feels-like").innerHTML = Math.round(
		response.data.main.feels_like
	);
	document.querySelector("#humidity").innerHTML = response.data.main.humidity;

	document.querySelector("#wind").innerHTML = Math.round(
		response.data.wind.speed
	);
	document
		.querySelector("#icon")
		.setAttribute(
			"src",
			`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
		);
	document
		.querySelector("#icon")
		.setAttribute("alt", response.data.weather[0].description);
	celsiusTemperature = Math.round(response.data.main.temp);
}
function displayFahrenheitTemperature(event) {
	event.preventDefault();
	celsiusLink.classList.remove("active");
	fahrenheitLink.classList.add("active");
	document.querySelector("#temperature").innerHTML = Math.round(
		(celsiusTemperature * 9) / 5 + 32
	);
}
function displayCelsiusTemperature(event) {
	event.preventDefault();
	celsiusLink.classList.add("active");
	fahrenheitLink.classList.remove("active");
	document.querySelector("#temperature").innerHTML = celsiusTemperature;
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

let celsiusTemperature = null;
let timeElement = document.querySelector("#date");
let currentTime = new Date();
timeElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", handleSubmit);

let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentLocation);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

searchCity("Toronto");
displayForcast();
