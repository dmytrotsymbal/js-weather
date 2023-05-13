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
      mainTemp.innerHTML = data.main.temp + " °C";

      let feelsLike = document.querySelector(".feelsLike");
      feelsLike.innerHTML = "Feels like " + data.main.feels_like + " °C";

      let humidity = document.querySelector(".humidity");
      humidity.innerHTML = data.main.humidity + " %";

      let town = document.querySelector(".town");
      town.innerHTML = data.name + ", ";
      let country = document.querySelector(".country");
      country.innerHTML = data.sys.country;

      let wind = document.querySelector(".wind");
      wind.innerHTML = data.wind.speed + " m/s";

      let pressure = document.querySelector(".pressure");
      pressure.innerHTML = data.main.pressure + " hPa";

      let description = document.querySelector(".description");
      description.innerHTML = data.weather[0].main;

      let logo = document.querySelector(".logo");
      logo.src =
        "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
    });
});
