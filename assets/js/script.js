var submitButton = document.getElementById('search-btn');
var currentDate = dayjs().format("M/D/YYYY");

function getWeather() {

    var city = document.getElementById('search-city');
    var cityInput = city.value.split(" ");

    //loop through each word in city name to capitalize each word
    for (let i = 0; i < cityInput.length; i++) {
        cityInput[i] = cityInput[i][0].toUpperCase() + cityInput[i].substr(1);
    }
    //join each capitalized word of city name into a single string
    var cityName = cityInput.join(" ");
    var APIkey = '05930b46c2deefb5a27a97032d34eb39';
    var queryCurrentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city.value + "&units=imperial" + "&appid=" + APIkey;
    var queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city.value + "&units=imperial" + "&appid=" + APIkey;

    //fetch current weather data from API
    fetch(queryCurrentURL,{mode: 'no-cors'})
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var icon = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
            var temp = Math.round(data.main.temp);
            var wind = data.wind.speed;
            var humid = data.main.humidity;


            document.getElementById('city').innerHTML = cityName + ' (' + currentDate + ') ' + '<img src=' + icon + '>';
            document.getElementById('temp').innerHTML = temp + '°F';
            document.getElementById('wind').innerHTML = wind + ' MPH';
            document.getElementById('humid').innerHTML = humid + '%';

        })
    //fetch 5 day weather forecast from api
    fetch(queryForecastURL,{mode: 'no-cors'})
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            for (var i = 0; i < 5; i++) {
                var dateF = dayjs(data.list[((i + 1) * 8) - 1].dt_txt).format("M/D/YYYY");
                var iconF = "http://openweathermap.org/img/wn/" + data.list[((i + 1) * 8) - 1].weather[0].icon + ".png";
                var tempF = data.list[((i + 1) * 8) - 1].main.temp;
                var windF = data.list[((i + 1) * 8) - 1].wind.speed;
                var humidF = data.list[((i + 1) * 8) - 1].main.humidity;



                if (document.getElementById('forecast' + [i]).firstChild == null) {
                    var dateElement = document.createElement('li');
                    var iconElement = document.createElement('img');
                    var tempElement = document.createElement('li');
                    var windElement = document.createElement('li');
                    var humidElement = document.createElement('li');

                    dateElement.innerHTML = dateF;
                    iconElement.src = iconF;
                    tempElement.innerHTML = 'Temp: ' + tempF + '°F';
                    windElement.innerHTML = 'Wind: ' + windF + ' MPH';
                    humidElement.innerHTML = 'Humidiy: ' + humidF + '%';

                    document.getElementById('forecast' + [i]).append(dateElement);
                    document.getElementById('forecast' + [i]).append(iconElement);
                    document.getElementById('forecast' + [i]).append(tempElement);
                    document.getElementById('forecast' + [i]).append(windElement);
                    document.getElementById('forecast' + [i]).append(humidElement);
                } else {
                    document.getElementById('forecast' + [i]).children[0].innerHTML = dateF;
                    document.getElementById('forecast' + [i]).children[1].src = iconF;
                    document.getElementById('forecast' + [i]).children[2].innerHTML = 'Temp: ' + tempF + '°F';
                    document.getElementById('forecast' + [i]).children[3].innerHTML = 'Wind: ' + windF + ' MPH';
                    document.getElementById('forecast' + [i]).children[4].innerHTML = 'Humidiy: ' + humidF + '%';
                }
            }
        })

    var recentBtn = document.createElement('button');
    recentBtn.setAttribute('id', 'recent-button-' + cityName);
    recentBtn.setAttribute('class', 'recent')
    recentBtn.innerHTML = cityName;
    //check if city name already exists in search history.  If no then create button with city name in search history.  If already exists do not create another button in search history with that same name.
    if (document.getElementById('recent-button-' + cityName) == null) {
        document.getElementById('recent-forecasts').append(recentBtn)
    } else {
        return
    }

}


//obtain weather for city in search box when search button is clicked
submitButton.addEventListener('click', getWeather)

var recent = document.getElementById('recent-forecasts');
recent.addEventListener('click', (e) => {
    if (e.target.classList.contains('recent')) {
        console.log(e.target.innerHTML);
        document.getElementById('search-city').value = e.target.innerHTML
        getWeather()
    }
})







