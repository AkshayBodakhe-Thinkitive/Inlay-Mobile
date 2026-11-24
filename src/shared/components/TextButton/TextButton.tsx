import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from '@/shared/constants/colors';
import { FontFamily } from '@/shared/constants/FontConstants';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  testID?: string;
};

export default function TextButton({ title, onPress, disabled = false, testID }: Props) {
  return (
    <Pressable
      accessibilityRole="link"
      accessibilityState={{ disabled }}
      disabled={disabled}
      hitSlop={8}
      onPress={onPress}
      testID={testID}>
      <Text style={styles.label}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  label: { fontFamily: FontFamily.semibold, fontSize: 15, color: Colors.primary },
});
