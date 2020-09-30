$(document).ready(function() {


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

var history = $("<li>").addClass("list-group-item list-group-item-action").text(cities[i]);
$(".history").append(history);

}

}

function getWeather(input){

  





  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=d131873e86b9f2f9dc12a80c1198f4a1",
    method: "GET"
  }).then(function(response){

    
    console.log(response);




  });

}






});

    
