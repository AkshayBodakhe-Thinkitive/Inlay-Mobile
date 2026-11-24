import type { ReactNode } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";

import { Colors } from "@/shared/constants/colors";
import { FontFamily } from "@/shared/constants/FontConstants";
import { Radius, Space } from "@/shared/constants/layout";

const MARK = require("../../../../../assets/images/logo-mark-white.png");

type Props = { title: string; description?: ReactNode; children: ReactNode };

/** Sign-in style screen: logo and title on a teal band, the form on a white sheet rising over it. */
export default function AuthScreen({ title, description, children }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <KeyboardAvoidingView
        style={styles.fill}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.hero, { paddingTop: insets.top + 64 }]}>
            <HeroArt />
            <View style={styles.heroBody}>
              <Image
                source={MARK}
                style={styles.mark}
                resizeMode="contain"
                accessibilityRole="image"
                accessibilityLabel="Inlay Health"
              />
              <Text style={styles.title} accessibilityRole="header">
                {title}
              </Text>
              {description ? (
                <Text style={styles.description}>{description}</Text>
              ) : null}
            </View>
          </View>
          <View style={styles.sheet}>
            <View style={styles.sheetBody}>{children}</View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/** A wide white ring off the top right corner and a soft disc at the bottom left. */
function HeroArt() {
  return (
    <Svg
      style={styles.heroArt}
      viewBox="0 0 390 320"
      preserveAspectRatio="xMaxYMin slice"
    >
      <Circle
        cx="360"
        cy="30"
        r="170"
        fill="none"
        stroke={Colors.onPrimary}
        strokeOpacity={0.08}
        strokeWidth={40}
      />
      <Circle
        cx="20"
        cy="300"
        r="90"
        fill={Colors.onPrimary}
        fillOpacity={0.05}
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  fill: { flex: 1 },
  scroll: { flexGrow: 1 },
  hero: {
    paddingBottom: 72,
    overflow: "hidden",
    backgroundColor: Colors.primary,
  },
  heroArt: { position: "absolute", top: 0, right: 0, width: 390, height: 320 },
  heroBody: {
    width: "100%",
    maxWidth: 420 + Space.gutter * 2,
    alignSelf: "center",
    paddingHorizontal: Space.gutter,
    gap: 22,
  },
  mark: { width: 36, height: 43 },
  title: {
    fontFamily: FontFamily.semibold,
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -0.8,
    color: Colors.onPrimary,
  },
  description: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    lineHeight: 23,
    color: Colors.onPrimary,
    opacity: 0.85,
    marginTop: -12,
  },
  // Rises 28 over the band so the band reads as the sheet's backdrop.
  sheet: {
    flex: 1,
    marginTop: -28,
    backgroundColor: Colors.background,
    borderTopLeftRadius: Radius.sheet,
    borderTopRightRadius: Radius.sheet,
    paddingTop: 32,
    paddingBottom: 24,
  },
  sheetBody: {
    flex: 1,
    width: "100%",
    maxWidth: 420 + Space.gutter * 2,
    alignSelf: "center",
    paddingHorizontal: Space.gutter,
  },
});
