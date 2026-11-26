import { useEffect, useState } from 'react';

import { connectSource, getRecordSources } from '../services/onboardingService';
import type { RecordSource, RecordSourceId } from '../types';

export function useConnectRecords() {
  const [sources, setSources] = useState<RecordSource[]>([]);
  const [connecting, setConnecting] = useState<RecordSource>();
  const [justConnected, setJustConnected] = useState<RecordSource>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    let active = true;
    getRecordSources()
      .then((list) => active && setSources(list))
      .catch(() => active && setError('We couldn’t load the record systems. Please try again.'));
    return () => {
      active = false;
    };
  }, []);

  async function connect(id: RecordSourceId) {
    const source = sources.find((s) => s.id === id);
    if (!source || connecting) return;
    setError(undefined);
    setConnecting(source);
    try {
      const syncedAt = await connectSource(id);
      const linked = { ...source, syncedAt };
      setSources((list) => list.map((s) => (s.id === id ? linked : s)));
      setJustConnected(linked);
    } catch {
      setError('We couldn’t connect that system. Please try again.');
    } finally {
      setConnecting(undefined);
    }
  }

  return {
    sources,
    connecting,
    justConnected,
    error,
    canContinue: sources.some((s) => s.syncedAt),
    connect,
    dismissConnected: () => setJustConnected(undefined),
  };
}
