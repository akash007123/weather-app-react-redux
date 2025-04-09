import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import airQualityReducer from "./airQualitySlice";


export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    airQuality: airQualityReducer,
  },
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;