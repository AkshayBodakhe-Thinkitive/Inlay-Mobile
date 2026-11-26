import { useState } from 'react';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import OnboardingNavigator from './OnboardingNavigator';

type Session = 'signedOut' | 'onboarding' | 'ready';

// Placeholder until the auth store exists: swap this state for the real session.
// Mock mode sends every sign-in through onboarding; a real isNewPatient flag replaces that.
export default function RootNavigator() {
  const [session, setSession] = useState<Session>('signedOut');

  if (session === 'ready') return <AppNavigator />;
  if (session === 'onboarding') return <OnboardingNavigator onDone={() => setSession('ready')} />;
  return <AuthNavigator onSignIn={() => setSession('onboarding')} />;
}
