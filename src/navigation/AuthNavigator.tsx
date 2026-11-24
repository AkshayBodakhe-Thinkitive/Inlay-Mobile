import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ActivateAccountScreen from '@/features/auth/screens/ActivateAccountScreen';
import LoginScreen from '@/features/auth/screens/LoginScreen';
import SetPasswordScreen from '@/features/auth/screens/SetPasswordScreen';

import type { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

type Props = { onSignIn: () => void };

export default function AuthNavigator({ onSignIn }: Props) {
  return (
    <Stack.Navigator initialRouteName="Activate" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Activate" component={ActivateAccountScreen} />
      <Stack.Screen name="SetPassword" component={SetPasswordScreen} />
      <Stack.Screen name="Login">
        {(props) => <LoginScreen {...props} onSignIn={onSignIn} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
