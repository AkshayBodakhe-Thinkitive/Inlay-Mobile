import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '@/features/auth/screens/LoginScreen';

import type { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

type Props = { onSignIn: () => void };

export default function AuthNavigator({ onSignIn }: Props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">{() => <LoginScreen onSignIn={onSignIn} />}</Stack.Screen>
    </Stack.Navigator>
  );
}
