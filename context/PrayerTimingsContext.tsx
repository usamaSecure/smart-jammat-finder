import React, { createContext, useContext, useState } from "react";

// 1. Define the Shape of the Data
type TimingsType = {
  Fajr: string;
  Zuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Jummah: string;
};

// 2. Default Values
const defaultTimings: TimingsType = {
  Fajr: "05:30 AM",
  Zuhr: "01:15 PM",
  Asr: "04:45 PM",
  Maghrib: "06:30 PM",
  Isha: "08:00 PM",
  Jummah: "01:45 PM",
};

// 3. Create the Context
const PrayerTimingsContext = createContext<any>(null);

// 4. The Provider Component (Wraps the app)
export const PrayerTimingsProvider = ({ children }: any) => {
  const [timings, setTimings] = useState<TimingsType>(defaultTimings);

  return (
    <PrayerTimingsContext.Provider value={{ timings, setTimings }}>
      {children}
    </PrayerTimingsContext.Provider>
  );
};

// 👇 5. THE MISSING PIECE: The Custom Hook
// This allows other files to say: "const { timings } = usePrayerTimings();"
export const usePrayerTimings = () => {
  const context = useContext(PrayerTimingsContext);
  if (!context) {
    throw new Error(
      "usePrayerTimings must be used within a PrayerTimingsProvider",
    );
  }
  return context;
};

// 6. Default Export (for Expo Router requirements)
export default function PrayerTimingsContextRoute() {
  return null;
}
