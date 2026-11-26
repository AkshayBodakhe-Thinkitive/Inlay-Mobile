import type { ReactNode } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { Colors } from "@/shared/constants/colors";

type Props = { children: ReactNode; style?: StyleProp<ViewStyle> };

export default function InfoCard({ children, style }: Props) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    paddingHorizontal: 16,
    paddingVertical: 8,
    boxShadow: "0 1px 3px rgba(16, 24, 40, 0.04)",
  },
});
