// app/_layout.tsx
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

// App load hone tak splash screen ko rokay rakhega
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Jab app tayar ho jaye toh splash screen hata do
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* App start hote hi is index par jayegi jo usay Login par bhej dega */}
        <Stack.Screen name="index" />

        {/* Authentication Screens */}
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />

        {/* Admin Screens */}
        <Stack.Screen name="admin-login" />
        <Stack.Screen name="admin-panel" />

        {/* Main Dashboard & Map */}
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
