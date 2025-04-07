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
  weatherDiv.innerHTML = "";
  weatherDiv.classList.remove("show");

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  )
    .then((response) => {
      if (!response.ok) throw new Error("Oraș invalid!");
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
      cityInput.value = "";
    })

    .catch((error) => alert(error.message));
  cityInput.focus();
}

document.getElementById("search-btn").addEventListener("click", searchWeather);
document.getElementById("city-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchWeather();
  }
});
