"use client";

import { createContext, useContext, useEffect, useState } from "react";
import MatrixRain from "./MatrixRain";

interface ThemeContextType {
  isRaining: boolean;
  isNight: boolean;
  weatherCode: number | null;
  location: { city?: string; country?: string } | null;
}

const ThemeContext = createContext<ThemeContextType>({
  isRaining: false,
  isNight: false,
  weatherCode: null,
  location: null,
});

export const useThemeStatus = () => useContext(ThemeContext);

export default function ThemeController({ children }: { children: React.ReactNode }) {
  const [isRaining, setIsRaining] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [weatherCode, setWeatherCode] = useState<number | null>(null);
  const [location, setLocation] = useState<{ city?: string; country?: string } | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    // Check Local Time
    const updateTimeBasedTheme = () => {
      const hour = new Date().getHours();
      // Night is considered from 8 PM (20) to 6 AM (6)
      const night = hour >= 20 || hour < 6;
      setIsNight(night);
      
      if (night) {
        document.documentElement.classList.add("theme-night-cyberpunk");
      } else {
        document.documentElement.classList.remove("theme-night-cyberpunk");
      }
    };

    updateTimeBasedTheme();

    // Check Weather
    const fetchWeather = async () => {
      try {
        // Step 1: Get Lat/Lon via IP (no CORS, no API key)
        const geoRes = await fetch("https://get.geojs.io/v1/ip/geo.json");
        const geoData = await geoRes.json();
        const { latitude, longitude, city, country } = geoData;
        setLocation({ city, country });

        // Step 2: Get Current Weather
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code`
        );
        const weatherData = await weatherRes.json();
        const code = weatherData.current?.weather_code;
        setWeatherCode(code);

        // WMO Codes for rain/drizzle/thunderstorm
        const rainCodes = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99];
        setIsRaining(rainCodes.includes(code));
      } catch (error) {
        console.error("Failed to fetch weather data for theme:", error);
      }
    };

    fetchWeather();
    
    // Periodically update time every 5 minutes
    const timeInterval = setInterval(updateTimeBasedTheme, 5 * 60 * 1000);
    // Periodically update weather every 30 minutes
    const weatherInterval = setInterval(fetchWeather, 30 * 60 * 1000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(weatherInterval);
      document.documentElement.classList.remove("theme-night-cyberpunk");
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ isRaining, isNight, weatherCode, location }}>
      {isRaining && <MatrixRain />}
      <div className={`theme-wrapper ${hasMounted ? 'mounted' : ''}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
