---
tags: [datam, features, f02]
type: epic
status: todo
plane: control
---

# F02 — Object Explorer (Catalog Tree)

> [!goal] tree ฝั่งซ้ายที่เห็นทุก object ใน DB คลิกเปิดได้
> ระนาบ: 🟦 control plane · layer: `application/CatalogPort` + `infrastructure/` introspection + `presentation/ui` tree · route `GET /catalog`

## Tier 1
- [ ] tree: database → schema → table → column #t1 (both)
- [ ] lazy load (ขยาย node ถึงค่อย query) #t1 (DG)
- [ ] คลิกตาราง → เปิด query `SELECT * ` หรือ data tab #t1 (both)
- [ ] refresh tree #t1 (both)

## Tier 2
- [ ] object เพิ่ม: view, index, constraint, foreign key, sequence #t2 (both)
- [ ] object เพิ่ม: stored procedure, function, trigger, event #t2 (both)
- [ ] object เพิ่ม: user/role, type/enum #t2 (PMA)
- [ ] filter/search ใน tree (พิมพ์กรองชื่อ) #t2 (DG)
- [ ] context menu ต่อ node: open, DDL, drop, rename, truncate #t2 (both)
- [ ] แสดงจำนวนแถว + ขนาดตาราง (โดยไม่ count ทั้งตาราง — ใช้ stats) #t2 (PMA)

## Tier 3
- [ ] multiple introspection level (เร็ว/ลึก) สำหรับ DB ใหญ่ #t3 (DG)
- [ ] แสดง comment/description ของ object #t3 (both)
- [ ] favorites / pin object ที่ใช้บ่อย #t3 (DG)
- [ ] tree หลาย data source พร้อมกัน (รวมหลาย connection) #t3 (DG)
- [ ] materialized view, partition, tablespace, extension #t3 (DG)

## Tier 4
- [ ] background introspection (ไม่ block UI ตอน DB ใหญ่มาก) #t4 (DG)
- [ ] cache schema + invalidate อัจฉริยะ #t4

## กับดัก
> [!warning]
> - DB ใหญ่ = introspection ช้า → lazy + cache ตั้งแต่แรก
> - catalog query เป็น control plane (JSON ได้) อย่าเอา Arrow มาใส่ที่นี่ ([[Data Plane vs Control Plane]])

[[Feature Catalog]] · ถัดไป [[F03 - SQL Editor]]
