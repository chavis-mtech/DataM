import type { Component } from 'solid-js';
import StatusCard from '../shared/ui/components/StatusCard';
import AppShell from '../shared/ui/layout/AppShell';
import './app.css';

const App: Component = () => {
  return (
    <AppShell>
      <section class="hero">
        <p class="eyebrow">DataM</p>
        <h1>Web UI foundation</h1>
        <p class="lead">
          The entry point is now separated from the app shell, styles are
          loaded globally, and the starter template has been replaced with a
          clearer baseline for growth.
        </p>
      </section>

      <section class="status-grid" aria-label="Project status">
        <StatusCard
          title="Solid baseline"
          items={[
            'Single entry point in src/index.tsx',
            'App shell moved to src/app/App.tsx',
            'Shared styling loaded from src/styles/global.css',
          ]}
        />
        <StatusCard
          title="Still missing"
          items={[
            'Routing if the app will have multiple screens',
            'API client or state boundary for real data',
            'Tests, linting, and environment configuration',
          ]}
        />
      </section>
    </AppShell>
  );
};

export default App;
