import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = `${process.env.REACT_APP_WEATHER_API_KEY}`;

const Weather = ({ location }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.apixu.com/v1/current.json?key=${API_KEY}&q=${location}`)
      .then(response => setWeather(response.data));
  }, [location]);

  if (!weather) {
    return <div />;
  }

  return (
    <div>
      <h3>Weather in {weather.location.name}</h3>
      <b>Temperature: </b> {weather.current.temp_c} <span>&#8451;</span>
      <div>
        <img
          src={`https:${weather.current.condition.icon}`}
          alt="Weather icon"
        />
      </div>
      <div>
        <b>Wind: </b> {weather.current.wind_kph} kph, direction{" "}
        {weather.current.wind_dir}
      </div>
      <br />
      Powered by{" "}
      <a href="https://www.apixu.com/" title="Free Weather API">
        Apixu.com
      </a>
    </div>
  );
};

export default Weather;
