---
tags: [datam, glossary, reference]
type: reference
status: active
---

# Glossary

> [!note] Apache Arrow
> รูปแบบข้อมูลแบบ **columnar** ในหน่วยความจำ — เก็บค่าคอลัมน์เดียวกันต่อเนื่องกัน → map ตรงเป็น typed array ใน JS ได้โดยไม่ parse ดู [[Hot Path - Arrow Everywhere]]

> [!note] Arrow IPC (stream format)
> วิธี serialize Arrow ลง bytes สำหรับส่งข้ามเครื่อง/process — schema message ครั้งเดียว ตามด้วย RecordBatch หลายก้อน

> [!note] RecordBatch
> ก้อนข้อมูล Arrow N แถว (เราตั้งเป้า 8k–64k แถว/ก้อน) = หน่วยที่ stream ทีละก้อน

> [!note] COPY (FORMAT binary)
> คำสั่ง Postgres ส่งข้อมูลจำนวนมากด้วย encoding ที่ overhead ต่ำสุด = เส้นทางเดียวที่แตะ ≥200 MB/s ดู [[M5 - PG Binary and COPY]]

> [!note] binary result format
> ให้ Postgres ส่งค่ามาเป็น binary แทน text → ไม่ต้อง parse string เป็นตัวเลข/เวลา (มาพร้อม prepared statement ใน `tokio-postgres`)

> [!note] keyset (seek) pagination
> เลื่อนหน้าด้วย `WHERE id > last_seen ORDER BY id LIMIT n` แทน `OFFSET` → O(1) ไม่ใช่ O(n) ตอนเลื่อนลึก

> [!note] virtualization (windowing)
> render เฉพาะแถวที่มองเห็น (~40) + overscan → ต้นทุน render คงที่ไม่ขึ้นกับจำนวนแถวรวม ดู [[M3 - Virtualized Grid]]

> [!note] backpressure
> กลไกให้ผู้รับที่ช้าหน่วงผู้ส่งอัตโนมัติ (bounded channel) → memory ไม่บวม

> [!note] transferable ArrayBuffer
> ส่ง buffer ข้าม Worker→main thread แบบ "โอนกรรมสิทธิ์" (zero-copy) ด้วย `postMessage(buf, [buf])`

> [!note] loopback
> ต่อผ่าน `127.0.0.1` ในเครื่องเดียวกัน — เร็วระดับ GB/s latency แทบศูนย์ (ใช้ใน [[M6 - Desktop Shell (Tauri)]])

กลับ [[Home]]
