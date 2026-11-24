import { useState } from 'react';

import { signIn } from '../services/authService';
import { InvalidCredentialsError } from '../types';
import { validateSignIn, type SignInFieldErrors } from '../utils/validation';

export function useSignIn(initialEmail: string, onSuccess: () => void) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<SignInFieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (loading) return;
    const errors = validateSignIn(email, password);
    setFieldErrors(errors);
    setFormError(undefined);
    if (errors.email || errors.password) return;

    setLoading(true);
    try {
      await signIn(email, password);
      onSuccess();
    } catch (e) {
      setFormError(
        e instanceof InvalidCredentialsError ? e.message : 'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  }

  return { email, password, fieldErrors, formError, loading, setEmail, setPassword, submit };
}
