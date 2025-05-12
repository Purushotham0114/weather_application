const apiKey = "7ed3dda52b56f7d9cdd4d1837e4f6ebe"; // Replace with your OpenWeatherMap API key

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherResult = document.getElementById('weatherResult');
const cityNameEl = document.getElementById('cityName');
const descriptionEl = document.getElementById('description');
const temperatureEl = document.getElementById('temperature');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('windSpeed');
const weatherIconEl = document.getElementById('weatherIcon');
const errorMsg = document.getElementById('errorMsg');
const darkModeToggle = document.getElementById('darkModeToggle');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city === '') {
    showError('Please enter a city name.');
    return;
  }
  fetchWeather(city);
});

cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  // Toggle icon between moon and sun
  if (document.body.classList.contains('dark-mode')) {
    darkModeToggle.textContent = '☀️';
  } else {
    darkModeToggle.textContent = '🌙';
  }
});

function fetchWeather(city) {
  errorMsg.classList.add('hidden');
  weatherResult.classList.add('hidden');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then((data) => {
      updateWeatherUI(data);
    })
    .catch((error) => {
      showError(error.message);
    });
}

function updateWeatherUI(data) {
  cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
  descriptionEl.textContent = capitalizeFirstLetter(data.weather[0].description);
  temperatureEl.textContent = data.main.temp.toFixed(1);
  humidityEl.textContent = data.main.humidity;
  windSpeedEl.textContent = data.wind.speed.toFixed(1);
  weatherIconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherIconEl.alt = data.weather[0].description;

  weatherResult.classList.remove('hidden');
}

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.remove('hidden');
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
