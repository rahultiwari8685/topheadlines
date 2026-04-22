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

  <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">

    {/* ✅ Dropdown */}
    <select
      className="form-control"
      style={{ maxWidth: "150px" }}
      value={city}
      onChange={(e) => setCity(e.target.value)}
    >
      <option value="Lucknow">Lucknow</option>
      <option value="Delhi">Delhi</option>
      <option value="Mumbai">Mumbai</option>
      <option value="Kolkata">Kolkata</option>
    </select>

    {/* ✅ Weather Info */}
    {weather && weather.main ? (
      <div className="d-flex align-items-center gap-3">

        <h4 className="mb-0">{weather.main.temp}°C</h4>

        <div>
          <p className="mb-0">{weather.weather[0].description}</p>
          <small>{weather.name}</small>
        </div>

        <div>
          <small>💧 {weather.main.humidity}%</small><br />
          <small>🌡 {weather.main.feels_like}°C</small>
        </div>

      </div>
    ) : (
      <p className="mb-0">Loading...</p>
    )}

  </div>

</div>
  );
};

export default WeatherWidget;