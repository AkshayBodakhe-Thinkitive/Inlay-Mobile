export type PatientProfile = {
  fullName: string;
  preferredName: string;
  sex: string;
  dateOfBirth: string; // MM/DD/YYYY
  phone: string;
  email: string;
  addressLines: string[];
  clinicName: string;
};

export type LegalDocKey = 'authorization' | 'privacy' | 'terms' | 'labRequest' | 'messaging';

export type LegalDoc = { key: LegalDocKey; title: string; body: string };

export type RecordSourceId = 'epic' | 'oracle';

export type RecordSource = {
  id: RecordSourceId;
  name: string;
  description: string;
  /** ISO time of the last sync; absent until the system is connected. */
  syncedAt?: string;
};

/** How Inlay may contact the patient about their care. All three are optional. */
export type ContactChoices = { text: boolean; call: boolean; email: boolean };
