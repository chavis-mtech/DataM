---
tags: [datam, features, f04]
type: epic
status: todo
plane: data
---

# F04 — Result Grid ⭐ (หัวใจความเร็ว)

> [!goal] ตารางผลลัพธ์ที่ scroll 1M แถวลื่น 60fps
> ระนาบ: 🟥 **data plane** — อันเดียวที่ต้องเร็วสุดขีด ([[Hot Path - Arrow Everywhere]], [[Performance Budget]])

> [!danger] อย่าทำฟีเจอร์ในนี้ก่อน [[M2 - Arrow Spine]]
> grid ต้องอ่าน typed-array column จาก Arrow ตรงๆ ถ้าทำบน JSON `<table>` ก่อน = รื้อทิ้งหมด ([[Feature Roadmap]])

## Tier 1
- [ ] virtualized grid (render แค่ ~40 แถวที่เห็น) ([[M3 - Virtualized Grid]]) #t1 (both)
- [ ] อ่านค่าจาก Arrow typed array ตรง (ไม่มี object ต่อ cell) #t1
- [ ] sort ตามคอลัมน์ (client side ก่อน) #t1 (both)
- [ ] เลือก cell/แถว + copy เป็น TSV/CSV #t1 (DG)
- [ ] แสดง NULL ต่างจาก empty string ชัดเจน #t1 (both)
- [ ] keyset pagination (ไม่ใช่ OFFSET) #t1 (DG)

## Tier 2
- [ ] per-column filter (ช่องกรองบนหัวคอลัมน์) #t2 (both)
- [ ] reorder / hide / pin คอลัมน์, ปรับความกว้าง #t2 (DG)
- [ ] single-row / transposed view (ดูแถวเดียวแนวตั้ง) #t2 (PMA)
- [ ] value viewer panel: text / JSON / image / hex (BLOB) #t2 (both)
- [ ] aggregate footer (count/sum/avg/min/max ของ selection) #t2 (DG)
- [ ] multiple result sets เป็น tab #t2 (DG)
- [ ] FK navigation: คลิกค่ากระโดดไปแถวที่อ้างถึง #t2 (DG)

## Tier 3
- [ ] server-side sort/filter (ส่งกลับเป็น SQL) สำหรับ dataset ใหญ่ #t3 (DG)
- [ ] conditional formatting / color by value #t3 (DG)
- [ ] BLOB transformations: render เป็นรูป/ลิงก์ #t3 (PMA)
- [ ] GIS/spatial preview → [[F08 - Visual Tools]] #t3 (PMA)
- [ ] freeze columns, group rows #t3 (DG)

## Tier 4 — เต็มขีด
- [ ] canvas/WebGL2 grid (escape hatch ความหนาแน่นสุดขีด, desktop) ([[M6 - Desktop Shell (Tauri)]]) #t4
- [ ] windowed eviction + refetch on scroll (1M+ ไม่ crash) ([[M4 - Streaming and Worker]]) #t4
- [ ] decode ใน Web Worker + transferable buffer #t4

## กับดัก
> [!warning]
> - fixed row height = หัวใจของ virtualization math (inline editor ทำเป็น overlay) ([[M3 - Virtualized Grid]])
> - string column คือ "หน้าผา" — lazy `TextDecoder` เฉพาะ cell ที่เห็น ([[Risks and Gotchas]])
> - ห้าม JSON บน row data เด็ดขาด ([[Iron Rules]])

[[Feature Catalog]] · ถัดไป [[F05 - Data Editing and Transactions]]
