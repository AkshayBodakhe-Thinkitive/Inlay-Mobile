import type { ComponentType } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/shared/constants/colors";
import { FontFamily } from "@/shared/constants/FontConstants";

type Props = {
  icon: ComponentType<{ color: string; size?: number }>;
  label: string;
  /** One string, or several lines (e.g. an address). */
  value: string | string[];
  /** Larger label/value pair, used for the "Your details" rows. */
  emphasis?: boolean;
  /** Colors the icon and its round tile (a hue from the design); 28 wide unless `size` says so. */
  tile?: { ink: string; tint: string; size?: number };
  /** Bold dark label with a muted line beneath, for title + description rows. */
  strongLabel?: boolean;
  /** Hairline above the row; set on every row but the first. */
  divider?: boolean;
  /** Trailing content, e.g. a "See all" link. */
  trailing?: React.ReactNode;
};

/** Round icon, a muted label and its value. */
export default function DetailRow({
  icon: Icon,
  label,
  value,
  emphasis,
  strongLabel,
  tile,
  divider,
  trailing,
}: Props) {
  const lines = Array.isArray(value) ? value : [value];
  const tileSize = tile?.size ?? 28;
  return (
    <View style={[styles.row, divider && styles.divider]}>
      <View
        style={[
          styles.iconWrap,
          tile && {
            width: tileSize,
            height: tileSize,
            borderRadius: tileSize / 2,
            backgroundColor: tile.tint,
          },
        ]}
      >
        <Icon
          color={tile?.ink ?? Colors.primary}
          size={tile ? Math.round(tileSize * 0.57) : undefined}
        />
      </View>
      <View style={styles.text}>
        <Text style={strongLabel ? styles.labelStrong : styles.label}>
          {label}
        </Text>
        {lines.map((line) => (
          <Text key={line} style={emphasis ? styles.valueStrong : styles.value}>
            {line}
          </Text>
        ))}
      </View>
      {trailing}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 12,
  },
  divider: { borderTopWidth: 1, borderTopColor: Colors.cardBorder },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryTint,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { flex: 1, gap: 2 },
  label: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.muted,
  },
  labelStrong: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.text,
  },
  value: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.muted,
  },
  valueStrong: {
    fontFamily: FontFamily.medium,
    fontSize: 17,
    lineHeight: 24,
    color: Colors.text,
  },
});
