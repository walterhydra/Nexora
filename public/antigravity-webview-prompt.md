# Prompt for Antigravity — Convert nexoraa.works into a WebView-based Flutter App

Copy-paste yeh **pura prompt** Antigravity mein. Yeh approach pehle wale "Full Native Rebuild" se 
bilkul alag hai — yahan website ko hi ek polished, app-like wrapper ke andar load karwaya jayega. 
Isme development time bohot kam lagta hai, but final result website jaisa hi dikhega 
(responsive design website ke CSS pe depend karega).

---

## PROMPT (Antigravity ko ye exact text de dena)

```
You already have full access to my existing website project (React/Next.js) for www.nexoraa.works, 
including its complete file structure, branding, colors, fonts, and assets.

I now want you to build a WEBVIEW-BASED FLUTTER MOBILE APP that wraps this live website 
(https://www.nexoraa.works) inside a polished, native-feeling container — NOT a full native 
rebuild. The goal is a premium "hybrid app" experience: fast to build, but feels like a real 
app, not just a browser tab.

### 1. PROJECT STRUCTURE & ISOLATION
- Create a brand new top-level folder named `flutter_webview_app/` (sibling to the existing 
  website project, NOT inside it).
- Initialize a standard Flutter project inside it using `flutter create`.
- Organize as:
  ```
  flutter_webview_app/
    lib/
      main.dart
      core/
        theme/         -> colors.dart, app_theme.dart (matching website branding)
        constants/      -> app_constants.dart (base URL, app routes mapping)
      screens/
        splash_screen.dart
        webview_screen.dart
        no_internet_screen.dart
        error_screen.dart
      widgets/
        custom_app_bar.dart (optional)
        loading_indicator.dart
    assets/
      images/           -> logo, splash image
      icons/
    pubspec.yaml
    android/
    ios/
    README.md
    SETUP_GUIDE.md
  ```

### 2. CORE WEBVIEW SETUP
- Use the `webview_flutter` package (latest stable version) along with 
  `webview_flutter_android` and `webview_flutter_webkit` for platform-specific tuning.
- Load `https://www.nexoraa.works` as the home URL.
- Enable JavaScript execution (`JavaScriptMode.unrestricted`) since the site likely uses 
  React/Next.js client-side rendering.
- Set the WebView's background color to match the website's dark theme background 
  (`#070709` / `#0a0a0f`) to avoid white flashes during load.
- Inject a custom **User-Agent string** identifying requests as coming from "NexoraaApp" 
  (useful if the website backend ever needs to detect app traffic vs browser traffic).

### 3. NAVIGATION & BACK BUTTON HANDLING
- Implement Android hardware back-button behavior:
  - If the WebView can go back (`canGoBack()`), navigate back within the WebView history.
  - If the WebView is on the home page and has no history, show an "Exit App?" confirmation 
    dialog (double back-press to exit), styled to match the app's dark theme.
- Handle external links properly: if the website has links to external domains (e.g., social 
  media, WhatsApp, payment gateways, mailto: links, tel: links), open those in the device's 
  default browser/app using `url_launcher` instead of loading inside the WebView.

### 4. SPLASH SCREEN & APP IDENTITY
- Create a native splash screen using `flutter_native_splash`, using the Nexoraa logo on a 
  dark background (`#070709`), matching the website's first-load feel.
- Generate the app icon using `flutter_launcher_icons` based on the Nexoraa logo/favicon.
- Set app display name to "Nexoraa" and configure package name (e.g., `com.nexoraa.app`) in 
  `android/app/build.gradle` and `ios/Runner/Info.plist`.
- Show the splash screen until the WebView's first page finishes loading 
  (use `onPageFinished` callback to dismiss it), so the app doesn't feel like a blank white 
  screen on launch.

### 5. LOADING, ERROR & OFFLINE STATES
- Show a custom loading indicator (matching brand colors — cyan `#00F5FF` / violet `#7B2FFF` 
  spinner or shimmer) while the WebView is loading any page.
- Detect internet connectivity using `connectivity_plus`. If there's no internet:
  - Show a custom "No Internet Connection" screen (styled with the app's dark theme and 
    branding) with a "Retry" button that reloads the WebView once connection is restored.
- Handle WebView load errors (`onWebResourceError`) gracefully — show a custom error screen 
  with a "Retry" button instead of the default browser error page.

### 6. PULL-TO-REFRESH & UX ENHANCEMENTS
- Implement pull-to-refresh on the WebView (using `RefreshIndicator` wrapping the WebView, or 
  injecting a custom pull-to-refresh gesture) so users can reload the current page naturally.
- Hide the WebView's default scrollbar if it looks non-native; rely on Flutter's native scroll 
  feel.
- If the website has a fixed navbar/footer that looks odd inside a mobile WebView, consider 
  injecting custom CSS via JavaScript (`runJavaScript`) on page load to hide elements that 
  don't make sense in an app context (e.g., a "Download App" banner, or a website footer that 
  duplicates app navigation) — but only do this if it visibly improves the experience.

