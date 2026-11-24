import { useState } from 'react';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

// Placeholder until the auth store exists: swap this state for the real session.
export default function RootNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return isAuthenticated ? (
    <AppNavigator />
  ) : (
    <AuthNavigator onSignIn={() => setIsAuthenticated(true)} />
  );
}
