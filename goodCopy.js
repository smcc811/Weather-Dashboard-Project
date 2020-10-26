$(document).ready(function(){

       
    //  variables to hold information from ajax results
       var temperature
       var humidity;
       var windSpeed;
       var uvm;
       var cityName;
       var fiveDayCityName;
       var savedCities = [];
       var returnArray = [];
      
       
      function fadeIn(){
         $("#card1").fadeIn("20000");
         $("#card2").fadeIn("20000");
         $("#card3").fadeIn("20000");
         $("#card4").fadeIn("20000");
         $("#card5").fadeIn("20000");
      }  
       
      
      
    //   function takes in whatever is in "search" box
     //  and generates button with name from "search"
         function getCity(cityName){
              $("#Button").on("click",function(){  
                 var cityToSearch = $('#citySearch').val();                       
                  generateCityButton(cityToSearch);
              })
         }
       
         
      // function appends new button to <h3> le
      function generateCityButton(cityToSearch)
      {
         
         var newBtn = $("<button class='historyBtn btn btn-primary'>" + cityToSearch + "</button>");
         saveCitySearch(cityToSearch); 
         storeButton(newBtn); 
         $("#cityName").append( newBtn);                                                                  
      
      }
                                                                                                                
    //   function for when user clicks on one of the "generated" buttons
    //   will use var "cityToSearch" to put in url for city name
       $("#cityName").on("click",".historyBtn", function(){ 
          
         cityName = $(this).text()
          getCurrentWeather();
          getFiveDay();
           
       })
   
      // below function saves additional cities that are entered 
      // if local storage empty we add citytosearch to array
      // and store, if array exists we, parse , add new city to element
      // and then set item in local storage
   
        function saveCitySearch(cityToSearch) {
      
          if(localStorage.length === 0){
            localStorage.setItem('savedCities', cityToSearch);
            }else{
            console.log("storage not empty");  
            var existing = localStorage.getItem('savedCities');
            existing = existing ? existing.split(',') : [];
            existing.push(cityToSearch);     
            localStorage.setItem('savedCities', existing.toString());
            var existing = localStorage.getItem("savedCities");
            console.log("existing is " + existing); 
          }         
       }
   
   
   // function pulls back data from local storage and stores in result
   // loop assigns results(name of stored city)
   
       function reload () {                                                                                                                                                      
          console.log("made it to reload");
          if(localStorage.length !== null) {         
            var returnArray = localStorage.getItem("savedCities"); 
            var answer = returnArray.split(",");         
            console.log("retrieve is " + answer);
            console.log("first value in array is " + answer[0]);
            //console.log("results are " + retrievedData);                                                                                                               
            for(i=0; i < answer.length; i++) {
               var newBtn = $("<button class='historyBtn btn btn-primary'>" + answer[i] + "</button>");               
               storeButton(newBtn); 
               $("#cityName").append( newBtn);                                                                                                              
            }  
 //           localStorage.clear();                   
          }
      }
   
   
      
      // function below stores button name 
       function storeButton(newBtn){
          localStorage.setItem    
       }
       
      
      function getCurrentWeather() { 
         $('#date').empty().append(moment().format('L'));
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
           console.log("this is the icon " + (response.weather[0].icon));
            $("#tempAnswer").empty().append(response.main.temp);
            $("#cityInput").empty().append(cityName);
            $("#humidAnswer").empty().append(response.main.humidity);
            $("#windAnswer").empty().append(response.wind.speed);
            $("#pic").empty().append(iconx);  
     
      })
   }
   
      
      
      
      
      
        //ajax call to weather website for 5 day forecast
      
       function getFiveDay() {   
        
       var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&cnt=6&units=imperial&APPID=d3fd98847acde993dd3979c78e2e807f"; 
      $.ajax({                                                                                                                                                                                                                                                                                                                                                                                              
          url: queryURL,                                                                                                   
           method: "GET"                                                                                                              
         }).then(function(response){
        
     // information for first of 5 days
         
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
            
            
            
            
                 
      
      // // information for second of 5 days
      
      var date = $('<h5>').append(new moment().add(2, 'day').format('L'));  
      var icon = $("<img>").attr(
                "src",
                "https://openweathermap.org/img/wn/" +
                 response.list[2].weather[0].icon +
                "@2x.png");
      var temp = $("<h5>").text( "temp: " + response.list[2].main.temp);
      var humid = $("<h5>").text( "humidity: " + response.list[2].main.humidity);
      var wind =  $("<h5>").text( "wind: " + response.list[2].wind.speed);
      $('#card2').empty().append(date, icon, temp, humid, wind);
      
   
   
   
   
      
      // // information for 3rd of 5 days
      
      var date = $('<h5>').append(new moment().add(3, 'day').format('L'));  
      var icon = $("<img>").attr(
                "src",
                "https://openweathermap.org/img/wn/" +
                 response.list[3].weather[0].icon +
                "@2x.png");
      var temp = $("<h5>").text( "temp: " + response.list[3].main.temp);
      var humid = $("<h5>").text( "humidity: " + response.list[3].main.humidity);
      var wind =  $("<h5>").text( "wind: " + response.list[3].wind.speed);
      $('#card3').empty().append(date, icon, temp, humid, wind);
      
        // information for 4th of 5 days 
       
   
      
      var date = $('<h5>').append(new moment().add(4, 'day').format('L'));  
      var icon = $("<img>").attr(
                "src",
                "https://openweathermap.org/img/wn/" +
                 response.list[4].weather[0].icon +
                "@2x.png");
      var temp = $("<h5>").text( "temp: " + response.list[4].main.temp);
      var humid = $("<h5>").text( "humidity: " + response.list[4].main.humidity);
      var wind =  $("<h5>").text( "wind: " + response.list[4].wind.speed);
      $('#card4').empty().append(date, icon, temp, humid, wind);
      
   
   
   
           
      //   // information for 5th of 5 days 
         
           
      var date = $('<h5>').append(new moment().add(5, 'day').format('L'));  
      var icon = $("<img>").attr(
                "src",
                "https://openweathermap.org/img/wn/" +
                 response.list[5].weather[0].icon +
                "@2x.png");
      var temp = $("<h5>").text( "temp: " + response.list[5].main.temp);
      var humid = $("<h5>").text( "humidity: " + response.list[5].main.humidity);
      var wind =  $("<h5>").text( "wind: " + response.list[5].wind.speed);
      $('#card5').empty().append(date, icon, temp, humid, wind);
      
         }) 
       }  
      
   
   
   
       reload();
      $("#button").on("click",function(){ 
         reload();           
         cityName = $.trim($("#citySearch").val());     
         getCity(cityName);
         generateCityButton(cityName);
         fadeIn();                                                                                                                                         
         getCurrentWeather();
         getFiveDay();        
                          
      })
      
      $("#Button").on("click",function(){  
         console.log ("made it to git city");
         var cityToSearch = $('#citySearch').val();           
          generateCityButton(cityToSearch);
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
      
      
      
    
   