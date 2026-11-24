import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import AuthScreen from '../components/AuthScreen/AuthScreen';
import Button from '@/shared/components/Button/Button';
import FormError from '@/shared/components/FormError/FormError';
import PasswordInput from '../components/PasswordInput/PasswordInput';
import type { AppTextInputRef } from '@/shared/components/TextInput/TextInput';
import type { AuthScreenProps } from '@/navigation/types';

import { useSetPassword } from '../hooks/useSetPassword';

export default function SetPasswordScreen({ navigation, route }: AuthScreenProps<'SetPassword'>) {
  const confirmRef = useRef<AppTextInputRef>(null);
  const { email } = route.params;

  // The account is now active but signed out: the patient signs in once with the new
  // password. Reset the stack so Back never returns here or to the code.
  const form = useSetPassword(() =>
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login', params: { created: true, email } }],
    }),
  );

  return (
    <AuthScreen title="Create your password">
      <View style={styles.stack}>
        <FormError message={form.errors.form} />
        <PasswordInput
          label="New password"
          required
          value={form.password}
          onChangeText={form.setPassword}
          placeholder="Create a password"
          autoComplete="new-password"
          textContentType="newPassword"
          returnKeyType="next"
          onSubmitEditing={() => confirmRef.current?.focus()}
          error={form.errors.password}
          testID="set-password-new"
        />
        <PasswordInput
          ref={confirmRef}
          label="Confirm password"
          required
          value={form.confirm}
          onChangeText={form.setConfirm}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          textContentType="newPassword"
          returnKeyType="go"
          onSubmitEditing={form.submit}
          error={form.errors.confirm}
          testID="set-password-confirm"
        />
        <Button
          title="Set password"
          onPress={form.submit}
          loading={form.loading}
          testID="set-password-submit"
        />
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({ stack: { gap: 20 } });
