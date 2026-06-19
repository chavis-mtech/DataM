---
tags: [datam, milestone, m7]
type: milestone
milestone: M7
status: todo
---

# M7 — Edit, Inspect, Rescue

> [!goal]
> ฟีเจอร์ปลายทางจาก README — row edit, binary inspector, snapshot/rescue

## Deliverables
- [ ] **row edit**: `MutateRow` use case + port → parameterized UPDATE ใน explicit transaction
- [ ] optimistic concurrency (เช็ค xmin/row-version) + re-fetch หลัง commit
- [ ] pre-commit **diff preview**
- [ ] **binary/hex inspector** สำหรับ bytea/blob (ตามคำว่า "binary-aware")
- [ ] **mmap snapshot** + time-travel (เฉพาะ desktop — ต้อง native I/O)
- [ ] **WAL/journal rescue**: PG WAL / SQLite journal (เฉพาะ desktop)

## ✅ Definition of Done
> [!success]
> - [ ] แก้ค่าใน grid → preview diff → commit กลับ DB ได้ปลอดภัย
> - [ ] เปิด snapshot อ่านแบบ offline ได้ (desktop)

> [!info] ทำไม snapshot/rescue เฉพาะ desktop
> ต้อง mmap ไฟล์ + อ่าน raw WAL/journal — browser ทำไม่ได้ ดู [[Architecture - 1 Core 2 Shells]]

← [[M6 - Desktop Shell (Tauri)]] · กลับ [[Roadmap]] · [[Home]]
