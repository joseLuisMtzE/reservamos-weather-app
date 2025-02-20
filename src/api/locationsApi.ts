import axios from "axios";
import { Location } from "../types/locationTypes";
import { filterValidLocations, mapLocation } from "./mappers/locationMapper";

export const fetchLocations = async (
  searchText: string
): Promise<Location[]> => {
  try {
    const response = await axios.get<Location[]>(
      `https://search.reservamos.mx/api/v2/places?q=${searchText}`
    );

    return response.data.filter(filterValidLocations).map(mapLocation);
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
};
