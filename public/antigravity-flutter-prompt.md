# Prompt for Antigravity — Convert nexoraa.works (React/Next.js) into a Native Flutter App

Copy-paste yeh **pura prompt** Antigravity mein. Yeh isliye likha gaya hai ki Antigravity already aapki website ka pura code/structure dekh sakta hai, isliye usko sirf "kya banana hai" aur "kis tarah organize karna hai" detail mein bata diya gaya hai.

---

## PROMPT (Antigravity ko ye exact text de dena)

```
You already have full access to my existing website project (React/Next.js) for www.nexoraa.works, 
including its complete file structure, components, pages, styles, assets, branding, fonts, colors, 
and content.

I now want you to build a NATIVE FLUTTER MOBILE APP version of this same website — a complete 
rebuild using Flutter widgets (NOT a WebView wrapper). This app should look and feel premium, 
matching the visual identity, branding, color palette, typography, spacing, animations, and overall 
UX of the existing website, but optimized for mobile (Android first, but keep code 
cross-platform-ready for iOS too).

### 1. PROJECT STRUCTURE & ISOLATION
- Create a brand new top-level folder named `flutter_app/` (sibling to the existing website 
  project, NOT inside it, so the website code stays untouched).
- Inside `flutter_app/`, initialize a standard Flutter project (use `flutter create`).
- Organize the Flutter project using a clean, scalable architecture:
  ```
  flutter_app/
    lib/
      main.dart
      core/
        theme/          -> app_theme.dart, colors.dart, text_styles.dart
        constants/       -> app_constants.dart, api_endpoints.dart
        utils/
        routes/          -> app_routes.dart
      features/
        home/
          screens/
          widgets/
        about/
        services/        (or whatever sections exist on the website)
        contact/
        ... (one folder per major website page/section)
      shared/
        widgets/          -> reusable buttons, cards, app_bar, bottom_nav, etc.
        models/
        services/         -> api_service.dart, network calls
      assets/
        images/
        icons/
        fonts/
    pubspec.yaml
    android/
    ios/
    README.md
  ```

### 2. DESIGN SYSTEM EXTRACTION (DO THIS FIRST)
Before writing any screen code:
- Inspect the website's global CSS / Tailwind config / theme files and extract:
  - Primary, secondary, accent, background, text colors (with exact hex codes)
  - Font families used (and download/include matching fonts as Flutter assets if they are 
    Google Fonts or custom fonts — add via `pubspec.yaml` and `google_fonts` package)
  - Spacing scale, border radius values, shadow styles, button styles
  - Any gradient backgrounds, hero section styles, card styles
- Create `lib/core/theme/app_theme.dart` and `colors.dart` that define a `ThemeData` matching 
  these exactly, so every screen uses consistent premium styling.

### 3. SCREEN-BY-SCREEN REBUILD
- Go through every page/route of the website (Home, About, Services, Portfolio/Projects, 
  Pricing, Blog, Contact, etc. — whatever pages exist in the project) and recreate each one as 
  a separate Flutter screen inside `lib/features/<section>/screens/`.
- Convert each website section/component (hero banner, navbar, footer, cards, testimonials, 
  forms, sliders, etc.) into reusable Flutter widgets placed in `lib/shared/widgets/`.
- Preserve the content, copywriting, images, icons, and layout hierarchy from the website — 
  just adapt it to mobile-friendly layouts (use `ListView`, `Column`, `GridView`, 
  `SingleChildScrollView`, `Responsive` helpers as needed).
- Recreate animations/transitions from the website using Flutter equivalents 
  (e.g., `AnimatedContainer`, `Hero`, `flutter_animate`, `Lottie` if Lottie animations exist 
  on the site).

### 4. NAVIGATION & STATE MANAGEMENT
- Implement bottom navigation bar or drawer navigation matching the website's main nav menu.
- Use `go_router` (or `Navigator 2.0`) for clean named routing — define all routes in 
  `lib/core/routes/app_routes.dart`.
- Use a lightweight state management solution (`Provider` or `Riverpod`) for managing app-wide 
  state (theme, user data, loading states, form data, etc.).

### 5. BACKEND / API / DATA INTEGRATION
- If the website fetches data from an API, CMS, or database (check for any `/api` routes, 
  `fetch`/`axios` calls, environment variables, or backend folders in the project):
  - Reuse the SAME backend/API endpoints — do not duplicate backend logic.
  - Create `lib/shared/services/api_service.dart` using the `http` or `dio` package to call 
    those same endpoints.
  - Create matching Dart model classes (in `lib/shared/models/`) for the JSON responses.
- If the website is fully static (no backend), keep the same static content but structure it 
  as Dart constants/JSON files inside `assets/data/` for easy future editing.
- Implement forms (Contact Us, Inquiry, Newsletter, etc.) so they submit to the same backend 
  endpoint the website uses.

### 6. ASSETS & BRANDING
- Copy all logos, icons, images, and fonts used by the website into 
  `flutter_app/assets/images/`, `assets/icons/`, `assets/fonts/`.
- Register them properly in `pubspec.yaml`.
- Generate proper app icon and splash screen using `flutter_launcher_icons` and 
  `flutter_native_splash` packages, using the website's logo/branding colors.
- Set the app name, package name (e.g., `com.nexoraa.app` or similar based on the brand), and 
  bundle identifiers appropriately in `android/app/build.gradle` and `ios/Runner/Info.plist`.

### 7. PREMIUM UI POLISH
- Ensure consistent padding/margins, smooth scroll behavior, ripple effects on buttons, 
  shimmer/loading skeletons for data-fetching screens, pull-to-refresh where relevant, and 
  proper empty/error states.
- Add subtle micro-interactions (button press animations, page transitions) to make the app 
  feel premium and native, matching or improving upon the website's UX.
- Make sure dark mode is supported if the website supports it, otherwise build a clean light 
  theme matching the brand.

### 8. ANDROID STUDIO SETUP & BUILD GUIDE
After the code is generated, create a file at `flutter_app/SETUP_GUIDE.md` that explains, 
step by step, in simple language:
1. Prerequisites: how to install Flutter SDK, Android Studio, and set up the Flutter/Dart 
   plugins inside Android Studio.
2. How to open the `flutter_app/` folder as a project in Android Studio.
3. How to run `flutter pub get` to install dependencies.
4. How to connect a real Android device (USB debugging) OR set up an emulator (AVD Manager).
5. How to run the app in debug mode (`flutter run` or the Run button).
6. How to generate a signed release APK/AAB for the Play Store 
   (keystore creation, `key.properties`, `build.gradle` signing config, 
   `flutter build apk --release` / `flutter build appbundle --release`).
7. Common errors and fixes (Gradle sync issues, SDK version mismatches, etc.).

### 9. FINAL DELIVERABLES CHECKLIST
At the end, provide a summary that confirms:
- [ ] `flutter_app/` folder created separately, fully working Flutter project
- [ ] All website pages rebuilt as native Flutter screens
- [ ] Theme/colors/fonts matched to website branding
- [ ] Navigation implemented (bottom nav / drawer)
- [ ] API/backend integration done (or static data structured cleanly)
- [ ] App icon, splash screen, and app name configured
- [ ] `SETUP_GUIDE.md` written for Android Studio build & APK generation
- [ ] No errors when running `flutter pub get` and `flutter run`

Work through this step by step. Start with Step 1 (project structure) and Step 2 
(design system extraction) first, show me the extracted theme/colors, and then proceed to 
rebuild each screen one by one so I can review progress incrementally.
```

