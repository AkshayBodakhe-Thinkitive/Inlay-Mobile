/*
 * The ONLY file that reads process.env. Everything else imports from here.
 *
 * Every key is written out in full as `process.env.EXPO_PUBLIC_<NAME>`. Expo replaces that
 * exact text with the value at build time. A computed name such as `process.env[key]` (or
 * destructuring `process.env`) is NOT replaced and resolves to undefined at runtime.
 *
 * These values are baked into the app bundle and readable by anyone with the app:
 * never put secrets, API keys or tokens in an EXPO_PUBLIC_ variable.
 *
 * A boolean is on only when the value is exactly the string 'true'. A missing or
 * misspelled value counts as false, so a feature is off unless someone turns it on.
 */

/* ---------------------------------- environment ---------------------------------- */

/** Which environment a fresh install starts on: dev | qa | uat | production. Read by environments.ts. */
export const DEFAULT_ENV = process.env.EXPO_PUBLIC_DEFAULT_ENV;

/** API base URLs, one per environment. Read by environments.ts, which supplies fallbacks. */
export const API_BASE_URL_DEV = process.env.EXPO_PUBLIC_API_BASE_URL_DEV;
export const API_BASE_URL_QA = process.env.EXPO_PUBLIC_API_BASE_URL_QA;
export const API_BASE_URL_UAT = process.env.EXPO_PUBLIC_API_BASE_URL_UAT;
export const API_BASE_URL_PROD = process.env.EXPO_PUBLIC_API_BASE_URL_PROD;

/* ------------------------------------- mock mode ------------------------------------ */

/**
 * Mock mode: services return sample data from each feature's `mock/` folder and never touch
 * the network. Only service functions read this flag; screens, hooks and the store don't know
 * about it. It exists because the backend isn't built yet. Remove it, and the mock folders,
 * once every feature has a real API.
 */
export const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK === 'true';

/* ----------------------------------- feature flags ---------------------------------- */

/**
 * Shows the "Forgot password?" link on Sign in. A flag because the reset flow doesn't exist
 * yet, so the link would do nothing. Checked only at the link on the Sign in screen.
 * Remove when password reset ships and the link is always shown.
 */
export const ENABLE_FORGOT_PASSWORD = process.env.EXPO_PUBLIC_ENABLE_FORGOT_PASSWORD === 'true';

/**
 * Shows the "Sign in with Face ID" button (and the "or" divider above it) on Sign in. A flag
 * because Face ID sign-in doesn't exist yet. Checked only at the button on the Sign in screen.
 * Remove when Face ID sign-in ships and the button is always shown.
 */
export const ENABLE_FACE_ID_SIGN_IN = process.env.EXPO_PUBLIC_ENABLE_FACE_ID_SIGN_IN === 'true';
