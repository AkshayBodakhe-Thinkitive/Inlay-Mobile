import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import type { OnboardingScreenProps } from "@/navigation/types";
import { IconFlask, IconLock } from "@/shared/components/Icons/Icons";
import { Colors } from "@/shared/constants/colors";
import { FontFamily } from "@/shared/constants/FontConstants";

import ConsentCheck from "../components/ConsentCheck/ConsentCheck";
import DetailRow from "../components/DetailRow/DetailRow";
import DocSheet from "../components/DocSheet/DocSheet";
import InfoCard from "../components/InfoCard/InfoCard";
import OnboardingScreen from "../components/OnboardingScreen/OnboardingScreen";
import ShieldArt from "../components/ShieldArt/ShieldArt";
import { DOC_TITLES } from "../constants";
import { useConsent } from "../hooks/useConsent";
import { MOCK_PROFILE } from "../mock/onboardingMocks";
import { getLegalDoc } from "../services/onboardingService";
import type { LegalDocKey } from "../types";

type Open = LegalDocKey | "records" | null;

export default function ConsentScreen({
  navigation,
}: OnboardingScreenProps<"Consent">) {
  const form = useConsent(() => navigation.navigate("ConnectRecords"));
  const [open, setOpen] = useState<Open>(null);

  const docKey = open && open !== "records" ? open : null;
  const loadDoc = useCallback(
    () =>
      docKey ? getLegalDoc(docKey).then((d) => d.body) : Promise.resolve(""),
    [docKey],
  );
  const close = () => setOpen(null);

  const types = form.recordTypes;
  const summary =
    types.length > 2
      ? `${types[0]}, ${types[1].toLowerCase()} and ${types.length - 2} more`
      : types.join(", ");

  return (
    <OnboardingScreen
      onBack={navigation.goBack}
      footerTitle="Agree and continue"
      onFooterPress={form.submit}
      footerLoading={form.saving}
      error={form.formError}
    >
      <ShieldArt />

      <InfoCard>
        <DetailRow
          icon={IconLock}
          label="Who sees them"
          strongLabel
          value={`You and ${MOCK_PROFILE.clinicName}`}
        />
        <DetailRow
          divider
          strongLabel
          icon={IconFlask}
          label="What we collect"
          value={summary || "Your health records"}
          trailing={
            <Pressable
              accessibilityRole="link"
              onPress={() => setOpen("records")}
              hitSlop={8}
            >
              <Text style={styles.seeAll}>See all</Text>
            </Pressable>
          }
        />
      </InfoCard>

      <ConsentCheck
        checked={form.authorized}
        onToggle={form.toggleAuthorized}
        testID="consent-authorize"
        parts={[
          "I authorize Inlay Health to collect my health records. ",
          {
            text: "Read the authorization",
            onPress: () => setOpen("authorization"),
          },
        ]}
      />
      <ConsentCheck
        checked={form.agreed}
        onToggle={form.toggleAgreed}
        testID="consent-agree"
        parts={[
          "I agree to Inlay’s ",
          { text: "privacy policy", onPress: () => setOpen("privacy") },
          ", ",
          { text: "terms of service", onPress: () => setOpen("terms") },
          " and ",
          { text: "lab request terms", onPress: () => setOpen("labRequest") },
        ]}
      />

      <DocSheet
        visible={open === "records"}
        title="What we collect"
        lines={types}
        onClose={close}
      />
      <DocSheet
        visible={docKey !== null}
        title={docKey ? DOC_TITLES[docKey] : ""}
        load={loadDoc}
        onClose={close}
      />
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  seeAll: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.inkPrimary,
  },
});
