function updateLocation(response) {
  let query = document.querySelector("#location-search").value;
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.city;

  let temperature = Math.round(response.data.temperature.current);
  console.log(response.data.temperature.current);
  document.querySelector(".temp").innerHTML = `${temperature}`;

  document.querySelector("#liveDescription").innerHTML =
    response.data.condition.description;

  document.querySelector(
    "#liveHumidity"
  ).innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  document.querySelector(
    "#liveWind"
  ).innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.icon);
}

let locationButton = document.querySelector("#location-search-button");
locationButton.addEventListener("click", function () {
  let query = document.querySelector("#location-search").value;
  let key = "9ca6fftf31a653429384425b05bobb8e";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${key}&units=${units}`;
  axios.get(apiUrl).then(updateLocation);
});

function convertTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#mainTemp");
  let degreeElement = document.querySelector("#degreeLink");
  let currentTemp = parseFloat(tempElement.innerHTML);
  let currentUnit = degreeElement.textContent;
  if (currentUnit === "℃") {
    let fahrenheitTemp = (currentTemp * 9) / 5 + 32;
    tempElement.innerHTML = Math.round(fahrenheitTemp);
    degreeElement.textContent = "℉";
  } else {
    let celsiusTemp = ((currentTemp - 32) * 5) / 9;
    tempElement.innerHTML = Math.round(celsiusTemp);
    degreeElement.textContent = "℃";
  }
}
let livelocation = document.querySelector(".livelocation");
livelocation.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let key = "9ca6fftf31a653429384425b05bobb8e";
    let units = "metric";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${key}&units=${units}`;
    axios.get(apiUrl).then(updateLocation);
  });
});

let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();
let ampm = hours >= 12 ? "PM" : "AM";
hours = hours % 12 || 12;
minutes = minutes < 10 ? "0" + minutes : minutes;
let currentTime = hours + ":" + minutes + " " + ampm;
document.querySelector("#liveTime").innerHTML = currentTime;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentDay = days[date.getDay()];
document.querySelector("#liveDay").innerHTML = currentDay;
let currentDate = date.getDate();
let currentMonth = months[date.getMonth()];
document.querySelector(
  "#liveMonth"
).innerHTML = `${currentDate}, ${currentMonth}`;

let fahrenheit = document.querySelector("#fahrenheitLink");
fahrenheit.addEventListener("click", convertTemp);

let degree = document.querySelector("#degreeLink");
degree.addEventListener("click", convertTemp);
