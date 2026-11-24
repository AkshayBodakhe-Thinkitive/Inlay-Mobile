import { useState } from 'react';

import { setPassword as savePassword } from '../services/authService';
import { confirmError, newPasswordError } from '../utils/validation';

export function useSetPassword(onSuccess: () => void) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<{ password?: string; confirm?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (loading) return;
    const found = {
      password: newPasswordError(password),
      confirm: confirmError(password, confirm),
    };
    setErrors(found);
    if (found.password || found.confirm) return;

    setLoading(true);
    try {
      await savePassword(password);
      onSuccess();
    } catch {
      setErrors({ form: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  return { password, confirm, errors, loading, setPassword, setConfirm, submit };
}
