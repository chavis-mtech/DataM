# DataM Web

Minimal SolidJS web UI scaffold for the DataM project.

## Current structure

```text
src/
  app/
    App.tsx
    app.css
    bootstrap.tsx
  application/
    use-cases/
      get-foundation-overview.ts
  features/
    foundation/
      ui/
        FoundationOverview.tsx
  shared/
    ui/
      components/
        StatusCard.tsx
      layout/
        AppShell.tsx
  index.tsx
```

## Commands

```bash
npm run dev
npm run check
npm run build
```

## Styling

- Tailwind CSS v4 is integrated through the Vite plugin
- Theme tokens and base styles live in `src/app/app.css`
- UI components prefer utility classes and keep shared pieces in `src/shared/ui`

## What is still missing

- Routing when the UI grows beyond a single screen
- Data access layer for API calls or shared state
- Tests and linting in CI
- Environment variable strategy for different deployments
