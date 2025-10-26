# RoverDB-Client
High-performance row-level DB client with zero-copy I/O, snapshots & rescue for PostgreSQL/SQLite — **Clean Architecture (Ports & Adapters)** — Rust + Tauri + SolidJS

![Architecture: Clean](https://img.shields.io/badge/architecture-clean-blue)
![Style: Ports & Adapters](https://img.shields.io/badge/style-ports--and--adapters-blue)
![Rust](https://img.shields.io/badge/rust-stable-orange)
![Tauri](https://img.shields.io/badge/tauri-app-yellow)
![SolidJS](https://img.shields.io/badge/solidjs-ui-33a)
![License](https://img.shields.io/badge/license-TBD-lightgrey)

---

## Why RoverDB-Client?
- **Row-level power**: Inspect/Edit แบบ binary-aware พร้อม diff ก่อน commit
- **Fast path**: Zero-copy slices, vectorized I/O, latency-aware prefetch
- **Always recoverable**: Snapshot & Time-Travel (mmap + COW), WAL/Journal Rescue (PG/SQLite)
- **Safe by design**: Idempotent writes, explicit TX boundaries, lock/timeout hints
- **Pluggable**: Drivers: PostgreSQL (binary, COPY), SQLite (mmap) → Next: MySQL
- **Desktop-native**: Tauri + SolidJS (lightweight, cross-platform)

---

## Table of Contents
- [Architecture at a Glance](#architecture-at-a-glance)
- [Data Flow](#data-flow)
- [Features](#features)
- [Performance Goals (SLO)](#performance-goals-slo)
- [Repo Layout](#repo-layout)
- [Getting Started](#getting-started)
- [Usage Examples](#usage-examples)
- [Security](#security)
- [Observability](#observability)
- [Testing](#testing)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Architecture at a Glance

**Clean Architecture (dependency flows inward only):**
- **Entities (Domain):** `Row`, `RowSet`, `Table`, `Snapshot`, `TxPlan`, `Diff`, `RecoveryPlan`, `WALPointer`, `PageBlock`
- **Use Cases:** Row Inspect/Edit, Adaptive Fetch, Snapshot & Time-Travel, Rescue Wizard (PG WAL / SQLite journal), Binary COPY/Export, Safe-Guard
- **Interface Adapters:** Presenters/ViewModels (SolidJS), DTO/Codec (prost/bincode/serde), Ports/Repositories (Rust traits)
- **Frameworks/Drivers:** Protocol adapters (Pg/SQLite), BufMgr/Cache (mmap, ring buffer), IPC (shared memory), SDK Bindings (Java/Kotlin/Python/Node), Desktop shell (Tauri)

### C4 — Context (Mermaid)
```mermaid
flowchart LR
  user[DevOps/DBA/Engineer] -->|interacts| UI[Tauri + SolidJS]
  UI --> IPC[Shared Memory + Lock-free Ring Buffer]
  IPC --> CORE["Core (Rust)"]
  CORE --> ROW[Row Engine / Tx Manager / Recovery]
  ROW -->|binary protocol| PG["(PostgreSQL)"]
  ROW -->|mmap / file| SQLITE["(SQLite)"]
  CORE --> STORE[Local WAL/Snapshot Store]
  CORE --> KEYCHAIN[OS Keychain]
```

### C4 — Containers & Major Components

* **UI (Tauri + SolidJS)**: Virtualized grid, diff preview, rescue wizard
* **Core (Rust)**: Use cases, domain rules, TX manager, recovery engine
* **Protocol Adapters**: `PgAdapter`, `SqliteAdapter` (plugin-style crates)
* **BufMgr/Cache**: mmap, lock-free ring buffer, zero-copy slices
* **IPC Service**: Shared memory layout, backpressure/flow control
* **Local WAL/Snapshot Store**: checksum + monotonic IDs

**Key Ports (traits)**
```rust
pub trait RowRepository {
    fn fetch(&self, q: RowQuery) -> Result<RowSet, FetchError>;
    fn apply_patch(&self, plan: TxPlan) -> Result<TxResult, TxError>;
}

pub trait RecoveryGateway {
    fn scan_wal(&self, opts: WalScanOptions) -> Result<RecoveryPlan, RecError>;
    fn dry_run(&self, plan: &RecoveryPlan) -> Result<Impact, RecError>;
    fn restore(&self, plan: RecoveryPlan) -> Result<RestoreReport, RecError>;
}
```

---

## Data Flow
```mermaid
sequenceDiagram
  participant U as UI (SolidJS)
  participant I as IPC (Shared Memory/Ring Buffer)
  participant C as Core (Rust)
  participant A as Adapter (Pg/SQLite)
  participant B as DB / Files

  U->>I: request RowSet (filters, projection)
  I->>C: zero-copy handoff
  C->>A: decode/encode binary, fetch vectorized
  A->>B: binary protocol / mmap access
  B-->>A: row batches (binary)
  A-->>C: RowSet slice
  C-->>I: zero-copy slice
  I-->>U: render grid (virtualized)

  U->>C: edit rows → build TxPlan (diff)
  C->>C: validate + Safe-Guard (locks/timeout/idempotent)
  C->>A: commit (binary encode)
  A->>B: write
  C->>C: write local WAL, snapshot update
```

---

## Features

* **Row-Level Inspect & Edit** with type-safe binary decode, pre-commit diff
* **Adaptive Fetch**: vectorized I/O, dynamic rowset sizing, latency-aware prefetch
* **Offline Snapshot & Time-Travel**: mmap + copy-on-write; browse offline
* **Rescue Wizard**
  * **PostgreSQL**: read latest WAL to selectively recover rows without cluster-wide PITR
  * **SQLite**: read journal/WAL, salvage good pages to SQL/CSV
* **Binary COPY/Export** (PG) — significantly faster than text
* **Safe-Guard**: idempotent writes, explicit transactions, lock/timeout hints
* **Scriptable SDKs**: Rust/Java/Kotlin/Python (ETL/automation)

---

## Performance Goals (SLO)

* **UI**: 1M rows → smooth scrolling (virtualized + zero-copy slices)
* **Export**: PG COPY (binary) ≥ **200 MB/s** on dev machine
* **Recovery**: Scan WAL **1 GB < 10 s** (device dependent)
* **Interactivity**: p95 UI roundtrip < **100 ms** for common actions

---

## Repo Layout
```
/roverdb-client
  /crates
    /roverdb-client-domain          # Entities, value objects, policies
    /roverdb-client-usecases        # Interactors; ports (traits)
    /roverdb-client-adapters-pg     # PostgreSQL adapter (binary, COPY)
    /roverdb-client-adapters-sqlite # SQLite adapter (mmap)
    /roverdb-client-infra-bufmgr    # mmap, ring buffer, cache
    /roverdb-client-ipc             # shared memory IPC + backpressure
    /roverdb-client-app-tauri       # Desktop shell + presenters/viewmodels
    /roverdb-client-sdk-java        # JNI bindings
    /roverdb-client-sdk-kotlin
    /roverdb-client-sdk-python
    /roverdb-client-sdk-node        # napi-rs
  /ui                               # SolidJS app (virtualized grid, wizard)
```

---

## Getting Started

### Prerequisites
* **Rust** (stable) + `cargo`
* **Node.js** (LTS) + `pnpm`/`npm`
* **Tauri deps**: platform toolchains (Xcode CLT on macOS, MSVC on Windows, GTK/WebKit on Linux)
* PostgreSQL/SQLite available locally or via network

### Build & Run (dev)
```bash
# 1) Clone
git clone https://github.com/chavis-mtech/RoverDB-Client.git
cd RoverDB-Client

# 2) Backend workspace
cargo build

# 3) UI
cd ui
pnpm install
pnpm build # or pnpm dev

# 4) App (Tauri dev)
cd ..
cargo tauri dev
# or: pnpm tauri dev
```

### Config (env)
Create `.env` or export variables:
```bash
ROVERDB_LOG=info
ROVERDB_CACHE_DIR=~/.cache/roverdb
PG_URI=postgres://user:pass@host:5432/db?sslmode=require
SQLITE_PATH=/path/to/database.db
```

---

## Usage Examples

### Connect to PostgreSQL
1. Open RoverDB-Client → **Connections → New**
2. Paste `PG_URI`
3. **Browse → Inspect**: select table → stream rows (virtualized)

### Edit with Diff/Commit
1. Filter rows → inline edit
2. **Preview Diff** (pre-commit)
3. **Commit**: Safe-Guard applies (idempotent, lock/timeout hints)

### Snapshot & Time-Travel
* **Create Snapshot**: lightweight (mmap + COW)
* **Browse Offline**: open snapshot file → read-only grid
* **Time-Travel**: jump to snapshot/time; compare & export

### Rescue Wizard (PG)
* **Scan WAL** (latest LSN) → filter by table/time/PK
* **Dry-run**: impact preview (rows/keys)
* **Selective Restore**: apply plan, generate report

> Notes: WAL operations may require replication privileges or local access to `pg_wal`. SQLite salvage uses journal/WAL files; read-only by default.

---

## Security
* Secrets in **OS Keychain**, zeroization for sensitive buffers
* Local WAL/Snapshot: **checksum + monotonic IDs**
* Explicit TX boundaries, idempotent operations
* Principle of least privilege for DB access; optional read-only mode

---

## Observability
* Tracing via **OpenTelemetry** (spans for fetch/commit/rescue)
* Metrics: throughput (rows/s), latency, cache hit, ring-buffer backpressure
* Structured logs; crash reporting with minimal PII
* Feature flags for experimental drivers (e.g., MySQL)

---

## Testing
* **Unit** & **Property-based** (`proptest`) for domain/usecases
* **Integration** with containers (Postgres) / temp files (SQLite)
* **Fuzz** (`cargo-fuzz`) for binary codec/decoder
* **Perf** (`criterion`) for rowset fetch, COPY, WAL scan
* **Golden files** for binary frames and SQL/CSV exports

---

## Roadmap
* **MVP**: PG + SQLite adapters, Inspect/Edit, Snapshot, PG COPY, Basic Rescue
* **v0.2**: MySQL adapter, richer rescue filters, SDKs (Java/Kotlin/Python/Node)
* **v0.3**: Advanced Time-Travel UI, multi-snapshot diff, staged commits
* **Companion**: Flutter read-only snapshot viewer

---

## Contributing
1. Open an issue for discussion / design ADR
2. Follow module boundaries (**Clean Architecture** rules)
3. Add tests + docs; run `cargo fmt && cargo clippy`
4. PR with concise description & before/after perf if relevant

---

## License
TBD (suggested: MIT or Apache-2.0)

---

## Acknowledgements
* PostgreSQL Binary Protocol, COPY
* SQLite file/journal format
* Tauri, SolidJS, OpenTelemetry
