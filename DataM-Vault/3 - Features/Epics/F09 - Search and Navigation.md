---
tags: [datam, features, f09]
type: epic
status: todo
plane: control
---

# F09 — Search & Navigation

> [!goal] หา object / ข้อมูล / action ได้เร็วด้วยคีย์บอร์ด
> ระนาบ: 🟦 control plane (ผลค้นหาเยอะมาก → 🟥 grid)

## Tier 2
- [ ] search data ในตาราง (ค้นค่าในทุกคอลัมน์) #t2 (PMA)
- [ ] search data ทั้ง database (ทุกตาราง) #t2 (PMA)
- [ ] filter object ใน tree → ดู [[F02 - Object Explorer]] #t2 (DG)

## Tier 3
- [ ] find-in-database: ค้นชื่อ object + ในตัว DDL/proc body #t3 (DG)
- [ ] command palette (Ctrl/Cmd+K) — action + object + ไปไหนก็ได้ #t3 (DG)
- [ ] go-to-definition (คลิกชื่อตารางใน SQL → กระโดดไป object) #t3 (DG)
- [ ] find usages (object นี้ถูกใช้ที่ไหนใน proc/view/script) #t3 (DG)
- [ ] structure view ของ SQL ปัจจุบัน (outline ของ statement) #t3 (DG)

## Tier 4
- [ ] full-text index ของ catalog (ค้น instant บน DB ใหญ่มาก) #t4 (DG)
- [ ] cross-data-source search (ค้นหลาย connection พร้อมกัน) #t4 (DG)

## กับดัก
> [!warning]
> - "search ทั้ง DB" = scan ทุกตาราง → ต้อง stream + cancel ได้ + เตือนต้นทุน
> - command palette ต้อง fuzzy + เร็ว < 16ms ต่อ keystroke (index ในหน่วยความจำ)

[[Feature Catalog]] · ถัดไป [[F10 - Admin and Server]]
