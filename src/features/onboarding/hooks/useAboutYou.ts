import { useEffect, useState } from 'react';

import { confirmProfile, getPatientProfile } from '../services/onboardingService';
import type { PatientProfile } from '../types';

export function useAboutYou(onConfirmed: () => void) {
  const [profile, setProfile] = useState<PatientProfile>();
  const [formError, setFormError] = useState<string>();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    getPatientProfile()
      .then((p) => active && setProfile(p))
      .catch(() => active && setFormError('We couldn’t load your details. Please try again.'));
    return () => {
      active = false;
    };
  }, []);

  async function confirm() {
    if (saving || !profile) return;
    setSaving(true);
    setFormError(undefined);
    try {
      await confirmProfile();
      onConfirmed();
    } catch {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return { profile, formError, saving, confirm };
}
