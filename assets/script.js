const submit = $("#city-submit");
const recentList = $(".recent-searches");
const weatherCards = $(".weather-cards")
var recentSearches = [];

initArray();

submit.on("click", getWeather);

function getWeather(event) {
  event.preventDefault();
  let input = $("#input-city");

  // add recent search to list, save to local data
  recentSearches.push(input.val());

  // remove duplicate searches and save array
  localStorage.setItem("recentSearches",JSON.stringify(cleanArray(recentSearches)));
  // update recent searches button list:
  initArray();

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${input.val()}&appid=54da9036a4b40ba467ebb59246c77917`,
    {
      method: "GET", //GET is the default.
      credentials: "same-origin", // include, *same-origin, omit
      redirect: "follow", // manual, *follow, error
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // ~~~ for date conversion.  data.dt is unix code, must be converted.
      // ~~~ add data.timezone to data.dt; multiply by 1000 for date in seconds
      let date = new Date((data.dt + data.timezone) * 1000 + 18000000);
      // having issue with getting accurate times.  need to add 5 hrs to the given time
      // from openweathermap api


      // setting up a template literal for card creation
      const weatherCardTemplate = 
      ` <li class="card" style="width:19.5%;display:inline-block;">
            <div class="card-header">${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}</div>
            <ul class="list-group list-group-flush card-list style="float:left;display:inline;"">
              <li class="list-group-item"><img id="wicon" src="${data.weather[0].icon}" alt="Weather icon"></li>
              <li class="list-group-item">Temp: ${data.main.temp}°F</li>
              <li class="list-group-item">Wind: ${data.wind.speed}MPH</li>
              <li class="list-group-item">Humidity: ${data.main.humidity}%</li>
            </ul>
        </li>`;
      
      weatherCards.empty();
      for(i = 0; i < 5; i++) {
        weatherCards.append(weatherCardTemplate);
      }

      console.log(data);
      console.log("Name: " + data.name); // city name,
      console.log(`Date: ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} : ${date.getHours()}`); // date
      console.log("Icon: " + data.weather[0].icon); // weather icon
      console.log("Temp: " + data.main.temp); // temp
      console.log("Wind: " + data.wind.speed); // wind
      console.log(`Humidity: ${data.main.humidity}`); // humidity
      console.log("timezone = " + data.timezone); // same for next 5 days

      console.log(weatherCardTemplate);
    });
}

function initArray() {
  // initialize saved searches array
  if (localStorage.getItem("recentSearches") == null) {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  } else {
    // if data exists, pull it from saveds
    recentSearches = JSON.parse(localStorage.getItem("recentSearches"));

    // clean up list to prevent duplicates
    recentList.empty();
    for (i = 0; i < recentSearches.length; i++) {
      recentList.append(
        $("<li>").append(
          $(
            `<button type="button" class="btn btn-secondary mb-2 form-control">${recentSearches[i]}</button>`
          ).click(getWeather)
        )
      );
    }
  }
}

function cleanArray(array) {
  // remove all duplicate elements
  return array.filter((item, index) => array.indexOf(item) === index);
}
