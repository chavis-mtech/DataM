// Talks to the one HTTP port every engine shares: POST /query { sql, engine }.
const API_BASE = 'http://127.0.0.1:8080';

export type Engine = 'sqlite' | 'mariadb';

export type QueryResponse = {
  columns: string[];
  rows: string[][];
  row_count: number;
  elapsed_ms: number;
};

export async function runQuery(sql: string, engine: Engine): Promise<QueryResponse> {
  const res = await fetch(`${API_BASE}/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sql, engine }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.error ?? res.statusText);
  return body as QueryResponse;
}
