import React, { useState } from "react";

import LocationForm from "./components/LocationForm";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";

export default function App() {
   const [searchTerm, setSearchTerm] = useState("");
   const [coordinates, setCoordinates] = useState({ lat: null, lon: null });
   const [weatherData, setWeatherData] = useState(null);
   const [hourlyData, setHourlyData] = useState(null);

   // Access API key from the .env file
   const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

   // Function to handle the search submission
   const handleSearch = async (event) => {
      event.preventDefault();
      console.log("User searched for:", searchTerm);

      try {
         // Build the API URL with the search term and API key
         const url = `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=1&appid=${API_KEY}`;
         const response = await fetch(url);
         const data = await response.json();

         // If data is returned, update the coordinates state
         if (data && data.length > 0) {
            const { lat, lon } = data[0];
            setCoordinates({ lat, lon });
            console.log("Coordinates:", lat, lon);

            await fetchWeatherData(lat, lon);
            await fetchHourlyForecast(lat, lon);
         } else {
            console.error("No location found. Please try another search.");
         }
      } catch (error) {
         console.error("Error fetching geocoding data:", error);
      }
   };

   // Function to fetch the weather data
   const fetchWeatherData = async (lat, lon) => {
      try {
         const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
         const response = await fetch(weatherUrl);
         const data = await response.json();

         setWeatherData(data);
         console.log("Weather Data:", data);
      } catch (error) {
         console.error("Error fetching weather data:", error);
      }
   };

   // Function to fetch the hourly forecast
   const fetchHourlyForecast = async (lat, lon) => {
      try {
         const hourlyUrl = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
         const response = await fetch(hourlyUrl);
         const data = await response.json();

         setHourlyData(data);
         console.log("Hourly Forecast Data:", data);
      } catch (error) {
         console.error("Error fetching hourly forecast data:", error);
      }
   };

   return (
      <div>
         <h1>My Weather App</h1>
         <LocationForm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
         />

         {coordinates.lat && coordinates.lon && (
            <div>
               <p>Latitude: {coordinates.lat}</p>
               <p>Longitude: {coordinates.lon}</p>
            </div>
         )}

         {weatherData && <CurrentWeather current={weatherData.main} />}

         {hourlyData && hourlyData.list && <HourlyForecast hourly={hourlyData.list} />}
      </div>
   );
}
