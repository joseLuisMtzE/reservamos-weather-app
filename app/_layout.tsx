// app/_layout.tsx
import React from "react";
import { Stack } from "expo-router"; // Esto importa el stack de Expo Router
import { PaperProvider } from "react-native-paper";
import "../global.css";

const Layout = () => {
  return (
    <PaperProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="detailScreen"
          options={{ title: "Pantalla de Detalles" }}
        />
      </Stack>
    </PaperProvider>
  );
};

export default Layout;
