import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { IconEye, IconEyeOff, IconLock } from '@/shared/components/Icons/Icons';
import TextInput, { type AppTextInputProps } from '@/shared/components/TextInput/TextInput';
import { Colors } from '@/shared/constants/colors';

type Props = Omit<AppTextInputProps, 'trailing' | 'secureTextEntry' | 'icon'>;

/** Text field with a lock icon and an eye toggle to show or hide what's typed. */
export default function PasswordInput(props: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <TextInput
      icon={IconLock}
      autoCapitalize="none"
      autoCorrect={false}
      {...props}
      secureTextEntry={!visible}
      trailing={
        <Pressable
          onPress={() => setVisible((v) => !v)}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={visible ? 'Hide password' : 'Show password'}
          style={({ pressed }) => [styles.toggle, pressed && styles.pressed]}>
          {visible ? <IconEyeOff color={Colors.muted} /> : <IconEye color={Colors.muted} />}
        </Pressable>
      }
    />
  );
}

const styles = StyleSheet.create({
  toggle: {
    width: 36,
    height: 36,
    marginRight: 8,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { backgroundColor: Colors.border },
});
