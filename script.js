document.addEventListener("DOMContentLoaded", () => {
  const inputContainer = document.getElementsByClassName("input-container");
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");
  const API_KEY = "def8d49b22d2629a67bd61899e9b148a";
  console.log("script loaded");
  cityInput.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
      const city = cityInput.value.trim();
      if (!city) return;
      try {
        const weatherData = await fetchWeatherData(city);
        displayWeatherData(weatherData);
      } catch (Error) {
        showError();
      }
    }
  });

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;
    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (Error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("city not found");
    }

    const data = await response.json();
    return data;
  }
  function displayWeatherData(data) {
    console.log(data);
    console.log(typeof data);
    const { name, main, weather } = data;

    cityName.textContent = name;
    temperature.textContent = main.temp;
    description.textContent = weather[0].description;
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }
  function showError() {
    // throw new Error("Error in fecthing the city data");
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
