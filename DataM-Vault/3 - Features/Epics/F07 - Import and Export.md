---
tags: [datam, features, f07]
type: epic
status: todo
plane: mixed
---

# F07 — Import & Export

> [!goal] เอาข้อมูลเข้า-ออกได้ทุกฟอร์แมต เล็กใช้ control plane, ใหญ่ใช้ streaming
> ระนาบ: เล็ก=🟦 control · ใหญ่ (1GB+)=🟥 data plane streaming ([[M5 - PG Binary and COPY]])

## Tier 1
- [ ] export ผลลัพธ์ปัจจุบันเป็น CSV #t1 (both)
- [ ] export เป็น JSON #t1 (both)
- [ ] copy ผลลัพธ์เป็น SQL INSERT #t1 (DG)

## Tier 2
- [ ] import CSV → ตาราง (map คอลัมน์, เลือก delimiter/encoding) #t2 (both)
- [ ] import SQL dump (รันสคริปต์ใหญ่) #t2 (PMA)
- [ ] export เป็น: SQL dump, Excel (xlsx), Markdown, HTML #t2 (PMA)
- [ ] export ขอบเขต: ผลลัพธ์ / ทั้งตาราง / เลือกหลายตาราง / ทั้ง DB #t2 (PMA)
- [ ] partial export (เฉพาะแถวที่เลือก/กรอง) #t2 (PMA)
- [ ] export options: รวม schema, รวม data, INSERT แบบ batch #t2 (PMA)

## Tier 3
- [ ] custom extractor template (กำหนดรูปแบบ output เอง) #t3 (DG)
- [ ] export เป็น XML, PDF #t3 (PMA)
- [ ] import จาก Excel / JSON #t3 (DG)
- [ ] เปิดไฟล์ CSV เป็น data source (query CSV ด้วย SQL) #t3 (DG)
- [ ] scheduled / repeatable export config #t3 (DG)

## Tier 4 — เต็มขีด
- [ ] streaming export 1GB+ ไม่กิน RAM (chunked) #t4
- [ ] export ผ่าน `COPY ... TO STDOUT (FORMAT binary)` → ไฟล์ ([[M5 - PG Binary and COPY]]) #t4
- [ ] partition-parallel COPY (หลาย connection) #t4 (DG)
- [ ] desktop: export ตรงลงดิสก์หลาย GB ผ่าน native I/O 🖥️ → [[F12 - Desktop Superpowers]] #t4

## กับดัก
> [!warning]
> - import ใหญ่ต้อง stream + backpressure ไม่งั้น OOM ([[Risks and Gotchas]])
> - encoding / NULL / quote ของ CSV คือบ่อเกิดข้อมูลเพี้ยน — ทดสอบ round-trip
> - type fidelity ตอน export binary (NUMERIC/timestamptz) → golden test ([[M5 - PG Binary and COPY]])

[[Feature Catalog]] · ถัดไป [[F08 - Visual Tools]]
