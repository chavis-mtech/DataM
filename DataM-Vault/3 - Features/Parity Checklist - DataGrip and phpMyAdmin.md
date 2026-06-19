---
tags: [datam, features, parity]
type: reference
status: active
---

# ✔️ Parity Checklist — DataGrip ∪ phpMyAdmin

> [!abstract] โน้ตนี้ทำหน้าที่อะไร
> เช็คว่า "ทุกอย่างที่ DataGrip ทำได้ + ทุกอย่างที่ phpMyAdmin ทำได้" ถูกจับลง epic ใด epic หนึ่งครบจริง ใช้เป็น checklist ความครบ ไม่ใช่ลำดับการทำ (ลำดับดู [[Feature Roadmap]])

## DataGrip ทำอะไรได้บ้าง → อยู่ epic ไหน

| ความสามารถ DataGrip | epic ของเรา |
|---|---|
| Schema-aware code completion, error detection, quick-fix | [[F03 - SQL Editor]] #t3 |
| Code formatting / beautify, live & surround templates | [[F03 - SQL Editor]] |
| Refactor: rename (propagate usages), safe delete | [[F03 - SQL Editor]] #t3 |
| Navigation: go-to-declaration, find usages, structure view | [[F09 - Search and Navigation]] |
| Search everywhere (objects + actions) | [[F09 - Search and Navigation]] |
| Query console ต่อ data source + local history | [[F03 - SQL Editor]] + [[F11 - Productivity and Safety]] |
| Editable result grid, add/clone/delete row, value editors | [[F04 - Result Grid]] + [[F05 - Data Editing and Transactions]] |
| Multiple result sets / tabs, aggregate view | [[F04 - Result Grid]] |
| Data extractors / customizable export | [[F07 - Import and Export]] |
| DDL viewer + visual object editor | [[F06 - Schema and DDL Management]] |
| ER / schema diagrams | [[F08 - Visual Tools]] |
| Explain plan visualizer | [[F08 - Visual Tools]] |
| Schema diff / data compare | [[F08 - Visual Tools]] |
| Data source coloring (prod=red), grouping | [[F11 - Productivity and Safety]] |
| Read-only connection mode, transaction/isolation control | [[F01 - Connections and Data Sources]] + [[F05 - Data Editing and Transactions]] |
| Run SQL files / attach scripts directory | [[F03 - SQL Editor]] |
| Parameters in queries | [[F03 - SQL Editor]] |
| Session manager (kill query/session) | [[F10 - Admin and Server]] |
| Local file history of changes | [[F11 - Productivity and Safety]] #t3 |

## phpMyAdmin ทำอะไรได้บ้าง → อยู่ epic ไหน

| ความสามารถ phpMyAdmin | epic ของเรา |
|---|---|
| Browse/search/add/edit/delete rows (form CRUD) | [[F05 - Data Editing and Transactions]] |
| Execute SQL, batch queries, console | [[F03 - SQL Editor]] |
| Manage users & privileges (GRANT/REVOKE) | [[F10 - Admin and Server]] |
| Import (SQL/CSV) / Export (SQL/CSV/XML/JSON/Excel/PDF) | [[F07 - Import and Export]] |
| DB/table operations: rename, copy, optimize, repair, analyze, check | [[F06 - Schema and DDL Management]] |
| Structure editor: columns, indexes, PK/FK | [[F06 - Schema and DDL Management]] |
| Designer / Relations view (visual FK) | [[F08 - Visual Tools]] |
| Query-by-example (QBE) visual builder | [[F08 - Visual Tools]] |
| Server status / variables / process list (+ kill) | [[F10 - Admin and Server]] |
| Status monitor charts | [[F10 - Admin and Server]] |
| Triggers / procedures / functions / events UI | [[F06 - Schema and DDL Management]] |
| Search across database | [[F09 - Search and Navigation]] |
| Query bookmarks | [[F11 - Productivity and Safety]] |
| Tracking (versioning structure & data) | [[F11 - Productivity and Safety]] #t3 |
| FK dropdown on insert/edit | [[F05 - Data Editing and Transactions]] |
| Charts from query results | [[F08 - Visual Tools]] |
| BLOB transformations (image/link/hex) | [[F04 - Result Grid]] (value viewers) |
| GIS / spatial visualization | [[F08 - Visual Tools]] #t4 |
| Replication management | [[F10 - Admin and Server]] #t4 |
| Two-factor / login, settings, themes | [[F11 - Productivity and Safety]] |

## DataM ได้เปรียบ (สิ่งที่ทั้งคู่ทำไม่ได้)
> [!success] จุดขายเฉพาะตัว
> - **ความเร็ว data plane** — Arrow streaming 1M rows 60fps (phpMyAdmin โหลดทั้งหน้า, DataGrip JVM หนัก) ดู [[Hot Path - Arrow Everywhere]]
> - **2 ร่างจากโค้ดเดียว** — web สะดวก + desktop เร็วสุด ([[Architecture - 1 Core 2 Shells]])
> - **Desktop superpowers** — mmap snapshot, WAL/journal rescue ([[F12 - Desktop Superpowers]])

กลับ [[Feature Catalog]] · [[Home]]
