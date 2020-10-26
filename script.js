$(document).ready(function(){

// variables to hold information from ajax results
 var temperature
 var humidity;
 var windSpeed;
 var uvm;
 var cityName;
 var fiveDayCityName;

 
 // get dates for 5 day forecast 

 function getDates() {
   $('#dateName').append(moment().format('L'));
   $('#date1').append(new moment().add(1, 'day').format('L'));
   $('#date2').append(new moment().add(2, 'day').format('L'));
   $('#date3').append(new moment().add(3, 'day').format('L'));
   $('#date4').append(new moment().add(4, 'day').format('L'));
   $('#date5').append(new moment().add(5, 'day').format('L'));
 }
   
function fadeIn(){
   $("#card1").fadeIn("20000");
   $("#card2").fadeIn("20000");
   $("#card3").fadeIn("20000");
   $("#card4").fadeIn("20000");
   $("#card5").fadeIn("20000");
}  
 
// }  

 // function takes in whatever is in "search" box
 // and generates button with name from "search"
    function getCity(cityName){
       console.log("made it to get city");
        $("#enterButton").on("click",function(){   
           var cityToSearch = $('#citySearch').val();           
            generateCityButton(cityToSearch);
        })
   }
 
   
// function appends new button to <h3> le
function generateCityButton(cityName)
{
   console.log("made it to generate city buttons"); 
   var newBtn = $("<h3 class='historyBtn'>" + cityName + "</h3>");
$("#cityName").append( newBtn);
}

 // function for when user clicks on one of the "generated" buttons
 // will use var "cityToSearch" to put in url for city name
 $(".historyBtn").on("click",function(){   
    var cityToSearch = $(this).text();
    getCurrentWeather();
    getFiveDay();
     
 })

 

function getCurrentWeather() { 
   
   var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&APPID=d3fd98847acde993dd3979c78e2e807f"; 
                                                                                                                                                
                                                                                                                                          
   $.ajax({                                                                              
    url: queryURL,
     method: "GET"                                                                                                                                                               
   }).then(function(response){
      console.log(response);
      var iconx = $("<img>").attr(
         "src",
         "https://openweathermap.org/img/wn/" +
          response.weather[0].icon +
         "@2x.png"
      );  
     console.log(response); 
     console.log("this is the icon " + (response.weather[0].icon));
      $("#temp").empty().append(response.main.temp);
      $("#city").empty().append(cityName);
      $("#humidity").empty().append(response.main.humidity);
      $("#windSpeed")empty().append(response.wind.speed);
      $("#pic").empty().append(iconx);           
   }) 

// get uv information

var queryURL = "http://api.openweathermap.org/data/2.5/uvi?lat="+ latNum +"&lon="+ longNum + "&appId=d3fd98847acde993dd3979c78e2e807f";$.ajax({                                                                              
   url: queryURL,
    method: "GET"                                                                                                                                                               
  }).then(function(response){
     console.log(response);
     
    
//   }) 

}
   






  //ajax call to weather website for 5 day forecast

 function getFiveDay() {   
  
 var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&cnt=6&units=imperial&APPID=d3fd98847acde993dd3979c78e2e807f"; 
$.ajax({                                                                                                                                                                                                                                                                                                                                                                                              
    url: queryURL,                                                                                                   
     method: "GET"                                                                                                              
   }).then(function(response){
  
// information for first of 5 days
      //  var icon1 = $("<img>").attr(
      //     "src",
      //     "https://openweathermap.org/img/wn/" +
      //      response.list[1].weather[0].icon +
      //     "@2x.png"
      //  );
      //  $('#pic1').append(icon1);                                                      
      //  $('#dayOneTemp').append(response.list[1].main.temp);     
      //  $('#dayOneHumidity').append(response.list[1].main.humidity);
      //  $('#dayOneWind').append(response.list[1].wind.speed);
   
      var date = $('<h5>').append(new moment().add(1, 'day').format('L'));  
      var icon = $("<img>").attr(
                "src",
                "https://openweathermap.org/img/wn/" +
                 response.list[1].weather[0].icon +
                "@2x.png");
      var temp = $("<h5>").text( "temp: " + response.list[1].main.temp);
      var humid = $("<h5>").text( "humidity: " + response.list[1].main.humidity);
      var wind =  $("<h5>").text( "wind: " + response.list[1].wind.speed);
      $('#card1').empty().append(date, icon, temp, humid, wind);
      
      
      
      
           

// information for second of 5 days

var icon1 = $("<img>").attr(
   "src",
   "https://openweathermap.org/img/wn/" +
    response.list[2].weather[0].icon +
   "@2x.png"
);      
$('#pic2').append(icon1);
$('#dayTwoTemp').append(response.list[2].main.temp);
$('#dayTwoHumidity').append(response.list[2].main.humidity);
$('#dayTwoWind').append(response.list[2].wind.speed);

// information for 3rd of 5 days
var icon1 = $("<img>").attr(
   "src",
   "https://openweathermap.org/img/wn/" +
    response.list[3].weather[0].icon +
   "@2x.png"
);      
$('#pic3').append(icon1);
$('#dayThreeTemp').append(response.list[3].main.temp);
$('#dayThreeHumidity').append(response.list[3].main.humidity);
$('#dayThreeWind').append(response.list[3].wind.speed);
     
 // information for 4th of 5 days 
 
 var icon1 = $("<img>").attr(
   "src",
   "https://openweathermap.org/img/wn/" +
    response.list[4].weather[0].icon +
   "@2x.png"
);      
$('#pic4').append(icon1);
$('#dayFourTemp').append(response.list[4].main.temp);
$('#dayFourHumidity').append(response.list[4].main.humidity);
$('#dayFourWind').append(response.list[4].wind.speed);
     
  // information for 5th of 5 days 

  var icon1 = $("<img>").attr(
   "src",
   "https://openweathermap.org/img/wn/" +
    response.list[5].weather[0].icon +
   "@2x.png"
);      
$('#pic5').append(icon1);
$('#dayFiveTemp').append(response.list[5].main.temp);
$('#dayFiveHumidity').append(response.list[5].main.humidity);
$('#dayFiveWind').append(response.list[5].wind.speed);
     
 
    }) 
}  


$("#button").on("click",function(){   
   // emptyAll();
   cityName = $.trim($("#citySearch").val());
   getCity(cityName);
   
 //  emptyAll(); 
   fadeIn();   
   getCurrentWeather();
   getDates();
   getFiveDay();        
                    
})


// end of "documentReadyFunction"
})




//ajax call to weather website for daily forecast 
//var APIKey = "35a7e2f0b4314c5cd0d045ef07645b47";

//var example =$('<div>' + 
//    '<h5> monday </h5>' + 
//    'img src=' + response.img + '/>' +
//
//  '</div>')
//  $("#city").append(example)




