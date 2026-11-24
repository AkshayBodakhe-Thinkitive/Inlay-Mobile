import { isValidDate } from '@/shared/utils/date';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function emailError(value: string) {
  if (!value.trim()) return 'Enter your email address.';
  if (!EMAIL.test(value.trim())) return 'Enter a valid email address, like name@example.com.';
}

const PASSWORD_MIN_LENGTH = 8;

const PASSWORD_RULES = [
  (v: string) => v.length >= PASSWORD_MIN_LENGTH,
  (v: string) => /[a-z]/.test(v) && /[A-Z]/.test(v),
  (v: string) => /\d/.test(v),
  (v: string) => /[^A-Za-z0-9]/.test(v),
];

/** A weak password gets one message that names every rule. */
export function newPasswordError(value: string) {
  if (!PASSWORD_RULES.every((rule) => rule(value))) {
    return `Use at least ${PASSWORD_MIN_LENGTH} characters, with upper and lowercase letters, a number and a symbol.`;
  }
}

export function confirmError(password: string, confirm: string) {
  if (!confirm) return 'Re-enter your new password.';
  if (confirm !== password) return 'Passwords don’t match.';
}

export type ActivationFields = { email: string; dateOfBirth: string; code: string };
export type ActivationFieldErrors = Partial<Record<keyof ActivationFields, string>>;

export function validateActivation({ email, dateOfBirth, code }: ActivationFields) {
  const errors: ActivationFieldErrors = {};
  const emailMessage = emailError(email);
  if (emailMessage) errors.email = emailMessage;
  if (!dateOfBirth) errors.dateOfBirth = 'Enter your date of birth.';
  else if (!isValidDate(dateOfBirth)) errors.dateOfBirth = 'Enter a valid date as MM/DD/YYYY.';
  if (code.length !== 6) errors.code = 'Enter all six digits.';
  return errors;
}

export type SignInFieldErrors = { email?: string; password?: string };

export function validateSignIn(email: string, password: string) {
  const errors: SignInFieldErrors = {};
  const emailMessage = emailError(email);
  if (emailMessage) errors.email = emailMessage;
  if (!password) errors.password = 'Enter your password.';
  return errors;
}
