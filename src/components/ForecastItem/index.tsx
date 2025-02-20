import { View, Text, Image } from "react-native";
import React from "react";

type ForecastItemProps = {
  item: {
    dt: number;
    temp_max: number;
    temp_min: number;
    icon: string;
  };
};

export default function index({ item }: ForecastItemProps) {
  return (
    <View className="w-[70px] h-[98px] bg-white rounded-2xl px-4 py-2 flex-col justify-between items-center shadow-sm shadow-black">
      <Text className="text-base font-bold">
        {new Date(item.dt * 1000).toLocaleDateString("es-MX", {
          weekday: "short",
        })}
      </Text>

      <Image
        className="w-10 h-10  "
        source={{ uri: item.icon }}
        resizeMode="contain"
      />
      <View className="flex-row gap-0.5">
        <Text className="">{item.temp_max.toFixed(0)}°</Text>
        <Text className="opacity-50">{item.temp_min.toFixed(0)}°</Text>
      </View>
    </View>
  );
}
