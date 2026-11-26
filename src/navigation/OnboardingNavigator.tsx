import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AboutYouScreen from '@/features/onboarding/screens/AboutYouScreen';
import ConnectRecordsScreen from '@/features/onboarding/screens/ConnectRecordsScreen';
import ConsentScreen from '@/features/onboarding/screens/ConsentScreen';
import UpdatesAboutCareScreen from '@/features/onboarding/screens/UpdatesAboutCareScreen';
import YourWhyScreen from '@/features/onboarding/screens/YourWhyScreen';

import type { OnboardingStackParamList } from './types';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

type Props = { onDone: () => void };

export default function OnboardingNavigator({ onDone }: Props) {
  return (
    <Stack.Navigator initialRouteName="AboutYou" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AboutYou" component={AboutYouScreen} />
      <Stack.Screen name="Consent" component={ConsentScreen} />
      <Stack.Screen name="ConnectRecords" component={ConnectRecordsScreen} />
      <Stack.Screen name="UpdatesAboutCare" component={UpdatesAboutCareScreen} />
      <Stack.Screen name="YourWhy">
        {(props) => <YourWhyScreen {...props} onDone={onDone} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
