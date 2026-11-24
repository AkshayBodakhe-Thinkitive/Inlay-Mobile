import { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AuthScreen from '../components/AuthScreen/AuthScreen';
import Button from '@/shared/components/Button/Button';
import CodeInput from '../components/CodeInput/CodeInput';
import DatePicker from '@/shared/components/DatePicker/DatePicker';
import FooterLink from '../components/FooterLink/FooterLink';
import FormError from '@/shared/components/FormError/FormError';
import { IconMail } from '@/shared/components/Icons/Icons';
import TextInput, { type AppTextInputRef } from '@/shared/components/TextInput/TextInput';
import { FontFamily } from '@/shared/constants/FontConstants';
import type { AuthScreenProps } from '@/navigation/types';

import { useActivateAccount } from '../hooks/useActivateAccount';

export default function ActivateAccountScreen({ navigation }: AuthScreenProps<'Activate'>) {
  const dobRef = useRef<AppTextInputRef>(null);

  // Going back from Create password cancels the accepted code, so it must be entered again.
  const form = useActivateAccount((email) => navigation.navigate('SetPassword', { email }));

  return (
    <AuthScreen
      title="Activate your account"
      description={
        <>
          Enter your email, date of birth and the{' '}
          <Text style={styles.bold}>6-digit code</Text> from your invitation.
        </>
      }>
      <View style={styles.stack}>
        <FormError message={form.formError} />
        <TextInput
          label="Email address"
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
          onSubmitEditing={() => dobRef.current?.focus()}
          testID="activate-email"
        />
        <DatePicker
          ref={dobRef}
          label="Date of birth"
          value={form.dateOfBirth}
          onChangeText={form.setDateOfBirth}
          error={form.fieldErrors.dateOfBirth}
          testID="activate-dob"
        />
        <CodeInput
          label="One-time code"
          value={form.code}
          onChangeText={form.setCode}
          onComplete={(code) => form.submit(code)}
          error={form.fieldErrors.code}
          testID="activate-code"
        />
        <Button
          title="Verify code"
          onPress={() => form.submit()}
          loading={form.loading}
          testID="activate-submit"
        />
      </View>
      <FooterLink
        prompt="Already set a password?"
        action="Sign in"
        onPress={() => navigation.navigate('Login')}
      />
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: 20 },
  bold: { fontFamily: FontFamily.semibold },
});
