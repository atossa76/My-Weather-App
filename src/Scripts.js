function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
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
  return `${weekDay}, ${hour}:${minute}`;
}

function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let descriptions = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed");
  let dateElement = document.querySelector("#date");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  descriptions.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  speedElement.innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#the-city").innerHTML = response.data.city;
  dateElement.innerHTML = formatDate(response.data.time * 1000);
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
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);

  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.city;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let speedElement = document.querySelector("#speed");
  speedElement.innerHTML = Math.round(response.data.wind.speed);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "540ee35bfec47at11ead13o185ed46a6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?`;

  axios
    .get(`${apiUrl}lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`)
    .then(displayCurrent);
}

function findLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let current = document.querySelector("button");
current.addEventListener("click", findLocation);

search("Ardabil");
