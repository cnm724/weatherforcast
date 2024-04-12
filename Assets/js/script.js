// Use the 5 Day Weather Forecast to retrieve weather data for cities. The base URL should look like the following: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}. After registering for a new API key, you may need to wait up to 2 hours for that API key to activate.

// Hint: Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?

// You will use localStorage to store any persistent data. For more information on how to work with the OpenWeather API, refer to the Full-Stack Blog on how to use API keys.

// api key: 5cb6e5ef5af190edfbdbd8d3d23a9b63

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// const cityName = getCityWeather(userInput);
const apiKey = "5cb6e5ef5af190edfbdbd8d3d23a9b63"
const searchButton = document.getElementById("searchBtn");
const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

function getCityWeather() {
    const userInput = document.getElementById("cityName").value;

    if (!userInput) {
        alert("Please Enter a City Name");
        return;
    }

    localStorage.setItem("userInput", userInput);
    console.log(userInput);
    getCoordinates(userInput);
    searchHistory.push(userInput);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}
displaySearchHistory();

searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    getCityWeather();
    $('.cardContainer').empty();
})

function displaySearchHistory() {
        const searchHistoryContainer = document.querySelector(".searchHistoryContainer");
      
        //searches to see if there is a city inputted and will create it as a button
        if (searchHistory.length > 0) {
          searchHistory.forEach((city) => {
            const searchButton = document.createElement("button");
            searchButton.textContent = `${city}`;
            searchButton.classList.add("searchHistoryButton");
      
            //event listener to re-trigger search
            searchButton.addEventListener("click", function(event) {
                event.preventDefault();
                event.stopPropagation();
                getCityWeather(city); // Pass city name to search function
            });
      
            searchHistoryContainer.appendChild(searchButton);
          });
        } else {
          return;
        }
     }


// converts array data temp to Fahrenheit
function kelvinToFahrenheit(kelvin) {
    return (kelvin - 273.15) * 9 / 5 + 32;
}

const requestOptions = {
    method: "GET",
    redirect: "follow"
};

function getForcast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);

            // filter method that will only pick a specified index of dt_txt
            const selectedData = result.list.filter((data) => {
                return data.dt_txt.includes("00:00:00")
            })

            console.log(selectedData);

            // creates card elements
            for (data of selectedData) {
                const tempInKelvin = data.main.temp;
                const tempInFahrenheit = kelvinToFahrenheit(tempInKelvin);

                const articleCard = $("<article>").addClass("card");
                const dateH3 = $("<h3>").text(dayjs(data.dt * 1000).add(1, "day").format("MM/DD/YYYY"));
                const iconImg = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
                const tempP = $("<p>").text("Temp: " + Math.floor(tempInFahrenheit) + " °F");
                const humidity = $("<p>").text("Humidity: " + data.main.humidity + "%");
                const windSpeed = $("<p>").text("Wind Speed: " + Math.floor(data.wind.speed) + " mph");

                articleCard.append(dateH3, iconImg, tempP, humidity, windSpeed);

                $(".cardContainer").append(articleCard);
            }
        })
        .catch((error) => console.error(error));
}

function getCoordinates(city = cityName) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
            const lat = result[0].lat;
            const lon = result[0].lon;

            console.log(lat)
            console.log(lon)

            getForcast(lat, lon)


        })
        .catch((error) => console.error(error));
}
