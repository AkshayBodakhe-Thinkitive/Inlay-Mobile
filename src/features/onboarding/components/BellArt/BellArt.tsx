import { Image, StyleSheet, View } from 'react-native';

const BELL = require('../../../../../assets/images/art-bell.png');

/** The soft 3D notification bell. */
export default function BellArt({ size = 112 }: { size?: number }) {
  return (
    <View style={styles.wrap}>
      <Image
        source={BELL}
        style={{ width: size, height: size }}
        resizeMode="contain"
        accessible={false}
        accessibilityIgnoresInvertColors
      />
    </View>
  );
}

const styles = StyleSheet.create({ wrap: { alignItems: 'center', paddingVertical: 12 } });
