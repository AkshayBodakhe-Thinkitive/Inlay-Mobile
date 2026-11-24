# App Base Structure — template for a new project

What this repo does underneath its patient-specific features, written so it can be copied to start a
new Expo / React Native app. Everything here is taken from the code as of 2026-11-23.
(`PROJECT_ARCHITECTURE.md` at the repo root is out of date: it still says Expo Router; the app uses React Navigation.)

---

## At a glance

```
project/
├── App.tsx                  providers, fonts, splash, deep links, auth rehydration
├── index.ts                 app entry
├── app.json  eas.json       Expo config, build profiles
├── .env.example             all EXPO_PUBLIC_* variables
├── babel / metro / tailwind / tsconfig config files
├── assets/                  fonts, icons, logos, svg
├── plugins/                 Expo config plugins (native tweaks)
├── modules/                 local native modules (optional)
├── docs/  scripts/  .husky/  .github/
│
└── src/
    ├── navigation/
    │   ├── RootNavigator    auth → profile chooser → app
    │   ├── AuthNavigator
    │   ├── AppNavigator     tabs + pushed screens
    │   ├── CustomTabBar     tab bar + More menu
    │   └── types.ts
    │
    ├── shared/              used by 2+ features
    │   ├── api/             axios client, retry, errors, mock mode
    │   ├── components/      button, input, toast, loader, header, sheets
    │   ├── config/          env flags, environments, runtime base URL
    │   ├── constants/       colors, fonts, layout
    │   ├── context/         font scale
    │   ├── hooks/           connectivity, paging, keyboard
    │   ├── i18n/            en.json, hi.json
    │   ├── services/        push notifications, crash reporting
    │   ├── store/           Redux: auth, toast, error, connectivity
    │   ├── types/
    │   └── utils/
    │
    └── features/
        ├── splash/
        ├── auth/            login, OTP, consent, profile chooser
        └── <feature>/       one folder per product area
            ├── screens/
            ├── components/
            ├── hooks/
            ├── services/    the only place that calls the API
            ├── types/
            └── mock/
```

Inside a feature the flow is screen → hook → service → API client. `shared/` never imports from `features/`
(two known exceptions, see §3). Section 2 below has the fuller version.

---

## 1. Stack

| Concern | Choice |
|---|---|
| Runtime | Expo SDK 57 (dev client + prebuild, not Expo Go), React Native 0.86, React 19, TypeScript strict |
| Navigation | React Navigation 7: native stack + bottom tabs, typed param lists, deep links via `linking` |
| App state | Redux Toolkit (auth session, toast, error popup, connectivity) |
| Server state | TanStack Query v5 (lists, details, paging) |
| HTTP | axios instance with interceptors (see §5) |
| Forms / validation | react-hook-form + zod |
| Styling | Plain `StyleSheet` + shared `Colors` / `FontFamily` constants; NativeWind is installed |
| Sizing | `react-native-responsive-dimensions` + a font-scale context |
| i18n | i18next + react-i18next; `en.json` and `hi.json`, both maintained |
| Storage | `expo-secure-store` for tokens, AsyncStorage for non-secret prefs |
| Push / crash | `@react-native-firebase/{app,messaging,crashlytics}` + `expo-notifications` |
| SVG | `react-native-svg` + `react-native-svg-transformer` (import `.svg` as a component) |
| Builds | EAS profiles: development, preview, qa, uat, production |

---

## 2. Folder layout (base only)

```
App.tsx                      providers, fonts, splash, deep-link config, auth rehydration
index.ts                     registerRootComponent
app.json  eas.json           Expo config, EAS profiles
babel.config.js metro.config.js tailwind.config.js tsconfig.json
.env.example                 every EXPO_PUBLIC_* variable, documented
svg.d.ts nativewind-env.d.ts ambient types
assets/                      fonts/ (Inter), icons, logos, svg
plugins/                     custom Expo config plugins (iOS/Android native tweaks)
modules/                     local native modules (here: jumper-sdk) — omit if you have none
scripts/  docs/  .husky/  .github/

src/
  navigation/                RootNavigator, AuthNavigator, AppNavigator, CustomTabBar, types.ts
  shared/                    code used by 2+ features — never imports from a feature (see §3)
    api/                     client.ts, retryPolicy, retryQueue, errorMessages, paramsSerializer, mockMode
    components/              ButtonComponent, TextInput, Toast, ErrorPopup, ConnectivityBanner, Loader,
                             ScreenHeader, Icons, sheets …
    config/                  env.ts (feature flags), environments.ts, envStore.ts
    constants/               colors.ts, FontConstants.ts, layout.ts, routes.ts
    context/                 FontScaleContext
    hooks/                   useConnectivity, usePagedLoad, useScrollPaging, useKeyboardHeight …
    i18n/                    index.ts, locales/en.json, locales/hi.json
    services/                notificationService, crashlyticsService
    store/                   index.ts (configureStore), hooks.ts, selectors.ts, toast/error/connectivity slices
    types/                   ApiError and other cross-feature types
    utils/                   formatters, resetApp, clearLocalData …
  features/
    <feature>/               one folder per product area (see §3)
    splash/                  animated launch screen
```

