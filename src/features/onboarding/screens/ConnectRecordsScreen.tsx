import { StyleSheet, Text } from 'react-native';

import FormError from '@/shared/components/FormError/FormError';
import type { OnboardingScreenProps } from '@/navigation/types';
import { Colors } from '@/shared/constants/colors';
import { FontFamily } from '@/shared/constants/FontConstants';

import ConnectPopup from '../components/ConnectPopup/ConnectPopup';
import OnboardingScreen from '../components/OnboardingScreen/OnboardingScreen';
import SourceCard from '../components/SourceCard/SourceCard';
import { useConnectRecords } from '../hooks/useConnectRecords';

export default function ConnectRecordsScreen({ navigation }: OnboardingScreenProps<'ConnectRecords'>) {
  const form = useConnectRecords();

  return (
    <OnboardingScreen
      title="Connect your health records"
      onBack={navigation.goBack}
      footerTitle="Continue"
      onFooterPress={() => navigation.navigate('UpdatesAboutCare')}
      footerDisabled={!form.canContinue}>
      <Text style={styles.intro}>
        Link the record system your doctors use, and your results, medicines and visits arrive on
        their own.
      </Text>
      <FormError message={form.error} />
      {form.sources.map((source) => (
        <SourceCard
          key={source.id}
          source={source}
          disabled={!!form.connecting}
          onConnect={() => form.connect(source.id)}
        />
      ))}
      <ConnectPopup
        connecting={form.connecting?.name}
        connected={form.justConnected?.name}
        onDone={form.dismissConnected}
      />
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  intro: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.muted,
    marginTop: -8,
  },
});
