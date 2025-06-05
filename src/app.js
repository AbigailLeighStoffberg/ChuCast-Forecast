// src/app.js

function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity-value");
    let windSpeedElement = document.querySelector("#wind-value");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");
    let iconCode = response.data.condition.icon;
    let iconPath = `images/icons/${iconCode}.png`; 

    iconElement.innerHTML = `<img src="${iconPath}" alt="${response.data.condition.description}" class="weather-icon"/>`;
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    let hour = date.getHours();
    let minutes = date.getMinutes();

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hour}:${minutes}`;
}

function searchCity(city) {
    let apiKey = "o0e08e5bc5b0e4ff55a41bb73c22t77e"; // Reminder: Be cautious with API keys in client-side code for production.
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(refreshWeather).catch(function (error) {
        console.error("Error fetching weather data for " + city + ":", error);
        alert(`Sorry, could not fetch weather data for "${city}". Please try another city or check your connection.`);

        // Optionally, clear fields or set to default/error state
        document.querySelector("#city").innerHTML = "City not found";
        document.querySelector("#temperature").innerHTML = "-";
        document.querySelector("#description").innerHTML = "N/A";
        document.querySelector("#humidity-value").innerHTML = "-";
        document.querySelector("#wind-value").innerHTML = "-";
        document.querySelector("#time").innerHTML = formatDate(new Date()); // Or some default time message

        let iconElement = document.querySelector("#icon");
        // You might want a default or error icon
        iconElement.innerHTML = `<img src="images/weather-icons/default.png" alt="Error loading weather icon" class="weather-icon"/>`;
        // Ensure you have a 'default.png' (or chosen extension) in your 'images/weather-icons/' folder
    });
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    let city = searchInput.value.trim(); // Trim whitespace
    if (city) { // Only search if city is not empty
        searchCity(city);
    } else {
        alert("Please enter a city name.");
    }
    searchInput.value = ""; // Clear input after search
}

let searchFormElement = document.querySelector("#weather-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Initial city load (e.g., a default city when the page loads)
searchCity("Sunnyvale"); // You can change this to any default city or make it user-location based later.