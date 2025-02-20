export interface MainWeatherClass {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level?: number;
  grnd_level?: number;
  humidity: number;
  temp_kf?: number;
}
export enum MainEnum {
  Clear = "Despejado",
  Clouds = "Nubes",
}

export enum Description {
  FewClouds = "Pocas nubes",
  ClearSky = "Cielos despejados",
  Cloudy = "Nuboso",
  OvercastClouds = "Nubes",
  BrokenClouds = "Nubes dispersas",
}

export interface WeatherElement {
  id: number;
  main: MainEnum;
  description: Description;
  icon: string;
}
export interface Clouds {
  all: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface Forecast {
  dt: number;
  main: MainWeatherClass;
  weather: WeatherElement[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
}
