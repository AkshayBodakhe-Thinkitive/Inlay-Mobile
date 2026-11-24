import type { ComponentType } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from '@/shared/constants/colors';
import { FontFamily } from '@/shared/constants/FontConstants';
import { Radius } from '@/shared/constants/layout';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  /** Drawn before the label, e.g. Face ID on the outline button. */
  icon?: ComponentType<{ color: string }>;
  testID?: string;
};

export default function Button({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  icon: Icon,
  testID,
}: Props) {
  const primary = variant === 'primary';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      disabled={disabled || loading}
      onPress={onPress}
      testID={testID}
      style={({ pressed }) => [
        styles.base,
        primary ? styles.primary : styles.outline,
        pressed && (primary ? styles.primaryPressed : styles.outlinePressed),
        loading && styles.loading,
        disabled && styles.disabled,
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color={primary ? Colors.onPrimary : Colors.primary} />
      ) : null}
      {!loading && Icon ? <Icon color={primary ? Colors.onPrimary : Colors.inkPrimary} /> : null}
      <Text style={[styles.label, !primary && styles.labelOutline]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 44,
    borderRadius: Radius.button,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    boxShadow: '0 1px 2px rgba(16, 24, 40, 0.05)',
  },
  primary: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  primaryPressed: { backgroundColor: Colors.primaryPressed, borderColor: Colors.primaryPressed },
  outline: { backgroundColor: Colors.primaryTint, borderColor: Colors.primaryEdge },
  outlinePressed: { backgroundColor: Colors.primaryTintPressed },
  loading: { opacity: 0.7 },
  disabled: { opacity: 0.4 },
  label: { fontFamily: FontFamily.medium, fontSize: 16, lineHeight: 20, color: Colors.onPrimary },
  labelOutline: { color: Colors.inkPrimary },
});
