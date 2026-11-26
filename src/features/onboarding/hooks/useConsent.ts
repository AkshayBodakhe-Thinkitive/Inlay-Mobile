import { useEffect, useState } from 'react';

import { getRecordTypes, signRecordsConsent } from '../services/onboardingService';

export function useConsent(onSigned: () => void) {
  const [authorized, setAuthorized] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [formError, setFormError] = useState<string>();
  const [saving, setSaving] = useState(false);
  const [recordTypes, setRecordTypes] = useState<string[]>([]);

  useEffect(() => {
    let active = true;
    getRecordTypes()
      .then((types) => active && setRecordTypes(types))
      .catch(() => {}); // the summary line just stays generic
    return () => {
      active = false;
    };
  }, []);

  const toggleAuthorized = () => {
    setAuthorized((v) => !v);
    setFormError(undefined);
  };
  const toggleAgreed = () => {
    setAgreed((v) => !v);
    setFormError(undefined);
  };

  async function submit() {
    if (saving) return;
    if (!authorized || !agreed) {
      setFormError('Tick the box to agree first.');
      return;
    }
    setSaving(true);
    setFormError(undefined);
    try {
      await signRecordsConsent();
      onSigned();
    } catch {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return { recordTypes, authorized, agreed, formError, saving, toggleAuthorized, toggleAgreed, submit };
}
