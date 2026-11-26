import type { LegalDoc, LegalDocKey, PatientProfile, RecordSource } from '../types';

// Sample patient from the app spec. Used until the clinic-records API exists.
export const MOCK_PROFILE: PatientProfile = {
  fullName: 'Olivia Bennett',
  preferredName: 'Liv',
  sex: 'Female',
  dateOfBirth: '03/14/1981',
  phone: '(619) 555-0143',
  email: 'olivia.bennett@example.com',
  addressLines: ['2140 Coast Boulevard, Apt 3', 'Del Mar, CA 92014'],
  clinicName: 'Harborview Longevity Clinic',
};

export const MOCK_RECORD_TYPES = [
  'Visits',
  'Labs',
  'Medicines',
  'Allergies',
  'Conditions',
  'Immunizations',
  'Procedures',
  'Imaging',
  'Vital signs',
];

const PLACEHOLDER = 'Placeholder text. The real build needs counsel-approved wording.';

export const MOCK_LEGAL_DOCS: Record<LegalDocKey, LegalDoc> = {
  authorization: { key: 'authorization', title: 'Authorization', body: PLACEHOLDER },
  privacy: { key: 'privacy', title: 'Privacy policy', body: PLACEHOLDER },
  terms: { key: 'terms', title: 'Terms of service', body: PLACEHOLDER },
  labRequest: { key: 'labRequest', title: 'Lab request terms', body: PLACEHOLDER },
  messaging: { key: 'messaging', title: 'Messaging terms', body: PLACEHOLDER },
};

export const MOCK_SOURCES: RecordSource[] = [
  { id: 'epic', name: 'Epic MyChart', description: 'Hospitals and clinics on Epic' },
  { id: 'oracle', name: 'Oracle Health', description: 'Hospitals and clinics on Cerner' },
];
