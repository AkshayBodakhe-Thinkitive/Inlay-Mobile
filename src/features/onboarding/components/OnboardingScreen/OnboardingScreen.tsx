import type { ReactNode } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/shared/components/Button/Button";
import FormError from "@/shared/components/FormError/FormError";
import { IconBack } from "@/shared/components/Icons/Icons";
import { Colors } from "@/shared/constants/colors";
import { FontFamily } from "@/shared/constants/FontConstants";
import { Space } from "@/shared/constants/layout";

type Props = {
  /** Large heading at the top. Omit when the screen leads with an illustration. */
  title?: string;
  /** One line under the title. */
  description?: string;
  /** Shows a back button; leave out on the first setup screen. */
  onBack?: () => void;
  footerTitle: string;
  onFooterPress: () => void;
  footerLoading?: boolean;
  footerDisabled?: boolean;
  /** Shown above the button, e.g. "Tick the box to agree first." */
  error?: string;
  children: ReactNode;
};

/** Setup screen: scrolling content on a soft background with a fixed footer button. */
export default function OnboardingScreen({
  title,
  description,
  onBack,
  footerTitle,
  onFooterPress,
  footerLoading,
  footerDisabled,
  error,
  children,
}: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.fill}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {onBack ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back"
            onPress={onBack}
            hitSlop={8}
            style={styles.back}
          >
            <IconBack color={Colors.muted} />
          </Pressable>
        ) : null}
        {title ? (
          <Text style={styles.title} accessibilityRole="header">
            {title}
          </Text>
        ) : null}
        {description ? <Text style={styles.description}>{description}</Text> : null}
        <View style={styles.body}>{children}</View>
      </ScrollView>
      <View style={styles.footer}>
        <FormError message={error} />
        <Button
          title={footerTitle}
          onPress={onFooterPress}
          loading={footerLoading}
          disabled={footerDisabled}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.surface },
  fill: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: Space.gutter,
    paddingTop: 16,
    paddingBottom: 24,
  },
  back: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.cardBorder,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  title: {
    fontFamily: FontFamily.semibold,
    fontSize: 24,
    lineHeight: 34,
    letterSpacing: -0.5,
    color: Colors.text,
    marginBottom: 20,
  },
  // Pulls up under the title, whose bottom margin is sized for a body that follows directly.
  description: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.muted,
    marginTop: -12,
    marginBottom: 20,
  },
  body: { gap: Space.section },
  footer: {
    gap: 12,
    paddingHorizontal: Space.gutter,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
});
