export enum Country {
  México = "México",
  UnitedStates = "United States",
}

export enum ResultType {
  Airport = "airport",
  City = "city",
  Terminal = "terminal",
}

export interface Location {
  id?: number;
  display: string;
  city_name: string;
  state: string;
  country: string;
  lat: string;
  long: string;
}
