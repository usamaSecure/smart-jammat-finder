# 🕌 Smart Jammat Finder

<div align="center">

![Smart Jammat Finder Banner](https://img.shields.io/badge/Smart-Jammat%20Finder-00A86B?style=for-the-badge&logo=mosque&logoColor=white)

**Never miss a Jammat again.**

A React Native mobile application that helps Muslims locate nearby mosques and view accurate prayer (Jammat) timings — all from the palm of their hand.

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev/)
[![Version](https://img.shields.io/badge/Version-1.0-00A86B?style=flat-square)](https://github.com/)
[![Status](https://img.shields.io/badge/Status-In%20Development-orange?style=flat-square)](https://github.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

</div>

---

## 📖 About The Project

**Smart Jammat Finder** is a Final Year Project developed at **Hamdard University, Department of Computing** (FYP-043/FA25). The application is designed to make it easier for Muslims to locate nearby mosques and access their daily prayer (Jammat) timings in a simple and intuitive mobile interface.

Whether you're at home, traveling, or in an unfamiliar area — Smart Jammat Finder ensures you're always connected to your nearest mosque.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗺️ **Nearby Mosques** | Discover mosques around you with distances and addresses |
| 🕐 **Jammat Timings** | View all five daily prayer times (Fajr, Zuhr, Asr, Maghrib, Isha) |
| 🕋 **Jummah Prayer** | Dedicated Friday Jummah prayer timing display |
| 🔔 **Prayer Reminders** | Set reminders so you never miss a Jammat |
| 🧭 **Get Directions** | Navigate directly to any mosque |
| 🛡️ **Admin Panel** | Mosque administrators can update and manage timings |
| 🌙 **Dark Mode** | Comfortable viewing in any lighting condition |
| 🔍 **Search** | Quickly find a specific mosque by name |
| 🔔 **Notifications** | Smart prayer time notifications |

---

## 📱 Screenshots

<div align="center">

| Home Screen | Nearby Mosques | Mosque Details |
|---|---|---|
| Today's prayer times at a glance | Browse mosques sorted by distance | Full Jammat schedule + directions |

| Admin Login | Admin Panel | Settings |
|---|---|---|
| Secure mosque admin access | Update prayer timings easily | Dark mode, notifications, language |

</div>

---

## 🛠️ Tech Stack

- **Framework:** [React Native](https://reactnative.dev/)
- **Platform:** [Expo](https://expo.dev/)
- **IDE:** Visual Studio Code
- **Architecture:** Component-Based (Modular UI)
- **Language:** JavaScript / JSX

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client) app on your mobile device (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/smart-jammat-finder.git
   cd smart-jammat-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your device**
   - Scan the QR code with the **Expo Go** app (Android/iOS)
   - Or press `a` for Android emulator / `i` for iOS simulator

---

## 📁 Project Structure

```
smart-jammat-finder/
├── assets/                  # Images, icons, and fonts
├── components/              # Reusable UI components
│   ├── MosqueCard.jsx
│   ├── PrayerTimingRow.jsx
│   └── ...
├── screens/                 # App screens
│   ├── HomeScreen.jsx       # Dashboard with today's prayer times
│   ├── NearbyMosques.jsx    # List of nearby mosques
│   ├── MosqueDetails.jsx    # Individual mosque details & timings
│   ├── AdminLogin.jsx       # Admin authentication screen
│   ├── AdminPanel.jsx       # Mosque timing management
│   └── Settings.jsx         # User preferences
├── navigation/              # Stack & tab navigation
├── data/                    # Static mosque sample data
├── App.jsx                  # App entry point
└── README.md
```

---

## 🗺️ Roadmap

- [x] Home screen with today's prayer times
- [x] Nearby mosques listing
- [x] Mosque details & Jammat timings
- [x] Admin login & timing management panel
- [x] Settings screen (dark mode, notifications)
- [x] Onboarding screens
- [ ] Real-time GPS-based mosque discovery
- [ ] Live backend & database integration
- [ ] User authentication & profiles
- [ ] Multi-language support (Urdu, Arabic)
- [ ] Qibla direction compass
- [ ] Islamic calendar integration

---

## 👥 Team

| Name | Role | ID |
|---|---|---|
| **Syed Usama** | Team Lead | 2041-2022 |
| **Abdul Wahab** | Team Member | 3026-2022 |
| **M. Ammar** | Team Member | 3031-2022 |

**Supervisor:** Faheem Ahmed
**University:** Hamdard University — Department of Computing
**Project Code:** FYP-043/FA25 | Spring 2025

---

## 📄 Documentation

- [Software Design Specifications (SDS)](docs/SDS.pdf)
- [Software Requirements Specifications (SRS)](docs/SRS.pdf)

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve this project:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ for the Muslim community | Hamdard University FYP 2025

</div>
