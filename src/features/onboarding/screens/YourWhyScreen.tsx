import { StyleSheet, Text, View } from 'react-native';

import {
  IconCalendarCheck,
  IconChartLine,
  IconClipboard,
  IconHeart,
  IconHeartPulse,
  IconInfo,
} from '@/shared/components/Icons/Icons';
import { Colors } from '@/shared/constants/colors';
import { FontFamily } from '@/shared/constants/FontConstants';
import type { OnboardingScreenProps } from '@/navigation/types';

import DetailRow from '../components/DetailRow/DetailRow';
import InfoCard from '../components/InfoCard/InfoCard';
import OnboardingScreen from '../components/OnboardingScreen/OnboardingScreen';

type Props = OnboardingScreenProps<'YourWhy'> & { onDone: () => void };

const green = { ink: Colors.ok, tint: Colors.okTint };
const teal = { ink: Colors.primary, tint: Colors.primaryTint };
const blue = { ink: Colors.blue, tint: Colors.blueTint };
const amber = { ink: Colors.amber, tint: Colors.amberTint };
const red = { ink: Colors.high, tint: Colors.highTint };

const BENEFITS = [
  {
    icon: IconHeartPulse,
    tile: green,
    title: 'A comprehensive assessment of your health',
    line: 'Including your biological age',
  },
  {
    icon: IconChartLine,
    tile: teal,
    title: 'A complete summary of your medical history',
    line: 'Every result from every provider, in one place',
  },
  {
    icon: IconCalendarCheck,
    tile: blue,
    title: 'Your medicines and appointments',
    line: 'Kept up to date from your records, not by you',
  },
  {
    icon: IconClipboard,
    tile: amber,
    title: 'Where your tests stand',
    line: 'See each test’s status without a phone call',
  },
  {
    icon: IconHeart,
    tile: red,
    title: 'How you feel, in body and mind',
    line: 'What your records can’t show, asked directly',
  },
] as const;

export default function YourWhyScreen({ onDone }: Props) {
  return (
    // No back button: the consent just signed starts building the record.
    <OnboardingScreen
      title="Your why"
      description="Here is what your new account does for you. It is free, and it stays free."
      footerTitle="Continue"
      // TODO: continue to "Building your record" once that screen exists; Home for now.
      onFooterPress={onDone}>
      <InfoCard>
        {BENEFITS.map((b, i) => (
          <DetailRow
            key={b.title}
            strongLabel
            divider={i > 0}
            icon={b.icon}
            tile={b.tile}
            label={b.title}
            value={b.line}
          />
        ))}
      </InfoCard>
      <View style={styles.note} accessible accessibilityRole="text">
        <IconInfo color={Colors.blue} size={18} />
        <Text style={styles.noteText}>
          None of this asks you to buy anything. The record is yours whether or not you ever take
          an optimization plan.
        </Text>
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  note: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: Colors.blueTint,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  noteText: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.content,
  },
});
