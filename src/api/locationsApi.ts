import axios from "axios";
import { Location } from "../types/locationTypes";

export const fetchLocations = async (
  searchText: string
): Promise<Location[]> => {
  try {
    const response = await axios.get<Location[]>(
      `https://search.reservamos.mx/api/v2/places?q=${searchText}`
    );

    // Transformamos los datos para solo regresar lo necesario

    return response.data
      .filter((item: Location) => item.lat !== null && item.long !== null)
      .map((item: Location) => {
        return <Location>{
          city_name: item.city_name,
          display: item.display,
          country: item.country,
          state: item.state,
          lat: item.lat,
          long: item.long,
        };
      });
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
};
