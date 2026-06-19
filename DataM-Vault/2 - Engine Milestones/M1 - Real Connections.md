---
tags: [datam, milestone, m1]
type: milestone
milestone: M1
status: todo
---

# M1 — Real Connections

> [!goal]
> ทั้ง 2 DB (Postgres + SQLite) query ผ่าน **port เดียวกัน** + เห็น schema/table tree ใน UI

## Deliverables
- [ ] `tokio-postgres` adapter `impl RowRepository` (text mode ก่อนก็ได้)
- [ ] connection pool ด้วย `deadpool-postgres`
- [ ] route `GET /catalog` — list schema / table / column
- [ ] UI: tree ของ schema/table คลิกแล้วเปิด query

## ✅ Definition of Done
> [!success]
> - [ ] เชื่อม Postgres จริงได้ผ่าน UI เดียวกับ SQLite
> - [ ] เลือกตารางจาก tree แล้ว query ได้

## กับดัก
> [!warning]
> - อย่าใช้ `sqlx` สำหรับ hot path (ดู [[Tech Stack]])
> - คืน pooled client ให้ครบหลังใช้ ไม่งั้น pool หมด

← [[M0 - Tracer Bullet]] · ถัดไป → [[M2 - Arrow Spine]]
