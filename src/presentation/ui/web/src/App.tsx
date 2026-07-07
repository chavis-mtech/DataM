import { Router, Route } from '@solidjs/router';
import type { Component } from 'solid-js';
import QueryPage from './routes/QueryPage';

// Composition root for the shell — new pages register here as another
// <Route>. QueryPage is the only one until F02 (Object Explorer) etc. land.
const App: Component = () => (
  <Router>
    <Route path="/" component={QueryPage} />
  </Router>
);

export default App;
