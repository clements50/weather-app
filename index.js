async function hitApi(location) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=e9996fd262ff46252f67fb277ba803ae&units=imperial`,
    { mode: 'cors' }
  );

  const data = await response.json();

  const processData = createWeatherObject(data);
  render(processData);
}

function createWeatherObject(data) {
  const weather = {
    location: data.name,
    temperature: data.main.temp,
    windSpeed: data.wind.speed,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
  };

  return weather;
}

function render(data) {
  const weatherContent = document.querySelector('.weather-content');
  clearElement(weatherContent);
  const weatherCard = document.createElement('div');
  const location = document.createElement('h1');
  const temperature = document.createElement('div');
  const feelsLike = document.createElement('div');
  const humidity = document.createElement('div');
  const windSpeed = document.createElement('div');
  weatherCard.classList.add('weather-card');
  temperature.classList.add('temperature');

  location.innerHTML = data.location;
  temperature.innerHTML = `${data.temperature} &#8457;`;
  feelsLike.innerHTML = `feels like: ${data.feelsLike} &#8457;`;
  humidity.innerHTML = `humidity: ${data.humidity}%`;
  windSpeed.innerHTML = `wind speed: ${data.windSpeed}mph`;
  weatherCard.appendChild(location);
  weatherCard.appendChild(temperature);
  weatherCard.appendChild(feelsLike);
  weatherCard.appendChild(humidity);
  weatherCard.appendChild(windSpeed);
  weatherContent.appendChild(weatherCard);
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

hitApi('london');
hitApi('austin');

const form = document.querySelector('.weather-form');
const weatherInput = document.querySelector('.weather-input');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = weatherInput.value;
  if (inputValue === '' || inputValue == null) return;
  hitApi(inputValue);
});
