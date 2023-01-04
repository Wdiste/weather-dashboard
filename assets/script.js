var lat = 39;
var lon = 106;

const submit = $("#city-submit");
const recentList = $(".recent-searches");
var recentSearches = [];

initArray();

submit.on("click", getWeather);

function getWeather(event) {
  event.preventDefault();
  let input = $("#input-city");

  // add recent search to list, save to local data
  recentSearches.push(input.val());

  // remove duplicate searches and save array
  localStorage.setItem(
    "recentSearches",
    JSON.stringify(cleanArray(recentSearches))
  );
  // update recent searches button list:
  initArray();

  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=54da9036a4b40ba467ebb59246c77917`, {
  method: 'GET', //GET is the default.
  credentials: 'same-origin', // include, *same-origin, omit
  redirect: 'follow', // manual, *follow, error
  })
  .then(function (response) {
      return response.json();
  })
  .then(function (data) {
      console.log(data);
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
    };
  };
};

function cleanArray(array) {
    // remove all duplicate elements
  return array.filter((item, index) => array.indexOf(item) === index);
}
