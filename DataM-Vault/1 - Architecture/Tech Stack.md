---
tags: [datam, stack, reference]
type: reference
status: active
---

# Tech Stack

> [!abstract]
> เลือกของที่เร็วที่สุดต่อ layer — เน้นความเร็วก่อนความง่าย (ตามที่ตั้งใจ) ยกเว้น grid ที่เลือก DOM ก่อนเพราะ "เร็วพอ + แก้ง่าย"

## Backend (Rust core)

| Layer | เลือกใช้ | เหตุผล |
|---|---|---|
| Async runtime | `tokio` (multi-thread) | แกนของ socket + WS loop |
| HTTP/WS | `axum` + `tokio-tungstenite` | binary WS frames สำหรับ data plane |
| Postgres | `tokio-postgres` (**ไม่ใช่** `sqlx`) | binary protocol + pipelining + `COPY ... TO STDOUT (FORMAT binary)`; sqlx ช้ากว่าหลายสิบเท่าใน tight loop |
| SQLite | `rusqlite` (bundled) ใน `spawn_blocking` | WAL + mmap + `prepare_cached`/`raw_get` ≈ memcpy |
| Columnar | `arrow` / `arrow-ipc` | RecordBatch = data representation เดียวทุก layer |
| Pool | `deadpool-postgres` | acquire p99 < 100µs |
| Compression | `lz4_flex` (transport) | ปิด default บน LAN, เปิด ZSTD เฉพาะ WAN |
| Buffers | `bytes` | ส่ง `Bytes`/`Arc` ข้าม layer โดยไม่ copy |

> [!warning] เปลี่ยน crate
> ทิ้ง `sqlite 0.37` ที่ติดมาในโครงเดิม → ใช้ `rusqlite` มันบางเกินไปสำหรับการดึง column แบบ binary

## Frontend (UI ใช้ร่วม)

| ส่วน | เลือกใช้ | เหตุผล |
|---|---|---|
| Framework | SolidJS + Vite | มีอยู่แล้ว, fine-grained reactivity เร็ว |
| Decode | `apache-arrow` JS ใน Web Worker + Comlink | decode/sort/filter ออกจาก main thread |
| Grid (เริ่ม) | `@tanstack/solid-virtual` (DOM) | 60fps + ได้ selection/copy/edit/a11y ฟรี = แก้ง่าย |
| Grid (ร่าง max) | Canvas2D → WebGL2 | escape hatch เฉพาะตอนต้องการความหนาแน่นสุดขีด ดู [[M6 - Desktop Shell (Tauri)]] |

> [!tip] grid: DOM ก่อนเสมอ
> render แค่ ~40 แถวที่มองเห็น → 60fps ไม่ขึ้นกับจำนวนแถวรวม อย่าเริ่มด้วย canvas/WebGL

## Desktop
- **Tauri** — webview + core in-process, native sockets ดู [[M6 - Desktop Shell (Tauri)]]

ดู [[Clean Architecture Layer Map]] ว่าแต่ละตัวไปอยู่โฟลเดอร์ไหน
