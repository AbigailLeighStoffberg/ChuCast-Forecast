// src/app.js

function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity-value");
    let windSpeedElement = document.querySelector("#wind-value");
    let reportDateTimeObject = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");
    let iconCode = response.data.condition.icon;
    let iconPath = `images/icons/${iconCode}.png`;

    let currentDayTextElement = document.querySelector("#current-day-text");
    let digitalClockDisplayElement = document.querySelector("#digital-clock-display"); // For the time

    if (currentDayTextElement) {
        currentDayTextElement.innerHTML = formatDate(reportDateTimeObject);
    }

    if (digitalClockDisplayElement) {
        digitalClockDisplayElement.innerHTML = formatTime(reportDateTimeObject);
    }

    iconElement.innerHTML = `<img src="${iconPath}" class="weather-icon"/>`;
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = days[date.getDay()];

    return `${day}`;
}

function formatTime(dateObject) {
    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}`;
}

function searchCity(city) {
    let apiKey = "o0e07e5bc5b0e4ff55a41bb73c22t77e";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    
    axios.get(apiUrl)
      .then((response) => {
        console.log("Full API Response Object: ", response);
        console.log("API Weather Data (response.data): ", response.data);

        refreshWeather(response);
      })
      .catch(function (error) {
        console.error("Error fetching weather data for " + city + ":", error);
      });
}

function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    let city = searchInput.value;

    searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#weather-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Sunnyvale");

