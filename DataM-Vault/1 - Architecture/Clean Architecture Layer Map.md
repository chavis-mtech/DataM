---
tags: [datam, architecture, clean-architecture]
type: reference
status: active
---

# Clean Architecture — Layer Map

> [!important] กฎเหล็กของ boundary
> boundary ระหว่าง layer = **compile-time trait seam ไม่ใช่จุด copy ข้อมูล** ส่ง `Arc<RecordBatch>` / `Bytes` ผ่านทุกชั้น **ห้าม re-materialize เป็น struct ต่อแถว** domain type ต้อง *ห่อ* `arrow::ArrayRef` ไม่ใช่ copy ข้อมูลคู่ขนาน

## โค้ดอะไรอยู่โฟลเดอร์ไหน

> [!example]- `domain/` — type บริสุทธิ์ (ไม่มี tokio/serde)
> - `Column` = ห่อ `arrow::ArrayRef` + enum ชนิดคอลัมน์ (Int4, Text, Bytea, Timestamptz, Json, Unknown(oid))
> - `RowSet { schema, batches: Vec<RecordBatch>, total_rows }` ← นี่คือ "ผลลัพธ์"
> - `Row` = แค่ cursor `(RowSet, index)` **ไม่ใช่ struct ที่ allocate ต่อแถว**
> - `Query { sql, params, page }`, `error.rs`

> [!example]- `application/use_cases/` — Port traits + interactors
> - `trait RowRepository { async fn fetch / stream }`
> - `trait QueryExecutor`, `trait CatalogPort`
> - interactor `RunQuery`, `StreamTable` (รับ `dyn Port` เข้ามา, **ไม่มี SQL/socket ในนี้**)

> [!example]- `infrastructure/` — ความเร็วทั้งหมดอยู่นี่
> - `pg/pg_arrow_adapter.rs` — binary + COPY → Arrow builders ตรง
> - `sqlite/sqlite_arrow_adapter.rs` — rusqlite ใน spawn_blocking
> - `pool/` — deadpool + buffer/builder recycler
> - `wire/arrow_ipc_encoder.rs` — RecordBatch → IPC bytes
> - `type_map/pg_oid.rs` — oid → ColumnType + decoder

> [!example]- `presentation/` — delivery (พึ่ง application ports ไม่ใช่ infra concrete)
> - `adapters/http/` — axum: `POST /query`, `GET /ws` (binary Arrow), `GET /catalog`
> - `adapters/cli/` — CLI บางๆ เรียก `RunQuery` ตัวเดียวกัน = integration test ฟรี
> - `adapters/tauri/` — **เก็บไว้!** = shell B (desktop) ดู [[M6 - Desktop Shell (Tauri)]]
> - `ui/web/` — Solid app: `ws-client.ts`, `arrow-decode.worker.ts`, `grid/`

> [!example]- `main.rs` — composition root
> สร้าง pool → adapter → inject เข้า axum state = **ที่เดียวที่ concrete มาเจอกัน**

## hot path invariant
> [!quote]
> PG binary socket bytes → Arrow builders (infra) → RecordBatch (domain) → arrow-ipc bytes (infra) → WS frame (presentation) → typed arrays (worker) → canvas/DOM
> column buffer เดียวกันถูก *อ้างอิง/slice/ส่งต่อ* ไม่เคย deep-copy ไม่เคยเป็น JS object ต่อ cell ไม่เคย JSON

ดู [[Iron Rules]] · [[Hot Path - Arrow Everywhere]]
