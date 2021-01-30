$().ready(function () {
    var authKey = "3ad2a623d22d47f4e85f5b8ef6a5d5a6";

    var searchValue = $("#search-input");
    var searchButton = $("#search-button");
    
    $("#search-button").on("click", function (event) {
        event.preventDefault();

        searchValue = $("#search-value").val().trim();
        console.log(searchValue);

        weather(searchValue);
        forecast(searchValue)
    })

    function weather(searchValue) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + authKey + "&units=imperial";


        $.ajax({ url: queryURL, method: "GET" })
            .done(function (response) {
                console.log(queryURL);
                console.log(response);
                var widget = show(response);

                $("#today").html(widget);

                $("search-value").val("");
                // var nameCity = $(".list");
                // nameCity.appendTo("<li>" + searchValue.name + "<li>");
            })
    };
    function show(response) {
        return "<h2>Current Weather for " + response.name + ", " + " (" + new Date().toLocaleDateString() + ")" +"</h2>" +
        "<h3><strong>Weather</strong>: "+ response.weather[0].main + "</h3>" +
        "<h3><strong>Description</strong>: "+ response.weather[0].description + "</h3>" +
        "<h3><strong>Temperature</strong>: "+ response.main.temp + " °F" +"</h3>" +
        "<h3><strong>Humidity</strong>: "+ response.main.humidity + " %" +"</h3>" +
        "<h3><strong>Wind Speed</strong>: "+ response.wind.speed + "</h3>";

        }

    function forecast(searchValue) {
        var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=" + authKey + "&units=imperial";

        
        $.ajax({ url: queryURL2, method: "GET" })
            .done(function (response) {
                console.log(queryURL2);
                console.log(response);

                // $("#forecast").appendTo($("<p>").text("Temperature: " + response.main.temp_max + " °F"));
                // $("#forecast").appendTo($("<p>").text("Humidity: " + response.main.humidity + "%"));
            })
    };

    function uvIndex(searchValue) {

    }
});