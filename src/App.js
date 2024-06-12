import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Weather from "../src/component/weather";
import './App.css';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('London');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {                                             
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=40f4e8e65e055609c3d2bddea0ea451b40f4e8e65e055609c3d2bddea0ea451b&units=metric`);
      setWeather(response.data);
    } catch (err) {
      setError('Error fetching weather data');
    }
    setLoading(false);
  }, [city]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetchWeather();
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : weather ? (
        <Weather data={weather} />
      ) : null}
    </div>
  );
};

export default App;
