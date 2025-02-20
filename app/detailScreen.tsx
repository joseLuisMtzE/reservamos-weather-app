// app/windex.tsx
import React from "react";
import { View, Text, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ForecastItem, MeasureItem } from "../src/components";
import { StatusBar } from "expo-status-bar";

export default function DetailScreen() {
  const { lat, long } = useLocalSearchParams(); // Obtén los parámetros

  console.log(lat, long);
  return (
    <SafeAreaView className="flex-1 bg-blue-900 items-center justify-start px-4 pt-10 flex-col gap-8">
      <StatusBar />
      <View className="gap-4 w-full">
        <View className=" flex-col justify-center items-center ">
          <View className="flex-row justify-center">
            <Text className="text-[90px] text-white leading-[90px]">20</Text>
            <Text className="text-base top-2 text-white leading-[16px]">
              °C
            </Text>
          </View>
          <Text className="text-white leading-[16px] ">Max 26° / Min 12°</Text>
        </View>
        <View className="flex-row gap-1 justify-center items-center">
          <View className="w-5 h-5 bg-red-500 rounded-full"></View>
          <Text className="text-white">Lluvioso</Text>
        </View>
        <View className="flex-col justify-center items-center">
          <Text className="text-white font-bold text-2xl">Monterrey</Text>
          <Text className="text-white">Nuevo Leon, Mexico</Text>
        </View>
      </View>

      <View className="w-full ">
        <FlatList
          className="p-2 bg-black/20 rounded-2xl w-full"
          showsHorizontalScrollIndicator={false}
          horizontal
          data={[1, 2, 3, 4, 5, 6, 7]}
          renderItem={() => <ForecastItem />}
          contentContainerStyle={{ gap: 8, paddingEnd: 16 }}
        />
      </View>

      <View className="w-full bg-black/20 rounded-2xl py-4 flex-col gap-4">
        <View className=" justify-center items-center">
          <Text className="text-white text-xl ">Mediciones</Text>
        </View>
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          renderItem={() => <MeasureItem />}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "space-evenly",
          }}
          contentContainerStyle={{ gap: 16 }}
        />
      </View>
    </SafeAreaView>
  );
}
