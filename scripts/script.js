// elements
const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById("locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");

// default city when the page load

let cityInput = "London";

// add click event to each city in the panel
cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    // change the default city to clicked one
    cityInput = e.target.innerHtml;
    // function that fetches and displays all the data from the weather API
    fetchWeatherData();
    app.style.opacity = 0;
  });
});

// add submit event to the form
form.addEventListener("submit", (event) => {
  // prevents the default behave of the form
  event.preventDefault();
  // if the input field (search bar) is empty, throw an alert
  if (search.value.length == 0) {
    alert("please type in a city name");
  } else {
    // default to written input search bar
    cityInput = search.value;
    // fetch API function
    fetchWeatherData();
    // remove all text from the input field
    search.value = "";
    // fade out the app(simple Animation)
    app.style.opacity = "0";
  }
});

// date function
function dayOfTheWeek(day, month, year) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[new Date(`${day}/${month}/${year}`).getDay()];
}

// function that fetches and displays the data from the Weather API

function fetchWeatherData() {
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=899624bae4f749d79dc60145231201=${cityInput}`
  )
    // json format to convert js object
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // show temp and condition on the page
      temp.innerHTML = data.current.temp_c + "&#176;";
      conditionOutput.innerHTML = data.current.condition.text;

      // get date and time from the city
      const date = data.location.localtime;
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      const time = date.substr(11);

      // reformat the date into something more appealing and add it to the page
      dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)}${d},${m},${y}`;
      timeOutput.innerHTML = time;

      // add the name of the city into the page
      nameOutput.innerHTML = data.location.name;

      // get the icons

      const iconId = date.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/".length
      );

      // reformat the icon url to your own local folder
      icon.src = "./icons" + iconId;

      // add weather details to the page

      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + "km/h";
      // set default time of the day
      let timeOfDay = "day";

      // get the unique id for each weather condition
      const code = data.current.condition.code;

      // change to night if its night time in the city
      if (!data.current.is_day) {
        timeOfDay = "night";
      }
      if (code === 1000) {
        // set bg if the weather is cleared
        app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jbg)`;

        //  change btn  bg color day or night

        btn.style.background = "#e5ba92";
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      }
      // same thing for cloudy weather
      else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
      ) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
        btn.style.background = "#fa6d1b";
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      }
      // and rain
      else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252
      ) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
        btn.style.background = "#647d75";
        if (timeOfDay == "night") {
          btn.style.background = "#325c80";
        }
      }
      // snow
      else {
        app.style.backgroundImage = `url(./image/${timeOfDay}/snow.jpg)`;
        btn.style.background = "#4d72aa";
        if (timeOfDay == "night") {
          btn.style.background = "#1b1b1b";
        }
      }
      // fade in the page once all is done
      app.style.opacity = "1";
    })
    .catch(() => {
      alert("city not found please try again");
      app.style.opacity = "1";
    });
}

fetchWeatherData();

app.style.opacity = "1";
