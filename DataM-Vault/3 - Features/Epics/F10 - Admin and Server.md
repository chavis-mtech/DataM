---
tags: [datam, features, f10]
type: epic
status: todo
plane: control
---

# F10 — Admin & Server

> [!goal] งาน DBA: users, สิทธิ์, process, สถานะ server (จุดแข็งของ phpMyAdmin)
> ระนาบ: 🟦 control plane ทั้งหมด

## Tier 2
- [ ] list users / roles #t2 (PMA)
- [ ] create / drop user, เปลี่ยนรหัส #t2 (PMA)
- [ ] privileges UI: GRANT / REVOKE (global/db/table/column) #t2 (PMA)
- [ ] process / session list #t2 (both)
- [ ] kill query / kill session #t2 (both)
- [ ] server status & variables (อ่าน) #t2 (PMA)

## Tier 3
- [ ] role membership / role hierarchy (PG) #t3 (DG)
- [ ] status monitor charts (QPS, connections, cache hit) สดๆ #t3 (PMA)
- [ ] edit server/connection variables #t3 (PMA)
- [ ] locks view (ดู lock ที่ค้าง + blocking tree) #t3 (DG)
- [ ] active query inspector (ดู SQL ที่ session กำลังรัน) #t3 (both)

## Tier 4
- [ ] replication management (master/replica status) #t4 (PMA)
- [ ] desktop: เปิด/อ่าน log file ของ DB ตรง 🖥️ #t4
- [ ] alert rule (เตือนเมื่อ connection/lock เกิน threshold) #t4

## กับดัก
> [!warning]
> - งาน admin หลายอย่างต้องสิทธิ์สูง — แสดง error ชัดถ้าไม่มีสิทธิ์ อย่าให้เงียบ
> - kill session ผิดตัว = อันตราย → confirm + แสดง SQL/user ของ session นั้น
> - monitor charts = poll เป็นจังหวะ อย่า poll ถี่จน DB หนัก

[[Feature Catalog]] · ถัดไป [[F11 - Productivity and Safety]]
