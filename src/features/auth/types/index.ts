export type ActivationRequest = {
  email: string;
  dateOfBirth: string; // MM/DD/YYYY
  code: string; // 6 digits
};

export class ActivationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ActivationError';
  }
}

export class InvalidCredentialsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidCredentialsError';
  }
}
