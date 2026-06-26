import type { Component } from 'solid-js';
import { getFoundationOverview } from '../application/use-cases/get-foundation-overview';
import FoundationOverview from '../features/foundation/ui/FoundationOverview';
import AppShell from '../shared/ui/layout/AppShell';
import './app.css';

const App: Component = () => {
  const overview = getFoundationOverview();

  return (
    <AppShell>
      <FoundationOverview overview={overview} />
    </AppShell>
  );
};

export default App;
