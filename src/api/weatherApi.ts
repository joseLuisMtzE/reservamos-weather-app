import axios from "axios";
import { CurrentWeather, Forecast } from "../types/weatherTypes";
import {
  currentWeatherDataMapper,
  forecastDataMapper,
} from "./mappers/weatherMappers";

const API_KEY = "ee0b43089068342c3a0fdeb2c9a61a35";

export const fetchForecastWeather = async (
  lat: string,
  long: string
): Promise<Forecast[] | null> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
    );
    const forecastData: Forecast[] = response.data.list.map(forecastDataMapper);
    return forecastData;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return null;
  }
};

export const fetchCurrentWeather = async (
  lat: string,
  long: string
): Promise<CurrentWeather | null> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
    );

    const currentWeeatherData: CurrentWeather = currentWeatherDataMapper(
      response.data
    );
    return currentWeeatherData;
  } catch (error) {
    console.error("Error fetching current weather:", error);
    return null;
  }
};
