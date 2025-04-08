import axios from 'axios';

const API_KEY = '45daca6fd9b2d93987f1bef88b22e880'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// const API_KEY = '034ff6e1b14646dab0e113420250804';
// const BASE_URL = 'http://api.weatherapi.com/v1/current.json';
export const fetchWeather = async (city: string): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', 
      },
    });
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};