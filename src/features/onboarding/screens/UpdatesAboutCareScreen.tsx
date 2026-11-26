import { useCallback, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { Colors } from '@/shared/constants/colors';
import { FontFamily } from '@/shared/constants/FontConstants';
import type { OnboardingScreenProps } from '@/navigation/types';

import BellArt from '../components/BellArt/BellArt';
import ConsentCheck from '../components/ConsentCheck/ConsentCheck';
import DocSheet from '../components/DocSheet/DocSheet';
import OnboardingScreen from '../components/OnboardingScreen/OnboardingScreen';
import { DOC_TITLES } from '../constants';
import { useContactConsent } from '../hooks/useContactConsent';
import { getLegalDoc } from '../services/onboardingService';

export default function UpdatesAboutCareScreen({
  navigation,
}: OnboardingScreenProps<'UpdatesAboutCare'>) {
  const form = useContactConsent(() => navigation.navigate('YourWhy'));
  const [showTerms, setShowTerms] = useState(false);
  const loadTerms = useCallback(() => getLegalDoc('messaging').then((d) => d.body), []);

  return (
    <OnboardingScreen
      onBack={navigation.goBack}
      footerTitle="Agree and continue"
      onFooterPress={form.submit}
      footerLoading={form.saving}
      error={form.formError}>
      <BellArt />
      <Text style={styles.title} accessibilityRole="header">
        Updates about your care
      </Text>
      <ConsentCheck
        checked={form.choices.text}
        onToggle={() => form.toggle('text')}
        testID="contact-text"
        parts={[
          'Inlay can text me about my care, like new results and reminders. ',
          { text: 'Messaging terms', onPress: () => setShowTerms(true) },
        ]}
      />
      <ConsentCheck
        checked={form.choices.call}
        onToggle={() => form.toggle('call')}
        testID="contact-call"
        parts={['Inlay can call me about my care.']}
      />
      <ConsentCheck
        checked={form.choices.email}
        onToggle={() => form.toggle('email')}
        testID="contact-email"
        parts={['Inlay can email me about my care.']}
      />
      <DocSheet
        visible={showTerms}
        title={DOC_TITLES.messaging}
        load={loadTerms}
        onClose={() => setShowTerms(false)}
      />
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  // Centred under the bell, as in the design.
  title: {
    fontFamily: FontFamily.semibold,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.4,
    color: Colors.text,
    textAlign: 'center',
  },
});
