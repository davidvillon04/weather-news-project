import React, { useState } from "react";

export default function App() {
   const [searchTerm, setSearchTerm] = useState("");
   const [coordinates, setCoordinates] = useState({ lat: null, lon: null });
   const [weatherData, setWeatherData] = useState(null);

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

   return (
      <div>
         <h1>My Weather App</h1>
         <form onSubmit={handleSearch}>
            <input
               type="text"
               placeholder="Enter city, ZIP, or address..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
         </form>

         {coordinates.lat && coordinates.lon && (
            <div>
               <p>Latitude: {coordinates.lat}</p>
               <p>Longitude: {coordinates.lon}</p>
            </div>
         )}

         {weatherData && (
            <div>
               <h2>Current Weather</h2>
               <p>Temperature: {weatherData.main.temp} °F</p>
               <p>Humidity: {weatherData.main.humidity}%</p>
               <p>Conditions: {weatherData.weather && weatherData.weather[0].description}</p>
            </div>
         )}
      </div>
   );
}
