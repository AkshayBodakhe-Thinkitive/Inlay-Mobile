// Sample patient from the app spec. Used until the real auth API exists.
export const MOCK_PATIENT = {
  email: "akshay.bodakhe@thinkitive.com",
  dateOfBirth: "07/31/2001", // MM/DD/YYYY, the format the date field uses
  code: "123456",
} as const;

// In-memory only: "Set password" overwrites it for the rest of the session.
// The default lets a returning patient sign in without activating first.
export const mockAccount = { password: "Pass@123" };
