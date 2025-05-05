import React from "react";
import { Box, Typography } from "@mui/material";

// Make the first letter of each word uppercase
function titleCase(str) {
   return str
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
}

export default function HourlyForecast({ hourly }) {
   if (!hourly || !hourly.length) return null;

   return (
      <Box sx={{ width: "100%", color: "#fff" }}>
         <Typography variant="h5" gutterBottom>
            Hourly Forecast (Next 24 Hours)
         </Typography>

         <Box
            sx={{
               display: "flex",
               overflowX: "auto",
               gap: 2,
               py: 2,
            }}
         >
            {hourly.slice(0, 24).map((hour, idx) => {
               const time = new Date(hour.dt * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
               });
               const iconCode = hour.weather[0].icon;
               const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
               const condition = titleCase(hour.weather[0].description);

               return (
                  <Box
                     key={idx}
                     sx={{
                        flex: "0 0 100px",
                        color: "black",
                        textAlign: "center",
                        p: 2,
                        border: "1px solid rgba(255,255,255,0.5)",
                        borderRadius: 2,
                        backgroundColor: "rgba(255, 255, 255, 0.53)",
                     }}
                  >
                     <Typography variant="subtitle2" gutterBottom noWrap>
                        {time}
                     </Typography>

                     <Box
                        component="img"
                        src={iconUrl}
                        alt={condition}
                        sx={{ width: 80, height: 80 }}
                     />

                     <Typography variant="body2">{Math.round(hour.main.temp)}°F</Typography>

                     <Typography variant="caption" noWrap>
                        {condition}
                     </Typography>
                  </Box>
               );
            })}
         </Box>
      </Box>
   );
}
