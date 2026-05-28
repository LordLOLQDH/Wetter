const apiKey = "e1a724f1a23f76afc358559c1649c5dd";

async function getWeather() {

  const city = document.getElementById("city").value;

  if(city === "") {
    alert("Bitte Stadt eingeben");
    return;
  }

  const url =
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=de`;

  const response = await fetch(url);
  const data = await response.json();

  if(data.cod === "404") {
    document.getElementById("weather").innerHTML = `
      <h2>❌ Stadt nicht gefunden</h2>
    `;
    return;
  }

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

    </div>
  `;
}

function changeBackground(weather) {

  const bg = document.querySelector('.bg');

  if(weather.includes('Cloud')) {
    bg.style.background = `
      radial-gradient(circle at top left, #475569, transparent 30%),
      radial-gradient(circle at bottom right, #334155, transparent 30%),
      #0f172a
    `;
  }

  else if(weather.includes('Rain')) {
    bg.style.background = `
      radial-gradient(circle at top left, #0ea5e9, transparent 30%),
      radial-gradient(circle at bottom right, #1d4ed8, transparent 30%),
      #020617
    `;
  }

  else if(weather.includes('Clear')) {
    bg.style.background = `
      radial-gradient(circle at top left, #f59e0b, transparent 30%),
      radial-gradient(circle at bottom right, #f97316, transparent 30%),
      #1e293b
    `;
  }
}

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
