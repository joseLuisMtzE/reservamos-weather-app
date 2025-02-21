import React from "react";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import "../global.css";

const Layout = () => {
  return (
    <PaperProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="detailScreen" />
      </Stack>
    </PaperProvider>
  );
};

export default Layout;
