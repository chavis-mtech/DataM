---
tags: [datam, features, f05]
type: epic
status: todo
plane: mixed
---

# F05 — Data Editing & Transactions

> [!goal] แก้ข้อมูลใน grid อย่างปลอดภัย — preview ก่อน commit กลับ DB
> ระนาบ: อ่าน=🟥 data · เขียน=🟦 control (UPDATE/INSERT เล็กๆ JSON ได้) · เชื่อม [[M7 - Edit, Inspect, Rescue]]

## Tier 1
- [ ] edit cell แบบ inline (double-click) #t1 (both)
- [ ] commit การแก้กลับ DB (parameterized UPDATE) #t1 (both)
- [ ] undo การแก้ก่อน commit #t1 (DG)
- [ ] value editor ตามชนิด: text/number/bool/date #t1 (DG)

## Tier 2
- [ ] add row (insert) ผ่าน form / inline #t2 (both)
- [ ] clone / duplicate row #t2 (DG)
- [ ] delete row (เลือกหลายแถว) #t2 (both)
- [ ] **diff preview ก่อน commit** (แสดง before→after + SQL ที่จะรัน) #t2 (DG)
- [ ] FK dropdown: เลือกค่าจากตารางที่อ้างถึง #t2 (PMA)
- [ ] paste หลาย cell จาก clipboard (TSV) → bulk update #t2 (DG)
- [ ] NULL / DEFAULT toggle ต่อ cell #t2 (both)

## Tier 3
- [ ] explicit transaction: เก็บหลายการแก้ → commit/rollback ทีเดียว #t3 (DG)
- [ ] optimistic concurrency (เช็ค xmin/row-version, เตือนถ้าโดนแก้ซ้อน) #t3 (DG)
- [ ] re-fetch แถวหลัง commit (เห็นค่า computed/trigger) #t3 (DG)
- [ ] value editor เพิ่ม: JSON editor, enum picker, hex/BLOB editor #t3 (both)
- [ ] generated column / read-only column รู้และล็อก #t3 (DG)

## Tier 4
- [ ] bulk edit ขนาดใหญ่แบบ streaming (ไม่โหลดทั้งตาราง) #t4
- [ ] desktop: edit ผ่าน snapshot + time-travel 🖥️ → [[F12 - Desktop Superpowers]] #t4

## กับดัก
> [!warning]
> - **เสมอ** ใช้ parameterized statement — ห้าม string-concat ค่าผู้ใช้ลง SQL
> - แก้ตารางไม่มี PK = อันตราย (UPDATE โดนหลายแถว) → เตือน/บังคับ WHERE ครบ
> - optimistic lock กัน "lost update" เงียบๆ ([[Risks and Gotchas]])

[[Feature Catalog]] · ถัดไป [[F06 - Schema and DDL Management]]
