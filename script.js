const apiKey = "4f0708b791e544279ce104358250712";

function getWeather() {
    const city = document.getElementById("locationInput").value;
    if (city === "") return alert("Enter city name");

    fetchWeather(city);
}
function fetchWeather(query) {
    fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}&aqi=yes`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("weatherResult").innerHTML = `
                <h3>${data.location.name}, ${data.location.country}</h3>
                <img src="https:${data.current.condition.icon}">
                <p>🌡 Temperature: ${data.current.temp_c} °C</p>
                <p>☁ Condition: ${data.current.condition.text}</p>
                <p>💨 Wind: ${data.current.wind_kph} km/h</p>
            `;
        })
        .catch(() => {
            document.getElementById("weatherResult").innerHTML =
                "<p>City not found ❌</p>";
        });
}
function getLocationWeather() {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeather(`${lat},${lon}`);
    });
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
function fetchWeather(query) {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=7&aqi=yes`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("weatherResult").innerHTML = `
                <h3>${data.location.name}, ${data.location.country}</h3>
                <img src="https:${data.current.condition.icon}">
                <p>🌡 ${data.current.temp_c} °C</p>
                <p>${data.current.condition.text}</p>
            `;
            let forecastHTML = "";
            data.forecast.forecastday.forEach(day => {
                forecastHTML += `
                    <div class="day">
                        <p>${day.date}</p>
                        <img src="https:${day.day.condition.icon}">
                        <p>${day.day.avgtemp_c} °C</p>
                    </div>
                `;
            });

            document.getElementById("forecast").innerHTML = forecastHTML;
        })
        .catch(() => {
            document.getElementById("weatherResult").innerHTML = "Error ❌";
        });
}
