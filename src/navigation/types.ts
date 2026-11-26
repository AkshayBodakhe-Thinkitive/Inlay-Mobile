import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Activate: undefined;
  SetPassword: { email: string };
  Login: { created?: boolean; email?: string } | undefined;
};

export type OnboardingStackParamList = {
  AboutYou: undefined;
  Consent: undefined;
  ConnectRecords: undefined;
  UpdatesAboutCare: undefined;
  YourWhy: undefined;
};

export type AppStackParamList = {
  Home: undefined;
};

export type AuthScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>;

export type AppScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>;

export type OnboardingScreenProps<T extends keyof OnboardingStackParamList> = NativeStackScreenProps<
  OnboardingStackParamList,
  T
>;
