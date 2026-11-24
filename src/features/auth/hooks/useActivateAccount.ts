import { useState } from 'react';

import { activateAccount } from '../services/authService';
import { ActivationError } from '../types';
import { validateActivation, type ActivationFieldErrors } from '../utils/validation';

export function useActivateAccount(onSuccess: (email: string) => void) {
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [code, setCode] = useState('');
  const [fieldErrors, setFieldErrors] = useState<ActivationFieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [loading, setLoading] = useState(false);

  async function submit(codeOverride?: string) {
    if (loading) return;
    const fields = { email, dateOfBirth, code: codeOverride ?? code };
    const errors = validateActivation(fields);
    setFieldErrors(errors);
    setFormError(undefined);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      await activateAccount(fields);
      onSuccess(email.trim());
    } catch (e) {
      setCode('');
      setFormError(
        e instanceof ActivationError ? e.message : 'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    email,
    dateOfBirth,
    code,
    fieldErrors,
    formError,
    loading,
    setEmail,
    setDateOfBirth,
    setCode,
    submit,
  };
}
