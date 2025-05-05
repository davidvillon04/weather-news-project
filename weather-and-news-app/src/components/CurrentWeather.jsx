import React from "react";
import { Box, Typography } from "@mui/material";

const CurrentWeather = ({ current }) => {
   if (!current) return null;

   const iconCode = current.weather?.[0]?.icon;
   const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : "";

   return (
      <Box textAlign="center">
         <Typography variant="h4" gutterBottom>
            Current Weather
         </Typography>
         <Box
            component="img"
            src={iconUrl}
            alt={current.weather[0].description}
            sx={{ display: "inline-block", mb: 2 }}
         />
         <Typography>Temperature: {current.main.temp} °F</Typography>
         <Typography>Humidity: {current.main.humidity}%</Typography>
         <Typography>Conditions: {current.weather[0].description}</Typography>
      </Box>
   );
};

export default CurrentWeather;
