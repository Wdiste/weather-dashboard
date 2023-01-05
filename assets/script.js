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
    `https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=${input.val()}&appid=54da9036a4b40ba467ebb59246c77917`,
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
      // clean up weather card area and fill with new cards via template literal
      weatherCards.empty();
      for(i = 0; i < 40; i+=8) {
        weatherCards.append(
        ` <li class="card m-2 bg-dark text-light" style="width:17%;display:inline-block;height:325px;">
            <div class="card-header ">${data.list[i].dt_txt.split(' ')[0]}</div>
            <ul class="list-group list-group-flush card-list" style="display:inline;"">
              <li class="list-group-item bg-dark text-light"><img id="wicon" src="https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png" alt="Weather icon"></li>
              <li class="list-group-item bg-dark text-light">${data.list[i].weather[0].description}</li>
              <li class="list-group-item bg-dark text-light">Temp: ${data.list[i].main.temp}°F</li>
              <li class="list-group-item bg-dark text-light">Wind: ${data.list[i].wind.speed}MPH</li>
              <li class="list-group-item bg-dark text-light">Humidity: ${data.list[i].main.humidity}%</li>
            </ul>
          </li>`);
      };

      console.log(data);
      console.log("Name: " + input.val()); // city name,
      console.log("date: " + data.list[0].dt_txt); // date
      console.log("Icon: " + data.list[0].weather[0].icon); // weather icon
      console.log("Temp: " + data.list[0].main.temp); // temp
      console.log("Wind: " + data.list[0].wind.speed); // wind
      console.log(`Humidity: ${data.list[0].main.humidity}`); // humidity
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
