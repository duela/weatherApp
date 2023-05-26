const express = require('express');
const https = require('node:https');
const bodyParser = require('body-parser');
const app = express();
const apiKey = require(__dirname + "/secret/key.js");
const port = 3005;
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", function(req, res){
  // You can,t have more than one res.send at at time
  // res.send("Server is up and ruuning");
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
  var cityName = "London";
  const key = apiKey.getKey();
  const units = "metric";
  cityName = req.body.cityName;
  const cityNameCap = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q="
  + cityNameCap + "&units=" + units + "&appid=" + key;
  https.get(weatherUrl,function(response){
    //console.log('Status code: ' + response.statusCode);
    response.on('data', function(datas){
      //process.stdout.write(datas);
      //console.log(datas);
      const weatherData = JSON.parse(datas);
      //console.log(weatherData);

      var nameTemp = (Math.floor(weatherData.main.temp)) + "°C";
      var today = new Date();
      var dateTime = today.getHours()+":" + today.getMinutes();
      dateTime = dateTime.toLocaleString();
      var name = weatherData.name;
      var cityDescription = weatherData.weather[0].description;
      var windSpeed = weatherData.wind.speed + " km/h";
      var windHumidity = weatherData.main.humidity+ "%";
      var pressure = weatherData.main.pressure;
      pressure = (pressure/1000) + " hPa";
      var iconId = weatherData.weather[0].icon;
      var iconUrl = 'https://api.openweathermap.org/img/w/' + iconId + '.png';

// using EJS
    res.render('index', {
       dateTime: dateTime,
       nameTemp:nameTemp,
        name: name,
        cityDescription: cityDescription,
        windSpeed: windSpeed,
        windHumidity: windHumidity,
       pressure: pressure,
       iconUrl: iconUrl
    });
    });
    });
  });

app.listen(port, function(req,res){
  console.log("Connected to port " + port);
});
