---
tags: [datam, milestone, m3, ui]
type: milestone
milestone: M3
status: todo
---

# M3 — Virtualized Grid

> [!goal]
> เปลี่ยน `<table>` → grid แบบ virtualized อ่าน typed-array column ตรง → 100k แถวลื่น

## Deliverables
- [ ] ใช้ `@tanstack/solid-virtual` (DOM virtualization)
- [ ] row + column virtualization (ตารางกว้างก็ render แค่คอลัมน์ที่เห็น)
- [ ] fixed row height (สำคัญต่อคณิตศาสตร์ virtualization)
- [ ] recycle cell nodes — update `textContent` + transform ไม่ใช่ createElement
- [ ] scroll handler แบบ passive + rAF-coalesced

## ✅ Definition of Done
> [!success]
> - [ ] scroll 100k แถวที่ ≥58fps ใน Chrome perf panel ไม่มี frame spike > 32ms

## กับดัก
> [!warning]
> - variable row height / inline editor ใน flow → พัง virtualization math; ทำ editor เป็น overlay
> - อย่าพยายาม optimize `<table>` ธรรมดา ให้ไป virtualized เลย

← [[M2 - Arrow Spine]] · ถัดไป → [[M4 - Streaming and Worker]] · ดู [[Tech Stack]]
