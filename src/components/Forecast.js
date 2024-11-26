import './Forecast.css';
import ForecastData from './ForecastData';

function Forecast({ last5DayData }) {
  if (!last5DayData) {
    return <div>Loading forecast data...</div>;
  }

  // Extract one forecast per day (e.g., the first forecast at 12:00 PM each day)
  const dailyForecasts = last5DayData.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  return (
    <div className='forecast'>
      <h2>5 Days Forecast:</h2>
      <div className='forecast_5day_data'>
        {dailyForecasts.map((forecast, index) => {
          const date = new Date(forecast.dt * 1000);
          const day = date.toLocaleDateString(undefined, { weekday: 'long' });
          const dateStr = date.toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
          });

          const temp = (forecast.main.temp - 273.15).toFixed(1); // Convert Kelvin to Celsius
          const icon = forecast.weather[0].icon; // Icon code from API
          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

          return (
            <ForecastData
              key={index}
              icon={<img src={iconUrl} alt={forecast.weather[0].description} />}
              temprature={`${temp}°C`}
              date={`${day}, ${dateStr}`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;
