---
tags: [datam, start, planning]
type: guide
status: active
---

# ▶️ Start Here — เริ่มสัปดาห์นี้

> [!abstract] ปัญหา ณ ตอนนี้
> vault วางแผนครบ แต่ **โค้ดยังว่างเปล่า** — ทุกไฟล์ใน `src/` เป็น stub 0 บรรทัด, `Cargo.toml` ยังเป็นของเก่า (`sqlite 0.37` + `owo-colors`) งานแรกของคุณไม่ใช่คิดสถาปัตยกรรม (คิดเสร็จแล้ว) แต่คือ **พิมพ์โค้ดบรรทัดแรก**

## ลำดับ 7 ก้าวแรก (จับต้องได้ ทำได้พรุ่งนี้)

> [!todo] สัปดาห์นี้ = ทำ [[M0 - Tracer Bullet]] ให้จบ ไล่ตามนี้
> - [x] **ก้าว 1 — Cargo.toml** ลบ `sqlite`, `owo-colors` → ใส่ `tokio` (full), `axum`, `rusqlite` (bundled), `serde`, `serde_json`, `tower-http` (cors) → `cargo build` ผ่าน
> - [x] **ก้าว 2 — ไฟล์ SQLite ทดสอบ** สร้าง `test.db` มี 1 ตาราง ~1,000 แถว (มีคอลัมน์ตัวเลข **และ** string)
> - [x] **ก้าว 3 — domain** `RowSet { columns: Vec<String>, rows: Vec<Vec<String>> }` + `Query { sql }` + `DbError` (ยังเป็น String ได้ ความเร็วเริ่ม M2)
> - [x] **ก้าว 4 — application** `trait QueryExecutor { fn run(&self, q) -> RowSet }` + interactor `RunQuery(dyn QueryExecutor)` (ห้ามมี SQL/socket ในนี้)
> - [x] **ก้าว 5 — infrastructure** `SqliteExecutor` (rusqlite ใน `spawn_blocking`) impl `QueryExecutor`
> - [x] **ก้าว 6 — presentation** axum `POST /query {sql}` → `RunQuery` → JSON + CORS, `main.rs` ต่อสายทั้งหมด
> - [x] **ก้าว 7 — UI** ทิ้ง Hello world → `<textarea>` + ปุ่ม Run + `fetch` → `<table>` · จดเวลา p50 ลง [[Performance Budget]]

> [!success] จบสัปดาห์ = เห็นแถวจริงจาก SQLite ใน browser → skeleton "มีชีวิต" ครบ 4 ชั้น
> หลังจากนี้ทุก milestone คือ "สลับชิ้นเร็วเข้าไปแทน" โดยของรันได้ตลอด

## หลังจาก M0 จบ — ทำอะไรต่อ
> [!tip] อ่าน [[Feature Roadmap]] แล้วเดินสองแทร็กคู่กัน
> - **แทร็กความเร็ว:** [[M1 - Real Connections]] → [[M2 - Arrow Spine]] (refactor ใหญ่สุด อย่าข้าม)
> - **แทร็กความสามารถ:** เริ่มถม Tier 1 — [[F01 - Connections and Data Sources]], [[F02 - Object Explorer]], [[F03 - SQL Editor]]
> - control-plane features ทำแทรกได้เลย, grid features (F04/F05) **รอ [[M2 - Arrow Spine]] ก่อน**

## กฎกันหลงทาง (ติดไว้)
> [!warning]
> - อย่าทำ layer แนวนอนเสร็จก่อน — ทุกก้าวต้อง demo คลิกได้ ([[Iron Rules]])
> - อย่าเพิ่ง optimize ใน M0 — เป้าคือ "ครบ 4 ชั้น" ไม่ใช่ "เร็ว"
> - อย่าลบ `presentation/adapters/tauri/` (= ร่าง desktop ในอนาคต)
> - SQLite sync → `spawn_blocking` เสมอ ([[Risks and Gotchas]])

## เตรียมเครื่องมือ Obsidian (ทำครั้งเดียว)
> [!info] เพื่อใช้ vault เต็มประสิทธิภาพ ลง community plugin 3 ตัว
> - **Tasks** — รวม checkbox จากทุกโน้ตมาดูที่ [[Feature Board]]
> - **Dataview** — query สถานะ milestone/epic อัตโนมัติ
> - **Kanban** — ลาก epic เป็นบอร์ด todo/doing/done

กลับ [[Home]] · แผนเต็ม [[Feature Roadmap]] · เครื่องยนต์ [[M0 - Tracer Bullet]]
