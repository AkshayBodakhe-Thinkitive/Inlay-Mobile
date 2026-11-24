import { Button, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = { onSignIn: () => void };

export default function LoginScreen({ onSignIn }: Props) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Text style={styles.title}>Login</Text>
      <Button title="Sign in" onPress={onSignIn} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  title: { fontSize: 24, fontWeight: '600' },
});
