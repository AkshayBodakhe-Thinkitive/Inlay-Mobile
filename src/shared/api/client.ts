import { create } from 'axios';

import { getBaseUrl } from '@/shared/config/environments';

/** The one axios instance. Services call it only when mock mode is off. */
export const apiClient = create({
  baseURL: getBaseUrl(),
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});
