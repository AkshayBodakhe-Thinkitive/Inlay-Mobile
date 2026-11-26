import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import AuthScreen from '../components/AuthScreen/AuthScreen';
import Button from '@/shared/components/Button/Button';
import Divider from '@/shared/components/Divider/Divider';
import FormError from '@/shared/components/FormError/FormError';
import { IconFaceId, IconMail } from '@/shared/components/Icons/Icons';
import PasswordInput from '../components/PasswordInput/PasswordInput';
import TextButton from '@/shared/components/TextButton/TextButton';
import TextInput, { type AppTextInputRef } from '@/shared/components/TextInput/TextInput';
import { ENABLE_FACE_ID_SIGN_IN, ENABLE_FORGOT_PASSWORD } from '@/shared/config/env';
import type { AuthScreenProps } from '@/navigation/types';

import { useSignIn } from '../hooks/useSignIn';

type Props = AuthScreenProps<'Login'> & { onSignIn: () => void };

export default function LoginScreen({ route, onSignIn }: Props) {
  const passwordRef = useRef<AppTextInputRef>(null);
  // Straight after creating a password the email is filled in and Face ID is left out:
  // Face ID can only be turned on in settings, once signed in.
  const created = route.params?.created === true;
  const form = useSignIn(route.params?.email ?? '', onSignIn);

  return (
    <AuthScreen title={created ? 'Sign in' : 'Welcome back'}>
      <View style={styles.stack}>
        <FormError message={form.formError} />
        <TextInput
          label="Email"
          icon={IconMail}
          required
          value={form.email}
          onChangeText={form.setEmail}
          error={form.fieldErrors.email}
          placeholder="Enter email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          testID="sign-in-email"
        />
        <PasswordInput
          ref={passwordRef}
          label="Password"
          required
          value={form.password}
          onChangeText={form.setPassword}
          error={form.fieldErrors.password}
          placeholder="Enter password"
          autoComplete="current-password"
          textContentType="password"
          returnKeyType="go"
          onSubmitEditing={form.submit}
          testID="sign-in-password"
        />
        {ENABLE_FORGOT_PASSWORD ? (
          <View style={styles.forgot}>
            <TextButton title="Forgot password?" onPress={() => {}} />
          </View>
        ) : null}
        <Button
          title="Sign in"
          onPress={form.submit}
          loading={form.loading}
          testID="sign-in-submit"
        />
        {!created && ENABLE_FACE_ID_SIGN_IN ? (
          <>
            <Divider />
            {/* Face ID sign-in has no flow behind it yet. */}
            <Button
              title="Sign in with Face ID"
              variant="outline"
              icon={IconFaceId}
              onPress={() => {}}
            />
          </>
        ) : null}
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: 20 },
  forgot: { alignSelf: 'flex-end', marginTop: -4 },
});
