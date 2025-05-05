import React from "react";
import { Box, Typography } from "@mui/material";

// Make the first letter of each word uppercase
function titleCase(str) {
   return str
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
}

export default function CurrentWeather({ current }) {
   if (!current) return null;

   const iconCode = current.weather?.[0]?.icon;
   const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : "";
   const condition = titleCase(current.weather[0].description);

   return (
      <Box textAlign="center">
         <Typography variant="h4" gutterBottom>
            Current Weather
         </Typography>
         <Box
            component="img"
            src={iconUrl}
            alt={condition}
            sx={{ width: 120, height: 120, display: "inline-block" }}
         />
         <Typography>Temperature: {current.main.temp} °F</Typography>
         <Typography>Humidity: {current.main.humidity}%</Typography>
         <Typography>Conditions: {condition}</Typography>
      </Box>
   );
}
