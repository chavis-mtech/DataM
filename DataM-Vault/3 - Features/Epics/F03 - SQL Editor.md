---
tags: [datam, features, f03]
type: epic
status: todo
plane: control
---

# F03 — SQL Editor (Console)

> [!goal] ที่พิมพ์ SQL — เริ่มจาก textarea, จบที่ IDE ฉลาดเท่า DataGrip
> ระนาบ: 🟦 control plane (ตัว editor) · ผลลัพธ์ที่รัน = 🟥 data plane → [[F04 - Result Grid]]

## Tier 1
- [ ] textarea + ปุ่ม Run (Ctrl/Cmd+Enter) #t1 (both)
- [ ] multi-statement: รันทีละคำสั่ง / รันทั้งหมด #t1 (both)
- [ ] run selection (ไฮไลต์แล้วรันเฉพาะส่วน) #t1 (DG)
- [ ] แสดง error / notice / affected rows ใต้ editor #t1 (both)
- [ ] query history พื้นฐาน (เก็บที่รันไปแล้ว) #t1 (DG)

## Tier 2
- [ ] syntax highlight (CodeMirror 6) #t2 (both)
- [ ] หลาย console/tab ต่อ data source #t2 (DG)
- [ ] format / beautify SQL #t2 (DG)
- [ ] comment toggle, multi-cursor, bracket match #t2 (DG)
- [ ] parameters ใน query (`:name` prompt ก่อนรัน) #t2 (DG)
- [ ] รันจากไฟล์ .sql / เปิดไฟล์ใน editor #t2 (DG)
- [ ] cancel / kill query ที่กำลังรัน #t2 (both)

## Tier 3 — สมอง IDE
- [ ] schema-aware autocomplete (ตาราง/คอลัมน์/keyword จาก catalog) #t3 (DG)
- [ ] on-the-fly error detection (squiggle) + quick fix #t3 (DG)
- [ ] live templates / snippets + surround #t3 (DG)
- [ ] dialect-aware parser (PG/MySQL/SQLite) #t3 (DG)
- [ ] attach scripts directory (โฟลเดอร์ .sql เป็น project) #t3 (DG)
- [ ] explain button (ส่งไป [[F08 - Visual Tools]]) #t3 (both)

## Tier 4 — refactor
- [ ] rename refactor (เปลี่ยนชื่อ propagate ทุก usage) #t4 (DG)
- [ ] safe delete (เตือนถ้ามี dependency) #t4 (DG)
- [ ] find usages ของ object ในสคริปต์ → [[F09 - Search and Navigation]] #t4 (DG)

## กับดัก
> [!warning]
> - autocomplete ต้องอ่าน catalog ที่ cache ไว้ (F02) ไม่ใช่ query ทุกครั้งที่กดคีย์
> - editor เป็น control plane — JSON ส่ง SQL string ได้สบาย ผลลัพธ์ค่อยสลับเป็น Arrow

[[Feature Catalog]] · ถัดไป [[F04 - Result Grid]]
