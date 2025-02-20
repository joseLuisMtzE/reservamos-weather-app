import { View, Text } from "react-native";
import React from "react";

export default function index() {
  return (
    <View className="w-[70px] h-[98px] bg-white rounded-2xl px-4 py-2 flex-col justify-between items-center shadow-sm shadow-black">
      <Text className="text-base font-bold">day</Text>
      <View className="w-8 h-8 bg-red-500 rounded-md"></View>
      <View className="flex-row gap-0.5">
        <Text className="">18°</Text>
        <Text className="opacity-50">2°</Text>
      </View>
    </View>
  );
}
