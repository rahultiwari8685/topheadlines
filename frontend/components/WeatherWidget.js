import { useEffect, useState } from "react";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Lucknow&appid=YOUR_API_KEY&units=metric`,
        );
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="card p-3 shadow">
      <h5>🌦️ Weather</h5>
      {weather ? (
        <>
          <h3>{weather.main.temp}°C</h3>
          <p>{weather.weather[0].description}</p>
          <small>{weather.name}</small>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherWidget;
