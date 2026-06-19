---
tags: [datam, features, f08]
type: epic
status: todo
plane: control
---

# F08 — Visual Tools (ERD · Query Builder · Explain · Charts · Diff)

> [!goal] เครื่องมือภาพที่ทำให้เข้าใจ DB โดยไม่ต้องอ่าน SQL
> ระนาบ: 🟦 control plane (อ่าน metadata + plan) · UI เป็น SVG/canvas

## Tier 2
- [ ] ER diagram จาก foreign key อัตโนมัติ (relations view) #t2 (both)
- [ ] charts จากผลลัพธ์ query (bar/line/pie) #t2 (PMA)

## Tier 3
- [ ] ER diagram แก้ได้ (ลากสร้าง FK, จัด layout, export รูป) #t3 (both)
- [ ] visual query builder / QBE (เลือกตาราง+คอลัมน์+join เป็นภาพ → SQL) #t3 (PMA)
- [ ] explain-plan visualizer (tree/graph + ต้นทุนต่อ node, ชี้ bottleneck) #t3 (both)
- [ ] schema diff (เทียบ 2 DB/schema → migration script) #t3 (DG)
- [ ] data diff (เทียบข้อมูล 2 ตาราง/ผลลัพธ์) #t3 (DG)

## Tier 4
- [ ] GIS / spatial visualization (วาดบนแผนที่) #t4 (PMA)
- [ ] explain analyze timeline / flame view #t4 (DG)
- [ ] live ER auto-layout สำหรับ schema ใหญ่ (100+ ตาราง) #t4

## กับดัก
> [!warning]
> - ER ของ schema ใหญ่ต้อง auto-layout + virtualize ไม่งั้น SVG อืด
> - explain ต่าง dialect คนละรูปแบบ (PG JSON plan vs MySQL) — parser แยก
> - data diff ตารางใหญ่ต้อง stream + เทียบด้วย key ([[Glossary]] keyset)

[[Feature Catalog]] · ถัดไป [[F09 - Search and Navigation]]
