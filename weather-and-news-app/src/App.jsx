import React, { useState, useEffect } from "react";

import LocationForm from "./components/LocationForm";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";

export default function App() {
   const [searchTerm, setSearchTerm] = useState("");
   const [coordinates, setCoordinates] = useState({ lat: null, lon: null });

   const [weatherData, setWeatherData] = useState(null);
   const [hourlyData, setHourlyData] = useState(null);
   const [dailyData, setDailyData] = useState(null);

   const [loading, setLoading] = useState(false);

   // Access API key from the .env file
   const API_KEY = import.meta.env.VITE_REACT_APP_OPENWEATHER_API_KEY;

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
         } else {
            console.error("No location found. Please try another search.");
         }
      } catch (error) {
         console.error("Error fetching geocoding data:", error);
      }
   };

   // useEffect to fetch weather data whenever the coordinates change.
   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);
         try {
            // Fetch current weather data
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}&units=imperial`;
            const weatherResponse = await fetch(weatherUrl);
            const weatherJson = await weatherResponse.json();
            setWeatherData(weatherJson);
            console.log("Weather Data:", weatherJson);

            // Fetch hourly forecast
            const hourlyUrl = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}&units=imperial`;
            const hourlyResponse = await fetch(hourlyUrl);
            const hourlyJson = await hourlyResponse.json();
            setHourlyData(hourlyJson);
            console.log("Hourly Forecast Data:", hourlyJson);

            // Fetch daily forecast
            const dailyUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${coordinates.lat}&lon=${coordinates.lon}&cnt=7&appid=${API_KEY}&units=imperial`;
            const dailyResponse = await fetch(dailyUrl);
            const dailyJson = await dailyResponse.json();
            setDailyData(dailyJson);
            console.log("Daily Forecast Data:", dailyJson);
         } catch (error) {
            console.error("Error fetching weather data:", error);
         } finally {
            setLoading(false);
         }
      };
      if (coordinates.lat && coordinates.lon) {
         fetchData();
      }
   }, [coordinates, API_KEY]);

   return (
      <div>
         <h1>My Weather App</h1>
         <LocationForm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
         />
         {loading && <p>Loading data...</p>}
         {coordinates.lat && coordinates.lon && (
            <div>
               <p>Latitude: {coordinates.lat}</p>
               <p>Longitude: {coordinates.lon}</p>
            </div>
         )}

         <CurrentWeather current={weatherData} />

         {hourlyData && <HourlyForecast hourly={hourlyData.list} />}

         <DailyForecast daily={dailyData} />
      </div>
   );
}
