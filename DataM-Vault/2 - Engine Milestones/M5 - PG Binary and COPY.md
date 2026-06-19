---
tags: [datam, milestone, m5, performance]
type: milestone
milestone: M5
status: todo
---

# M5 — PG Binary and COPY

> [!goal]
> เปลี่ยน PG adapter เป็น binary protocol + `COPY BINARY` → **≥ 200 MB/s** (ตัวเลขในฝันของ README)

## Deliverables
- [ ] PG adapter ใช้ binary result format (prepared statement)
- [ ] bulk read ผ่าน `COPY (query) TO STDOUT (FORMAT binary)` → `BinaryCopyOutStream`
- [ ] decode field ตรงเข้า Arrow `ArrayBuilder` (`with_capacity` ล่วงหน้า, 0 alloc ต่อ cell)
- [ ] type-map table: oid → Arrow type (Decimal128, Timestamp(tz), UUID, JSONB, bytea)
- [ ] golden test เทียบ PG จริง สำหรับ NUMERIC/timestamptz/uuid
- [ ] (option) partition-parallel COPY หลาย connection สำหรับสแกนใหญ่

## ✅ Definition of Done
> [!success]
> - [ ] bulk read ≥ 200 MB/s ของ decoded column bytes บน localhost (ตาราง ≥1GB)
> - [ ] heap profiler ยืนยัน alloc ต่อ batch = O(คอลัมน์) ไม่ใช่ O(cell)

## กับดัก
> [!danger] type fidelity
> NUMERIC scale ผิด = corruption เงียบ → golden test ก่อน ถ้า OID แปลก fall back text ดู [[Risks and Gotchas]]

← [[M4 - Streaming and Worker]] · ถัดไป → [[M6 - Desktop Shell (Tauri)]]
