$(document).ready(function() {

var date = document.getElementById("currentDate");  
date.textContent = moment().format('MMMM Do YYYY');
var  cities = [] 



$("#search-button").on("click", function(event){

event.preventDefault();

var input = $("#search-value").val().trim();

cities.push(input);
createbutton();
getWeather(input);
});

function createbutton(){

$(".history").empty();

for (var i = 0; i < cities.length; i++) {

var history = $("<button>").addClass("btn btn-outline-secondary").text(cities[i]).attr("style", "border-radius: 0;");
$(".history").append(history);

}

$(".history").on("click", "button", function() {
  getWeather($(this).text());
});

}

function getWeather(input){

  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=d131873e86b9f2f9dc12a80c1198f4a1&units=imperial",
    method: "GET"
  }).then(function(response){


    $("#today").empty();

    var card = $("<div>").addClass("card bg-dark text-white");
    $("#today").append(card);
    var cardBody = $("<div>").addClass("card-body");
    card.append(cardBody);
    var title = $("<h3>").addClass("card-title").text(response.name);
    cardBody.append(title);
    var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
    cardBody.append(icon);
    var temp = $("<p>").addClass("card-text temp").text(response.main.temp + " °F");
    cardBody.append(temp);
    var row = $("<div>").addClass("row");
    var leftCol = $("<div>").addClass("col-8 col-sm-6");
    var rightCol = $("<div>").addClass("col-4 col-sm-6");
    cardBody.append(row);
    row.append(leftCol);
    row.append(rightCol);
    var wind = $("<p>").addClass("card-text").text("WS: " + response.wind.speed + " MPH").attr("align", "right");
    leftCol.append(wind);
    var humid = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + "%").attr("align", "left");
    rightCol.append(humid);
    

    var latitude = response.coord.lat
    var longitude = response.coord.lon

    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=d131873e86b9f2f9dc12a80c1198f4a1&units=imperial",
      success: function(week) {


        console.log(week);
        // overwrite any existing content with title and empty row
        $("#forecast").html("<h4 class=\"mt-3\" style=\"text-align:center;\">Weekly Forcast</h4>").append("<div class=\"row d-flex justify-content-center text-center\">");
        
        // loop over all forecasts (by 3-hour increments)
        for (var i = 0; i < 6; i++) {
          // only look at forecasts around 3:00pm
          var newdate = moment().add(i, 'days');
          var day = newdate.format('dddd');

          if (week.daily[i] !== -1) {
            var column = $("<div>").addClass("col-md-3  d-flex justify-content-center text-center");
            var article = $("<div>").addClass("card bg-primary text-white").attr("style", "width: 300px !important;margin: 10px;");
            var body = $("<div>").addClass("card-body p-2");

            var weekDate= $("<h5>").addClass("forcast-title").text(day);
  
            var image = $("<img>").attr("src", "http://openweathermap.org/img/w/" + week.daily[i].weather[0].icon + ".png");
  
            var forcasttemp = $("<p>").addClass("forcast-temp").text(week.daily[i].temp.max + " °F");
            var forcasthumidity = $("<p>").addClass("forcast-humidity").text("Humidity: " + week.daily[i].humidity + "%");
  
            // merge together and put on page
            column.append(article.append(body.append(weekDate, image, forcasttemp, forcasthumidity)));
            $("#forecast .row").append(article);
          }
        }
      }
    });
  });

}








});

    
