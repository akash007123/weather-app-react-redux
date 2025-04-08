import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from "../redux/weatherSlice";
import { RootState } from "../redux/store";
import { fetchWeather } from "../services/weatherService";

const Weather: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.weather
  );
  const [city, setCity] = useState("Ujjain");

  const handleFetchWeather = async () => {
    dispatch(fetchWeatherStart());
    try {
      const weatherData = await fetchWeather(city);
      dispatch(fetchWeatherSuccess(weatherData));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(fetchWeatherFailure(err.message));
      } else {
        dispatch(fetchWeatherFailure("An unknown error occurred"));
      }
    }
  };

  useEffect(() => {
    handleFetchWeather();
  }, [city]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center">
      <div className="container mx-auto max-w-md p-6 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center mb-6">
          <img
            src="https://static.vecteezy.com/system/resources/previews/026/571/030/non_2x/weather-icon-with-sun-and-cloud-on-transparent-background-free-png.png"
            className="w-12"
            alt=""
          />
          <h1 className="text-3xl font-bold text-center text-blue-700 ">
            Weather App
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="flex-1 border border-gray-300 rounded px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleFetchWeather}
            className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Get Weather
          </button>
        </div>

        {loading && (
          <p className="text-center text-gray-500 mb-4">Loading...</p>
        )}
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        {data && (
          <div className="bg-blue-50 p-4 rounded shadow text-center">
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">
              {data.name}
            </h2>
            <p className="text-gray-800 text-lg mb-1">
              🌡️ Temperature:{" "}
              <span className="font-medium">{data.main.temp}°C</span>
            </p>
            <p className="text-gray-800 text-lg mb-1">
              💨 Wind:{" "}
              <span className="font-medium">{data.wind.speed} m/s</span>
            </p>
            <p className="text-gray-800 text-lg mb-1">
              🌬️ Pressure:{" "}
              <span className="font-medium">{data.main.pressure} hPa</span>
            </p>
            <p className="text-gray-800 text-lg mb-1">
              ☁️ Clouds: <span className="font-medium">{data.clouds.all}%</span>
            </p>
            <p className="text-gray-800 text-lg">
              🌡️ AQI: <span className="font-medium">{data.aqi}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
