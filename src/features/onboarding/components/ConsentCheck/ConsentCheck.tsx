import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

import { Colors } from "@/shared/constants/colors";
import { FontFamily } from "@/shared/constants/FontConstants";

export type ConsentPart = string | { text: string; onPress: () => void };

type Props = {
  checked: boolean;
  onToggle: () => void;
  /** Plain strings and tappable links, rendered inline in order. */
  parts: ConsentPart[];
  testID?: string;
};

/** Card with a checkbox and a sentence that can contain links. Links never toggle the box. */
export default function ConsentCheck({
  checked,
  onToggle,
  parts,
  testID,
}: Props) {
  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}
        onPress={onToggle}
        hitSlop={8}
        testID={testID}
        style={[styles.box, checked && styles.boxChecked]}
      >
        {checked ? (
          <Svg width={14} height={14} viewBox="0 0 14 14">
            <Path
              d="M2.5 7.5l3 3 6-7"
              stroke={Colors.onPrimary}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        ) : null}
      </Pressable>
      <Text style={styles.text}>
        {parts.map((part, i) =>
          typeof part === "string" ? (
            part
          ) : (
            <Text
              key={i}
              accessibilityRole="link"
              onPress={part.onPress}
              style={styles.link}
            >
              {part.text}
            </Text>
          ),
        )}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 16,
    boxShadow: "0 1px 3px rgba(16, 24, 40, 0.04)",
  },
  box: {
    width: 22,
    height: 22,
    marginTop: 1,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  boxChecked: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  text: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: 16,
    lineHeight: 26,
    color: Colors.text,
  },
  link: { color: Colors.inkPrimary, textDecorationLine: "underline" },
});
