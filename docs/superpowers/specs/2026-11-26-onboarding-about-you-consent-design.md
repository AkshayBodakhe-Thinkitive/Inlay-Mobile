# Onboarding: "Is this you?" and Records Consent — Design

Source: `docs/app-spec/02-first-time-setup.md` (sections 5 and 6). Follows the conventions in `CLAUDE.md` and the existing `features/auth` structure.

## Scope

Build two screens and the navigation that reaches them:

1. **Is this you?** (`AboutYou`): setup step 1, no back button.
2. **Connect your health records (consent)** (`Consent`): setup step 2, with a back button.

Out of scope: Connect records, Updates about your care, Your why. Consent's success path goes to Home as a placeholder (marked with a comment) until the next screen exists.

## Structure (`src/features/onboarding/`)

| Path | Purpose |
|------|---------|
| `screens/AboutYouScreen.tsx`, `screens/ConsentScreen.tsx` | Screens; call hooks only |
| `components/OnboardingScreen` | Layout: scrolling body, fixed footer button, optional back button |
| `components/DetailRow`, `InfoCard` | Icon + label + value row; card wrapper |
| `components/ConsentCheck` | Checkbox with inline tappable links |
| `components/DocSheet` | `Modal`-based bottom sheet for documents and "See all" (no new dependency) |
| `hooks/useAboutYou.ts`, `hooks/useConsent.ts` | State, validation, submit |
| `services/onboardingService.ts` | Checks `USE_MOCK` first; real endpoints provisional |
| `mock/onboardingMocks.ts` | Olivia Bennett, Harborview Longevity Clinic, record types, placeholder legal text |
| `types/` | Patient profile, consent types |

## Navigation

- `types.ts` gains `OnboardingStackParamList` (`AboutYou`, `Consent`) and `OnboardingScreenProps`.
- New `OnboardingNavigator`.
- `RootNavigator` state: signed out → Auth; signed in, not onboarded → Onboarding; onboarded → App. `onSignIn` moves to Onboarding; finishing consent moves to App.
- Mock mode sends every sign-in through onboarding. A real `isNewPatient` flag replaces this when the API exists.

## Screen behavior

**Is this you?**
- Identity card: initials avatar, name, "Goes by Liv • Female • 45 years", "From your clinic" tag. Age is computed from the mock date of birth.
- "Your details" card (view only): date of birth, mobile phone, email, home address.
- "Your clinic" card: "Shares your record with you" / Harborview Longevity Clinic.
- Continue: busy state while the confirmation saves, then navigates to Consent. Save failure shows `FormError`.

**Consent**
- Shield illustration, drawn as a simplified SVG with a check. The 3D render can replace it later.
- Card: "Who sees them" (You and Harborview Longevity Clinic); "What we collect" (Visits, labs and 7 more) with a "See all" link.
- Checkbox 1: authorize Inlay Health to collect records, with a "Read the authorization" link.
- Checkbox 2: privacy policy, terms of service and lab request terms, each its own link.
- Agree and continue: proceeds only when both are ticked; otherwise shows "Tick the box to agree first." Busy state while saving.
- "See all" and every document link open a `DocSheet`. Reading is never required.

## Styling and icons

Colors and fonts come from `shared/constants`. Icons use `Icons`/`HugeIcon`; missing ones (calendar, phone, pin, lock, flask, send, chevron-left) are added to the shared set.

## Testing / Definition of Done

- `npm run lint` and `npx tsc --noEmit` pass.
- Manual run on iOS or Android, and web: sign in, confirm details, tick both boxes, reach Home; empty-box error; each sheet opens and closes; back from Consent returns to AboutYou.
