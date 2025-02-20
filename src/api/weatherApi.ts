import axios from "axios";
import { Forecast } from "../types/weatherTypes";
import { forecastDataMapper } from "./mappers/weatherMappers";

const API_KEY = "ee0b43089068342c3a0fdeb2c9a61a35";

export const fetchWeather = async (
  lat: string,
  long: string
): Promise<Forecast[] | null> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
    );
    const forecastData: Forecast[] = response.data.list.map(forecastDataMapper);
    console.log(forecastData);
    return forecastData;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return null;
  }
};
