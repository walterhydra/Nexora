# Nexoraa WebView App - Setup Guide

This guide explains how to open, build, run, and generate a release APK/AAB for the Nexoraa Flutter app using Android Studio.

## 1. Prerequisites
Before you start, ensure you have the following installed:
1. **Flutter SDK**: [Install Flutter](https://docs.flutter.dev/get-started/install).
2. **Android Studio**: Download and install [Android Studio](https://developer.android.com/studio).
3. **Flutter & Dart Plugins**: Open Android Studio -> Plugins -> search for "Flutter" and "Dart" and install them.

## 2. Opening the Project in Android Studio
1. Open Android Studio.
2. Click **Open**.
3. Navigate to your project folder and select the `flutter_webview_app` folder (NOT the parent Nexoraa folder).
4. Click **OK** to open the project. Android Studio might take a moment to index the files.

## 3. Installing Dependencies
1. Open the terminal inside Android Studio (View -> Tool Windows -> Terminal).
2. Run the following command to download all necessary packages:
   ```bash
   flutter pub get
   ```

## 4. Connecting a Device or Emulator
### Option A: Physical Device (Recommended for WebView Testing)
**Important Note:** WebView rendering and performance can behave differently on an emulator compared to a physical device. **Final testing should always be done on a real Android device.**
1. Enable **Developer Options** on your Android phone (Settings -> About Phone -> tap "Build Number" 7 times).
2. Go to Developer Options and enable **USB Debugging**.
3. Connect your phone to your computer via USB.
4. Allow USB debugging on your phone when prompted.

### Option B: Emulator
1. In Android Studio, click the **Device Manager** icon (top right).
2. Click **Create Device**, choose a phone model (e.g., Pixel 7), and click Next.
3. Download a system image (e.g., API 34) and finish the setup.
4. Click the Play button in the Device Manager to start the emulator.

## 5. Running the App in Debug Mode
1. Ensure your device/emulator is selected in the device dropdown menu in the top toolbar of Android Studio.
2. Click the green **Run (Play)** button, or run the following command in the terminal:
   ```bash
   flutter run
   ```
3. The app will compile and launch on your device/emulator.

## 6. Generating a Signed Release (APK or App Bundle)
To upload to the Play Store, you need an App Bundle (.aab). To share the app directly with users, you need an APK (.apk).

### Step 6.1: Create a Keystore
Run this command in your terminal to generate a secure keystore file. Remember the password you set!
```bash
keytool -genkey -v -keystore upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```
*Note: Keep this `.jks` file safe. If you lose it, you won't be able to update your app on the Play Store.*

### Step 6.2: Configure Signing in Gradle
1. Create a file named `key.properties` inside `flutter_webview_app/android/`:
   ```properties
   storePassword=your_password_here
   keyPassword=your_password_here
   keyAlias=upload
   storeFile=../upload-keystore.jks
   ```
2. Open `flutter_webview_app/android/app/build.gradle.kts`.
3. Before the `android { ... }` block, add the keystore logic (refer to the [official Flutter documentation](https://docs.flutter.dev/deployment/android#configure-signing-in-gradle) for the exact syntax if needed, though for a quick build you can often manually specify the `signingConfigs` directly).
   *By default, the provided `build.gradle.kts` uses the `debug` signing config for release so you can test `--release` builds quickly. For Google Play, you MUST replace it with your custom keystore config.*

### Step 6.3: Build the App
Run one of the following commands in the terminal:
- **To build an App Bundle (for Google Play):**
  ```bash
  flutter build appbundle --release
  ```
  *(Output: `build/app/outputs/bundle/release/app-release.aab`)*

- **To build an APK (for direct sharing):**
  ```bash
  flutter build apk --release
  ```
  *(Output: `build/app/outputs/flutter-apk/app-release.apk`)*

## 7. Troubleshooting & Common Issues

### 1. "Mixed Content" or Cleartext Traffic Issues
If the website loads fine in Chrome but fails or looks broken in the app, it might be trying to load `http://` (non-secure) resources instead of `https://`.
By default, Android blocks cleartext (HTTP) traffic.
**Fix:**
If you absolutely must allow HTTP traffic, add `android:usesCleartextTraffic="true"` to your `<application>` tag in `android/app/src/main/AndroidManifest.xml`:
```xml
<application
    android:usesCleartextTraffic="true"
    ...>
```

### 2. External Links or Downloads Not Working
If links to external sites, PDFs, or `mailto:` don't do anything, ensure `useShouldOverrideUrlLoading: true` and `useOnDownloadStart: true` are set in the `InAppWebViewSettings` in `webview_screen.dart` (this is already done in the current codebase).

### 3. Login Session Not Saving
If you log in to the portal and it logs you out when you close the app, ensure `incognito: false` is set in the `InAppWebViewSettings` (already done).

### 4. Blank White Screen on Launch
This usually means the WebView hasn't finished loading yet. The app uses `flutter_native_splash` to show your logo while the WebView loads in the background, making the transition seamless. If you see a white screen, check your internet connection or ensure `AndroidManifest.xml` has the `INTERNET` permission.
