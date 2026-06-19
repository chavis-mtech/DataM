---
tags: [datam, milestone, m0]
type: milestone
milestone: M0
status: todo
---

# M0 — Tracer Bullet

> [!goal] เป้าหมายเดียว
> พิมพ์ SQL ใน browser → เห็นแถวจริงจาก SQLite ในตาราง HTML ธรรมดา **ยังไม่มี Arrow / Postgres / streaming** แค่พิสูจน์ว่าข้อมูลไหลครบ 4 ชั้นได้

> [!warning] M0 พิสูจน์ "เส้นทาง" ไม่ใช่ "ความเร็ว"
> ยอมใช้ JSON + `String` ชั่วคราวได้ ความเร็วเริ่มที่ [[M2 - Arrow Spine]]

## ก่อนเริ่ม (ครั้งเดียว)
- [ ] มีไฟล์ SQLite ทดสอบ 1 ไฟล์ มีตารางจริง (เริ่ม ~1,000 แถว)
- [ ] อยู่แบบ single crate (`lib.rs` + `main.rs`) ไปก่อน — ยังไม่ทำ workspace

## ลำดับงาน (จบทีละก้าว build ผ่านก่อนไปต่อ)

- [ ] **0.1 `Cargo.toml`** — ลบ `sqlite`, ใส่ `tokio`, `axum`, `rusqlite (bundled)`, `serde`, `serde_json` → `cargo build` ผ่าน
- [ ] **0.2 `domain/`** — `RowSet` (ตอนนี้เก็บง่ายๆ `Vec<Vec<String>>` + columns) + `Query { sql }` + `DbError`
- [ ] **0.3 `application/use_cases/`** — `trait QueryExecutor` (รับ sql คืน `RowSet`) + interactor `RunQuery` ถือ `dyn QueryExecutor` (**ไม่มี SQL/socket ในนี้**)
- [ ] **0.4 `infrastructure/`** — `SqliteExecutor impl QueryExecutor` เปิดไฟล์ด้วย `rusqlite`, query, แปลง cell เป็น String, รันใน `spawn_blocking`
- [ ] **0.5 `presentation/adapters/http/`** — axum route `POST /query` รับ `{sql}` → `RunQuery` → คืน JSON + เปิด CORS
- [ ] **0.6 `main.rs`** — composition root: `SqliteExecutor` → `RunQuery` → axum state → `serve`
- [ ] **0.7 `ui/web/src/App.tsx`** — ทิ้ง "Hello world" → `<textarea>` SQL + ปุ่ม Run + `fetch('/query')` → render `<table>`
- [ ] **0.8 bench baseline** — จดเวลา p50 ของ query 100 แถวบน localhost

## ✅ Definition of Done
> [!success]
> - [ ] พิมพ์ `SELECT * FROM ...` ใน browser แล้วเห็นแถว
> - [ ] CLI/`curl` ยิง `POST /query` ได้แถวเดียวกัน
> - [ ] มีตัวเลข baseline p50 จดไว้ใน [[Performance Budget]]

## กับดัก M0
> [!warning]
> - อย่าเพิ่ง optimize อะไรทั้งนั้น — เป้าคือ "ครบ 4 ชั้น"
> - แต่ละ layer แยกหน้าที่ชัด: SQL อยู่ใน infra เท่านั้น, interactor ไม่รู้จัก rusqlite

ถัดไป → [[M1 - Real Connections]] · ดู [[Clean Architecture Layer Map]] · [[Iron Rules]]
