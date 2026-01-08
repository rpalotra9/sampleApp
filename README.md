# SampleApp - React Native Subscription Management

A React Native CLI application for managing subscriptions with a beautiful and intuitive user interface. This app allows users to edit subscription details including app selection, amount, category, date, frequency, and reminder preferences.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running on Android](#running-on-android)
- [Running on iOS](#running-on-ios)
- [Project Structure](#project-structure)
- [Features](#features)
- [Technologies Used](#technologies-used)

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (>= 20) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **React Native CLI** - Install globally: `npm install -g react-native-cli`
- **Android Studio** (for Android development) - [Download](https://developer.android.com/studio)
- **Xcode** (for iOS development, macOS only) - [Download](https://developer.apple.com/xcode/)
- **CocoaPods** (for iOS) - Install: `sudo gem install cocoapods`

### Additional Setup

#### Android
- Android SDK (API level 33 or higher)
- Android Emulator or physical device
- Java Development Kit (JDK) 17 or higher

#### iOS (macOS only)
- Xcode Command Line Tools: `xcode-select --install`
- iOS Simulator or physical device
- CocoaPods: `sudo gem install cocoapods`

## 📦 Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd SampleApp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

   Or using yarn:
   ```bash
   yarn install
   ```

3. **Install iOS dependencies** (iOS only):
   ```bash
   cd ios
   pod install
   cd ..
   ```

   > **Note**: For iOS, you need to run `pod install` in the `ios` directory. This only needs to be done once or after updating native dependencies.

## 🤖 Running on Android

### Prerequisites
- Android Studio installed
- Android Emulator running OR physical device connected via USB with USB debugging enabled

### Steps

1. **Start Metro Bundler** (in one terminal):
   ```bash
   npm start
   ```
   
   Or:
   ```bash
   yarn start
   ```

2. **Run the Android app** (in a new terminal):
   ```bash
   npm run android
   ```
   
   Or:
   ```bash
   yarn android
   ```

   This will:
   - Build the Android app
   - Install it on the connected device/emulator
   - Launch the app

### Alternative: Run from Android Studio

1. Open Android Studio
2. Open the `android` folder in Android Studio
3. Wait for Gradle sync to complete
4. Click the "Run" button or press `Shift + F10`

### Troubleshooting Android

- **Metro bundler not starting**: Try `npm start -- --reset-cache`
- **Build errors**: Clean the build: `cd android && ./gradlew clean && cd ..`
- **Device not detected**: Run `adb devices` to check connected devices
- **Port already in use**: Kill the process using port 8081: `lsof -ti:8081 | xargs kill -9`

## 🍎 Running on iOS

### Prerequisites
- macOS with Xcode installed
- iOS Simulator OR physical device connected
- CocoaPods installed

### Steps

1. **Install CocoaPods dependencies** (first time only or after updating native deps):
   ```bash
   cd ios
   pod install
   cd ..
   ```

2. **Start Metro Bundler** (in one terminal):
   ```bash
   npm start
   ```
   
   Or:
   ```bash
   yarn start
   ```

3. **Run the iOS app** (in a new terminal):
   ```bash
   npm run ios
   ```
   
   Or:
   ```bash
   yarn ios
   ```

   This will:
   - Build the iOS app
   - Install it on the iOS Simulator or connected device
   - Launch the app

### Run on Specific Simulator

To run on a specific iOS simulator:
```bash
npm run ios -- --simulator="iPhone 15 Pro"
```

### Alternative: Run from Xcode

1. Open `ios/SampleApp.xcworkspace` (not `.xcodeproj`) in Xcode
2. Select a simulator or device from the device dropdown
3. Click the "Run" button or press `Cmd + R`

### Troubleshooting iOS

- **Pod install errors**: Try `cd ios && rm -rf Pods Podfile.lock && pod install && cd ..`
- **Build errors**: Clean build folder in Xcode: `Product > Clean Build Folder` (or `Cmd + Shift + K`)
- **Metro bundler issues**: Reset cache: `npm start -- --reset-cache`
- **CocoaPods issues**: Update CocoaPods: `sudo gem install cocoapods`

## 📁 Project Structure

```
SampleApp/
├── App.tsx                    # Main app entry point
├── package.json               # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── babel.config.js           # Babel configuration
├── metro.config.js           # Metro bundler configuration
│
├── android/                   # Android native code
│   ├── app/
│   ├── build.gradle
│   └── ...
│
├── ios/                       # iOS native code
│   ├── SampleApp/
│   ├── Podfile
│   └── ...
│
└── src/                       # Source code
    ├── assets/                # Static assets
    │   ├── fonts/             # Custom fonts (Graphik)
    │   └── icons/             # SVG icons
    │       └── index.ts       # Icon exports
    │
    ├── components/            # Reusable UI components
    │   ├── AmountInputModal.tsx
    │   ├── AppSelectionModal.tsx
    │   ├── BaseModal.tsx
    │   ├── Card.tsx
    │   ├── CategorySelectionModal.tsx
    │   ├── DatePickerModal.tsx
    │   ├── DatePickerRow.tsx
    │   ├── Divider.tsx
    │   ├── DropdownRow.tsx
    │   ├── Header.tsx
    │   ├── Icon.tsx
    │   ├── ModalListItem.tsx
    │   ├── SearchInput.tsx
    │   ├── SelectionModal.tsx
    │   ├── Text.tsx
    │   ├── ToggleRow.tsx
    │   └── index.ts          # Component exports
    │
    ├── constants/             # Application constants
    │   ├── colors.ts         # Color constants
    │   ├── texts.ts          # Text constants
    │   └── index.ts          # App data (apps, categories, etc.)
    │
    ├── navigation/            # Navigation configuration
    │   └── AppNavigator.tsx  # Stack navigator setup
    │
    ├── screens/               # Screen components
    │   └── EditSubscriptionScreen.tsx
    │
    ├── types/                 # TypeScript type definitions
    │   ├── index.ts          # Type interfaces
    │   └── svg.d.ts         # SVG module declarations
    │
    └── utils/                 # Utility functions
        └── index.ts          # Helper functions (formatCurrency, formatDate, etc.)
```

## ✨ Features

- **App Selection**: Choose from a list of available apps with search functionality
- **Amount Input**: Enter subscription amount with numeric keypad
- **Category Selection**: Select subscription category with icons
- **Date Picker**: Platform-specific date picker (iOS native spinner, Android custom wheel)
- **Frequency Selection**: Choose billing frequency (Weekly, Monthly, Annually)
- **Reminder Settings**: Set reminder preferences
- **Active Toggle**: Enable/disable subscription status
- **Save Functionality**: Save button with validation (disabled when no app selected)
- **Delete Option**: Delete subscription option
- **Beautiful UI**: Modern, clean design with consistent styling
- **Cross-platform**: Works seamlessly on both iOS and Android

## 🛠 Technologies Used

- **React Native** (0.83.1) - Mobile app framework
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Navigation library
- **React Native SVG** - SVG icon support
- **React Native Safe Area Context** - Safe area handling
- **@react-native-community/datetimepicker** - Date picker component
- **React Native Gesture Handler** - Gesture handling

## 📝 Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## 🔄 Fast Refresh

The app supports Fast Refresh, so changes you make to the code will automatically reflect in the app without needing to rebuild.

- **Android**: Press `R` twice or `Ctrl + M` (Windows/Linux) / `Cmd + M` (macOS) for Dev Menu
- **iOS**: Press `R` in the simulator or `Cmd + D` for Dev Menu

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler cache issues**: 
   ```bash
   npm start -- --reset-cache
   ```

2. **Android build errors**:
   ```bash
   cd android && ./gradlew clean && cd ..
   ```

3. **iOS pod install issues**:
   ```bash
   cd ios && rm -rf Pods Podfile.lock && pod install && cd ..
   ```

4. **Port 8081 already in use**:
   ```bash
   lsof -ti:8081 | xargs kill -9
   ```

5. **Node modules issues**:
   ```bash
   rm -rf node_modules && npm install
   ```

## 📚 Learn More

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 📄 License

This project is for demonstration purposes.

---

**Note**: Make sure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) guide before running the app.
