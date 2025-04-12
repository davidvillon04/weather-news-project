import React from "react";

const CurrentWeather = ({ current }) => {
   if (!current) return null;
   return (
      <div>
         <h2>Current Weather</h2>
         <p>Temperature: {current.main.temp} °F</p>
         <p>Humidity: {current.main.humidity}%</p>
         <p>Conditions: {current.weather && current.weather[0].description}</p>
      </div>
   );
};

export default CurrentWeather;
