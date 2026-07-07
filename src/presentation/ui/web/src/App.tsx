import { createSignal, For, Show } from 'solid-js';
import type { Component } from 'solid-js';

type QueryResponse = {
  columns: string[];
  rows: string[][];
  row_count: number;
  elapsed_ms: number;
};

const API = 'http://127.0.0.1:8080';

const App: Component = () => {
  const [sql, setSql] = createSignal('SELECT * FROM users LIMIT 100');
  const [result, setResult] = createSignal<QueryResponse | null>(null);
  const [error, setError] = createSignal<string | null>(null);
  const [running, setRunning] = createSignal(false);
  const [roundTripMs, setRoundTripMs] = createSignal(0);

  const run = async () => {
    setRunning(true);
    setError(null);
    const t0 = performance.now();
    try {
      const res = await fetch(`${API}/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql: sql() }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? res.statusText);
      setRoundTripMs(performance.now() - t0);
      setResult(body);
    } catch (e) {
      setResult(null);
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setRunning(false);
    }
  };

  return (
    <div style={{ 'font-family': 'ui-monospace, monospace', padding: '16px', 'max-width': '1100px', margin: '0 auto' }}>
      <h1 style={{ 'font-size': '18px' }}>🦀 DataM — M0 Tracer Bullet</h1>

      <textarea
        value={sql()}
        onInput={(e) => setSql(e.currentTarget.value)}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') run();
        }}
        rows={4}
        style={{ width: '100%', 'font-family': 'inherit', 'font-size': '14px', padding: '8px', 'box-sizing': 'border-box' }}
        placeholder="SELECT ..."
      />
      <div style={{ display: 'flex', gap: '12px', 'align-items': 'center', margin: '8px 0' }}>
        <button onClick={run} disabled={running()} style={{ padding: '6px 16px' }}>
          {running() ? 'Running…' : 'Run (⌘⏎)'}
        </button>
        <Show when={result()}>
          {(r) => (
            <span style={{ color: '#888', 'font-size': '13px' }}>
              {r().row_count} rows · server {r().elapsed_ms.toFixed(2)}ms · round-trip {roundTripMs().toFixed(1)}ms
            </span>
          )}
        </Show>
      </div>

      <Show when={error()}>
        <pre style={{ color: '#c0392b', background: '#fdf0ef', padding: '8px' }}>{error()}</pre>
      </Show>

      <Show when={result()}>
        {(r) => (
          <table style={{ 'border-collapse': 'collapse', 'font-size': '13px', width: '100%' }}>
            <thead>
              <tr>
                <For each={r().columns}>
                  {(col) => (
                    <th style={{ border: '1px solid #ddd', padding: '4px 8px', background: '#f5f5f5', 'text-align': 'left' }}>
                      {col}
                    </th>
                  )}
                </For>
              </tr>
            </thead>
            <tbody>
              <For each={r().rows}>
                {(row) => (
                  <tr>
                    <For each={row}>
                      {(cell) => <td style={{ border: '1px solid #eee', padding: '4px 8px' }}>{cell}</td>}
                    </For>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        )}
      </Show>
    </div>
  );
};

export default App;
