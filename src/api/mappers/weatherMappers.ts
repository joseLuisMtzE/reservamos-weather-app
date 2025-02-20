import {
  CurrentWeather,
  CurrentWeatherMain,
  Description,
  Forecast,
  MainEnum,
  WeatherElement,
  weatherTranslationMap,
} from "../../types/weatherTypes";

const mainMap: { [key: string]: MainEnum } = {
  Clear: MainEnum.Clear,
  Clouds: MainEnum.Clouds,
};
export const mapMainEnum = (main: string): MainEnum =>
  mainMap[main] || MainEnum.Clear;

const descriptionMap: { [key: string]: Description } = {
  "few clouds": Description.FewClouds,
  "clear sky": Description.ClearSky,
  cloudy: Description.Cloudy,
  "overcast clouds": Description.OvercastClouds,
  "scattered clouds": Description.BrokenClouds,
};

export const mapDescriptionEnum = (description: string): Description =>
  descriptionMap[description] || Description.ClearSky;

export const mapIconImage = (icon: string) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

export const forecastDataMapper = (item: any): Forecast => ({
  dt: item.dt,
  main: {
    temp: item.main.temp,
    feels_like: item.main.feels_like,
    temp_min: item.main.temp_min,
    temp_max: item.main.temp_max,
    pressure: item.main.pressure,
    humidity: item.main.humidity,
  },
  weather: item.weather.map((weatherItem: WeatherElement) => ({
    id: weatherItem.id,
    main: mapMainEnum(weatherItem.main),
    description: mapDescriptionEnum(weatherItem.description),
    icon: mapIconImage(weatherItem.icon),
  })),
  clouds: item.clouds.all,
  wind: {
    speed: item.wind.speed,
    deg: item.wind.deg,
  },
  visibility: item.visibility,
});

export const currentWeatherDataMapper = (item: any): CurrentWeather => ({
  dt: item.dt,
  main: {
    temp: item.main.temp,
    feels_like: item.main.feels_like,
    temp_min: item.main.temp_min,
    temp_max: item.main.temp_max,
    pressure: item.main.pressure,
    humidity: item.main.humidity,
  },
  weather: item.weather.map((weatherItem: WeatherElement) => ({
    id: weatherItem.id,
    main: mapMainEnum(weatherItem.main),
    description: mapDescriptionEnum(weatherItem.description),
    icon: mapIconImage(weatherItem.icon),
  })),
  clouds: item.clouds.all,
  wind: {
    speed: item.wind.speed,
    deg: item.wind.deg,
  },
  visibility: item.visibility,
  id: item.id ?? "",
});

export const mapWeatherDataToSpanish = (weatherData: CurrentWeatherMain) => {
  return Object.entries(weatherData).map(([key, value]) => ({
    label: weatherTranslationMap[key] || key, // Traduce el nombre de la clave
    value,
  }));
};
