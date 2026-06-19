---
tags: [datam, performance, benchmarks]
type: reference
status: active
---

# Performance Budget

> [!abstract]
> เป้าที่ **วัดได้** ต่อ layer ทำ bench harness ตั้งแต่ [[M0 - Tracer Bullet]] เพื่อมีตัวเลข baseline แล้วเฝ้าดูมันทุก milestone

## เป้าหลัก

| Layer | เป้า |
|---|---|
| Postgres COPY binary → Arrow (1 core) | ≥ 200 MB/s |
| partition-parallel 8 conn | ≥ 1 GB/s aggregate |
| First RecordBatch (16k แถวแรก) ถึง browser | < 50 ms p95 |
| Browser decode Arrow → typed array (32k แถว) | < 5 ms (zero-copy) |
| Scroll 1M rows → painted window | p95 < 100 ms, frame < 16 ms (60fps) |
| Memory ฝั่ง server ตอน stream 1M แถว | < 200 MB RSS (chunked) |
| Deep pagination ที่แถว ~900k | < 20 ms ด้วย keyset (ไม่ใช่ OFFSET) |
| Connection acquire (deadpool) | p99 < 100 µs |

## bench harness (ทำตั้งแต่ M0)
> [!todo]
> - [ ] สร้างตาราง 1M แถวด้วย `generate_series` — มีทั้งคอลัมน์ตัวเลข **และ** string (เจอ cliff ของ string เร็ว)
> - [ ] หน้า `/bench` วัด 3 ตัวเลข: submit→first-paint, full-stream time, scroll fps (Performance API)
> - [ ] verify ผ่าน DevTools Network: content-type เป็น arrow ไม่ใช่ `application/json`
> - [ ] verify ด้วย heap profiler (`dhat`): allocation ต่อ batch เป็น O(จำนวนคอลัมน์) ไม่ใช่ O(จำนวน cell)

ดูเทคนิคที่ [[Hot Path - Arrow Everywhere]] · กับดักที่ [[Risks and Gotchas]]
