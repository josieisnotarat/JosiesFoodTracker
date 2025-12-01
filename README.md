# Josie's Food Tracker

A modern food tracking app inspired by the provided reference UI. It supports barcode scanning, photo-based macro estimation, manual macro entry, and daily macro insights with automatic day rollover.

## Features
- **Scanner first** experience: choose barcode scanning or meal photo analysis to auto-populate macros.
- **Multi-provider nutrition lookup:** tries OpenFoodFacts, a secondary OpenFoodFacts mirror, then a local heuristic fallback so scans always produce data.
- **Carb limit guardrail:** warns when a meal crosses your carb cap and lets you override intentionally.
- **Daily dashboard:** calories-left ring, macro cards, and the log of meals you added from scans or manual input.
- **Analysis tab:** rolling 7-day averages and compliance vs. your macro targets.
- **Auto-advance day:** diary entries flip to the next calendar day shortly after midnight.
- **Manual entry:** add custom meals and macros if scanning is unavailable.

## Tech stack
- Expo (React Native) with React Navigation bottom tabs
- Expo Camera + Barcode Scanner
- React Native SVG for circular progress rings
- Day.js for date handling

## Getting started
1. Install dependencies (Node 18+ recommended):
   ```bash
   npm install
   ```
2. Start the Expo dev server (uses the local Expo CLI from `node_modules/.bin`, no global install required):
   ```bash
   npm start
   # or
   npx expo start
   ```
   - Press **a** to open Android emulator, **i** for iOS simulator (macOS), or scan the QR code with the Expo Go app on device.

## Packaging an APK (Android)
Expo simplifies Android builds with EAS (recommended) or the classic build service.

### Option 1: EAS build (recommended)
1. Install the EAS CLI:
   ```bash
   npm install -g eas-cli
   ```
2. Configure once:
   ```bash
   eas build:configure
   ```
3. Create an APK build:
   ```bash
   eas build --platform android --profile preview --local
   ```
   This produces an unsigned `app-release.apk` inside the `dist/` folder you can sideload. To ship to Play Store, run `eas build --platform android` to generate an AAB using Expo's cloud builders and follow the signing prompts.

### Option 2: Classic Expo build
If you prefer the legacy service:
```bash
expo build:android -t apk
```
Expo will guide you through signing and provide a downloadable APK.

## App assets
Binary assets (icons, splash screens) are not checked into this repository to avoid PR tooling restrictions. The app will fall back to Expo defaults. If you want custom branding:

1. Create an `assets/` folder.
2. Add your icon and splash images (1024x1024 PNGs work well).
3. Update `app.json` with `icon`, `splash.image`, and `android.adaptiveIcon.foregroundImage` paths that point to your new files.
4. Rebuild with EAS or the classic Expo build command.

## Notes on scanning and estimation
- **Barcode scanning:** uses Expo Barcode Scanner. Nutrition facts come from open data (OpenFoodFacts primary + mirror). If unavailable, the app returns a heuristic fallback so the flow never blocks the user.
- **Photo estimation:** wired to a deterministic placeholder in `useNutritionProviders.js`. Replace it with a hosted model (e.g., TFLite/ONNX microservice) by swapping out `estimateFromPhoto`.
- **Manual macros:** the "Manual add" form on the Plan tab lets you log meals even when offline.

## Project structure
- `App.js` – navigation shell and tab configuration
- `src/context/DiaryContext.js` – state, targets, carb limit, and midnight rollovers
- `src/screens/ScannerScreen.js` – barcode/photo capture UI and warnings
- `src/screens/PlanScreen.js` – daily macros, calories ring, meal log, manual form
- `src/screens/AnalysisScreen.js` – weekly summaries and compliance
- `src/screens/SettingsScreen.js` – carb limit + target visibility
- `src/hooks/useNutritionProviders.js` – barcode lookup + photo estimation helpers
- `src/components/*` – UI primitives (macro ring, grids, warnings, manual form)

## Extending
- Connect `estimateFromPhoto` to a real inference endpoint.
- Persist diary entries to a backend or local storage.
- Sync profile targets and thresholds from user settings.

