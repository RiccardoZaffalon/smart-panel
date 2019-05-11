const axios = require('axios');
const mockData = require('./mockWeather.json');
const config = require('./config');

class Weather {
    constructor () {
        this.apiKey = config.apiKey;
        this.coordinates = '45.6073216,12.3314176';
        this.locale = 'it';
    }

    async getForecast () {
        // const result = await axios(`https://api.darksky.net/forecast/${this.apiKey}/${this.coordinates}?lang=${this.locale}&units=si`);

        // Mock API result        
        const result = await new Promise((resolve, rej) => {
            resolve({data: mockData});
        });
        
        return result.data;
    }
}

module.exports = Weather;
