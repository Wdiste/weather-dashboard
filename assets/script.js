
var lat;
var lon;

fetch(`https://api.openweathermap.org/data/2.5/forecast?lat={${lat}}&lon={${lon}}&appid={6fca4038d3631546ec81e4466072f2da}`, {
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