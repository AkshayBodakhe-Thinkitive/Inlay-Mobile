import { useState, type ComponentRef, type ComponentType, type ReactNode, type Ref } from 'react';
import {
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  View,
  type TextInputProps,
} from 'react-native';

import { Colors } from '@/shared/constants/colors';
import { FontFamily } from '@/shared/constants/FontConstants';
import { Radius } from '@/shared/constants/layout';

export type AppTextInputRef = ComponentRef<typeof RNTextInput>;

export type AppTextInputProps = TextInputProps & {
  ref?: Ref<AppTextInputRef>;
  label: string;
  required?: boolean;
  error?: string;
  /** Drawn inside the box on the left; teal while focused, red on error. */
  icon?: ComponentType<{ color: string }>;
  /** Drawn inside the box on the right (e.g. a show/hide eye). */
  trailing?: ReactNode;
};

export default function TextInput({
  label,
  required,
  error,
  icon: Icon,
  trailing,
  style,
  onFocus,
  onBlur,
  ...rest
}: AppTextInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}
        {required ? <Text style={styles.required}> *</Text> : null}
      </Text>
      <View style={[styles.box, focused && styles.boxFocused, !!error && styles.boxInvalid]}>
        {Icon ? (
          <View style={styles.leading}>
            <Icon color={error ? Colors.error : focused ? Colors.primary : Colors.muted} />
          </View>
        ) : null}
        <RNTextInput
          accessibilityLabel={label}
          accessibilityHint={error}
          placeholderTextColor={Colors.placeholder}
          {...rest}
          style={[styles.input, !!Icon && styles.inputWithIcon, style]}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
        />
        {trailing}
      </View>
      {error ? (
        <Text accessibilityLiveRegion="polite" style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: 6 },
  label: { fontFamily: FontFamily.medium, fontSize: 14, lineHeight: 20, color: Colors.text },
  required: { color: Colors.error },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: Radius.touch,
    backgroundColor: Colors.background,
  },
  boxFocused: { borderColor: Colors.primary, boxShadow: `0 0 0 3px ${Colors.primaryHalo}` },
  boxInvalid: { borderColor: Colors.error, boxShadow: `0 0 0 3px ${Colors.errorHalo}` },
  leading: { paddingLeft: 14 },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 14,
    fontFamily: FontFamily.regular,
    fontSize: 16,
    color: Colors.text,
  },
  inputWithIcon: { paddingLeft: 10 },
  error: { fontFamily: FontFamily.regular, fontSize: 14, lineHeight: 20, color: Colors.error },
});
