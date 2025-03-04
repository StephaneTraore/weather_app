const apiKey = "a8a2e2ae9aae621bced7d050ad198472";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
try {
   const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
   if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`);
   }
   const data = await response.json();
   
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp ) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed +" km/h";
    //pour changer les icons en fonctions des temps
    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "./images/cloudy.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "./images/sunny.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "./images/rainny.png";
    }
    else if (data.weather[0].main == "Drizzle"){
        weatherIcon.src = "./images/drizzle.png";
    }
    else if (data.weather[0].main == "Mist"){
        weatherIcon.src = "./images/fog.png";
    }
    //afficher le block et cacher les blocks
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

} catch (error) {
   console.error("Error fetching weather data:", error);
   // Handle the error (e.g., display an error message to the user)
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
}
}


searchBtn.addEventListener("click", () => {
const city = searchBox.value;
if (city === "" || city === undefined) {
   alert("Entrer le nom d'une ville..");
   return; // Stop further execution
}
checkWeather(city);
});