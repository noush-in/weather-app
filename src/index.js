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
function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	return days[day];
}

function displayForecast(response) {
	let forecastElement = document.querySelector("#forecast");
	forecastHTML = `<div class="row justify-content-center">`;
	let forecast = response.data.daily;
	forecast.forEach(function (forecastDay, index) {
		if (index < 5) {
			forecastHTML =
				forecastHTML +
				`			
							<div class="col-2  m-2 shadow-lg">
								<div class="date">${formatDay(forecastDay.dt)}</div>
								<img
									src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
									alt="http://openweathermap.org/img/wn/${
										forecastDay.weather[0].description
									}@2x.png"
									class="weather-icon float-left"
								/>
								<div class="weather-temperature">
									<span class="weather-temp-max">${Math.round(forecastDay.temp.max)}</span>
									<span class="weather-temp-min">${Math.round(forecastDay.temp.min)}</span>
								</div>
							</div>
						`;
		}
	});

	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
	let apiKey = "3dec6cd6ea83e67d96c00c2a25d00b2a";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
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
	getForecast(response.data.coord);
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
	axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
	event.preventDefault();
	let city = document.querySelector("#search-text-input").value;
	searchCity(city);
}
function searchLocation(position) {
	let apiKey = "3dec6cd6ea83e67d96c00c2a25d00b2a";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayTemperature);
}

let celsiusTemperature = null;
let timeElement = document.querySelector("#date");
let currentTime = new Date();
timeElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

searchCity("Toronto");
