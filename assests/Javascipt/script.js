// five day forecase api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// current weather https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
const apiKey = '849f1b4e3f695924e81cda9efcd975ec';

var lat;
var lon;



const search = document.getElementById("city-search")
const searchbtn = document.getElementById("search-button")
searchbtn.addEventListener("click", searchWeather)

function searchWeather() {
    var city = search.value
var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=imperial&appid=" + apiKey;
fetch (currentWeather)
.then(function (response){
    return response.json()
})
.then (function (response){
    console.log(response)
    document.getElementById("temp0").textContent = "Temp: " + response.main.temp + "*F"
    document.getElementById("wind0").textContent = "Wind: " + response.wind








get5day(city)
})
}

function get5day(city) {   
var currentWeather = " https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&units=imperial&appid=" + apiKey;
fetch (currentWeather)
.then(function (response){
    return response.json()
})
.then (function (response){
    console.log(response)
    document.getElementById("temp1").textContent = "Temp: " + response.list[0].main.temp + "*F"
    document.getElementById("date1").textContent = "Date: " + response.list[0].dt_text
    document.getElementById("wind1").textContent = "Wind: " + response.list[0].wind



    document.getElementById("temp2").textContent = "Temp: " + response.list[8].main.temp
     + "*F"
    document.getElementById("temp2").textContent = "Temp: " + response.list[16].main.temp
     + "*F"
    document.getElementById("temp2").textContent = "Temp: " + response.list[24].main.temp 
    + "*F"
    document.getElementById("temp2").textContent = "Temp: " + response.list[32].main.temp + "*F"










})
}