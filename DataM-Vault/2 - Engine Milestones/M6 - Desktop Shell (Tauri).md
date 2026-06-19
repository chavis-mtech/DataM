---
tags: [datam, milestone, m6, desktop, tauri]
type: milestone
milestone: M6
status: todo
---

# M6 — Desktop Shell (Tauri)

> [!goal] ร่างเร็วสุดขีด
> ห่อ UI เดิม + core เดิมด้วย Tauri → native sockets, ไม่มี network hop ดู [[Architecture - 1 Core 2 Shells]]

## Deliverables
- [ ] แตกเป็น **Cargo workspace** (ตอนนี้แหละถึงเวลา)
- [ ] เพิ่ม Tauri binary ใช้ `presentation/adapters/tauri/` (ที่ห้ามลบไว้)
- [ ] core รัน axum bind `127.0.0.1` ใน process, webview ต่อ loopback WS (reuse 100%)
- [ ] reuse UI bundle เดิมทั้งหมด

## เต็มขีด (ทำต่อเมื่ออยากรีดสุด)
> [!tip]
> - [ ] เปลี่ยน loopback WS → **Tauri custom protocol** ส่ง Arrow bytes ดิบ ไม่ serialize
> - [ ] ลอง canvas/WebGL2 grid สำหรับความหนาแน่นสุดขีด (escape hatch จาก [[Tech Stack]])
> - [ ] native superpowers: mmap snapshot, ต่อ DB local ตรงไม่ผ่าน proxy

## ✅ Definition of Done
> [!success]
> - [ ] desktop app เปิดได้ ใช้ UI เดียวกับ web
> - [ ] วัด latency เทียบ web shell — desktop เร็วกว่าเพราะไม่มี network hop

← [[M5 - PG Binary and COPY]] · ถัดไป → [[M7 - Edit, Inspect, Rescue]]
