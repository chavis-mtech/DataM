# DataM Web

Minimal SolidJS web UI scaffold for the DataM project.

## Current structure

```text
src/
  app/
    App.tsx
    app.css
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

## What is still missing

- Routing when the UI grows beyond a single screen
- Data access layer for API calls or shared state
- Tests and linting in CI
- Environment variable strategy for different deployments
