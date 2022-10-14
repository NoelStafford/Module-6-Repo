$(document).ready(function () {

    var searchBtn = $('#searchBtn');
    var cityArr = JSON.parse(localStorage.getItem('cityArr')) || [];
    function buildMenu() {
      $('#appendCity').empty();
      for (var i = 0; i < cityArr.length; i++) {
        $('<button>' + cityArr[i] + '</button>').addClass('citybtn').appendTo('#appendCity');
      }
    }
    buildMenu()
  
    searchBtn.click(function (event) {
      event.preventDefault();
      if ($('#cityInput').val() === '') {
        return;
      }
  
      fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + $('#cityInput').val() + '&appid=849f1b4e3f695924e81cda9efcd975ec')
        .then(response => response.json())
        .then(data => {
          if (!cityArr.includes(data[0].name)) {
            cityArr.push(data[0].name);
            localStorage.setItem('cityArr', JSON.stringify(cityArr))
            buildMenu();
          }
          var lat = data[0].lat;
          var lon = data[0].lon;
          $('#lat').text(lat);
          $('#lon').text(lon);
          fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=849f1b4e3f695924e81cda9efcd975ec')
            .then(response => response.json())
            .then(data => {
              var date = data.dt;
              var formattedDate = moment.unix(date).format('MM/DD/YYYY');
              var cityName = data.name;
              var temp = data.main.temp
              var wind = data.wind.speed;
              var humidity = data.main.humidity;
              var icon = data.weather[0].icon;
              $('.invisible').removeClass('invisible')
              $('#cityHeader').text(cityName + ' ' + formattedDate);
              $('#temp').text(temp);
              $('#wind').text(wind);
              $('#humidity').text(humidity);
              $('#icon').attr('src', "https://openweathermap.org/img/wn/" + icon + ".png");
              fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=849f1b4e3f695924e81cda9efcd975ec')
                .then(response => response.json())
                .then(data => {
                  var forecastArr = [];
                  $('#five-day-header').removeClass('invisible');
                  for (var i = 0; i < data.list.length; i++) {
                    var targetTime = data.list[i].dt_txt.split(' ')[1];
                    if (targetTime === '12:00:00') {
                      forecastArr.push(data.list[i]);
                    }
                  }
                  for (var i = 0; i < forecastArr.length; i++) {
                    var date = forecastArr[i].dt;
                    var formattedDate = moment.unix(date).format('MM/DD/YYYY');
                    var temp = forecastArr[i].main.temp;
                    var wind = forecastArr[i].wind.speed;
                    var humidity = forecastArr[i].main.humidity;
                    var icon = forecastArr[i].weather[0].icon;
                    var cardDiv = $('<div>').addClass('col-12 col-md-2 day-containers')
                    var div2 = $('<div>').addClass('city-icon-wrappers')
                    var cityHeader = $('<h3>' + formattedDate + '</h3>');
                    var iconEl = $('<img>');
                    var spanTempEl = $('<span>Temp: ' + temp + '°F</span>');
                    var spanWindEl = $('<span>Wind: ' + wind + 'MPH</span>');
                    var spanHumidityEl = $('<span>Humidity: ' + humidity + '%</span>');
                    $('#five-day-container').append(cardDiv.append(div2.append(cityHeader.append(iconEl.attr('src', "https://openweathermap.org/img/wn/" + icon + ".png")))));
                    cardDiv.append(spanTempEl);
                    cardDiv.append(spanWindEl);
                    cardDiv.append(spanHumidityEl);
                  }
                });
            });
          $('#cityInput').val('');
          $('#cityHeader').text($(this)[0].name);
          $('.day-containers').remove()
        })
    })
    $(document).on('click', '.citybtn', function () {
      fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + $(this).text() + '&appid=849f1b4e3f695924e81cda9efcd975ec')
        .then(response => response.json())
        .then(data => {
          var lat = data[0].lat;
          var lon = data[0].lon;
          $('#lat').text(lat);
          $('#lon').text(lon);
          fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=849f1b4e3f695924e81cda9efcd975ec')
            .then(response => response.json())
            .then(data => {
              var date = data.dt;
              var formattedDate = moment.unix(date).format('MM/DD/YYYY');
              var cityName = data.name;
              var temp = data.main.temp
              var wind = data.wind.speed;
              var humidity = data.main.humidity;
              var icon = data.weather[0].icon;
              $('.invisible').removeClass('invisible')
              $('#cityHeader').text(cityName + ' ' + formattedDate);
              $('#temp').text(temp);
              $('#wind').text(wind);
              $('#humidity').text(humidity);
              $('#icon').attr('src', "https://openweathermap.org/img/wn/" + icon + ".png");
              fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=849f1b4e3f695924e81cda9efcd975ec')
                .then(response => response.json())
                .then(data => {
                  var forecastArr = [];
                  $('#five-day-header').removeClass('invisible');
                  for (var i = 0; i < data.list.length; i++) {
                    var targetTime = data.list[i].dt_txt.split(' ')[1];
                    if (targetTime === '12:00:00') {
                      forecastArr.push(data.list[i]);
                    }
                  }
                  for (var i = 0; i < forecastArr.length; i++) {
                    var date = forecastArr[i].dt;
                    var formattedDate = moment.unix(date).format('MM/DD/YYYY');
                    var temp = forecastArr[i].main.temp;
                    var wind = forecastArr[i].wind.speed;
                    var humidity = forecastArr[i].main.humidity;
                    var icon = forecastArr[i].weather[0].icon;
                    var cardDiv = $('<div>').addClass('col-12 col-md-2 day-containers')
                    var div2 = $('<div>').addClass('city-icon-wrappers')
                    var cityHeader = $('<h3>' + formattedDate + '</h3>');
                    var iconEl = $('<img>');
                    var spanTempEl = $('<span>Temp: ' + temp + '°F</span>');
                    var spanWindEl = $('<span>Wind: ' + wind + 'MPH</span>');
                    var spanHumidityEl = $('<span>Humidity: ' + humidity + '%</span>');
                    $('#five-day-container').append(cardDiv.append(div2.append(cityHeader.append(iconEl.attr('src', "https://openweathermap.org/img/wn/" + icon + ".png")))));
                    cardDiv.append(spanTempEl);
                    cardDiv.append(spanWindEl);
                    cardDiv.append(spanHumidityEl);
                  }
                });
            });
          $('#cityInput').val('');
          $('#cityHeader').text($(this)[0].name);
          $('.day-containers').remove()
        });
    })
    $('#clear-search').click(function () {
      localStorage.clear();
      location.reload();
    })
  
    $(function () {
      var highPopCities = [
        "Austin",
        "Albuquerque",
        "Atlanta",
        "Boston",
        "Baltimore",
        "Bakersfield",
        "Chicago",
        "Columbus",
        "Charlotte",
        "Dallas",
        "Denver",
        "Detroit",
        "El Paso",
        "Enterprise",
        "Eugene",
        "Fort Worth",
        "Fresno",
        "Fort Wayne",
        "Greensboro",
        "Gilbert",
        "Glendale",
        "Houston",
        "Honolulu",
        "Henderson",
        "Indianapolis",
        "Irvine",
        "Irving",
        "Jacksonville",
        "Jersey City",
        "Joliet",
        "Kansas City",
        "Knoxville",
        "Kansas City",
        "Los Angeles",
        "Los Vegas",
        "Long Beach",
        "Memphis",
        "Milwuakee",
        "Mesa",
        "New York City",
        "Nashville",
        "New Orleans",
        "Oklahoma City",
        "Omaha",
        "Oakland",
        "Pheonix",
        "Philadelphia",
        "Portland",
        "Quincy",
        "Queen Creek",
        "Quartz Hill",
        "Raleigh",
        "Riverside",
        "Reno",
        "San Antonio",
        "San Diego",
        "San Jose",
        "Tucson",
        "Tulsa",
        "Tampa",
        "Upland",
        "Union City",
        "Utica",
        "Virginia Beach",
        "Vancouver",
        "Visalia",
        "Washington",
        "Wichita",
        "Winston-Salem",
        "Xenia",
        "Yonkers",
        "Yakima",
        "Yuma",
        "Zionsville",
        "Zion",
        "Zanesville"
      ];
      $('#cityInput').autocomplete({
        source: highPopCities,
        scroll: true,
      }).focus(function () {
        $(this).autocomplete("search", "")
      });
    });
  
  });

// api key for current weather https://api.openweathermap.org/data/2.5/weather?lat=  &appid=


// api key for geo tag http://api.openweathermap.org/geo/1.0/direct?q=