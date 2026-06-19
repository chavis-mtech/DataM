---
tags: [datam, features, f06]
type: epic
status: todo
plane: control
---

# F06 — Schema & DDL Management

> [!goal] สร้าง/แก้ object ด้วย UI โดยไม่ต้องจำ syntax DDL
> ระนาบ: 🟦 control plane · layer: `application` use case `MutateSchema` + `infrastructure` DDL builder · route `POST /ddl`

## Tier 1
- [ ] ดู generated DDL ของตาราง/view (DDL viewer) #t1 (both)
- [ ] copy DDL ไป clipboard #t1 (DG)
- [ ] drop / truncate / rename ตาราง (พร้อม confirm) #t1 (both)

## Tier 2 — visual editor
- [ ] create / alter table: ชื่อ, คอลัมน์, type, nullable, default #t2 (both)
- [ ] column editor: add/drop/modify/reorder #t2 (both)
- [ ] index editor: create/drop, unique, multi-column #t2 (both)
- [ ] primary key / foreign key editor #t2 (both)
- [ ] check / unique constraint editor #t2 (PMA)
- [ ] view editor (create/alter view) #t2 (both)
- [ ] stored procedure / function editor #t2 (both)
- [ ] trigger editor #t2 (both)
- [ ] event/scheduler editor (MySQL) #t2 (PMA)
- [ ] **preview DDL ก่อน apply** (แสดง SQL ที่จะรัน) #t2 (DG)

## Tier 3 — operations
- [ ] table operations: copy/move ตาราง, rename ข้าม schema #t3 (PMA)
- [ ] MySQL: optimize / analyze / check / repair / flush #t3 (PMA)
- [ ] sequence editor (PG) #t3 (DG)
- [ ] type / enum / domain editor (PG) #t3 (DG)
- [ ] comment ต่อ object/column #t3 (both)
- [ ] partition management #t3 (DG)

## Tier 4
- [ ] generate migration script จาก diff → [[F08 - Visual Tools]] #t4 (DG)
- [ ] apply DDL ใน transaction (rollback ถ้าพลาด — PG ทำได้) #t4 (DG)

## กับดัก
> [!warning]
> - DDL บางตัว implicit commit (MySQL) — เตือนว่า rollback ไม่ได้
> - alter table ตารางใหญ่อาจ lock นาน → เตือน + แสดง estimated impact
> - generate DDL ต้องถูก dialect ([[F03 - SQL Editor]] dialect parser)

[[Feature Catalog]] · ถัดไป [[F07 - Import and Export]]
