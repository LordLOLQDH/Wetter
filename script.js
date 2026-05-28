const apiKey = "e1a724f1a23f76afc358559c1649c5dd";

let darkMode = true;

async function getWeather() {

  const city = document.getElementById("city").value;

  if(city === "") {
    alert("Bitte Stadt eingeben");
    return;
  }

  document.getElementById('statusText').innerText = 'Lade Wetterdaten...';

  const url =
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=de`;

  const response = await fetch(url);
  const data = await response.json();

  if(data.cod === "404") {
    document.getElementById("weather").innerHTML = `
      <h2>❌ Stadt nicht gefunden</h2>
    `;

    document.getElementById('statusText').innerText = 'Fehler beim Laden';

    return;
  }

  document.getElementById('statusText').innerText = 'Wetterdaten erfolgreich geladen';

  const weatherMain = data.weather[0].main;

  changeBackground(weatherMain);

  document.getElementById("weather").innerHTML = `

    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png">

    <div class="city">${data.name}</div>

    <div class="description">
      ${data.weather[0].description}
    </div>

    <div class="temp">
      ${Math.round(data.main.temp)}°
    </div>

    <div class="stats">

      <div class="stat">
        <div class="label">💨 Wind</div>
        <div class="value">${data.wind.speed} m/s</div>
      </div>

      <div class="stat">
        <div class="label">💧 Feuchtigkeit</div>
        <div class="value">${data.main.humidity}%</div>
      </div>

      <div class="stat">
        <div class="label">🌡 Gefühl</div>
        <div class="value">${Math.round(data.main.feels_like)}°</div>
      </div>

      <div class="stat">
        <div class="label">📈 Max</div>
        <div class="value">${Math.round(data.main.temp_max)}°</div>
      </div>

      <div class="stat">
        <div class="label">📉 Min</div>
        <div class="value">${Math.round(data.main.temp_min)}°</div>
      </div>

      <div class="stat">
        <div class="label">🌍 Land</div>
        <div class="value">${data.sys.country}</div>
      </div>

    </div>
  `;
}

function setCity(city) {
  document.getElementById('city').value = city;
  getWeather();
}

function toggleTheme() {

  darkMode = !darkMode;

  if(darkMode) {
    document.body.style.background = '#030712';
  }

  else {
    document.body.style.background = '#94a3b8';
  }
}

function changeBackground(weather) {

  const bg = document.querySelector('.bg');

  if(weather.includes('Cloud')) {
    bg.style.background = `
      radial-gradient(circle at top left, #64748b, transparent 25%),
      radial-gradient(circle at bottom right, #334155, transparent 25%),
      #0f172a
    `;
  }

  else if(weather.includes('Rain')) {
    bg.style.background = `
      radial-gradient(circle at top left, #0ea5e9, transparent 25%),
      radial-gradient(circle at bottom right, #2563eb, transparent 25%),
      #020617
    `;
  }

  else if(weather.includes('Clear')) {
    bg.style.background = `
      radial-gradient(circle at top left, #f59e0b, transparent 25%),
      radial-gradient(circle at bottom right, #f97316, transparent 25%),
      #1e293b
    `;
  }
}

function updateClock() {

  const now = new Date();

  document.getElementById('clock').innerText =
  now.toLocaleTimeString('de-DE');
}

setInterval(updateClock, 1000);
updateClock();

getWeatherByLocation();

function getWeatherByLocation() {

  navigator.geolocation.getCurrentPosition(async position => {

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=de`;

    const response = await fetch(url);
    const data = await response.json();

    document.getElementById('city').value = data.name;

    getWeather();

  });
}