Features in this repo (domain-specific — do **not** copy): appointments, auth, chartLive, clinical,
devices, doctors, help, home, messages, notifications, payments, profile, records, symptoms, trends.
Keep `auth`, `splash`, and the shell of `profile` / `notifications` if your app has accounts and push.

---

## 3. Feature anatomy and the dependency rule

Every feature has the same shape; create only the folders you need.

```
features/<feature>/
  screens/        *Screen.tsx — compose components, call hooks, no API calls
  components/     UI used by this feature
  hooks/          useX.ts — TanStack Query hooks or screen logic
  services/       xService.ts — the ONLY place that calls apiClient for this feature
  store/          slice, only when the state must be global (auth, notifications)
  types/ or types.ts   request/response types copied from the API schema
  utils/          pure helpers (mappers, formatters)
  mock/           fixtures used when EXPO_PUBLIC_USE_MOCK=true
```

Rules the code follows:
- **Flow:** screen → hook → service → `apiClient`. Screens never import axios.
- **`shared/` never imports from `features/`.** Features may import `shared/` freely, and may import
  another feature's hook or type when truly needed (e.g. notifications routes to a clinical screen).
  Known exception to avoid copying: `shared/api/client.ts` and `shared/store/index.ts` import auth/notification slices.
- **Redux vs React Query:** server data (lists, details, paging) lives in React Query; only session,
  toasts, error popup, connectivity and live counters live in Redux.
- **Types come from the API schema** (Swagger), not guessed. Every service/type file notes what it was checked against.
- **Strings:** no hardcoded UI text; add the key to both `en.json` and `hi.json`.
- **Safe areas:** full-screen stack screens use `SafeAreaView edges={['top','bottom']}` (Android is edge-to-edge,
  so a missing bottom edge hides the last button behind the nav bar). Tab screens leave the bottom to the tab bar.

---

## 4. App shell (`App.tsx` and navigation)

Provider order, outermost first:

`SafeAreaProvider` → `FontScaleProvider` → Redux `Provider` → `QueryClientProvider` → `AppRoot`,
with `Toast`, `ErrorPopup`, `ConnectivityBanner` and `StatusBar` rendered as siblings of `AppRoot`.

- Fonts load with `expo-font` before anything renders (Inter Regular/Medium/SemiBold/Bold).
- `AppRoot` hydrates the environment, then reads the saved token + profile from SecureStore and dispatches
  `rehydrateAuth`; the splash stays up until the animation **and** rehydration are both done.
- `RootNavigator` swaps one stack: `Auth` (not signed in) → profile chooser (signed in, no active profile) → `App`.
  Keying the navigator on the active profile id remounts the whole tree on a profile switch, so every screen refetches.
- `AppNavigator` = a native stack with the bottom-tab navigator as its first screen, then every pushed screen.
  `CustomTabBar` draws the tab bar and the "More" sheet. Add each new screen to the stack **and** to `navigation/types.ts`.
- Deep links: `linking` in `App.tsx` with a custom scheme plus the https domain; its `screens` config must mirror
  the navigator nesting.
- `docs/project-arch/navigation-tree.md` maps every screen to its folder and entry points — keep one in the new project.

---

## 5. API layer (`shared/api/client.ts`) — behaviour to reproduce

One axios instance, `baseURL = <active env>/api/`, 10 s timeout.

| Step | Behaviour |
|---|---|
| Request | Attach `Authorization: Bearer <token>` from SecureStore. Dev builds log method + URL (auth bodies redacted). |
| Network failure / timeout | Retry safe requests with backoff (`retryPolicy`); offline → queue idempotent requests for replay (`retryQueue`); online timeout → toast. Callers that own offline handling pass `skipOfflineHandling`. |
| 401 | Refresh the token once, replay the request, queue other requests meanwhile. Failed refresh → toast + clear storage + `logout`. A 401 after the retry also logs out. |
| 403 account restricted | Toast the server's message, clear storage, log out. |
| Other errors | Reject with a translated `ApiError(message, code, status, errors)`. Branch on `code`, never on message text. The global error popup is intentionally disabled. |
| Env switch | `envStore` holds the live base URL; the instance re-points itself without being rebuilt. |

Environments: `environments.ts` lists dev / qa / uat / production, each URL from `EXPO_PUBLIC_API_BASE_URL_*`;
a picker (`EnvironmentPicker`, opened by a hidden tap on the login logo) switches at runtime and saves the choice.

**Mock mode** (`EXPO_PUBLIC_USE_MOCK=true`): services return fixtures from `mock/`, auth uses placeholder
tokens, and `mockMode.ts` makes the client refuse any real network call so nothing logs you out. Chat and
notification sockets stay off in this mode.

---

## 6. Config, env and flags

- All build-time values are `EXPO_PUBLIC_*` in `.env` (gitignored); `.env.example` documents each one.
- **Write each variable out in full.** Expo replaces `process.env.EXPO_PUBLIC_X` by text substitution at build
  time; a computed lookup like `process.env[\`EXPO_PUBLIC_${x}\`]` is `undefined` at runtime.
