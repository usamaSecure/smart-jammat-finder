import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  // 1. Dynamic Date
  const [currentDate, setCurrentDate] = useState("");
  // 2. Dynamic Location
  const [locationName, setLocationName] = useState("Fetching Location...");

  // App start hone par Date aur Login check karna
  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        router.replace("/login");
      }
    };

    // Set formatted date (e.g., Saturday, April 25, 2026)
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCurrentDate(new Date().toLocaleDateString("en-US", options));

    checkLogin();
    fetchLocation();
  }, []);

  // Location Fetch Function
  const fetchLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationName("Permission Denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      // Reverse geocode to get city name
      let geoCode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (geoCode.length > 0) {
        const city = geoCode[0].city || geoCode[0].subregion || "Unknown City";
        const country = geoCode[0].country || "Pakistan";
        setLocationName(`${city}, ${country}`);
      } else {
        setLocationName("Location not found");
      }
    } catch (error) {
      console.log("Location Error:", error);
      setLocationName("Hyderabad, Pakistan"); // Fallback just in case
    }
  };

  // 3. Time Comparison Logic (Real-time check)
  const calculateStatus = (prayerTime: string) => {
    const now = new Date();

    // Parse prayer time string (e.g., "01:15 PM") to a Date object for today
    const [timeString, modifier] = prayerTime.split(" ");
    let [hours, minutes] = timeString.split(":");
    let hoursInt = parseInt(hours, 10);

    if (modifier === "PM" && hoursInt < 12) hoursInt += 12;
    if (modifier === "AM" && hoursInt === 12) hoursInt = 0;

    const prayerDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hoursInt,
      parseInt(minutes, 10),
      0,
    );

    // Compare times
    if (now > prayerDate) {
      return { text: "Passed", isNext: false };
    } else {
      // Calculate time difference for upcoming prayers
      const diffMs = prayerDate.getTime() - now.getTime();
      const diffHrs = Math.floor(
        (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const diffMins = Math.round((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      return { text: `in ${diffHrs}h ${diffMins}m`, isNext: true };
    }
  };

  // Base Timings (Inhen baad mein API se link kiya ja sakta hai)
  const timings = [
    { name: "Fajr", time: "05:15 AM" },
    { name: "Zuhr", time: "01:30 PM" },
    { name: "Asr", time: "05:00 PM" },
    { name: "Maghrib", time: "06:45 PM" },
    { name: "Isha", time: "08:15 PM" },
  ];

  // Logic to highlight only the first upcoming prayer
  let nextPrayerFound = false;
  const renderPrayerCards = () => {
    return timings.map((prayer, index) => {
      const statusObj = calculateStatus(prayer.time);
      let highlight = false;

      if (statusObj.isNext && !nextPrayerFound) {
        highlight = true;
        nextPrayerFound = true; // Agli kisi namaz ko highlight nahi karna
      }

      return (
        <PrayerCard
          key={index}
          name={prayer.name}
          time={prayer.time}
          status={statusObj.text}
          highlight={highlight}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#10B981" barStyle="light-content" />

      {/* 1. Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.appTitle}>Smart Jamat Finder</Text>
          <Text style={styles.dateText}>{currentDate}</Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/(tabs)/settings")}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* 2. Location Bar */}
      <View style={styles.locationBar}>
        <Ionicons
          name="location-sharp"
          size={18}
          color="white"
          style={{ opacity: 0.8 }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.locLabel}>Current Location</Text>
          <Text style={styles.locText}>{locationName}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Ionicons name="time-outline" size={20} color="#10B981" />
          <Text style={styles.sectionTitle}> Today's Prayer Times</Text>
        </View>

        {renderPrayerCards()}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* 4. Find Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.findButton}
          onPress={() => router.push("/(tabs)/mosques")}
        >
          <Ionicons
            name="search"
            size={20}
            color="white"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.btnText}>Find Nearby Mosques</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const PrayerCard = ({ name, time, status, highlight }: any) => (
  <View style={[styles.card, highlight && styles.activeCard]}>
    <View>
      <Text style={styles.prayerName}>{name}</Text>
      <Text style={styles.prayerTime}>{time}</Text>
    </View>
    <Text
      style={[
        styles.status,
        highlight && { color: "#10B981", fontWeight: "bold" },
      ]}
    >
      {status}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  header: {
    backgroundColor: "#10B981",
    padding: 20,
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appTitle: { color: "white", fontSize: 20, fontWeight: "bold" },
  dateText: { color: "#D1FAE5", fontSize: 13, marginTop: 2 },
  locationBar: {
    backgroundColor: "#059669",
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  locLabel: { color: "#A7F3D0", fontSize: 10 },
  locText: { color: "white", fontWeight: "600", fontSize: 14 },
  content: { padding: 20 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
    marginLeft: 5,
  },
  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
  },
  activeCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#10B981",
    backgroundColor: "#ECFDF5",
  },
  prayerName: { fontSize: 16, fontWeight: "bold", color: "#374151" },
  prayerTime: { color: "#6B7280", marginTop: 2, fontSize: 13 },
  status: { color: "#9CA3AF", fontSize: 13 },
  bottomContainer: { position: "absolute", bottom: 20, left: 20, right: 20 },
  findButton: {
    backgroundColor: "#10B981",
    padding: 16,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  btnText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
