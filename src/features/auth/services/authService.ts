import { isAxiosError } from 'axios';

import { apiClient } from '@/shared/api/client';
import { USE_MOCK } from '@/shared/config/env';
import { delay } from '@/shared/utils/delay';

import { MOCK_PATIENT, mockAccount } from '../mock/authMocks';
import { ActivationError, InvalidCredentialsError, type ActivationRequest } from '../types';

/*
 * Each function checks USE_MOCK first. In mock mode it never touches the network.
 *
 * The endpoint paths below are provisional: the backend isn't built yet and the API schema
 * hasn't been checked. Confirm each path, request and response against it before turning
 * mock mode off.
 */

/** True when the server answered with a 4xx, i.e. it rejected what was sent. */
const isRejected = (e: unknown) =>
  isAxiosError(e) && !!e.response && e.response.status >= 400 && e.response.status < 500;

/** Verifies the invitation details. */
export async function activateAccount(request: ActivationRequest) {
  if (USE_MOCK) {
    await delay(800);
    const matches =
      request.email.trim().toLowerCase() === MOCK_PATIENT.email &&
      request.dateOfBirth === MOCK_PATIENT.dateOfBirth &&
      request.code === MOCK_PATIENT.code;
    if (!matches) throw new ActivationError(ACTIVATION_FAILED);
    return;
  }

  try {
    await apiClient.post('/api/auth/activate', request);
  } catch (e) {
    throw isRejected(e) ? new ActivationError(ACTIVATION_FAILED) : e;
  }
}

/** Saves the patient's new password and activates the account. */
export async function setPassword(password: string) {
  if (USE_MOCK) {
    await delay(600);
    mockAccount.password = password; // the updated account, kept in memory for this session
    return;
  }

  await apiClient.post('/api/auth/password', { password });
}

/** Signs a returning patient in. */
export async function signIn(email: string, password: string) {
  if (USE_MOCK) {
    await delay(800);
    if (email.trim().toLowerCase() !== MOCK_PATIENT.email || password !== mockAccount.password) {
      throw new InvalidCredentialsError(SIGN_IN_FAILED);
    }
    return;
  }

  try {
    await apiClient.post('/api/auth/sign-in', { email, password });
  } catch (e) {
    throw isRejected(e) ? new InvalidCredentialsError(SIGN_IN_FAILED) : e;
  }
}

const ACTIVATION_FAILED =
  'We couldn’t verify those details. Check your invitation email and try again.';
const SIGN_IN_FAILED = 'That email and password don’t match our records.';
