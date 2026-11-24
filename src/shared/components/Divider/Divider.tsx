import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/shared/constants/colors';
import { FontFamily } from '@/shared/constants/FontConstants';

/** A hairline with "or" between two ways to sign in. */
export default function Divider({ label = 'or' }: { label?: string }) {
  return (
    <View style={styles.row}>
      <View style={styles.rule} />
      <Text style={styles.label}>{label}</Text>
      <View style={styles.rule} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rule: { flex: 1, height: 1, backgroundColor: Colors.border },
  label: { fontFamily: FontFamily.regular, fontSize: 13, color: Colors.muted },
});
