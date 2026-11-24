import { MOCK_PATIENT, mockAccount } from '../mock/account';
import { ActivationError, InvalidCredentialsError, type ActivationRequest } from '../types';

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/*
 * Mock implementations. Replace each body with the real API call and keep the signatures.
 */

/** Verifies the invitation details. */
export async function activateAccount({ email, dateOfBirth, code }: ActivationRequest) {
  await delay(800);

  const matches =
    email.trim().toLowerCase() === MOCK_PATIENT.email &&
    dateOfBirth === MOCK_PATIENT.dateOfBirth &&
    code === MOCK_PATIENT.code;

  if (!matches) {
    throw new ActivationError(
      'We couldn’t verify those details. Check your invitation email and try again.',
    );
  }
}

/** Saves the patient's new password and activates the account. */
export async function setPassword(password: string) {
  await delay(600);
  mockAccount.password = password;
}

/** Signs a returning patient in. */
export async function signIn(email: string, password: string) {
  await delay(800);

  if (email.trim().toLowerCase() !== MOCK_PATIENT.email || password !== mockAccount.password) {
    throw new InvalidCredentialsError('That email and password don’t match our records.');
  }
}
