const input = document.querySelector("#cityInput");

input.addEventListener("input", (e) => {
  cityName = e.target.value;

  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=5d066958a60d315387d9492393935c19`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      let mainTemp = document.querySelector(".mainTemp");
      mainTemp.innerHTML = data.main.temp + "°";

      let feelsLike = document.querySelector(".feelsLike");
      feelsLike.innerHTML = "Feels like " + data.main.feels_like + "°";

      let humidity = document.querySelector(".humidity");
      humidity.innerHTML = "Humidity: " + data.main.humidity + " %";

      let town = document.querySelector(".town");
      town.innerHTML = data.name + ", ";
      let country = document.querySelector(".country");
      country.innerHTML = data.sys.country;

      let temp_min = document.querySelector(".temp_min");
      temp_min.innerHTML = "Min temp: " + data.main.temp_min + "°";

      let temp_max = document.querySelector(".temp_max");
      temp_max.innerHTML = "Max temp: " + data.main.temp_max + "°";

      let wind = document.querySelector(".wind");
      wind.innerHTML = "Wind speed: " + data.wind.speed + " m/s";

      let pressure = document.querySelector(".pressure");
      pressure.innerHTML = "Pressure: " + data.main.pressure + " hPa";

      let description = document.querySelector(".description");
      description.innerHTML = data.weather[0].main;

      let globalWindow = document.querySelector(".globalWindow");

      if (data.main.temp <= 10) {
        globalWindow.style.backgroundColor = "rgb(189, 176, 212)";
      } else if (data.main.temp <= 0) {
        globalWindow.style.backgroundColor = "rgb(36, 98, 114)";
      } else if (data.main.temp > 10 && data.main.temp <= 20) {
        globalWindow.style.backgroundColor = "rgb(7, 186, 186)";
      } else if (data.main.temp > 20 && data.main.temp <= 30) {
        globalWindow.style.backgroundColor = "aqua";
      } else if (data.main.temp > 30) {
        globalWindow.style.backgroundColor = "rgb(225, 189, 32)";
      }

      let logo = document.querySelector(".logo");
      logo.src =
        "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
    });
});

//---------------------------------

let closeButton = document.getElementById("closeButton");
let inputWindow = document.getElementById("inputWindow");

closeButton.addEventListener("click", () => {
  inputWindow.style.display = "none";
});

let openButton = document.getElementById("openButton");

openButton.addEventListener("click", () => {
  inputWindow.style.display = "block";
});
