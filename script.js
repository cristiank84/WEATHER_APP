const API_KEY = "f6b659ae8665699a159c289a6dfdda37";

const weatherDiv = document.getElementById("weather-container");
function displayWeather(data) {
  weatherDiv.innerHTML = `
    <h2>${data.name}</h2>
    <p>🌡️ ${Math.round(data.main.temp)}°C</p>
    <p>💧 Umiditate: ${data.main.humidity}%</p>
    <p>🌬️ Vânt: ${data.wind.speed} m/s</p>
    <p>${data.weather[0].description}</p>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">
  `;

  setTimeout(() => {
    weatherDiv.classList.add("show");
  }, 10);
}

function searchWeather() {
  const cityInput = document.getElementById("city-input");
  const city = cityInput.value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
      cityInput.value = "";
    })
    .catch((error) => alert("Oraș invalid!"));

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then(displayForecast)
    .catch((error) => console.error("Eroare prognoză:", error));
}
document.getElementById("search-btn").addEventListener("click", searchWeather);
document.getElementById("city-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchWeather();
  }
});
function displayForecast(data) {
  const forecastDiv = document.getElementById("forecast-container");
  forecastDiv.innerHTML = "";

  const dailyForecasts = data.list.filter((item) => {
    return item.dt_txt.includes("12:00:00");
  });

  dailyForecasts.forEach((day) => {
    const date = new Date(day.dt * 1000);
    const dayName = date.toLocaleDateString("ro-RO", { weekday: "short" });

    forecastDiv.innerHTML += `
      <div class="forecast-day">
        <h4>${dayName}</h4>
        <p>🌡️ ${Math.round(day.main.temp)}°C</p>
        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">
        <p>${day.weather[0].description}</p>
      </div>
    `;
  });
}
