import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ForecastItem, MeasureItem } from "../src/components";
import { StatusBar } from "expo-status-bar";
import {
  fetchCurrentWeather,
  fetchForecastWeather,
} from "../src/api/weatherApi";
import { CurrentWeather, Forecast } from "../src/types/weatherTypes";
import { mapWeatherDataToSpanish } from "../src/api/mappers/weatherMappers";
import { ActivityIndicator, Icon, IconButton } from "react-native-paper";

export default function DetailScreen() {
  const router = useRouter();
  const { lat, long, display, country, city_name, state } =
    useLocalSearchParams();
  const [weatherData, setWeatherData] = useState<Forecast[] | null>(null);
  const [currentWeatherData, setCurrentWeatherData] =
    useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!lat || !long) {
        setLoading(false);
        return;
      }

      try {
        const currentWeather = await fetchCurrentWeather(
          lat.toString(),
          long.toString()
        );
        setCurrentWeatherData(currentWeather);
        const data = await fetchForecastWeather(
          lat.toString(),
          long.toString()
        );
        setWeatherData(data);
      } catch (err) {
        console.error(err);
        router.back();
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const dailyForecast = Object.values(
    (weatherData ?? []).reduce(
      (
        acc: Record<
          string,
          { dt: number; temp_max: number; temp_min: number; icon: string }
        >,
        curr: Forecast
      ) => {
        const date = new Date(curr.dt * 1000).toDateString();

        if (!acc[date]) {
          acc[date] = {
            dt: curr.dt,
            temp_max: curr.main.temp_max,
            temp_min: curr.main.temp_min,
            icon: curr.weather[0]?.icon || "",
          };
        } else {
          acc[date].temp_max = Math.max(acc[date].temp_max, curr.main.temp_max);
          acc[date].temp_min = Math.min(acc[date].temp_min, curr.main.temp_min);
        }

        return acc;
      },
      {}
    )
  );

  return (
    <SafeAreaView className="flex-1 bg-blue-900">
      <StatusBar style="light" />

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={40} color="white" />
        </View>
      ) : (
        <>
          <View className="w-full flex-row items-center px-4 py-2 absolute top-16 left-0 z-10">
            <IconButton
              icon="arrow-left"
              iconColor="white"
              size={24}
              onPress={() => router.back()}
              className="bg-white/10 rounded-full"
            />
          </View>
          <View className="flex-1 px-4">
          <View className=" items-center justify-start px-4 mt-10  flex-col gap-8">
            <View className="gap-4 w-full">
              <View className=" flex-col justify-center items-center ">
                <View className="flex-row justify-center">
                  <Text className="text-[90px] text-white leading-[90px]">
                    {currentWeatherData?.main.temp.toFixed(0)}
                  </Text>
                  <Text className="text-base top-2 text-white leading-[16px]">
                    °C
                  </Text>
                </View>
                <Text className="text-white leading-[16px] ">
                  {`Max ${currentWeatherData?.main.temp_max.toFixed(
                    0
                  )}° / Min ${currentWeatherData?.main.temp_min.toFixed(0)}°`}
                </Text>
              </View>
              <View className="flex-row  justify-center items-center ">
                <View className="justify-center items-center">
                  <Image
                    className="w-14 h-8  "
                    source={{ uri: currentWeatherData?.weather[0].icon }}
                    resizeMode="cover"
                  />
                </View>

                <Text className="text-white">
                  {currentWeatherData?.weather[0].description}
                </Text>
              </View>
              <View className="flex-col justify-center items-center">
                <Text className="text-white font-bold text-2xl">{display}</Text>
                <Text className="text-white">
                  {city_name}
                  {state ? `, ${state}` : ""}
                  {country ? `, ${country}` : ""}
                </Text>
              </View>
            </View>

            <View className="w-full">
              <Text className="text-white text-xl font-bold mb-4">
                Pronóstico de 5 días
              </Text>

              <FlatList
                className="bg-white/10 rounded-2xl p-4"
                showsHorizontalScrollIndicator={false}
                horizontal
                data={dailyForecast}
                renderItem={({ item }) => <ForecastItem item={item} />}
                contentContainerStyle={{ gap: 12, paddingEnd: 16 }}
              />
            </View>

            <View className="w-full bg-white/10 rounded-2xl py-4 mb-8">
              <Text className="text-white text-xl font-bold mb-4 text-center">
                Mediciones de hoy
              </Text>
              <FlatList
                data={
                  currentWeatherData
                    ? mapWeatherDataToSpanish(currentWeatherData?.main)
                    : []
                }
                renderItem={({ item }) => <MeasureItem item={item} />}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "space-evenly",
                }}
                contentContainerStyle={{ gap: 16 }}
              />
            </View>
            </View>
          
            
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
