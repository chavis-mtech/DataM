---
tags: [datam, features, f12]
type: epic
status: todo
plane: data
---

# F12 — Desktop Superpowers 🖥️ (สิ่งที่ web ทำไม่ได้)

> [!goal] ปลดล็อกความสามารถ native ที่ browser ทำไม่ได้ = จุดขายร่าง desktop
> ระนาบ: 🟥 data + native I/O · ทั้งหมดอยู่บน [[M6 - Desktop Shell (Tauri)]] / [[M7 - Edit, Inspect, Rescue]]

> [!info] ทำไมต้อง desktop เท่านั้น
> ต้อง mmap ไฟล์, อ่าน raw WAL/journal, เปิด local socket, แตะ keychain — browser ถูก sandbox ห้ามทำ ([[Architecture - 1 Core 2 Shells]])

## Tier 4
- [ ] Tauri custom protocol: ส่ง Arrow bytes ดิบ ไม่ serialize (เร็วกว่า loopback WS) #t4
- [ ] native socket ตรงไป DB (ไม่มี network hop) → [[F01 - Connections and Data Sources]] #t4
- [ ] **mmap snapshot + time-travel** (เปิดไฟล์ DB อ่าน offline, ย้อนเวลา) #t4
- [ ] **WAL / journal rescue** (กู้ข้อมูลจาก PG WAL / SQLite journal) #t4
- [ ] OS keychain เก็บรหัส connection #t4
- [ ] native file dialog สำหรับ import/export #t4
- [ ] export/import หลาย GB ลงดิสก์ตรง (ไม่ผ่าน browser memory) → [[F07 - Import and Export]] #t4
- [ ] canvas/WebGL2 grid ความหนาแน่นสุดขีด → [[F04 - Result Grid]] #t4
- [ ] background scan / index (ใช้ thread เต็มเครื่อง) #t4
- [ ] auto-update + offline-first #t4

## กับดัก
> [!warning]
> - **อย่าลบ `presentation/adapters/tauri/`** ([[Iron Rules]] ข้อ 5)
> - WAL/journal rescue = แตะ internal format ของ DB → ทดสอบหนัก, อ่านอย่างเดียวก่อน
> - reuse UI bundle เดิม 100% — desktop คือ "ร่าง" ไม่ใช่ codebase ที่สอง

[[Feature Catalog]] · กลับ [[Home]]
