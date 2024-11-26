import WeatherCard from './components/WeatherCard';
import DataCard from './components/DataCard';
import CountryTime from './components/CountryTime';
import Forecast from './components/Forecast';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [seaLevel, setSeaLevel] = useState(null);
  const [iconCode, setIconCode] = useState(null); 
  const [last5DayData, setLast5DayData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const apiKey = "97a624c0cdfbbae221a50bc02be22114";

  // Fetch weather data for a given latitude and longitude
  const fetchWeatherData = async (lat, lon) => {
    try {
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      // Fetch current weather
      const currentWeatherResponse = await axios.get(currentWeatherUrl);
      console.log(currentWeatherResponse.data);
      setTemperature(currentWeatherResponse.data.main.temp);
      setCityName(currentWeatherResponse.data.name);
      setHumidity(currentWeatherResponse.data.main.humidity);
      setPressure(currentWeatherResponse.data.main.pressure);
      setWindSpeed(currentWeatherResponse.data.wind.speed);
      setSeaLevel(currentWeatherResponse.data.main.sea_level);
      setIconCode(currentWeatherResponse.data.weather[0].icon); 

      // Fetch 5-day forecast
      const forecastResponse = await axios.get(forecastWeatherUrl);
      setLast5DayData(forecastResponse.data);

      setLoading(false); // Data loading complete
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoading(false);
    }
  };

  // Fetch latitude and longitude for a given city
  const fetchCityCoordinates = async (city) => {
    try {
      setLoading(true); // Start loading
      const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
      const response = await axios.get(geocodingUrl);

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        fetchWeatherData(lat, lon); 
      } else {
        console.error("City not found.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching city coordinates:", error);
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    if (searchQuery.trim() !== '') {
      fetchCityCoordinates(searchQuery); // Fetch coordinates for the entered city
    }
  };

  // Fetch weather data for user's current location on load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetchWeatherData(lat, lon); // Fetch weather data for user's location
        },
        (error) => {
          console.error("Error fetching location:", error);
          setLoading(false); // Stop loading if geolocation fails
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <h1 className='loading'>Loading....</h1>;
  }

  return (
    <div>
      <div className="App">
        <div className="search_can">
          <h1 className="disc">Discover the weather in every city you go</h1>
          <form onSubmit={handleSearchSubmit} className="search">
            <input
              type="text"
              placeholder="Search for a city"
              value={searchQuery} // Bind input value to state
              onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
            />
            <button type="submit">🔍</button>
          </form>
        </div>
        <WeatherCard temperature={temperature} cityName={cityName} iconCode={iconCode} />
      </div>
      <div className="bottom-data">
        <DataCard
          humidity={humidity}
          windSpeed={windSpeed}
          pressure={pressure}
          seaLevel={seaLevel}
        />
        <CountryTime />
        <Forecast last5DayData={last5DayData} />
      </div>
    </div>
  );
}

export default App;
