import {
  API_BASE_URL_DEV,
  API_BASE_URL_PROD,
  API_BASE_URL_QA,
  API_BASE_URL_UAT,
  DEFAULT_ENV,
} from './env';

export type EnvironmentName = 'dev' | 'qa' | 'uat' | 'production';

/** Strips trailing slashes so callers can always write `${baseUrl}/path`. */
const clean = (url: string) => url.replace(/\/+$/, '');

/*
 * Fallback URLs keep the app starting when a key is missing. They are placeholders:
 * replace them with the real hosts, or set the EXPO_PUBLIC_API_BASE_URL_* keys.
 */
export const ENVIRONMENTS: Record<EnvironmentName, { label: string; baseUrl: string }> = {
  dev: { label: 'Development', baseUrl: clean(API_BASE_URL_DEV || 'https://dev-api.inlay.example.com') },
  qa: { label: 'QA', baseUrl: clean(API_BASE_URL_QA || 'https://qa-api.inlay.example.com') },
  uat: { label: 'UAT', baseUrl: clean(API_BASE_URL_UAT || 'https://uat-api.inlay.example.com') },
  production: {
    label: 'Production',
    baseUrl: clean(API_BASE_URL_PROD || 'https://api.inlay.example.com'),
  },
};

/** The environment a fresh install starts on. An unknown or missing value means dev, never production. */
export const DEFAULT_ENVIRONMENT: EnvironmentName =
  DEFAULT_ENV === 'qa' || DEFAULT_ENV === 'uat' || DEFAULT_ENV === 'production' ? DEFAULT_ENV : 'dev';

/** Base URL of the active environment. The API client reads it from here. */
export function getBaseUrl(): string {
  return ENVIRONMENTS[DEFAULT_ENVIRONMENT].baseUrl;
}
