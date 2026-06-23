import { Feather, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MosqueDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // 1. Data extraction
  const { name, location, lat, lon, dist, _id } = params;

  // 2. Timings parsing
  let timings: any = {
    Fajr: "--",
    Zuhr: "--",
    Asr: "--",
    Maghrib: "--",
    Isha: "--",
  };
  if (params.timings) {
    try {
      timings = JSON.parse(params.timings as string);
    } catch (e) {
      console.log("Error parsing timings");
    }
  }

  const openMaps = () => {
    const destination = `${lat},${lon}`;
    const label = encodeURI(name as string);
    const url = Platform.select({
      ios: `maps:0,0?q=${label}@${destination}`,
      android: `geo:0,0?q=${destination}(${label})`,
    });

    if (url) {
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Linking.openURL(`http://maps.google.com/?q=${destination}`);
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* ⚠️ FIX: Internet image hatayi, local asset lagayi aur resizeMode cover diya */}
      <ImageBackground
        source={require("../../assets/images/Masjid.jpeg")} // Dheyan rahe ke aapki tasweer isi folder path pe mojood ho!
        style={styles.headerImage}
        resizeMode="cover" // Yeh ensure karega ke image screen pe perfect fit ho bina katti hui lage
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.row}>
          <Ionicons name="location-outline" size={16} color="#10B981" />
          <Text style={styles.locationText}>{location}</Text>
        </View>
        <Text style={styles.distBadge}>{dist} km away</Text>

        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.directionBtn} onPress={openMaps}>
            <Feather name="navigation" size={18} color="white" />
            <Text style={styles.btnText}>Get Directions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reminderBtn}>
            <Feather name="bell" size={18} color="#10B981" />
            <Text style={[styles.btnText, { color: "#10B981" }]}>
              Set Reminder
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.timeCard}>
          <Text style={styles.cardTitle}>Today's Jamat Timings</Text>
          <TimeItem label="Fajr" time={timings.Fajr} strip />
          <TimeItem label="Zuhr" time={timings.Zuhr} />
          <TimeItem label="Asr" time={timings.Asr} strip />
          <TimeItem label="Maghrib" time={timings.Maghrib} />
          <TimeItem label="Isha" time={timings.Isha} strip />
        </View>

        {/* 👇 ADMIN LINK FIXED */}
        <TouchableOpacity
          style={styles.adminLinkContainer}
          onPress={() =>
            router.push({
              pathname: "/admin-login",
              params: { mosqueId: _id },
            })
          }
        >
          <Text style={styles.adminLinkText}>
            Mosque Admin? Update Jamat Timings
          </Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const TimeItem = ({ label, time, strip }: any) => (
  <View style={[styles.timeRow, strip && { backgroundColor: "#F0FDF4" }]}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.timeValue}>{time}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  headerImage: { width: "100%", height: 260, paddingTop: 50, paddingLeft: 20 }, // Height thori increase ki hai for better look
  backBtn: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
  name: { fontSize: 22, fontWeight: "bold", color: "#1F2937" },
  row: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  locationText: { color: "gray", marginLeft: 5, fontSize: 14 },
  distBadge: {
    color: "#10B981",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 14,
  },
  btnRow: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
  directionBtn: {
    flex: 1,
    backgroundColor: "#10B981",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 10,
    alignItems: "center",
  },
  reminderBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#10B981",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: { color: "white", fontWeight: "bold", marginLeft: 8 },
  timeCard: {
    marginTop: 30,
    backgroundColor: "#F9FAFB",
    borderRadius: 15,
    padding: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#374151",
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 8,
  },
  label: { fontWeight: "600", color: "#4B5563" },
  timeValue: { color: "#10B981", fontWeight: "bold" },
  adminLinkContainer: {
    marginTop: 30,
    alignItems: "center",
    paddingBottom: 20,
  },
  adminLinkText: {
    color: "#10B981",
    textDecorationLine: "underline",
    fontSize: 14,
    fontWeight: "600",
  },
});
