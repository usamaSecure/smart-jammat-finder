import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BASE_URL } from "../config"; // Centralized Config Import

export default function AdminLogin() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [password, setPassword] = useState("");

  // ⚠️ FIX: Catching the ID no matter what name the previous screen used
  const actualMosqueId = params.mosqueId || params._id || params.id;

  const handleLogin = async () => {
    if (!actualMosqueId) {
      Alert.alert(
        "Error",
        "Mosque ID is missing. Please go back and try again.",
      );
      return;
    }

    if (!password) {
      Alert.alert("Error", "Please enter a password.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/admin/login`, {
        mosqueId: actualMosqueId,
        password: password,
      });

      if (response.data.success) {
        // Naya Route: Success par admin-panel par bhej do aur sahi ID sath bhejo
        router.push({
          pathname: "/admin-panel",
          params: { mosqueId: actualMosqueId },
        });
      }
    } catch (error) {
      Alert.alert(
        "Authentication Failed",
        "The admin password you entered is incorrect. (Hint: try admin123)",
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={24} color="#10B981" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Admin Access</Text>
        <Text style={styles.subtitle}>
          Enter password for this mosque to update timings
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Admin Password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.btnText}>Login as Admin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", padding: 25 },
  backBtn: { marginTop: 40 },
  content: { flex: 1, justifyContent: "center" },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: { fontSize: 14, color: "#6B7280", marginBottom: 30 },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    color: "#111827",
    marginBottom: 20,
  },
  loginBtn: {
    backgroundColor: "#10B981",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    elevation: 4,
  },
  btnText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
