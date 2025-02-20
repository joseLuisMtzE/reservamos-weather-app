import { View, Text } from "react-native";
import React from "react";

export default function index() {
  return (
    <View className="flex-col w-[80px] h-[80px] px-2 py-4 bg-white justify-between items-center rounded-2xl">
      <View className="w-4 h-4 bg-red-500 rounded-md" />
      <Text className="text-xs">Measure</Text>
      <Text>XX.X</Text>
    </View>
  );
}
