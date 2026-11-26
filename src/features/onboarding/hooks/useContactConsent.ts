import { useState } from 'react';

import { signContactConsent } from '../services/onboardingService';
import type { ContactChoices } from '../types';

/** All three choices are optional, so submitting is always allowed. */
export function useContactConsent(onSigned: () => void) {
  const [choices, setChoices] = useState<ContactChoices>({ text: false, call: false, email: false });
  const [formError, setFormError] = useState<string>();
  const [saving, setSaving] = useState(false);

  const toggle = (key: keyof ContactChoices) => setChoices((c) => ({ ...c, [key]: !c[key] }));

  async function submit() {
    if (saving) return;
    setSaving(true);
    setFormError(undefined);
    try {
      await signContactConsent(choices);
      onSigned();
    } catch {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return { choices, formError, saving, toggle, submit };
}
