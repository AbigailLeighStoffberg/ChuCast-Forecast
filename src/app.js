// src/app.js

const compliments = {
  "clear sky": "As bright and beautiful as you. ૮₍´˶• . • ⑅ ₎ა",
  "few clouds": "Yet nothing can't dim your sunshine. (˵ •̀ ᴗ - ˵ ) ✧",
  "scattered clouds": "Your potential shines through. ( ◡̀_◡́)ᕤ ",
  "broken clouds": "Proof that the sun is always there. (づ ᴗ _ᴗ)づ♡",
  "shower rain": "A quick rinse to make the world sparkle. (❀ˆᴗˆ)(•́ᴗ•̀✿)",
  "rain": "The perfect excuse to get cozy. (˶ᵔ ᵕ ᵔ˶)",
  "thunderstorm": "A spectacular show, just for you! (◍•ᴗ•◍)❤",
  "snow": "Soft and fluffy, just like you. (ෆ˙ᵕ˙ෆ)♡",
  "mist": "Adding a little mystery to an ordinary day. ₍^. .^₎⟆",
};

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
    let digitalClockDisplayElement = document.querySelector("#digital-clock-display");
    let description = response.data.condition.description;
    let descriptionKey = description.toLowerCase();
    let compliment = compliments[descriptionKey];
    let finalDescriptionHtml = `<span class="weather-text">${description}.</span>`;

    if (compliment) {
        finalDescriptionHtml += ` <span class="weather-compliment">${compliment}</span>`;
        } else {
        finalDescriptionHtml += ` <span class="weather-fallback">Have a wonderful day! ♡</span>`;
        }

    descriptionElement.innerHTML = finalDescriptionHtml;

    if (currentDayTextElement) {
        currentDayTextElement.innerHTML = formatDate(reportDateTimeObject);
    }

    if (digitalClockDisplayElement) {
        digitalClockDisplayElement.innerHTML = formatTime(reportDateTimeObject);
    }

    iconElement.innerHTML = `<img src="${iconPath}" class="weather-icon"/>`;
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = finalDescriptionHtml;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);

    getForecast(response.data.city);
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
    let apiKey = "o0e01e5bc5b0e4ff55a41bb73c22t77e";
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city){
    let apiKey = "o0e01e5bc5b0e4ff55a41bb73c22t77e"
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`

    axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    let forecastHtml = "";
    

    response.data.daily.forEach(function(day, index) {
        if (index < 5) {
        let iconCode = day.condition.icon;
        let iconPath = `images/icons/${iconCode}.png`;

        forecastHtml = 
            forecastHtml +
            `<div class="forecast-day">
                <div class="forecast-date">${formatDay(day.time)}</div>
                <img src="${iconPath}" id = "icon" class="forecast-icon" />
                <div class="forecast-temperatures">
                    <div class="forecast-temperature-high">${Math.round(day.temperature.maximum)}°</div>
                    <div class="forecast-temperature-low">${Math.round(day.temperature.minimum)}°</div>
                </div>
                </div>`;
        }  
    });

    forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#weather-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Sunnyvale");
displayForecast();

