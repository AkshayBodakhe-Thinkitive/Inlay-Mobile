# How the Inlay Project Was Created

## Prerequisites

| Tool | Version used |
|------|--------------|
| Node.js | v20.19.4 |
| npm | 10.8.2 |

Optional, for running on devices: Xcode (iOS simulator), Android Studio (emulator), or the Expo Go app on a phone.

## Steps

### 1. Go to the parent folder

```bash
cd ~/Desktop/HOL-Inlay
```

### 2. Scaffold the Expo app

```bash
npx create-expo-app@latest Inlay --yes
```

- `Inlay` is the project name and the folder name.
- `--yes` accepts defaults, which means the default template (Expo Router + TypeScript).
- It installs dependencies (about 556 packages) and initializes a git repo with an initial commit.
- Node 20 prints `EBADENGINE` warnings for some Metro packages. They are non-blocking.

### 3. Enter the project

```bash
cd Inlay
```

### 4. Add / adjust documentation

- `CLAUDE.md` — the template created it with a single line (`@AGENTS.md`). It was extended with project overview, layout, conventions, and commands. The `@AGENTS.md` import was kept.
- `SETUP.md` — this file.

### 5. Run the app

```bash
npm start        # dev server; press i (iOS), a (Android), w (web)
# or
npm run ios
npm run android
npm run web
```

## What the template generated

```
Inlay/
├── src/
│   ├── app/            # Expo Router routes (_layout, index, explore)
│   ├── components/     # themed-text, themed-view, app-tabs, ui/collapsible, ...
│   ├── hooks/          # use-theme, use-color-scheme
│   └── constants/theme.ts
├── assets/             # empty — add fonts/icons/images here
├── scripts/reset-project.js
├── app.json            # Expo config
├── AGENTS.md           # AI-agent guidance for Expo
├── CLAUDE.md
├── package.json
└── tsconfig.json
```

## Key config (app.json)

- `name` / `slug`: `Inlay`
- `scheme`: `inlay` (deep links)
- Plugins: `expo-splash-screen` (`expo-router` removed; app uses React Navigation)
- Experiments: `typedRoutes`, `reactCompiler`
- Web output: `server`

## Known notes

- `npm audit` reported 3 moderate vulnerabilities in the dependency tree at scaffold time. They were not force-fixed because `npm audit fix --force` can introduce breaking changes.
- `npx tsc --noEmit` reports 3 errors in the untouched starter template (CSS module / `global.css` type declarations and a `ref` type in `app-tabs.web.tsx`). They are web-only template issues and don't block `npm start`. Fix or remove those files when you replace the starter code.
- Using Node >= 22.13 removes the engine warnings.

## Next steps

1. `npm start` and confirm the starter screens load.
2. Optionally run `npm run reset-project` to clear the starter code and begin from a blank `src/app`.
3. Add libraries with `npx expo install <package>`.
