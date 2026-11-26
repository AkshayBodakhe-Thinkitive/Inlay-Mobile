# Inlay — Reference

Background info and pointers that don't belong in [CLAUDE.md](../CLAUDE.md). Read this only when a task needs it.

## Files to refer to

| File | What it holds |
|---|---|
| [docs/project-arch/app-base-structure-template.md](project-arch/app-base-structure-template.md) | Target folder structure, layering rules, API client behaviour, bootstrap checklist |
| [docs/project-arch/app-base-structure-preview.html](project-arch/app-base-structure-preview.html) | Browsable version of the template (still contains the old Testing section) |
| [docs/app-spec/](app-spec/README.md) | Product spec, screens 01–13 (getting in → error states). Git-ignored, local only |
| [docs/BE_docs/](BE_docs/) | Backend docs (empty for now) |
| [SETUP.md](../SETUP.md) | How the project was created |
| `Inlay-Project/` | The working prototype (Expo Router). Source for design: `src/lib/theme.ts`, `src/components/ui.tsx`, `src/app/*.tsx`, screenshots in `docs/screen-guide/screens/`. Git-ignored, not part of the build |

## Decisions

- Navigation is React Navigation 7, not Expo Router. Entry: `index.ts` → `App.tsx` → `src/navigation/`.
- The template is followed without its testing parts: no Jest, no `__tests__`, no `__mocks__`.
- `assets/` holds the Inter fonts, the white logo mark and the splash mark, copied from `Inlay-Project/assets`; no app icon yet (Expo default).
- Features so far: `auth` (Activate, Create password, Sign in) and `splash` (animated launch screen). Home is a placeholder.

## Not built yet

- Bottom tabs and `CustomTabBar`
- Deep-link `linking` config
- Redux store, React Query, i18n, API error/retry/401 handling (`shared/api/client.ts` is a bare axios instance)
- Real auth flow (`RootNavigator` uses a local flag)
- Runtime environment picker (hidden tap on the logo) and the Redux/React Query layers

## Environment notes

- Expo SDK 58 needs Node >= 22.13 (`nvm use 22`); Node 20 breaks `npx expo run:ios`.
- `ios/` and `android/` are generated and git-ignored. After config changes run `npx expo prebuild --clean`.
- Remote: `AkshayBodakhe-Thinkitive/Inlay-Mobile` (public). Work goes to `dev`; never push straight to `main`.

## Notes

<!-- Add anything else here. -->
