function handleSearchSubmit(event){
event.preventDefault();
let searchInput = document.querySelector("#search-input");
let cityElement = document.querySelector("#city");
cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#weather-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

