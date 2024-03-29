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
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  speedElement.innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#the-city").innerHTML = response.data.city;
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.icon);

  getForecast(response.data.city);
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

function displayCurrent(response) {
  let currentTemperature = document.querySelector("#temperature");
  let h1 = document.querySelector("h1");
  let description = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  currentTemperature.innerHTML = Math.round(celsiusTemperature);
  h1.innerHTML = response.data.city;
  description.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  speedElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.icon);

  getForecast(response.data.city);
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let futureDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return futureDays[date.getDay()];
}

function getForecast(city) {
  let apiKey = "540ee35bfec47at11ead13o185ed46a6";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = '<div class="row">';

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `
      <div class="col-2">
        <h6 class="weather-forecast-date">${formatDay(day.time)}</h6>
        <div class="row-1">
          <div class="card">
            <div class="d-flex justify-content-center">
              <img
                src="${day.condition.icon_url}"
                class="card-img-top mt-1"
              />
            </div>
            <div class="card-body">
              <p class="card-text">
                <span class="weather-forecast-max">${Math.round(
                  day.temperature.maximum
                )}°</span> /
                <span class="weather-forecast-min">${Math.round(
                  day.temperature.minimum
                )}°</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      `;
    }
  });
  forecastHtml = forecastHtml + "</div>";
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let celsiusTemperature = null;

let newCity = document.querySelector("#search-city");
newCity.addEventListener("submit", searchCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Ardabil");
