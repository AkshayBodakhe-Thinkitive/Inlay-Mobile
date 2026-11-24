import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/shared/constants/colors';
import { FontFamily } from '@/shared/constants/FontConstants';
import { Radius } from '@/shared/constants/layout';

export default function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <View accessibilityRole="alert" accessibilityLiveRegion="polite" style={styles.box}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: Radius.touch,
    backgroundColor: Colors.errorTint,
    borderWidth: 1,
    borderColor: Colors.errorHalo,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  text: { fontFamily: FontFamily.regular, fontSize: 14, lineHeight: 20, color: Colors.error },
});
