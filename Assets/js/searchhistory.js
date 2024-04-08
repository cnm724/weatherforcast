 // for (const data of selectedData) {
            //     const nowWeather = $("<section>").addClass("mainCard");
            //     let cityInput = $("<p>").text(cityName);
            //     const dateH3 = $("<h3>").text(dayjs(data.dt * 1000).format("MM/DD/YYYY"));
            //     const iconImg = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
            //     const tempP = $("<p>").text("Temp: " + Math.floor(tempInFahrenheit) + " °F");
            //     const humidity = $("<p>").text("Humidity: " + data.main.humidity + "%");
            //     const windSpeed = $("<p>").text("Wind Speed: " + Math.floor(data.wind.speed) + " mph");
                
            //     $(".todaysWeather").append(nowWeather);

            //     nowWeather.append(cityInput, dateH3, iconImg, tempP, humidity, windSpeed)                
            // }


            // function displaySearchHistory() {
//     const searchHistory = localStorage.getItem("lastSearchedCity")
//     if (searchHistory) {
//         const historyList = $("<p>")
//         const historyItem = $("<li>").text(lastSearchedCity);
//             getCityWeather(searchHistory);
//     }
//     searchHistory.push(getCityWeather);
// }