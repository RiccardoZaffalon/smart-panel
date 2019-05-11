const express = require('express');
const app = express();
const port = 3000;
const Weather = require('./server/Weather');

app.use(express.static('dist'));

app.get('/forecast/', function (req, res) {
    const weather = new Weather();
    console.log('Fetching forecast...');
    
    weather.getForecast()
        .then((data) => {            
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));