function DisplayOptions(json){
    var output = "";

    if(json == ""){
        document.getElementById("DisplayOptions").innerHTML = "No Applicable City. Please Re-enter the city.";
    }
    else{
        json.forEach(
            function(element){
                output += element.title + "<br>";
            }
        )
        document.getElementById("DisplayOptions").innerHTML = output;
    }

}

function forecast(json){
    for(var i = 1; i < 6; i++){
        var date = new Date();

        var thisDate = (date.getMonth() + 1) + "/" + (date.getDate() + i);

        var trim = json.consolidated_weather[i];

        var weatherstate = trim.weather_state_name;

        var currentTemp = trim.the_temp; currentTemp = currentTemp.toFixed(2);
        var minTemp = trim.min_temp; minTemp = minTemp.toFixed(2);
        var maxTemp = trim.max_temp; maxTemp = maxTemp.toFixed(2);

        var windSpeed = trim.wind_speed; windSpeed = windSpeed.toFixed(2);

        var humidity = trim.humidity;

        document.getElementById("Tempf" + i).innerHTML = currentTemp + "°C";
        document.getElementById("dateF" + i).innerHTML = thisDate;

        var out = "";

        out += "Weather State: " + weatherstate + "<br>";
        out += "minimum Temp: " + minTemp + "°C" + "<br>";
        out += "maximum Temp: " + maxTemp + "°C" + "<br>";
        out += "Wind Speed: " + windSpeed + "mph" + "<br>";
        out += "Humidity: " + humidity + "%" + "<br>";

        document.getElementById("restf" + i).innerHTML = out;
    }
}

function current(json){
    var date = new Date();

    var today = (date.getMonth() + 1) + "/" + date.getDate();

    var trim = json.consolidated_weather[0];

    var weatherstate = trim.weather_state_name;

    var currentTemp = trim.the_temp; currentTemp = currentTemp.toFixed(2);
    var minTemp = trim.min_temp; minTemp = minTemp.toFixed(2);
    var maxTemp = trim.max_temp; maxTemp = maxTemp.toFixed(2);

    var windSpeed = trim.wind_speed; windSpeed = windSpeed.toFixed(2);

    var humidity = trim.humidity;

    document.getElementById("currTemp").innerHTML = currentTemp + "°C";
    document.getElementById("currDate").innerHTML = today;

    var out = "";

    out += "Weather State: " + weatherstate + "<br>";
    out += "minimum Temp: " + minTemp + "°C" + "<br>";
    out += "maximum Temp: " + maxTemp + "°C" + "<br>";
    out += "Wind Speed: " + windSpeed + "mph" + "<br>";
    out += "Humidity: " + humidity + "%" + "<br>";

    document.getElementById("restData").innerHTML = out;

}

async function options(city){
    await fetch('/search?location=' + String(city))
        .then((response) => response.json())
        .then((json) => DisplayOptions(json));
}

async function getWeather(city){
    document.getElementById("inputboxtext").innerHTML = "";

    var jsonObj;

    await fetch('/search?location=' + String(city))
        .then((response) => response.json())
        .then((json) => jsonObj = json);

    if(jsonObj == "" || jsonObj.length > 1){
        document.getElementById("inputboxtext").innerHTML = "Please Enter A Valid City";
    }
    else{
        await fetch('/info?id=' + String(jsonObj[0].woeid))
            .then((response) => response.json())
            .then((function(json){
                document.getElementById("title").innerHTML = json.title + ", " + json.parent.title;

                current(json);
                forecast(json);
            }));
    }

}

function UpdateTime(){
    var date = new Date();
    var today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    var hour = date.getHours();
    var AMPM = "";
    if(hour >= 12){
        hour -= 12;
        AMPM += " PM";
    }
    else{
        AMPM += " AM";
    }

    var time = ":" + date.getMinutes() + ":" + date.getSeconds();

    var out = today + " " + hour + time + AMPM;

    document.getElementById("update").innerHTML = out;

}

function listen(value, event){
    var keyCode = event.keyCode;

    if(keyCode == "13"){
        UpdateTime();
        getWeather(value);
    }
    else if(value.length > 2){
        options(value);
    }
}