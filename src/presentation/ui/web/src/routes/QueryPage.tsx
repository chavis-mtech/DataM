import { createSignal, Show } from 'solid-js';
import type { Component } from 'solid-js';
import { TextArea } from '../components/common/TextArea';
import { QueryToolbar } from '../components/toolbar/QueryToolbar';
import { ResultTable } from '../components/table/ResultTable';
import { runQuery } from '../api/queryApi';
import type { Engine, QueryResponse } from '../api/queryApi';

const QueryPage: Component = () => {
  const [sql, setSql] = createSignal('SELECT * FROM users LIMIT 100');
  const [engine, setEngine] = createSignal<Engine>('sqlite');
  const [result, setResult] = createSignal<QueryResponse | null>(null);
  const [error, setError] = createSignal<string | null>(null);
  const [running, setRunning] = createSignal(false);
  const [roundTripMs, setRoundTripMs] = createSignal(0);

  const run = async () => {
    setRunning(true);
    setError(null);
    const t0 = performance.now();
    try {
      const res = await runQuery(sql(), engine());
      setRoundTripMs(performance.now() - t0);
      setResult(res);
    } catch (e) {
      setResult(null);
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setRunning(false);
    }
  };

  const statusText = () => {
    const r = result();
    if (!r) return undefined;
    return `${r.row_count} rows · server ${r.elapsed_ms.toFixed(2)}ms · round-trip ${roundTripMs().toFixed(1)}ms`;
  };

  return (
    <div class="dm-page">
      <h1>🦀 DataM — M0 Tracer Bullet</h1>

      <TextArea
        value={sql()}
        onInput={(e) => setSql(e.currentTarget.value)}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') run();
        }}
        rows={4}
        placeholder="SELECT ..."
      />

      <QueryToolbar
        engine={engine()}
        onEngineChange={setEngine}
        onRun={run}
        running={running()}
        statusText={statusText()}
      />

      <Show when={error()}>
        <pre class="dm-error">{error()}</pre>
      </Show>

      <Show when={result()}>{(r) => <ResultTable result={r()} />}</Show>
    </div>
  );
};

export default QueryPage;
