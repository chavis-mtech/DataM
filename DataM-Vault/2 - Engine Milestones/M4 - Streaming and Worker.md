---
tags: [datam, milestone, m4, performance]
type: milestone
milestone: M4
status: todo
---

# M4 — Streaming and Worker

> [!goal] จับเป้าใหญ่
> **1M rows, p95 < 100ms, 60fps** — stream RecordBatch + decode ใน Web Worker

## Deliverables
- [ ] เปลี่ยน `POST /query` → `GET /ws` (binary WebSocket)
- [ ] stream RecordBatch ทีละก้อน (paint แถวแรกก่อนได้ครบ)
- [ ] `bounded mpsc` + WS poll_ready = backpressure ครบเส้น
- [ ] ย้าย Arrow decode เข้า Web Worker (Comlink) + transferable ArrayBuffer
- [ ] ขอ row window ตอน scroll (server-side keyset, ไม่ใช่ OFFSET)
- [ ] windowed eviction — ทิ้ง batch ที่ไกลจาก viewport

## ✅ Definition of Done
> [!success]
> - [ ] scroll-to-painted-window p95 < 100ms บน localhost WS
> - [ ] main-thread frame < 16ms ตอน scroll
> - [ ] pause scroll → DB fetch หยุดภายใน 1 batch (backpressure ทำงาน)
> - [ ] server RSS < 200MB ตอน stream 1M แถว

## กับดัก
> [!warning] ดู [[Risks and Gotchas]] — backpressure, RAM ceiling, OFFSET=O(n)

← [[M3 - Virtualized Grid]] · ถัดไป → [[M5 - PG Binary and COPY]] · ดู [[Performance Budget]]
