@AGENTS.md

# Inlay

Expo (SDK 58) + React Native 0.88 + TypeScript app using Expo Router. Created with `create-expo-app` (default template). See [SETUP.md](SETUP.md) for how the project was created.

## Stack

- Expo SDK 58, React 19.3, React Native 0.88, React Compiler enabled
- Expo Router (file-based routing, typed routes) — routes in `src/app/`
- TypeScript (strict), Reanimated 4, Gesture Handler, Safe Area Context
- Node 20.19.x was used at scaffold time (some Metro packages prefer Node >= 22.13 and warn)

## Project Layout

| Path | Purpose |
|------|---------|
| `src/app/` | Routes only (`_layout.tsx`, `index.tsx`, `explore.tsx`) |
| `src/components/` | Shared UI components (`themed-*`, `ui/`) |
| `src/hooks/` | Hooks (`use-theme`, `use-color-scheme`) |
| `src/constants/theme.ts` | Colors, fonts, spacing |
| `assets/` | Images, icons |
| `app.json` | Expo config (name, scheme `inlay`, plugins, experiments) |

## Conventions

- Add packages with `npx expo install <pkg>`, never plain `npm install`, so versions match the SDK.
- Keep non-route code out of `src/app/`.
- Platform-specific files use suffixes: `.web.tsx`, `.ios.tsx`, `.android.tsx`.
- Use the themed components and `useTheme` instead of hard-coded colors.
- Do not hand-edit `ios/` or `android/` (they are generated; configure via `app.json` / config plugins).

## Commands

```bash
npm start            # expo start (dev server)
npm run ios          # open in iOS simulator
npm run android      # open in Android emulator
npm run web          # run in browser
npm run lint         # expo lint
npx tsc --noEmit     # typecheck
npx expo-doctor      # diagnose config/dependency issues
npm run reset-project  # wipe starter code into /example and leave a blank app (destructive)
```

## Definition of Done

- `npm run lint` and `npx tsc --noEmit` both pass
- Tested on at least one native platform (iOS or Android) and web if the change touches shared UI
