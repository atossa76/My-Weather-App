let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekDay = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
let formattedDate = `${weekDay}, ${hour}:${minute}`;
let day = document.querySelector("#day");
day.innerHTML = formattedDate;

function showTemperature(response) {
  let temperatureElement = document.querySelector(`.temperature`);
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let speedElement = document.querySelector("#speed");
  speedElement.innerHTML = Math.round(response.data.wind.speed);

  let descriptions = document.querySelector("#description");
  descriptions.innerHTML = response.data.weather[0].description;

  document.querySelector("#the-city").innerHTML = response.data.name;
}

function search(city) {
  let apiKey = "540ee35bfec47at11ead13o185ed46a6";
  let units = "metric";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current?";
  let apiUrl = `${apiEndpoint}query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  search(city);
}

let newCity = document.querySelector("#search-city");
newCity.addEventListener("submit", searchCity);

function displayCurrent(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(`.temperature`);
  temperatureElement.innerHTML = `${currentTemperature}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let speedElement = document.querySelector("#speed");
  speedElement.innerHTML = Math.round(response.data.wind.speed);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "f3887e262c88d1158f7e2ef4998e234c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;

  axios
    .get(`${apiUrl}lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then(displayCurrent);
}

function findLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let current = document.querySelector("button");
current.addEventListener("click", findLocation);

search("Ardabil");
