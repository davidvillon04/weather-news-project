import React from "react";

const CurrentWeather = ({ current }) => {
   if (!current) return null;

   const iconCode = current.weather?.[0]?.icon;
   const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : "";

   return (
      <div>
         <h2>Current Weather</h2>
         {iconUrl && <img src={iconUrl} alt={current.weather[0].description} />}
         <p>Temperature: {current.main.temp} °F</p>
         <p>Humidity: {current.main.humidity}%</p>
         <p>Conditions: {current.weather && current.weather[0].description}</p>
      </div>
   );
};

export default CurrentWeather;
