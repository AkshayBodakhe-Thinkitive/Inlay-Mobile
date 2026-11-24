import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LaunchScreen from '@/features/splash/screens/LaunchScreen';
import RootNavigator from '@/navigation/RootNavigator';

SplashScreen.preventAutoHideAsync();

const FONTS = {
  Inter_400Regular: require('./assets/fonts/Inter_400Regular.ttf'),
  Inter_500Medium: require('./assets/fonts/Inter_500Medium.ttf'),
  Inter_600SemiBold: require('./assets/fonts/Inter_600SemiBold.ttf'),
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts(FONTS);
  const fontsDone = fontsLoaded || !!fontError;
  // Add auth rehydration here once it exists: ready = fontsDone && authLoaded.
  const ready = fontsDone;
  const [launched, setLaunched] = useState(false);
  const endLaunch = useCallback(() => setLaunched(true), []);

  // The native splash hands over to the launch screen, which looks the same at first,
  // as soon as the font it uses is in; the launch screen covers the rest.
  useEffect(() => {
    if (fontsDone) SplashScreen.hideAsync();
  }, [fontsDone]);

  if (!fontsDone) return null;

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        {!launched ? <LaunchScreen ready={ready} onDone={endLaunch} /> : null}
      </View>
      {/* Dark icons on the white launch screen, light on the teal sign-in header. */}
      <StatusBar style={launched ? 'light' : 'dark'} />
    </SafeAreaProvider>
  );
}
