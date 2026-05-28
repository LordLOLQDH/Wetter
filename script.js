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
    document.getElementById("weather").innerHTML =
    `<p>Stadt nicht gefunden</p>`;
    return;
  }

  document.getElementById("weather").innerHTML = `
    <h2>${data.name}</h2>

    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">

    <p>${data.weather[0].description}</p>

    <div class="temp">
      ${Math.round(data.main.temp)}°C
    </div>

    <div class="info">
      💨 Wind: ${data.wind.speed} m/s
    </div>

    <div class="info">
      💧 Luftfeuchtigkeit: ${data.main.humidity}%
    </div>
  `;
}
