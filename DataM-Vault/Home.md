---
tags: [datam, moc, home]
type: index
status: active
---

# 🏠 DataM — Home

> [!abstract] vault นี้คืออะไร
> แผนการสร้าง **DataM** — database client ที่เร็วที่สุดเท่าที่เป็นไปได้ ทำงานครบเครื่องทั้งบน **browser** (สะดวก แก้ง่าย) และ **desktop** (เร็วสุดขีด) จากโค้ดชุดเดียว เปิด vault นี้ทิ้งไว้ใช้ระหว่างเขียนโค้ดได้เลย ไม่ต้องกลับไปหาแชท

> [!tip] เริ่มตรงนี้
> โค้ดยังว่างเปล่า → เปิด [[Start Here - This Week]] แล้วไล่ 7 ก้าวแรก งานแรกคือแก้ `Cargo.toml`

> [!info]- 📁 โครงสร้าง folder ของ vault (กดเพื่อดู)
> ```
> DataM-Vault/
> ├─ Home.md                  ← คุณอยู่ที่นี่ (สารบัญ)
> ├─ Start Here - This Week.md ← เริ่มลงมือ
> ├─ 1 - Architecture/        หลักคิด/สถาปัตยกรรม (6 โน้ต)
> ├─ 2 - Engine Milestones/   Roadmap + M0–M7 (ความเร็ว)
> ├─ 3 - Features/            แผนฟีเจอร์ + Epics/ (F01–F12)
> └─ 4 - Reference/           Iron Rules · Risks · Glossary
> ```
> 🔗 ลิงก์ `[[...]]` อ้างอิงด้วย "ชื่อโน้ต" ไม่ใช่ path → ย้าย folder ได้อิสระไม่พัง

## 🧭 แผนผัง (Map of Content)

### หลักคิด / สถาปัตยกรรม
- [[Architecture - 1 Core 2 Shells]] — ทำไมแกนเดียว 2 ร่าง
- [[Data Plane vs Control Plane]] ⭐ — กุญแจที่ทำให้เพิ่มฟีเจอร์ได้ไม่อั้นโดยไม่ช้า
- [[Hot Path - Arrow Everywhere]] — กฎความเร็วข้อเดียวที่ตัดสินทุกอย่าง
- [[Tech Stack]] — เลือกอะไร เพราะอะไร
- [[Clean Architecture Layer Map]] — โค้ดอะไรอยู่โฟลเดอร์ไหน
- [[Performance Budget]] — เป้าที่วัดได้ต่อ layer

### 🚗 ฟีเจอร์ (สิ่งที่ DataGrip + phpMyAdmin ทำได้)
- [[Feature Catalog]] — สารบัญ 12 epic ของทุกฟีเจอร์
- [[Feature Roadmap]] — ทำ epic ไหนก่อน (Tier 1→4)
- [[Feature Board]] — กระดาน TODO รวม (ต้องลง plugin Tasks/Dataview)
- [[Parity Checklist - DataGrip and phpMyAdmin]] — เช็คความครบ

### แผนลงมือ (engine track)
- [[Start Here - This Week]] ⭐ เริ่มที่นี่
- [[Roadmap]] — ภาพรวม M0 → M7
- [[M0 - Tracer Bullet]]
- [[M1 - Real Connections]]
- [[M2 - Arrow Spine]] ⭐ refactor สำคัญสุด
- [[M3 - Virtualized Grid]]
- [[M4 - Streaming and Worker]]
- [[M5 - PG Binary and COPY]]
- [[M6 - Desktop Shell (Tauri)]]
- [[M7 - Edit, Inspect, Rescue]]

### อ้างอิงเร็ว
- [[Iron Rules]] — กฎเหล็ก 5 ข้อ ติดไว้ข้างจอ
- [[Risks and Gotchas]] — กับดักที่ต้องระวัง
- [[Glossary]] — ศัพท์ (Arrow, COPY, keyset ฯลฯ)

## ✅ สถานะตอนนี้
> [!todo] engine track (ความเร็ว)
> - [ ] [[M0 - Tracer Bullet]] — พิมพ์ SQL ใน browser เห็นแถวจาก SQLite
> - [ ] [[M1 - Real Connections]]
> - [ ] [[M2 - Arrow Spine]]
> - [ ] [[M3 - Virtualized Grid]]
> - [ ] [[M4 - Streaming and Worker]]
> - [ ] [[M5 - PG Binary and COPY]]
> - [ ] [[M6 - Desktop Shell (Tauri)]]
> - [ ] [[M7 - Edit, Inspect, Rescue]]

> [!todo] feature track (ความสามารถ) — ดู [[Feature Roadmap]]
> - [ ] Tier 1 — ใช้งานได้จริง (ต่อ DB · tree · editor · grid · edit · export CSV)
> - [ ] Tier 2 — เทียบ phpMyAdmin (CRUD · DDL editor · import/export · users · search)
> - [ ] Tier 3 — เทียบ DataGrip (smart editor · ERD · query builder · diff · explain)
> - [ ] Tier 4 — เต็มขีด + desktop superpowers (WebGL grid · mmap snapshot · WAL rescue)

## 🔌 ปลั๊กอิน Obsidian ที่แนะนำ (ไม่บังคับ)
> [!info]
> - **Tasks** — รวม checkbox `- [ ]` จากทุกโน้ตมาดูที่เดียว
> - **Dataview** — query สถานะ milestone อัตโนมัติจาก frontmatter `status:`
> - **Kanban** — ลาก milestone เป็นบอร์ด todo / doing / done
> - Mermaid render มากับ Obsidian อยู่แล้ว (ดูไดอะแกรมใน [[Architecture - 1 Core 2 Shells]])
