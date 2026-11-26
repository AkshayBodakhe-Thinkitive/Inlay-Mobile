# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **src/app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Environment & flags

Configuration comes from `EXPO_PUBLIC_*` variables, read in one place: [src/shared/config/env.ts](src/shared/config/env.ts).

1. Create your local file: `cp .env.example .env` (`.env` is git-ignored).
2. Edit values, then fully reload the app. If a value looks stale, restart Metro with `npx expo start -c`.
3. EAS cloud builds don't receive `.env`. Each profile in [eas.json](eas.json) has its own `env` block with the same keys.

> Every `EXPO_PUBLIC_` value is built into the app and readable by anyone. Never put secrets, API keys or tokens in them.

| Key | Default (`.env.example`) | What it does | Profiles where it's on |
|---|---|---|---|
| `EXPO_PUBLIC_DEFAULT_ENV` | `dev` | Environment a fresh install starts on: `dev`, `qa`, `uat` or `production`. Unknown values mean `dev`. | development=`dev`, qa=`qa`, uat=`uat`, production=`production` |
| `EXPO_PUBLIC_API_BASE_URL_DEV` / `_QA` / `_UAT` / `_PROD` | placeholder URLs | API base URL per environment. Trailing slash is stripped. Placeholders: replace with real hosts. | all |
| `EXPO_PUBLIC_USE_MOCK` | `true` | Services return sample data and never call the network. | development |
| `EXPO_PUBLIC_ENABLE_FORGOT_PASSWORD` | `false` | Shows "Forgot password?" on Sign in. | development |
| `EXPO_PUBLIC_ENABLE_FACE_ID_SIGN_IN` | `false` | Shows "Sign in with Face ID" on Sign in. | development |

Only the exact value `true` turns a flag on; a missing or misspelled value is off.

**Mock mode.** Only service functions (`features/<feature>/services`) check `USE_MOCK`. Mock data lives in `features/<feature>/mock/`. Mock sign-in: see `features/auth/mock/authMocks.ts`.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **example** directory and create a blank **src/app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## npm run prebuild:android -- --clean

## npm run prebuild:ios -- --clean

## npm run ios:device

## npm run android:device
