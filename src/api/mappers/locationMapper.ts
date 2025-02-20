import { Location } from "../../types/locationTypes";

export const mapLocation = (item: any): Location => ({
  city_name: item.city_name,
  display: item.display,
  country: item.country,
  state: item.state,
  lat: item.lat,
  long: item.long,
});

export const filterValidLocations = (item: any): boolean =>
  item.lat !== null && item.long !== null;
