import React, { useState, useEffect } from "react";
import { Container, Box, Typography, CircularProgress, Button } from "@mui/material";

import LocationForm from "./components/LocationForm";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import NewsList from "./components/NewsList";

export default function App() {
   const [searchTerm, setSearchTerm] = useState("");
   const [coordinates, setCoordinates] = useState({ lat: null, lon: null });
   const [locationName, setLocationName] = useState("");

   const [weatherData, setWeatherData] = useState(null);
   const [hourlyData, setHourlyData] = useState(null);
   const [dailyData, setDailyData] = useState(null);

   const [loading, setLoading] = useState(false);

   const [newsData, setNewsData] = useState([]);
   const [showAll, setShowAll] = useState(false);

   // Access API keys from the .env file
   const WEATHER_KEY = import.meta.env.VITE_REACT_APP_OPENWEATHER_API_KEY;
   const NYT_KEY = import.meta.env.VITE_NYT_API_KEY;

   useEffect(() => {
      async function fetchNews() {
         try {
            const res = await fetch(
               `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${NYT_KEY}`
            );
            const json = await res.json();
            setNewsData(json.results); // All 20 stories
         } catch (err) {
            console.error("Error fetching NYT stories:", err);
         }
      }
      fetchNews();
   }, [NYT_KEY]);

   // Function to handle the search submission
   const handleSearch = async (event) => {
      event.preventDefault();
      console.log("User searched for:", searchTerm);

      try {
         // Build the API URL with the search term and API key
         const url = `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=1&appid=${WEATHER_KEY}`;
         const response = await fetch(url);
         const data = await response.json();

         // If data is returned, update the coordinates state
         if (data && data.length > 0) {
            const { lat, lon, name, state, country } = data[0];
            setCoordinates({ lat, lon });
            setLocationName([name, state, country].filter(Boolean).join(", "));
         } else {
            console.error("No location found. Please try another search.");
         }
      } catch (error) {
         console.error(error);
      }
   };

   // useEffect to fetch weather data whenever the coordinates change.
   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);
         try {
            // Fetch current weather data
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${WEATHER_KEY}&units=imperial`;
            const weatherResponse = await fetch(weatherUrl);
            const weatherJson = await weatherResponse.json();
            setWeatherData(weatherJson);
            console.log("Weather Data:", weatherJson);

            // Fetch hourly forecast
            const hourlyUrl = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${WEATHER_KEY}&units=imperial`;
            const hourlyResponse = await fetch(hourlyUrl);
            const hourlyJson = await hourlyResponse.json();
            setHourlyData(hourlyJson);
            console.log("Hourly Forecast Data:", hourlyJson);

            // Fetch daily forecast
            const dailyUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${coordinates.lat}&lon=${coordinates.lon}&cnt=7&appid=${WEATHER_KEY}&units=imperial`;
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
   }, [coordinates, WEATHER_KEY]);

   // Function to handle current location retrieval using HTML Geolocation API
   const handleCurrentLocation = () => {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
            async (position) => {
               const lat = position.coords.latitude;
               const lon = position.coords.longitude;
               setCoordinates({ lat, lon });

               try {
                  const res = await fetch(
                     `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${WEATHER_KEY}`
                  );
                  const data = await res.json();
                  if (data && data.length > 0) {
                     const { name, state, country } = data[0];
                     setLocationName([name, state, country].filter(Boolean).join(", "));
                  }
               } catch (err) {
                  console.error("Reverse geocoding failed", err);
               }
            },
            (error) => {
               console.error("Error retrieving current location:", error);
            }
         );
      } else {
         alert("Geolocation is not supported by your browser.");
      }
   };

   return (
      <Container maxWidth="xl">
         <Box display="flex" flexDirection="column" alignItems="center" sx={{ py: 4 }}>
            <Typography variant="h3" gutterBottom>
               Villon's Weather App
            </Typography>

            <LocationForm
               searchTerm={searchTerm}
               setSearchTerm={setSearchTerm}
               handleSearch={handleSearch}
            />

            <Button variant="outlined" sx={{ mt: 2 }} onClick={handleCurrentLocation}>
               Use Current Location
            </Button>

            {loading && <CircularProgress sx={{ mt: 3 }} />}

            {/* SHOW LOCATION NAME AND COORDS */}
            {coordinates.lat && coordinates.lon && (
               <Box textAlign="center" mt={3}>
                  <Typography variant="h5">{locationName}</Typography>

                  <Typography variant="caption" color="textSecondary">
                     Lat: {coordinates.lat.toFixed(4)}, Lon: {coordinates.lon.toFixed(4)}
                  </Typography>
               </Box>
            )}

            {/* CURRENT WEATHER */}
            <Box display="flex" justifyContent="center" width="100%" mt={4}>
               <CurrentWeather current={weatherData} />
            </Box>

            {/* HOURLY FORECAST */}
            {hourlyData && (
               <Box
                  width="100%"
                  mt={4}
                  sx={{
                     backgroundColor: "rgba(0, 0, 0, 0.44)",
                     borderRadius: 5,
                     p: 3,
                  }}
               >
                  <HourlyForecast hourly={hourlyData.list} />
               </Box>
            )}

            {/* 7-DAY FORECAST */}
            {dailyData && (
               <Box
                  width="100%"
                  mt={4}
                  sx={{
                     backgroundColor: "rgba(0, 0, 0, 0.44)",
                     borderRadius: 5,
                     p: 3,
                  }}
               >
                  <DailyForecast daily={dailyData} />
               </Box>
            )}

            {/* NEWS */}
            <Box
               width="100%"
               mt={1}
               sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.44)",
                  borderRadius: 5,
                  p: 3,
               }}
            >
               <Typography variant="h4" align="center" gutterBottom sx={{ color: "#fff" }}>
                  Top New York Times Stories
               </Typography>
               <NewsList articles={showAll ? newsData : newsData.slice(0, 5)} />

               {newsData.length > 5 && (
                  <Box textAlign="center" mt={2}>
                     <Button variant="contained" onClick={() => setShowAll(!showAll)}>
                        {showAll ? "Show Less" : "Show More"}
                     </Button>
                  </Box>
               )}
            </Box>
         </Box>
      </Container>
   );
}
