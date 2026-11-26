import { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/shared/constants/colors';
import { FontFamily } from '@/shared/constants/FontConstants';
import { Radius } from '@/shared/constants/layout';

type Props = {
  visible: boolean;
  title: string;
  onClose: () => void;
  /** Loads the sheet text; omit when `lines` is given. */
  load?: () => Promise<string>;
  /** Short items shown as pills (e.g. the record types). */
  lines?: string[];
};

/** Bottom sheet for documents and lists. Closed by the button, a tap outside or the system back. */
export default function DocSheet({ visible, title, onClose, load, lines }: Props) {
  const insets = useSafeAreaInsets();
  // The result remembers which loader produced it, so a new document shows the spinner
  // again without resetting state inside the effect.
  const [result, setResult] = useState<{ source: typeof load; body?: string; failed?: boolean }>();

  useEffect(() => {
    if (!visible || !load) return;
    let active = true;
    load()
      .then((body) => active && setResult({ source: load, body }))
      .catch(() => active && setResult({ source: load, failed: true }));
    return () => {
      active = false;
    };
  }, [visible, load]);

  const current = result?.source === load ? result : undefined;
  const body = current?.body;
  const failed = current?.failed;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      {/* The scrim fills the whole screen, so the sheet's rounded corners sit over it. */}
      <View style={styles.root}>
        <Pressable style={styles.scrim} onPress={onClose} accessibilityLabel="Close" />
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.handle} />
        <Text style={styles.title} accessibilityRole="header">
          {title}
        </Text>
        <ScrollView style={styles.scroll}>
          {lines ? (
            <View style={styles.pills}>
              {lines.map((line) => (
                <View key={line} style={styles.pill}>
                  <Text style={styles.pillText}>{line}</Text>
                </View>
              ))}
            </View>
          ) : failed ? (
            <Text style={styles.body}>We couldn’t load this. Please try again.</Text>
          ) : body === undefined ? (
            <ActivityIndicator color={Colors.primary} />
          ) : (
            <Text style={styles.body}>{body}</Text>
          )}
        </ScrollView>
        <Pressable accessibilityRole="button" onPress={onClose} style={styles.close}>
          <Text style={styles.closeText}>Close</Text>
        </Pressable>
      </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  scrim: { ...StyleSheet.absoluteFill, backgroundColor: Colors.scrim },
  sheet: {
    maxHeight: '75%',
    backgroundColor: Colors.background,
    borderTopLeftRadius: Radius.sheet,
    borderTopRightRadius: Radius.sheet,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    marginBottom: 16,
  },
  title: { fontFamily: FontFamily.semibold, fontSize: 20, lineHeight: 26, color: Colors.text },
  scroll: { marginVertical: 16 },
  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.primaryEdge,
    backgroundColor: Colors.primaryTintPressed,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  pillText: { fontFamily: FontFamily.medium, fontSize: 13, lineHeight: 18, color: Colors.inkPrimary },
  body: { fontFamily: FontFamily.regular, fontSize: 15, lineHeight: 22, color: Colors.muted },
  close: {
    minHeight: 44,
    borderRadius: Radius.button,
    backgroundColor: Colors.primaryTint,
    borderWidth: 1,
    borderColor: Colors.primaryEdge,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: { fontFamily: FontFamily.medium, fontSize: 16, color: Colors.inkPrimary },
});
