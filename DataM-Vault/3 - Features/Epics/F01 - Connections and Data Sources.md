---
tags: [datam, features, f01]
type: epic
status: todo
plane: control
---

# F01 — Connections & Data Sources

> [!goal] ต่อ DB หลายตัวพร้อมกัน จัดการ จัดกลุ่ม ปลอดภัย
> ระนาบ: 🟦 control plane ([[Data Plane vs Control Plane]]) · layer: `infrastructure/` (driver) + `presentation/` (UI manager)

## Tier 1 — พื้นฐาน
- [ ] ต่อ SQLite จากไฟล์ #t1 (both)
- [ ] ต่อ Postgres (host/port/user/pass/db) #t1 (both)
- [ ] จำ connection ที่บันทึกไว้ (list + เลือก) #t1 (both)
- [ ] ทดสอบการเชื่อมต่อ (Test connection) ก่อนบันทึก #t1 (both)
- [ ] connection pool ต่อ data source ([[M1 - Real Connections]]) #t1 (DG)

## Tier 2 — ครบมือ DBA
- [ ] เพิ่ม driver: MySQL / MariaDB #t2 (PMA)
- [ ] read-only connection mode (กันแก้ prod พลาด) #t2 (DG)
- [ ] ตั้ง transaction mode: auto-commit / manual + isolation level #t2 (DG)
- [ ] clone / duplicate connection #t2 (DG)
- [ ] connection string / URL paste แล้วแตกฟิลด์ #t2 (both)
- [ ] เก็บรหัสผ่านปลอดภัย (encrypt at rest; desktop ใช้ keychain → [[F12 - Desktop Superpowers]]) #t2 (DG)

## Tier 3 — โปร
- [ ] จัดกลุ่ม data source เป็นโฟลเดอร์ (dev/staging/prod) #t3 (DG)
- [ ] สี/ป้ายต่อ data source (prod = แดง) → ดู [[F11 - Productivity and Safety]] #t3 (DG)
- [ ] SSH tunnel #t3 (DG)
- [ ] SSL/TLS options + client cert #t3 (both)
- [ ] เพิ่ม driver: ClickHouse / DuckDB / MSSQL (ตามต้องการ) #t3 (DG)
- [ ] default schema/search_path ต่อ connection #t3 (DG)

## Tier 4 — เต็มขีด
- [ ] desktop: ต่อ local socket ตรง (unix socket / named pipe) ไม่ผ่าน TCP 🖥️ #t4 (DG)
- [ ] reconnect อัตโนมัติ + connection health ping #t4

## กับดัก
> [!warning]
> - browser ต่อ TCP ตรงไป DB ไม่ได้ → ต้องมี backend ถือ connection เสมอ ([[Architecture - 1 Core 2 Shells]])
> - คืน pooled client ให้ครบหลังใช้ ไม่งั้น pool หมด ([[M1 - Real Connections]])
> - ใช้ `tokio-postgres` ไม่ใช่ `sqlx` ([[Tech Stack]])

[[Feature Catalog]] · ถัดไป [[F02 - Object Explorer]]
