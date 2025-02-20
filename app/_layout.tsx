// app/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import "../global.css";

const Layout = () => {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="detailScreen"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </PaperProvider>
  );
};

export default Layout;
