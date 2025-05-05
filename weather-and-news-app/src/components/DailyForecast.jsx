// src/components/DailyForecast.jsx
import React from "react";
import "../styles.css";

const DailyForecast = ({ daily }) => {
   if (!daily) return null;

   return (
      <div>
         <h2>7-Day Forecast</h2>
         <div className="daily-container">
            {daily.list.map((day, index) => {
               const iconCode = day.weather?.[0]?.icon;
               const iconUrl = iconCode
                  ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
                  : "";

               return (
                  <div key={index} className="daily-item">
                     <p>
                        <strong>{new Date(day.dt * 1000).toLocaleDateString()}</strong>
                     </p>
                     {iconUrl && <img src={iconUrl} alt={day.weather[0].description} />}
                     <p>
                        Min: {day.temp.min} °F, Max: {day.temp.max} °F
                     </p>
                     <p>Conditions: {day.weather[0].description}</p>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

export default DailyForecast;
