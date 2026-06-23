import { Feather, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BASE_URL } from "../config";

export default function AdminPanel() {
  const { mosqueId } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [times, setTimes] = useState({
    Fajr: "05:30 AM",
    Zuhr: "01:15 PM",
    Asr: "04:45 PM",
    Maghrib: "06:30 PM",
    Isha: "08:00 PM",
    Jummah: "01:30 PM",
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.put(`${BASE_URL}/api/admin/update-timings/${mosqueId}`, {
        timings: times,
      });
      Alert.alert(
        "Update Successful",
        "Jamat timings have been securely updated in the database.",
        [{ text: "Go to Dashboard", onPress: () => router.replace("/(tabs)") }],
      );
    } catch (error) {
      Alert.alert(
        "Update Failed",
        "Could not connect to the database. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#10B981" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.infoCard}>
          <Feather name="info" size={20} color="#10B981" />
          <Text style={styles.infoText}>
            Update the daily prayer timings below. Changes will immediately
            reflect for all users.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Jamat Timings</Text>

          {Object.keys(times).map((prayer) => (
            <View key={prayer} style={styles.inputGroup}>
              <Text style={styles.label}>{prayer}</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="time-outline"
                  size={20}
                  color="#6B7280"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={times[prayer as keyof typeof times]}
                  onChangeText={(val) => setTimes({ ...times, [prayer]: val })}
                  placeholder="e.g., 05:30 AM"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.saveBtn, loading && styles.saveBtnDisabled]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Feather name="save" size={20} color="white" />
              <Text style={styles.saveBtnText}>Save Timings</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  header: {
    backgroundColor: "#10B981",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  backBtn: { padding: 5 },
  headerTitle: { color: "white", fontSize: 20, fontWeight: "bold" },
  scrollContent: { padding: 20 },
  infoCard: {
    backgroundColor: "#D1FAE5",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  infoText: {
    color: "#065F46",
    fontSize: 13,
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 20,
  },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: "600", color: "#4B5563", marginBottom: 8 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 15, fontSize: 16, color: "#111827" },
  saveBtn: {
    backgroundColor: "#10B981",
    flexDirection: "row",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    elevation: 3,
  },
  saveBtnDisabled: { backgroundColor: "#6EE7B7" },
  saveBtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
