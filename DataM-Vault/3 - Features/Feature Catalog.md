---
tags: [datam, moc, features]
type: index
status: active
---

# 🗂️ Feature Catalog — ทุกอย่างที่ DataGrip + phpMyAdmin ทำได้

> [!abstract] โน้ตนี้คืออะไร
> สารบัญฟีเจอร์ทั้งหมดของ DataM แตกเป็น **12 epic** แต่ละ epic มี TODO list (checkbox) ของตัวเอง รวมความสามารถของ **DataGrip** (เก่ง editor/refactor/diagram) + **phpMyAdmin** (เก่ง admin/CRUD/operations) เข้าด้วยกัน ดูว่าควรทำอันไหนก่อนที่ [[Feature Roadmap]]

> [!tip] วิธีอ่าน checkbox ทุกโน้ต
> `#t1`–`#t4` = tier (ทำก่อน→หลัง ดู [[Feature Roadmap]]) · `(DG)` มาจาก DataGrip · `(PMA)` มาจาก phpMyAdmin · `(both)` มีทั้งคู่ · 🖥️ = desktop เท่านั้น
> ลง plugin **Tasks** แล้วเปิด [[Feature Board]] จะเห็น checkbox ทุกอันรวมที่เดียว

## 12 Epic

| # | Epic | ระนาบ | แก่นเรื่อง |
|---|---|---|---|
| [[F01 - Connections and Data Sources]] | Connections | 🟦 | ต่อ DB หลายตัว, จัดกลุ่ม, สี env, SSH/SSL, read-only |
| [[F02 - Object Explorer]] | Catalog tree | 🟦 | schema/table/view/proc/trigger/user tree |
| [[F03 - SQL Editor]] | Console | 🟦 | multi-statement, autocomplete, format, history |
| [[F04 - Result Grid]] ⭐ | **Data** | 🟥 | virtualized, edit, filter, sort, FK nav |
| [[F05 - Data Editing and Transactions]] | CRUD + tx | 🟦🟥 | add/edit/delete row, diff preview, commit/rollback |
| [[F06 - Schema and DDL Management]] | DDL | 🟦 | visual table/index/FK/view/proc designer |
| [[F07 - Import and Export]] | I/O | 🟦🟥 | CSV/SQL/JSON/Excel in-out, dump, streaming export |
| [[F08 - Visual Tools]] | Visual | 🟦 | ER diagram, query builder, explain, charts, diff |
| [[F09 - Search and Navigation]] | Find | 🟦 | search data/objects, go-to, command palette |
| [[F10 - Admin and Server]] | Admin | 🟦 | users/privileges, process list, status, variables |
| [[F11 - Productivity and Safety]] | UX | 🟦 | history, bookmark, tracking, safe-mode, theme |
| [[F12 - Desktop Superpowers]] 🖥️ | Native | 🟥 | mmap snapshot, WAL rescue, keychain, multi-GB export |

## เส้นเชื่อมกับแผนเดิม (engine spine)

> [!info] feature track เกาะบน engine track
> [[Roadmap]] (M0–M7) = **เครื่องยนต์** (ความเร็ว data plane) · Feature Catalog นี้ = **ตัวรถ** (ความสามารถ control plane) ทั้งสองวิ่งคู่กัน ดูวิธีสานที่ [[Feature Roadmap]] และเหตุผลที่แยกได้ที่ [[Data Plane vs Control Plane]]

ดูเช็คความครบ [[Parity Checklist - DataGrip and phpMyAdmin]] · กลับ [[Home]]
