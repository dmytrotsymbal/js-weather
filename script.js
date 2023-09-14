const input = document.querySelector("#cityInput");
const searchButton = document.querySelector("#searchButton");

const popupBackground = document.querySelector("#popupBackground");

searchButton.addEventListener("click", () => {
  let cityName = input.value;

  if (cityName.length === 0) {
    popupBackground.style.display = "block";

    const popupClose = document.querySelector("#popupClose");
    popupClose.addEventListener("click", () => {
      popupBackground.style.display = "none";
    });
  } else {
    inputWindow.style.transform = "translateX(-500px)";
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=5d066958a60d315387d9492393935c19`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        //----------------------------------------------------------------------

        let town = document.querySelector(".town");
        town.innerHTML = data.name + ", ";
        let country = document.querySelector(".country");
        country.innerHTML = data.sys.country;

        let logo = document.querySelector(".logo");
        logo.src =
          "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";

        //------------------------------------------------------------------------------------------------
        const timezoneSeconds = data.timezone; // Смещение в секундах

        // Преобразовать смещение времени из секунд в минуты
        const timezoneMinutes = timezoneSeconds / 60;

        // Создайте объект JavaScript Date для текущего UTC времени
        const currentUTC = new Date();

        // Примените смещение временной зоны в минутах, чтобы получить местное время
        const localTime = new Date(
          currentUTC.getTime() + timezoneMinutes * 60000
        );

        // Отнять 3 часа в миллисекундах
        const modifiedLocalTime = new Date(localTime.getTime() - 10800000);

        // Отобразите измененное время на веб-странице
        const modifiedLocalTimeElement =
          document.querySelector(".modifiedLocalTime");

        // Форматирование времени в формат HH:mm
        const hours = modifiedLocalTime.getHours();
        const minutes = modifiedLocalTime.getMinutes();

        const formattedTime = `Local time : <b>${hours} : ${minutes}</b>`;

        modifiedLocalTimeElement.innerHTML = formattedTime;

        const getBackgroundColor = () => {
          const hours = modifiedLocalTime.getHours();

          let backgroundImage;

          if (hours >= 6 && hours < 12) {
            // Утро
            backgroundImage = "url('/img/morning.jpg')";
          } else if (hours >= 12 && hours < 18) {
            // День
            backgroundImage = "url('/img/day.jpg')";
          } else if (hours >= 18 && hours < 22) {
            // Вечер
            backgroundImage = "url('/img/evening.jpg')";
          } else {
            // Ночь
            backgroundImage = "url('/img/night.jpg')";
          }

          return backgroundImage;
        };

        // Установите цвет фона при загрузке страницы
        const globalBackground = document.querySelector(".globalBackground");
        globalBackground.style.backgroundImage = getBackgroundColor();

        //------------------------------------------------------------------------------------------------

        let mainTemp = document.querySelector(".mainTemp");
        mainTemp.innerHTML = data.main.temp + " °";

        let description = document.querySelector(".description");
        description.innerHTML = data.weather[0].main;

        let upper = document.querySelector(".upper");
        if (
          description.innerHTML === "Clear" ||
          description.innerHTML === "scattered clouds" ||
          description.innerHTML === "Snow"
        ) {
          upper.style.backgroundImage = "url(./img/figure2.svg)";
        } else {
          upper.style.backgroundImage = "url(./img/figure1.svg)";
        }

        //----------------------------------------------------------------------

        let temp_min = document.querySelector(".temp_min");
        temp_min.innerHTML =
          `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-thermometer-snow" viewBox="0 0 16 16">
          <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V9.5a.5.5 0 0 1 1 0v1.585A1.5 1.5 0 0 1 5 12.5z"/>
          <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1zm5 1a.5.5 0 0 1 .5.5v1.293l.646-.647a.5.5 0 0 1 .708.708L9 5.207v1.927l1.669-.963.495-1.85a.5.5 0 1 1 .966.26l-.237.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.884.237a.5.5 0 1 1-.26.966l-1.848-.495L9.5 8l1.669.963 1.849-.495a.5.5 0 1 1 .258.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.237.883a.5.5 0 1 1-.966.258L10.67 9.83 9 8.866v1.927l1.354 1.353a.5.5 0 0 1-.708.708L9 12.207V13.5a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5z"/>
        </svg> Min temp: ` +
          data.main.temp_min +
          ` °`;

        let feelsLike = document.querySelector(".feelsLike");
        feelsLike.innerHTML =
          `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-water" viewBox="0 0 16 16">
        <path d="M.036 3.314a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 3.964a.5.5 0 0 1-.278-.65zm0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 6.964a.5.5 0 0 1-.278-.65zm0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 9.964a.5.5 0 0 1-.278-.65zm0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.757-.703a.5.5 0 0 1-.278-.65z"/>
      </svg> Feels like ` +
          data.main.feels_like +
          ` °`;

        let humidity = document.querySelector(".humidity");
        humidity.innerHTML =
          `<img class="iconImg" src="./img/icons/humidity.png" alt="Image humidity"> Humidity: ` +
          data.main.humidity +
          ` %`;

        let temp_max = document.querySelector(".temp_max");
        temp_max.innerHTML =
          `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-thermometer-sun" viewBox="0 0 16 16">
        <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585A1.5 1.5 0 0 1 5 12.5z"/>
        <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1zm5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zm4.243 1.757a.5.5 0 0 1 0 .707l-.707.708a.5.5 0 1 1-.708-.708l.708-.707a.5.5 0 0 1 .707 0zM8 5.5a.5.5 0 0 1 .5-.5 3 3 0 1 1 0 6 .5.5 0 0 1 0-1 2 2 0 0 0 0-4 .5.5 0 0 1-.5-.5zM12.5 8a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5zm-1.172 2.828a.5.5 0 0 1 .708 0l.707.708a.5.5 0 0 1-.707.707l-.708-.707a.5.5 0 0 1 0-.708zM8.5 12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5z"/>
      </svg> Max temp: ` +
          data.main.temp_max +
          ` °`;

        let wind = document.querySelector(".wind");
        wind.innerHTML =
          `<img class="iconImg" src="./img/icons/wind.png" alt="Image wind"> Wind speed:` +
          data.wind.speed +
          ` m/s`;

        let pressure = document.querySelector(".pressure");
        pressure.innerHTML =
          `<img class="iconImg" src="./img/icons/gauge.png" alt="Image pressure"> Pressure: ` +
          data.main.pressure +
          ` hPa`;

        let globalWindow = document.querySelector(".globalWindow");
        let temperature = data.main.temp;

        switch (true) {
          case temperature <= 10:
            globalWindow.style.backgroundColor = "rgb(189, 176, 212)";
            break;
          case temperature <= 0:
            globalWindow.style.backgroundColor = "rgb(36, 98, 114)";
            break;
          case temperature <= 20:
            globalWindow.style.backgroundColor = "rgb(7, 186, 186)";
            break;
          case temperature <= 30:
            globalWindow.style.backgroundColor = "aqua";
            break;
          default:
            globalWindow.style.backgroundColor = "rgb(225, 189, 32)";
            break;
        }
      });
  }
});

//-----------------------------------------------------------------------------------------------------------

let closeButton = document.getElementById("closeButton");
let inputWindow = document.getElementById("inputWindow");

closeButton.addEventListener("click", () => {
  inputWindow.style.transform = "translateX(-500px)";
});

let openButton = document.getElementById("openButton");

openButton.addEventListener("click", () => {
  inputWindow.style.transform = "translateX(0px)";
});

//-----------------------------------------------------------------------------------------------------------
