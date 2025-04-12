import React from "react";

const HourlyForecast = ({ hourly }) => {
   if (!hourly) return null;

   return (
      <div>
         <h2>Hourly Forecast (Next 24 Hours)</h2>
         <div>
            {hourly.slice(0, 24).map((hour, index) => (
               <div key={index} style={{ borderBottom: "1px solid #ccc" }}>
                  <p>
                     <strong>
                        {new Date(hour.dt * 1000).toLocaleTimeString([], {
                           hour: "2-digit",
                           minute: "2-digit",
                        })}
                     </strong>
                  </p>
                  <p>Temp: {hour.main.temp} °F</p>
                  <p>Conditions: {hour.weather && hour.weather[0].description}</p>
               </div>
            ))}
         </div>
      </div>
   );
};

export default HourlyForecast;
