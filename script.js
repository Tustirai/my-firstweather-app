function updateLocation(response) {
  let city = document.querySelector("#location-search").value;
  document.querySelector("h1").innerHTML = city;
  document.querySelector("h1").innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  console.log(`${temperature}°C`);
  document.querySelector(".temp").innerHTML = `${temperature}°C`;

  document.querySelector("#liveDescription").innerHTML =
    response.data.weather[0].main;

  document.querySelector(
    "#liveHumidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}`;
  document.querySelector(
    "#liveWind"
  ).innerHTML = `Wind: ${response.data.wind.speed} km/h`;
}

let locationButton = document.querySelector("#location-search-button");
locationButton.addEventListener("click", function () {
  let city = document.querySelector("#location-search").value;
  let apiKey = "311f1f45fee82242ab4086372ab360f5";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateLocation);
});

let livelocation = document.querySelector(".livelocation");
livelocation.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(function (position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "311f1f45fee82242ab4086372ab360f5";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
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
