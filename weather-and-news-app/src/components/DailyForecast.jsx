import React from "react";
import { Box, Typography } from "@mui/material";

// Make the first letter of each word uppercase
function titleCase(str) {
   return str
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
}

export default function DailyForecast({ daily }) {
   if (!daily || !daily.list) return null;

   return (
      <Box sx={{ width: "100%", color: "#fff" }}>
         <Typography variant="h5" gutterBottom>
            7-Day Forecast
         </Typography>

         <Box
            sx={{
               display: "flex",
               justifyContent: "center",
               gap: 2,
            }}
         >
            {daily.list.slice(0, 7).map((day, idx) => {
               const date = new Date(day.dt * 1000).toLocaleDateString();
               const iconCode = day.weather[0].icon;
               const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
               const condition = titleCase(day.weather[0].description);

               return (
                  <Box
                     key={idx}
                     sx={{
                        flex: "1 1 0%",
                        color: "black",
                        minWidth: 120,
                        maxWidth: 180,
                        border: "1px solid rgba(255,255,255,0.5)",
                        borderRadius: 2,
                        p: 3,
                        textAlign: "center",
                        backgroundColor: "rgba(255, 255, 255, 0.53)",
                     }}
                  >
                     <Typography variant="subtitle2" gutterBottom>
                        {date}
                     </Typography>

                     <Box
                        component="img"
                        src={iconUrl}
                        alt={condition}
                        sx={{ width: 100, height: 100 }}
                     />

                     <Typography variant="body2">Min: {Math.round(day.temp.min)}°F</Typography>
                     <Typography variant="body2" gutterBottom>
                        Max: {Math.round(day.temp.max)}°F
                     </Typography>
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
