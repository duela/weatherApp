$(".btn").on("click", function(){
  var nameTemp = 11.1;
  var name = "Kaunas";
  var cityDescription = "It is windy";
  var windSpeed = 1.51;
  var windHumidity = 87;
  var pressure = 1017;
  pressure = pressure/1000;
  //var iconId = weatherData.weather[0].icon;
  var iconUrl = 'https://api.openweathermap.org/img/w/' + "10d" + '.png';
  //  var imgSrc = 'src=' + iconUrl + "''";

  $(".weather-icon").attr("src", iconUrl);
  $(".city-name").text(name);
  $(".city-time").text("15:00");
  $(".city-temperature").text(nameTemp + "°C");
  $(".city-weather-description").text(cityDescription);
  $(".city-wind-speed").text(windSpeed + "km/h");
  $(".city-wind-humidity").text(windHumidity + "%");
  $(".city-pressure").text(pressure + " hPa");
});
