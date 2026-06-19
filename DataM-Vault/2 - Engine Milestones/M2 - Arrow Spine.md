---
tags: [datam, milestone, m2, arrow]
type: milestone
milestone: M2
status: todo
---

# M2 — Arrow Spine ⭐

> [!goal] refactor สำคัญที่สุดของทั้งโปรเจกต์
> เปลี่ยน JSON → **Arrow IPC ทั้งระบบ** หลังก้าวนี้ทุกอย่าง columnar และความเร็วเริ่มของจริง

## Deliverables
- [ ] เปลี่ยน `RowSet` ภายในเป็น `Vec<RecordBatch>` (arrow)
- [ ] `infrastructure/wire/arrow_ipc_encoder.rs` — RecordBatch → Arrow IPC bytes
- [ ] response เป็น Arrow IPC ไม่ใช่ JSON (content-type arrow)
- [ ] browser decode ด้วย `apache-arrow` JS → typed arrays
- [ ] `<table>` อ่านค่าจาก column ตรงๆ (ยัง DOM ได้)
- [ ] bench ด้วยตาราง **string-heavy** ด้วย ไม่ใช่แค่ตัวเลข

## ✅ Definition of Done
> [!success]
> - [ ] DevTools Network: content-type arrow, **ไม่มี** `application/json` บน row data
> - [ ] 100k แถว decode ในเครื่อง < 150ms (worker ปิดก่อนก็ได้)

> [!danger] หลัง M2 เป็นต้นไป JSON ห้ามแตะ row data (ดู [[Iron Rules]])

← [[M1 - Real Connections]] · ถัดไป → [[M3 - Virtualized Grid]] · ดู [[Hot Path - Arrow Everywhere]]
