import { Pressable, StyleSheet, Text, View } from 'react-native';

import { IconClinic } from '@/shared/components/Icons/Icons';
import { Colors } from '@/shared/constants/colors';
import { FontFamily } from '@/shared/constants/FontConstants';

import type { RecordSource } from '../../types';
import { clockTime } from '../../utils/time';
import InfoCard from '../InfoCard/InfoCard';

type Props = { source: RecordSource; disabled?: boolean; onConnect: () => void };

/** A record system with a Connect link, or a green dot and sync time once linked. */
export default function SourceCard({ source, disabled, onConnect }: Props) {
  return (
    <InfoCard style={styles.card}>
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <IconClinic color={Colors.primary} />
        </View>
        <View style={styles.text}>
          <Text style={styles.name}>{source.name}</Text>
          <Text style={styles.description}>{source.description}</Text>
        </View>
        {source.syncedAt ? (
          <View style={styles.status} accessibilityLabel={`Connected, synced ${clockTime(source.syncedAt)}`}>
            <View style={styles.dot} />
            <Text style={styles.synced}>{clockTime(source.syncedAt)}</Text>
          </View>
        ) : (
          <Pressable
            accessibilityRole="link"
            accessibilityLabel={`Connect ${source.name}`}
            disabled={disabled}
            onPress={onConnect}
            hitSlop={8}>
            <Text style={[styles.connect, disabled && styles.connectDisabled]}>Connect</Text>
          </Pressable>
        )}
      </View>
    </InfoCard>
  );
}

const styles = StyleSheet.create({
  card: { paddingVertical: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1, gap: 2 },
  name: { fontFamily: FontFamily.medium, fontSize: 16, lineHeight: 22, color: Colors.text },
  description: { fontFamily: FontFamily.regular, fontSize: 13, lineHeight: 18, color: Colors.muted },
  connect: { fontFamily: FontFamily.medium, fontSize: 15, color: Colors.inkPrimary },
  connectDisabled: { opacity: 0.4 },
  status: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.success },
  synced: { fontFamily: FontFamily.regular, fontSize: 13, color: Colors.muted },
});
