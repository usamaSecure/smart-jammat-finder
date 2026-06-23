import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BASE_URL } from "../config"; // Naya IP setup yahan bhi import ho raha hai

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email: email,
        password: password,
      });

      if (response.status === 200 || response.data.token) {
        // App ko batane ke liye ke user log in ho gaya hai, ek token save kar lete hain
        await AsyncStorage.setItem(
          "userToken",
          response.data.token || "logged_in",
        );

        // NAYA CODE: Name aur Email ko bhi session memory mein save karein
        if (response.data.user) {
          await AsyncStorage.setItem("userName", response.data.user.name);
          await AsyncStorage.setItem("userEmail", response.data.user.email);
        }

        Alert.alert("Success", "Logged in successfully!");
        router.replace("/(tabs)"); // Login ke baad seedha Dashboard par bhej do
      }
    } catch (error: any) {
      console.log("Login Error:", error);
      if (error.response) {
        Alert.alert(
          "Error",
          error.response.data.message || "Invalid email or password",
        );
      } else {
        Alert.alert(
          "Network Error",
          "Unable to connect to the server. Is backend running?",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={styles.linkText}>Don't have an account? Create one</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "#10B981",
  },
  input: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#10B981",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 18 },
  linkText: {
    color: "#6B7280",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
  },
});
