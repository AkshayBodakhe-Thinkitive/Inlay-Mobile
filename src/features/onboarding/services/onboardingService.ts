import { apiClient } from '@/shared/api/client';
import { USE_MOCK } from '@/shared/config/env';
import { delay } from '@/shared/utils/delay';

import {
  MOCK_LEGAL_DOCS,
  MOCK_PROFILE,
  MOCK_RECORD_TYPES,
  MOCK_SOURCES,
} from '../mock/onboardingMocks';
import type {
  ContactChoices,
  LegalDoc,
  LegalDocKey,
  PatientProfile,
  RecordSource,
  RecordSourceId,
} from '../types';

/*
 * Each function checks USE_MOCK first. The endpoint paths are provisional: confirm them
 * against the API schema before turning mock mode off.
 */

/** The details the clinic already holds for the signed-in patient. */
export async function getPatientProfile(): Promise<PatientProfile> {
  if (USE_MOCK) {
    await delay(300);
    return MOCK_PROFILE;
  }
  const { data } = await apiClient.get<PatientProfile>('/api/onboarding/profile');
  return data;
}

/** Records that the patient confirmed the details are theirs. */
export async function confirmProfile() {
  if (USE_MOCK) {
    await delay(600);
    return;
  }
  await apiClient.post('/api/onboarding/profile/confirm');
}

/** Every kind of record Inlay collects (shown by "See all"). */
export async function getRecordTypes(): Promise<string[]> {
  if (USE_MOCK) return MOCK_RECORD_TYPES;
  const { data } = await apiClient.get<string[]>('/api/onboarding/record-types');
  return data;
}

export async function getLegalDoc(key: LegalDocKey): Promise<LegalDoc> {
  if (USE_MOCK) {
    await delay(200);
    return MOCK_LEGAL_DOCS[key];
  }
  const { data } = await apiClient.get<LegalDoc>(`/api/legal/${key}`);
  return data;
}

/** Stores the signed records consent and legal agreement. */
export async function signRecordsConsent() {
  if (USE_MOCK) {
    await delay(600);
    return;
  }
  await apiClient.post('/api/onboarding/consent', { authorization: true, legal: true });
}

/** The record systems a patient can link. Only these two are offered in setup. */
export async function getRecordSources(): Promise<RecordSource[]> {
  if (USE_MOCK) return MOCK_SOURCES;
  const { data } = await apiClient.get<RecordSource[]>('/api/records/sources');
  return data;
}

/** Links a record system and returns the time of its first sync (ISO). */
export async function connectSource(id: RecordSourceId): Promise<string> {
  if (USE_MOCK) {
    await delay(1400);
    return new Date().toISOString();
  }
  const { data } = await apiClient.post<{ syncedAt: string }>(`/api/records/sources/${id}/connect`);
  return data.syncedAt;
}

/** Stores how the patient allows Inlay to contact them. Signing this starts building the record. */
export async function signContactConsent(choices: ContactChoices) {
  if (USE_MOCK) {
    await delay(600);
    return;
  }
  await apiClient.post('/api/onboarding/contact-consent', choices);
}
