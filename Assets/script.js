$(document).ready(function () {
    // Local Storage
    if (localStorage.getItem('recentSearches') === null) {
        var recentSearches = [];
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    } else {
        var recentSearches = JSON.parse(localStorage.getItem('recentSearches'));
    }

    function displayChips(array) {

        $("#chip-container").empty()

        for (var i = 0; i < array.length; i++) {
            const element = array[i];

            var chip = $("<div>").addClass("chip").text(element)
            $("#chip-container").append(chip)
        }
    }

    function isSaved(searchValue) {
        var localSearches = JSON.parse(localStorage.getItem('recentSearches'))

        for (var i = 0; i < localSearches.length; i++) {
            if (searchValue.toLowerCase().trim() === localSearches[0][1]) {
                return true;
            }
        }
        return false;

    }
    // Openweathermap API Key
    var authKey = "3ad2a623d22d47f4e85f5b8ef6a5d5a6";

    var searchValue = $("#search-input");
    var searchButton = $("#search-button");
    var response = "";

    $("#search-button").on("click", function (event) {
        event.preventDefault();

        searchValue = $("#search-value").val().trim();
        weather(searchValue);
        forecast(searchValue);

    })
    // Today's Weather
    function weather(searchValue) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + authKey + "&units=imperial";
        $.ajax({ url: queryURL, method: "GET" })
            .done(function (response) {
                
                var widget = showWeather(response);

                $("#today").html(widget);
                $("search-value").val("");

                recentSearches.push([searchValue]);
                localStorage.setItem('recentSearches', JSON.stringify(recentSearches))
                uvIndex(response.coord.lat, response.coord.lon);
            })
        if (isSaved(searchValue) === false) {
            recentSearches.push([searchValue]);
            localStorage.setItem('recentSearches', JSON.stringify(recentSearches))
        }


        displayChips(recentSearches)
    };

    function showWeather(response) {
        return "<h2>Current Weather for " + response.name + ", " + " (" + new Date().toLocaleDateString() + ")" + "</h2>" +
            "<h3><strong>Weather</strong>: " + response.weather[0].main + "</h3>" +
            "<h3><strong>Description</strong>: " + response.weather[0].description + "</h3>" +
            "<h3><strong>Temperature</strong>: " + response.main.temp + " °F" + "</h3>" +
            "<h3><strong>Humidity</strong>: " + response.main.humidity + " %" + "</h3>" +
            "<h3><strong>Wind Speed</strong>: " + response.wind.speed + "</h3>";

    }
    // 5 Day Forecast
    function forecast(searchValue) {
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=" + authKey + "&units=imperial";
        $.ajax({ url: queryURL, method: "GET" })
            .done(function (res) {
              showForecast(res);

                $("search-value").val("");
            });
    };

    function showForecast(res) {
        $("#forecast").empty();
        var html = ''
        for (var i = 0; i < res.list.length; i++) {
            if (res.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                html+= "<div style='display:flex;align-items:center'>" +
                
                "<h5><strong>Date</strong>: " + new Date(res.list[i].dt_txt).toLocaleDateString() + "</h5>" +
                    "<img src='https://openweathermap.org/img/w/" + res.list[i].weather[0].icon + ".png' />" +
                    "<p><strong>Temp</strong>: " + res.list[i].main.temp_max + " °F" + "</p>" +
                    "<p><strong>Humidity</strong>: " + res.list[i].main.humidity + " %" + "</p>" +
                    "</div>";
                    

            }
        }
        $("#forecast").append(html);
    };
    // Today's UV Index
    function uvIndex(lat, lon) {
        var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=3ad2a623d22d47f4e85f5b8ef6a5d5a6" + "&lat=" + lat + "&lon=" + lon;

        $.ajax({ url: queryURL, method: "GET" })
            .done(function (response) {
                var widget = showUvIndex(response);
                var btn = $("<span>").addClass("btn").text(response.value);

                $("#today").html(widget);
                $("search-value").val("");
                
                var uvindex = '';

                uvindex+= "<p><strong>UV Index: </strong>" + "</p>";
                $("#today").append(uvindex);

                if (response.value < 3) {
                    btn.addClass("btn-success");
                  }
                  else if (response.value < 7) {
                    btn.addClass("btn-warning");
                  }
                  else {
                    btn.addClass("btn-danger");
                  }
                  
                  $("#today").append(btn);
            })
    };

    function showUvIndex(response) {
    }
});