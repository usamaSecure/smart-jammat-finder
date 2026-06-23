import { Stack } from "expo-router";
import { PrayerTimingsProvider } from "../../context/PrayerTimingsContext";

export default function RootLayout() {
  return (
    <PrayerTimingsProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="mosque-details" />
        <Stack.Screen name="admin-login" />
        <Stack.Screen name="admin-panel" />
      </Stack>
    </PrayerTimingsProvider>
  );
}
