import React from 'react';
import './styles.css';

const api = `1787c10e5f58f378c580c944ae4ea159`;

class Weather extends React.Component {

    state = {
        weather: ''
    };

    componentDidMount() {
        this.getLocalWeather();
    }

    async getLocalWeather() {
        let weather = await this.setLocalWeather();
        const temp = weather.main.temp;
        const place = weather.name;
        const description = weather.weather[0].description;
        const icon = weather.weather[0].icon;
        const sunrise = weather.sys.sunrise;
        const sunset = weather.sys.sunset;

        const iconUrl = `http://openweathermap.rg/img/wn/${icon}@2x.png`;
        const fahrenheit = (temp * 9) / 5 + 32;

        const sunriseGMT = new Date(sunrise * 1000);
        const sunsetGMT = new Date(sunset * 1000);
        let html = `<img src="${iconUrl}" alt="" srcset="" id="weather-icon" />
                    <div id="location">${place}</div>
                    <div class="description">${description}</div>
                    <div class="weather">
                        <div class="celcius">${temp.toFixed(2)}°</div>
                        <div class="circle"></div>
                        <div class="fahrenheit">${fahrenheit.toFixed(2)}°</div>
                    </div>
                    <div class="info">
                        <h4>Sunrise: <span class="sunrise">${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}</span></h4>
                        <h4>Sunset: <span class="sunset">${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}</span></h4>
                    </div>`;
        let weatherContainer = document.querySelector('.weather');
        weatherContainer.innerHTML = html;
    }

    async setLocalWeather() {
        let long = -116.2035;
        let lat = 43.6135;
        let base = `https://api.openweathermap.org/data/2.5/weather?lon=${long}&lat=${lat}&appid=${api}&units=metric`;
        try {
            let response = await fetch(base)
            console.log(response);
            return await response.json();
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className="weather"></div>
        );
    }
}

export default Weather;