import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import Button from '@/shared/components/Button/Button';
import { Colors } from '@/shared/constants/colors';
import { FontFamily } from '@/shared/constants/FontConstants';

type Props = {
  /** Name of the system being linked; shows the loader while set. */
  connecting?: string;
  /** Name of the system just linked; shows the confirmation while set. */
  connected?: string;
  onDone: () => void;
};

/** Centred popup: a loader while the link is made, then a confirmation. */
export default function ConnectPopup({ connecting, connected, onDone }: Props) {
  const visible = !!connecting || !!connected;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={connected ? onDone : undefined}>
      <View style={styles.root}>
        <Pressable
          style={styles.scrim}
          onPress={connected ? onDone : undefined}
          accessibilityLabel="Close"
        />
        <View style={styles.card} accessibilityViewIsModal>
          {connecting ? (
            <>
              <ActivityIndicator size="large" color={Colors.primary} />
              <Text style={styles.title}>Connecting to {connecting}</Text>
              <Text style={styles.body}>This only takes a moment.</Text>
            </>
          ) : (
            <>
              <View style={styles.check}>
                <Svg width={28} height={28} viewBox="0 0 28 28">
                  <Path
                    d="M6 14.5l5.5 5.5L22 8"
                    stroke={Colors.onPrimary}
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </Svg>
              </View>
              <Text style={styles.title}>{connected} connected</Text>
              <Text style={styles.body}>Your records will start to arrive on their own.</Text>
              <View style={styles.action}>
                <Button title="Done" onPress={onDone} />
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  scrim: { ...StyleSheet.absoluteFill, backgroundColor: Colors.scrim },
  card: {
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.background,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  check: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: FontFamily.semibold,
    fontSize: 18,
    lineHeight: 24,
    color: Colors.text,
    textAlign: 'center',
  },
  body: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.muted,
    textAlign: 'center',
  },
  action: { alignSelf: 'stretch', marginTop: 8 },
});
