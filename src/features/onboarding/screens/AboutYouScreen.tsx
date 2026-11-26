import { StyleSheet, Text, View } from "react-native";

import type { OnboardingScreenProps } from "@/navigation/types";
import FormError from "@/shared/components/FormError/FormError";
import {
  IconCalendar,
  IconClinic,
  IconMail,
  IconPhone,
  IconPin,
} from "@/shared/components/Icons/Icons";
import { Colors } from "@/shared/constants/colors";
import { FontFamily } from "@/shared/constants/FontConstants";

import DetailRow from "../components/DetailRow/DetailRow";
import InfoCard from "../components/InfoCard/InfoCard";
import OnboardingScreen from "../components/OnboardingScreen/OnboardingScreen";
import { useAboutYou } from "../hooks/useAboutYou";
import { ageFrom, initials, longDate } from "../utils/age";

export default function AboutYouScreen({
  navigation,
}: OnboardingScreenProps<"AboutYou">) {
  const { profile, formError, saving, confirm } = useAboutYou(() =>
    navigation.navigate("Consent"),
  );

  return (
    // No back button: this is the first screen of setup.
    <OnboardingScreen
      title="Is this you?"
      footerTitle="Continue"
      onFooterPress={confirm}
      footerLoading={saving}
      error={profile ? formError : undefined}
    >
      {profile ? (
        <>
          <InfoCard style={styles.identity}>
            <View style={styles.identityRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {initials(profile.fullName)}
                </Text>
              </View>
              <View style={styles.identityText}>
                <Text style={styles.name}>{profile.fullName}</Text>
                <Text style={styles.meta}>
                  Goes by {profile.preferredName} • {profile.sex} •{" "}
                  {ageFrom(profile.dateOfBirth)} years
                </Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>From your clinic</Text>
              </View>
            </View>
          </InfoCard>

          <Text style={styles.heading}>Your details</Text>
          <InfoCard>
            <DetailRow
              emphasis
              icon={IconCalendar}
              label="Date of birth"
              value={longDate(profile.dateOfBirth)}
            />
            <DetailRow
              emphasis
              divider
              icon={IconPhone}
              label="Mobile phone"
              value={profile.phone}
            />
            <DetailRow
              emphasis
              divider
              icon={IconMail}
              label="Email"
              value={profile.email}
            />
            <DetailRow
              emphasis
              divider
              icon={IconPin}
              label="Home address"
              value={profile.addressLines}
            />
          </InfoCard>

          <Text style={styles.heading}>Your clinic</Text>
          <InfoCard>
            <DetailRow
              icon={IconClinic}
              label="Shares your record with you"
              value={profile.clinicName}
              emphasis
            />
          </InfoCard>
        </>
      ) : (
        <FormError message={formError} />
      )}
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  identity: { paddingVertical: 16 },
  identityRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontFamily: FontFamily.semibold,
    fontSize: 24,
    color: Colors.onPrimary,
  },
  identityText: { flex: 1, gap: 4 },
  name: {
    fontFamily: FontFamily.medium,
    fontSize: 20,
    lineHeight: 28,
    color: Colors.text,
  },
  meta: {
    fontFamily: FontFamily.regular,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.muted,
  },
  tag: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.primaryEdge,
    backgroundColor: Colors.primaryTintPressed,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tagText: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    color: Colors.inkPrimary,
  },
  heading: {
    fontFamily: FontFamily.medium,
    fontSize: 18,
    color: Colors.muted,
  },
});
