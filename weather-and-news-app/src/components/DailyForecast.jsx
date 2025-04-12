// src/components/DailyForecast.jsx
import React from "react";
import "../styles.css";

const DailyForecast = ({ daily }) => {
   if (!daily) return null;

   return (
      <div>
         <h2>7-Day Forecast</h2>
         <div className="daily-container">
            {daily.list &&
               daily.list.map((day, index) => (
                  <div key={index} className="daily-item">
                     <p>
                        <strong>{new Date(day.dt * 1000).toLocaleDateString()}</strong>
                     </p>
                     <p>
                        Min: {day.temp.min} °F, Max: {day.temp.max} °F
                     </p>
                     <p>Conditions: {day.weather && day.weather[0].description}</p>
                  </div>
               ))}
         </div>
      </div>
   );
};

export default DailyForecast;
