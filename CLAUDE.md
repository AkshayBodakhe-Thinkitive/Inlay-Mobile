@AGENTS.md

# Inlay

Expo (SDK 58) + React Native 0.88 + TypeScript app using React Navigation 7. Created with `create-expo-app`, then reset and restructured to `docs/project-arch/app-base-structure-template.md`. See [SETUP.md](SETUP.md) for how the project was created. Extra background and reference files live in [docs/REFERENCE.md](docs/REFERENCE.md) — read it only when a task needs it.

## Stack

- Expo SDK 58, React 19.3, React Native 0.88, React Compiler enabled
- React Navigation 7 (native stack + bottom tabs) — navigators in `src/navigation/`
- TypeScript (strict), Reanimated 4, Gesture Handler, Safe Area Context
- Node 20.19.x was used at scaffold time (some Metro packages prefer Node >= 22.13 and warn)

## Project Layout

| Path | Purpose |
|------|---------|
| `index.ts` / `App.tsx` | Entry point and providers |
| `src/navigation/` | Root/Auth/App navigators and `types.ts` |
| `src/shared/` | Code used by 2+ features (api, components, config, constants, hooks, i18n, store…) |
| `src/features/<name>/` | One folder per product area (screens, components, hooks, services, types, mock) |
| `assets/` | `fonts/` (Inter), `images/` (logo mark, splash mark) |
| `app.json` | Expo config (name, scheme `inlay`, plugins, experiments) |

## Conventions

- Add packages with `npx expo install <pkg>`, never plain `npm install`, so versions match the SDK.
- `shared/` never imports from `features/`; screens call hooks → services, never axios directly.
- Platform-specific files use suffixes: `.web.tsx`, `.ios.tsx`, `.android.tsx`.
- Take colors and fonts from `src/shared/constants`, not hard-coded values.
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