---

## Iske baad aapko kya karna hai (short version)

1. Upar wala prompt Antigravity mein paste karo.
2. Antigravity step-by-step `flutter_app/` folder banayega, theme extract karega, fir screens banayega.
3. Jab kaam complete ho jaye, `flutter_app/` folder ko Android Studio mein **Open Project** se open karo.
4. Android Studio `flutter_app/SETUP_GUIDE.md` file zaroor padhna — usme APK build karne ka pura process likha hoga.
5. Real device ya emulator connect karke "Run" dabao — app chal jayega.

## Extra Tips
- Agar Antigravity bohot bada kaam ek sath karne lage aur beech mein ruk jaye, to usse boliye: 
  *"Pehle sirf Step 1 aur Step 2 karo, mujhe theme aur folder structure dikhao, baaki phir karenge."* 
  Isse kaam chunks mein hoga aur quality better rahegi.
- Backend/API wala part agar website mein hai (login, forms, database), to Antigravity ko 
  zaroor confirm karwana ki Flutter app **same backend** use kar rahi hai, naya backend nahi 
  bana raha — warna data mismatch ho sakta hai.
- Build se pehle ek baar `flutter doctor` command Android Studio terminal mein chala lena — 
  yeh batayega ki Flutter setup mein koi issue to nahi hai.
