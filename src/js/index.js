import Weather from './components/Weather';
import Clock from './components/Clock';
import Sunrise from './components/Sunrise';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Smart Panel app starting 🤙🤙🤙');

  const weather = new Weather();
  const sunrise = new Sunrise();

  // sunrise.start();

  weather.getForecast().then((res) => {
    console.log(res);
    weather.updateCurrentWeather(res.currently);
    weather.updateTodaysWeather(res.daily.data[0]);
    weather.updateTemperatureGraph(res.hourly.data);
  });
  
  const clock = new Clock('date', 'date-month', 'clock');
  clock.render();
});
