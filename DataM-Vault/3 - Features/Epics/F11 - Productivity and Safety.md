---
tags: [datam, features, f11]
type: epic
status: todo
plane: control
---

# F11 — Productivity & Safety

> [!goal] สิ่งเล็กๆ ที่ทำให้ใช้ทั้งวันไม่เจ็บ + ไม่ทำ prod พังโดยไม่ตั้งใจ
> ระนาบ: 🟦 control plane · ส่วนใหญ่เป็น UX/local state

## Tier 2
- [ ] query history (ค้นได้, รันซ้ำ, ต่อ data source) #t2 (DG)
- [ ] bookmark / saved query (ตั้งชื่อ, จัดกลุ่ม) #t2 (PMA)
- [ ] safe-mode: confirm ก่อน DELETE/DROP/UPDATE ไม่มี WHERE #t2 (both)
- [ ] read-only data source mode (บล็อกทุก write) → [[F01 - Connections and Data Sources]] #t2 (DG)
- [ ] dark / light theme #t2 (PMA)
- [ ] keyboard shortcut ครบทุก action #t2 (DG)
- [ ] restore session/tab ที่เปิดค้างไว้ #t2 (DG)

## Tier 3
- [ ] data-source coloring (prod=แดง) + ป้าย environment #t3 (DG)
- [ ] data-source grouping (โฟลเดอร์ dev/staging/prod) #t3 (DG)
- [ ] change tracking / versioning (เก็บประวัติ DDL + data change แบบ phpMyAdmin tracking) #t3 (PMA)
- [ ] local file history (เวอร์ชันของไฟล์ SQL ที่แก้) #t3 (DG)
- [ ] settings / preferences page (ครบทุก option) #t3 (both)
- [ ] export/import การตั้งค่า + connection (ย้ายเครื่อง) #t3 (DG)

## Tier 4
- [ ] 2FA / login (สำหรับ deploy web หลายคน) #t4 (PMA)
- [ ] audit log ของ action ที่ทำกับ DB #t4 (DG)
- [ ] sync settings ข้ามเครื่อง (web shell) #t4

## กับดัก
> [!warning]
> - safe-mode ต้องจับ statement จริง (parse) ไม่ใช่ regex หยาบ — ไม่งั้นพลาด
> - tracking เก็บเยอะ = โต ต้องมี retention/cleanup
> - read-only ต้องบังคับที่ "backend" ด้วย ไม่ใช่แค่ซ่อนปุ่มใน UI

[[Feature Catalog]] · ถัดไป [[F12 - Desktop Superpowers]]
