import { Image, StyleSheet, View } from 'react-native';

const SHIELD = require('../../../../../assets/images/consent-shield.png');

/** The soft 3D consent shield. */
export default function ShieldArt({ size = 112 }: { size?: number }) {
  return (
    <View style={styles.wrap}>
      <Image
        source={SHIELD}
        style={{ width: size, height: size }}
        resizeMode="contain"
        accessible={false}
        accessibilityIgnoresInvertColors
      />
    </View>
  );
}

const styles = StyleSheet.create({ wrap: { alignItems: 'center', paddingVertical: 12 } });
