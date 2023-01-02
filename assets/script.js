var lat = 39;
var lon = 106;

const submit = $("#city-submit");
const recentList = $("#recent-searches");
var recentSearches = [];

submit.on("click", getWeather);

function getWeather(event) {
  event.preventDefault();

  // initialize saved searches array
  if (localStorage.getItem("recentSearches") == null) {
    console.log("returned null");
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  } else {
    recentSearches = JSON.parse(localStorage.getItem("recentSearches"));
  }


  console.log('recent searches = ' + recentSearches);

  let input = $("#input-city");
  // add recent search to list, save to local data
  console.log(input.val());
  recentSearches.push(input.val());
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));

  // fetch(`https://api.openweathermap.org/data/2.5/forecast?lat={${lat}}&lon={${lon}}&appid={0bab6c4bf9594e7a0fa86f4f8b8f741f}`, {
  // method: 'GET', //GET is the default.
  // credentials: 'same-origin', // include, *same-origin, omit
  // redirect: 'follow', // manual, *follow, error
  // })
  // .then(function (response) {
  //     return response.json();
  // })
  // .then(function (data) {
  //     console.log(data);
  // });
}
