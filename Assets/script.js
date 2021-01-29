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
                var nameCity = $(".list");
                nameCity.appendTo("<li>" + searchValue.name + "<li>");


            // $(`
            // <h3>${data.name}</h3>
            // <p>Wind Speed: ${data.wind.speed}</p>
            // <p>Humidity: ${data.main.humidity}<p>
            // <p>Temperature: ${data.main.temp}<p>
            // <img> ${data.weather[0].icon}<img>
            // `).appendTo('#today');
            })
    };

    function forecast(searchValue) {
        var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=" + authKey + "&units=imperial";

        
        $.ajax({ url: queryURL2, method: "GET" })
            .done(function (response) {
                console.log(queryURL2);
                console.log(response);

                $("#forecast").appendTo($("<p>").text("Temperature: " + main.temp_max + " °F"));
                $("#forecast").appendTo($("<p>").text("Humidity: " + main.humidity + "%"));
            })
    };
});