- After changing `.env`, restart Metro with `npx expo start -c`.
- Feature flags are plain booleans exported from `shared/config/env.ts` (`USE_MOCK`, `ENABLE_MESSAGES`, `ENABLE_TRENDS`, …).
  A flagged-off feature keeps its tab/entry visible and shows a "coming soon" state instead of vanishing.

---

## 7. Auth and storage

- `StorageService` (SecureStore) holds token, refresh token, profile, FCM token and the active profile ids;
  `clearAll()` is the single sign-out wipe. Never put secrets in AsyncStorage.
- `authSlice` holds `isAuthenticated`, user, active profile, `isSwitchingProfile`; `logout` is dispatched from the API client.
- Login = phone/email → OTP → consent screen(s) → role/profile chooser. Password reset arrives by deep link.
- Push permission is requested at startup; the device token is registered with the backend at login.

---

## 8. UI conventions

- Colours only from `shared/constants/colors.ts` (`Colors.primary7Main`, `Colors.grey*`, `Colors.stroke*` …); fonts only via `FontFamily`.
- Reusable pieces live in `shared/components/<Name>/<Name>.tsx` (button, text input, loader, toast, header, bottom sheets).
- Lists page with `usePagedLoad` / `useScrollPaging`; error / empty / loading states reuse `ScreenState`.
- Toasts for outcomes (`showToast`), inline errors for form fields.
- Accessibility labels on icon buttons.

---

## 9. Quality gates and workflow

| Gate | Where |
|---|---|
| `npx tsc --noEmit` | `.husky/pre-commit` — blocks the commit |
| No direct push to `main` / `preview` | `.husky/pre-push` + `branch-protection.yml` |
| Type check, JS bundle for Android + iOS | `.github/workflows/ci.yml` (manual `workflow_dispatch` here) |
| PR review rules (banned patterns, ticket key in branch + title, API checked against Swagger) | `docs/PR-REVIEW-COMPLIANCE-RULES.md`, `.github/scripts/` |

Branches carry a Jira key (`feature/ADH-123-short-name`). Prettier: single quotes, semicolons, trailing commas, 100 columns.

---

## 10. Native / build config

- `app.json`: portrait only; iPad supported with full-screen requirement; bundle id / package name; Firebase plist + json;
  associated domains; custom scheme for deep links.
- Config plugins in `plugins/` patch the generated native projects (portrait on iPhone/iPad, modular headers for Firebase,
  release signing, ProGuard rules, dSYM handling). They run on every `expo prebuild`, so native fixes belong there, not in `ios/` or `android/`.
- `eas.json`: five profiles — development, preview, qa, uat, production (+ submit). Local Android builds via `npm run build:android:qa|uat`.
- Metro: SVG transformer + NativeWind wrapper in `metro.config.js`.

---

## 11. Bootstrap checklist for a new project

1. `npx create-expo-app@latest <name> --template blank-typescript`; pin the same Expo SDK; `npx expo install expo-dev-client`.
2. Install the libraries in §1 (use `npx expo install` for Expo packages); add Firebase only if you need push/crash.
3. Copy config files unchanged: `babel`, `metro`, `tailwind`, `tsconfig`, `.prettierrc.js`, `.eslintrc.js`, `.npmrc`, `svg.d.ts`, `nativewind-env.d.ts`, `global.css`.
4. Copy `src/shared/` whole, then delete what you don't need (payments helpers, clinical utils). Fix the two shared→feature imports (§3).
5. Copy `src/features/auth` and `splash`; replace patient-specific copy, API paths and types; keep `StorageService`.
6. Copy `src/navigation/` and trim `AppNavigator` to your screens; update `types.ts`.
7. Copy `App.tsx`; change `DOMAIN`, the deep-link `scheme` and the screen paths.
8. Create `.env.example` with the `EXPO_PUBLIC_API_BASE_URL_*`, `EXPO_PUBLIC_DEFAULT_ENV`, `EXPO_PUBLIC_USE_MOCK` and your flags; copy `environments.ts` and edit the fallback hosts.
9. Copy `plugins/` (only the ones you need), `eas.json`, `.husky/`, `.github/`, `docs/PR-REVIEW-COMPLIANCE-RULES.md`; update app name, bundle id, package name, Firebase files.
10. Add your first feature using the §3 anatomy; write its service, hook, screen and mock together.
11. Run `npx tsc --noEmit`, then `npx expo prebuild` and a dev-client build on both platforms.

---

## 12. Pitfalls this codebase already hit

- `EXPO_PUBLIC_*` computed lookups silently return `undefined` (§6).
- Android edge-to-edge hides bottom-aligned buttons unless the screen's `SafeAreaView` includes the bottom edge.
- Mock login with real sockets/API calls logs the user out via the 401 handler — gate sockets and unmocked calls on `USE_MOCK`.
- A tap on a push that cold-starts the app needs both the expo and the Firebase initial-notification checks; verify on a real device.
- Missing i18n keys render as the raw key (e.g. `symptoms.picker.other`) — add to both locale files and check after any rename.
