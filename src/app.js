function getWeatherTempterature(response) {
  let temperatureElement = document.querySelector("#temperature-value");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let weatherCondition = document.querySelector("#weather-condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let temperatureIcon = document.querySelector("#temperature-icon");
  temperatureIcon.innerHTML = `<img
                  src="${response.data.condition.icon_url}"
                  alt="temperature icon"
                  class="temperature-icon"
                />`;

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formattedDate(date);
  weatherCondition.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);

  getDailyForecast(response.data.city);
}

function formattedDate(date) {
  let day = date.getDay();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "o74291bedbb48f3c3et5a5a6ad40853a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeatherTempterature);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function getDailyForecast(city) {
  let apiKey = "o74291bedbb48f3c3et5a5a6ad40853a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function formattedDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function showForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-items">
            <div class="weather-forecast-day">${formattedDay(day.time)}</div>
            <div>
              <img src="${
                day.condition.icon_url
              }" class="weather-forecast-icon"/>
            </div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-degree">
                <b>${Math.round(day.temperature.maximum)}°</b>
              </div>
              <div class="weather-forecast-degree">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
          </div>`;
    }
  });

  let weatherForecast = document.querySelector("#weather-forecast");
  weatherForecast.innerHTML = forecastHtml;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

searchCity("London");
