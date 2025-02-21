import { View, Text } from "react-native";
import React from "react";
type ForecastItemProps = {
  item: {
    label: string;
    value: number;
  };
};
export default function index({ item }: ForecastItemProps) {
  return (
    <View className="flex-col w-[100px] h-[90px] px-2 py-3 bg-white justify-between items-center rounded-2xl">
      <Text className=" text-center text-blue-950/80 font-bold">
        {item.label}
      </Text>
      <Text className="text-xl">{item.value}</Text>
    </View>
  );
}