### 7. FILE UPLOADS, CAMERA & PERMISSIONS (IF APPLICABLE)
- If the website has any forms that allow file/image uploads (e.g., contact forms, profile 
  pictures, client portal document uploads), ensure the WebView supports file picker access:
  - Add required permissions in `AndroidManifest.xml` (camera, storage/media access).
  - Use `webview_flutter`'s file selector support or a plugin like 
    `flutter_inappwebview` if `webview_flutter` has limitations with file inputs 
    (consider switching the whole implementation to `flutter_inappwebview` if it gives 
    better control over downloads, file uploads, and JS injection — evaluate and recommend 
    which package is better for this project).

### 8. DEEP LINKING & NOTIFICATIONS (OPTIONAL BUT RECOMMENDED)
- Set up basic deep linking so that if the app is opened via a link (e.g., 
  `https://www.nexoraa.works/services`), it opens directly to that page inside the WebView 
  instead of always starting at the homepage.
- If the website has any subscription/contact forms that could benefit from push 
  notifications later (e.g., new updates, offers), note this as a future enhancement but do 
  NOT implement Firebase push notifications unless I explicitly ask for it in a later step.

### 9. PERFORMANCE & POLISH
- Enable WebView caching (`WebViewCookieManager` and cache mode set to load from cache when 
  offline-capable) so revisits feel faster.
- Disable zoom/pinch gestures on the WebView if the website is fully responsive and zoom 
  would break the layout (`setSupportZoom(false)` equivalent), unless zoom is needed for 
  accessibility — use your judgment based on the site's responsiveness.
- Set status bar color and navigation bar color (Android) to match the website's dark 
  background (`#070709`) for a seamless, immersive look (`SystemChrome.setSystemUIOverlayStyle`).

### 10. ANDROID STUDIO SETUP & BUILD GUIDE
Create a file at `flutter_webview_app/SETUP_GUIDE.md` explaining step by step:
1. Prerequisites: installing Flutter SDK, Android Studio, Flutter/Dart plugins.
2. Opening `flutter_webview_app/` as a project in Android Studio.
3. Running `flutter pub get`.
4. Connecting a real device (USB debugging) or setting up an emulator.
5. Running the app in debug mode.
6. Generating a signed release APK/AAB (keystore creation, `key.properties`, signing config 
   in `build.gradle`, `flutter build apk --release` / `flutter build appbundle --release`).
7. Common issues: WebView not loading (check `AndroidManifest.xml` internet permission), 
   blank white screen on launch (splash screen timing), back button not working as expected.

### 11. FINAL DELIVERABLES CHECKLIST
- [ ] `flutter_webview_app/` folder created separately, fully working Flutter project
- [ ] WebView loads https://www.nexoraa.works correctly with JS enabled
- [ ] Back button behavior implemented (in-page back + exit confirmation)
- [ ] External links (social, mailto, tel, payment) open outside the WebView
- [ ] Splash screen, app icon, app name, package name configured to match branding
- [ ] Loading indicator, no-internet screen, and error screen implemented with brand styling
- [ ] Pull-to-refresh implemented
- [ ] File upload/camera permissions handled (if website has upload forms)
- [ ] Status bar/navigation bar colors matched to website theme
- [ ] `SETUP_GUIDE.md` written for Android Studio build & APK generation
- [ ] No errors when running `flutter pub get` and `flutter run`

Work through this step by step. Start with Step 1 (project setup) and Step 2 (core WebView 
implementation), confirm it loads the website correctly, then proceed with splash screen, 
error/offline handling, and remaining polish items one at a time so I can test each stage.
```

---

## Iske baad aapko kya karna hai (short version)

1. Upar wala prompt Antigravity mein paste karo.
2. Antigravity `flutter_webview_app/` folder banayega aur basic WebView setup karke pehle 
   confirm karega ki website load ho rahi hai ya nahi.
3. Phir splash screen, error/offline screens, back button handling, aur baaki polish step by 
   step add hoga.
4. Jab kaam complete ho jaye, `flutter_webview_app/` folder ko Android Studio mein **Open 
   Project** se open karo, `SETUP_GUIDE.md` follow karo, aur APK build karo.

## Important Notes
- **Internet permission zaroor check karo** — `AndroidManifest.xml` mein 
  `<uses-permission android:name="android.permission.INTERNET" />` line honi chahiye, warna 
  WebView blank rahega. Antigravity ko yeh add karna chahiye, but agar app blank dikhe to 
  yeh pehli cheez check karo.
- **WebView vs Native Rebuild**: WebView approach **bohot fast** hai (1-2 din ka kaam ho sakta 
  hai) but performance/feel website jaisa hi rahega (native animations/transitions nahi 
  milenge). Native rebuild premium feel deta hai but time/cost zyada hai. Aap dono try karke 
  dekh sakte ho — same `nexoraa.works` codebase se dono alag folders mein ban sakte hain.
- Agar website ka koi backend feature (Supabase login, forms) hai, WebView approach mein woh 
  **automatically kaam karega** kyunki yeh same website hi load kar raha hai — yeh WebView ka 
  bada advantage hai.
