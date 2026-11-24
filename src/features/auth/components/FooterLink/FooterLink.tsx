import { StyleSheet, Text, View } from 'react-native';

import TextButton from '@/shared/components/TextButton/TextButton';
import { Colors } from '@/shared/constants/colors';
import { FontFamily } from '@/shared/constants/FontConstants';

type Props = { prompt: string; action: string; onPress: () => void };

/** "Already set a password? Sign in", pinned to the foot of the sheet. */
export default function FooterLink({ prompt, action, onPress }: Props) {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>{prompt} </Text>
      <TextButton title={action} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 'auto',
    paddingTop: 32,
  },
  text: { fontFamily: FontFamily.regular, fontSize: 15, color: Colors.muted },
});
