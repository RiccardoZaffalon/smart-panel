import axios from 'axios';
import Chart from 'chart.js';
import moment from 'moment';

function simplify(data, amount) {
    const today = moment();

    return data.filter((el) => {
        const date = moment(el.time * 1000);
        return date.isSame(today, 'day');
    });
}

export default class Weather {
    constructor () {

    }

    async getForecast () {
        const forecast = await axios('/forecast');
        
        return forecast.data;
    }

    updateCurrentWeather (currently) {
        const svg = `<svg class="icon ${currently.icon}"><use xlink:href="#${currently.icon}"></use></svg>`
        const iconTarget = document.getElementById('current-weather-icon');
        // iconTarget.innerHTML = svg;

        const summaryTarget = document.getElementById('current-weather-summary');
        summaryTarget.textContent = `${currently.summary} (${Math.floor(currently.precipProbability * 100)}%)`;
    }

    updateTodaysWeather (today) {
        const summaryTarget = document.getElementById('hourly-weather-summary');
        const todayTemps = document.getElementById('today-temperatures');
        
        summaryTarget.textContent = today.summary;
        todayTemps.textContent = `${Math.round(today.temperatureLow)}°C — ${Math.round(today.temperatureHigh)}°C`;
    }

    updateTemperatureGraph (data) {
        const decimatedData = simplify(data, 3);
        console.log(data, decimatedData);
        const ctx = document.getElementById('temperature').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                labels: decimatedData.map((entry) => moment(entry.time * 1000).format('H a')),
                datasets: [{
                    label: '°C',
                    // data: [12, 19, 3, 5, 2, 3],
                    data: decimatedData.map((entry) => entry.temperature),
                    backgroundColor: [
                        'rgba(0, 182, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(0, 182, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    display: false
                }
            }
        });
    }
}