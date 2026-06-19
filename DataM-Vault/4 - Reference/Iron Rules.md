---
tags: [datam, rules, reference]
type: reference
status: active
---

# Iron Rules — กฎเหล็ก 5 ข้อ

> [!important] ติดไว้ข้างจอ
> ทุกครั้งที่จะ "ทางลัด" เช็คกับ 5 ข้อนี้ก่อน

> [!check] 1. อย่าสร้าง layer แนวนอนให้เสร็จก่อน
> ทุก milestone แตะครบ 4 ชั้นบางๆ จบที่ demo คลิกได้เสมอ ดู [[Roadmap]]

> [!danger] 2. JSON ห้ามแตะ row data หลัง [[M2 - Arrow Spine]]
> ถ้า `JSON.parse` แอบเข้ามาบน hot path คือ #1 perf killer ดู [[Hot Path - Arrow Everywhere]]

> [!check] 3. อย่า re-materialize เป็น struct ต่อแถว
> domain type ต้อง *ห่อ* `arrow::ArrayRef` ไม่ใช่ copy คู่ขนาน boundary ของ Clean Arch = pointer copy ไม่ใช่ deep copy ดู [[Clean Architecture Layer Map]]

> [!check] 4. DOM grid ก่อนเสมอ
> canvas/WebGL เป็น escape hatch ทีหลัง อย่าเริ่มด้วยมัน (เสียเวลา reimplement selection/IME/a11y) ดู [[Tech Stack]]

> [!check] 5. อย่าลบ `presentation/adapters/tauri/`
> มันคือ shell B (desktop ร่างเร็วสุด) ดู [[M6 - Desktop Shell (Tauri)]]

กลับ [[Home]]
