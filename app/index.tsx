import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function EntryPoint() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // ⚠️ TESTING FIX: Is line se purana token delete ho jayega.
        // Jab aapka login page sahi se ban jaye, toh is line ko remove ya comment kar dijiyega.
        await AsyncStorage.removeItem("userToken");

        const token = await AsyncStorage.getItem("userToken");

        if (token) {
          setIsAuthenticated(true); // User is logged in
        } else {
          setIsAuthenticated(false); // User needs to login
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F9FAFB",
        }}
      >
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  // Final Routing Check
  return isAuthenticated ? (
    <Redirect href="/(tabs)" />
  ) : (
    <Redirect href="/login" />
  );
}
