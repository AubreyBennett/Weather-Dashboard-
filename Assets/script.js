$().ready(function () {
    
    if (localStorage.getItem('recentSearches') === null) {
        var recentSearches = [];
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    } else {
        var recentSearches = JSON.parse(localStorage.getItem('recentSearches'));
    }
    console.log();

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
            if(searchValue.toLowerCase().trim() === localSearches[0][1] ) {
                return true;
            }
        }
        return false;
        
    }

    var authKey = "3ad2a623d22d47f4e85f5b8ef6a5d5a6";

    var searchValue = $("#search-input");
    var searchButton = $("#search-button");
    var response = "";

    $("#search-button").on("click", function (event) {
        event.preventDefault();

        searchValue = $("#search-value").val().trim();
        console.log(searchValue);
        weather(searchValue);
        forecast(searchValue);  
        uvIndex(response.city.coord.lat, response.city.coord.lon);
        
    })

    function weather(searchValue) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + authKey + "&units=imperial";
        $.ajax({ url: queryURL, method: "GET" })
            .done(function (response) {
                console.log(queryURL);
                console.log(response);
                //write a new function that will 
                var widget = showWeather(response);

                $("#today").html(widget);
                $("search-value").val("");

                recentSearches.push([searchValue]);
                localStorage.setItem('recentSearches', JSON.stringify(recentSearches))
            })
            if (isSaved(searchValue) === false ) {
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
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function forecast(searchValue) {
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=" + authKey + "&units=imperial";
        $.ajax({ url: queryURL, method: "GET" })
            .done(function (res) {
                console.log(queryURL);
                console.log(res);
                var widget = showForecast(res);

                $("#forecast").html(widget);

                $("search-value").val("");
            });
    };

    function showForecast(res) {
        console.log(res);
        for (var i = 0; i < res.list.length; i++) {
            if (res.list[i].dt_txt.indexOf("15:00:00") !== -1) {
            return "<h5><strong>Date</strong>: " + new Date(res.list[i].dt_txt).toLocaleDateString() + "</h5>" +
            // "<img>" + "src" + "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png" + "</img>" +
            "<img>" + "https://openweathermap.org/img/w/" + res.list[i].weather[0].icon + ".png" +
            "<p><strong>Temp</strong>: " + res.list[i].main.temp_max + " °F" + "</p>" +
            "<p><strong>Humidity</strong>: " + res.list[i].main.humidity + " %" + "</p>";
            }
        }
    };

    function uvIndex(lat, lon) {
        var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=3ad2a623d22d47f4e85f5b8ef6a5d5a6=" + lat + "&lon=" + lon;

        $.ajax({ url: queryURL, method: "GET" })
            .done(function (response) {
                console.log(queryURL);
                console.log(response);
                var widget = showUvIndex(response);

                var lat = response.city.coord.lat;
                var lon = response.city.coord.lon;

                $("#today").html(widget);
                $("search-value").val("");

                "<p>UV Index: " + "</p>" +
                "<span>" + response.value + "</span>";
        })
    };

    function showUvIndex(response) {
        console.log(response);
    }
});