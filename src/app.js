function refreshWeather(response) {
let temperatureElement = document.querySelector("#temperature");
let temperature = response.data.temperature.current;
let cityElement = document.querySelector("#city");

cityElement.innerHTML = response.data.city;
temperatureElement.innerHTML = Math.round(temperature);  
}

function searchCity(city) {
    let apiKey= "o0e08e5bc5b0e4ff55a41bb73c22t77e";
    let apiUrl= `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event){
event.preventDefault();
let searchInput = document.querySelector("#search-input");
searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#weather-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Sunnyvale");

