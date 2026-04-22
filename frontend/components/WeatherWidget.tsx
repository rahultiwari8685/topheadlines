"use client";
import { useEffect, useState } from "react";

type WeatherType = {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherType | null>(null);
  const [city, setCity] = useState("Lucknow");

  const API_KEY = "84730e0f28031f5618c6cbc3fe5645f3";

  const fetchWeather = async (selectedCity: string) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  return (
    <div className="card p-3 shadow">
      <h5>🌦️ Weather</h5>

      <select
        className="form-control mb-3"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      >
        <option value="Lucknow">Lucknow</option>
        <option value="Delhi">Delhi</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Kolkata">Kolkata</option>
      </select>

      {weather && weather.main ? (
        <>
          <h3>{weather.main.temp}°C</h3>
          <p>{weather.weather[0].description}</p>
          <small>
            {weather.name}, {weather.sys.country}
          </small>

          <div className="mt-2">
            <small>Humidity: {weather.main.humidity}%</small><br />
            <small>Feels Like: {weather.main.feels_like}°C</small>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherWidget;