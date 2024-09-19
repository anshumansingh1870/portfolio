async function fetchWeather(latitude, longitude) {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude}%2C${longitude}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd917c3ce53msh9f328bb3c6424fbp1119e5jsn1602b9d87350',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result)
        return {
            temperature: result.current.temp_c,
            windSpeed: result.current.wind_kph,
            humidity: result.current.humidity,
            region: result.location.region,
            last_updated: result.current.last_updated,
            iconLink: result.current.condition.icon
        }

    }

    catch (error) {
        console.error('Error:', error);
    }
}

// Example usage with latitude and longitude as variables
// const latitude = 28.7;
// const longitude = 77.10;
// fetchWeather(latitude, longitude);

// fetchWeather();

function getLocation() {
    latitude = document.getElementById("latitude").value
    longitude = document.getElementById("longitude").value
    return latitude, longitude
}

async function getWeather() {
    getLocation();
    const data = await fetchWeather(latitude, longitude);
    document.getElementById('location').innerText = "Location : " + data.region;
    document.getElementById('temperature').innerText = "Temperature : " + data.temperature + " Celcius";
    document.getElementById('windSpeed').innerText = "Wind Speed : " + data.windSpeed + " kmph";
    document.getElementById('humidity').innerText = "Humidity : " + data.humidity;
    document.getElementById('lastUpdated').innerText = "Last Updated : " + data.last_updated;
    document.getElementById('icon').src = data.iconLink;
}
