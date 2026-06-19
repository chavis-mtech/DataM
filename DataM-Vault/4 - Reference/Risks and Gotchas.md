---
tags: [datam, risks, reference]
type: reference
status: active
---

# Risks and Gotchas

> [!warning] string columns คือหน้าผา
> `TextDecoder` + offsets ทำให้ string-heavy table ช้ากว่าที่ demo ตัวเลขทำให้คิด — bench string-heavy ตั้งแต่ [[M2 - Arrow Spine]] แก้ด้วย dictionary-encode + lazy decode เฉพาะ cell ที่เห็น

> [!warning] backpressure ต้องครบทุก hop
> ถ้า hop ไหน (WS sink, mpsc, cursor pull) ไม่มี flow control → browser ช้า = backend OOM หรือ tab พัง ใช้ bounded mpsc + WS poll_ready

> [!danger] type fidelity = ข้อมูลเพี้ยนเงียบ
> NUMERIC/timestamptz/uuid/jsonb/bytea decode ผิด = corruption ที่ไม่มี error → ทำตาราง type-map + golden test เทียบ PG จริง (จัดเวลาไว้ที่ [[M5 - PG Binary and COPY]]) ถ้า OID แปลก fall back เป็น text ดีกว่า block

> [!warning] เพดาน RAM browser
> 1M แถวกว้างมากๆ โหลดหมด = tab crash → ต้อง windowed eviction + refetch on scroll ดู [[M4 - Streaming and Worker]]

> [!warning] OFFSET pagination = O(n)
> ลึกถึงแถว 900k จะพลาด p95 < 100ms → ใช้ keyset (seek) pagination ดู [[Glossary]]

> [!warning] apache-arrow JS decode Arrow-internal compression ไม่ได้
> ถ้าตั้ง codec ใน IPC writer → `tableFromIPC` throw → compress ที่ transport layer (`lz4_flex`) แทน

> [!warning] SQLite เป็น sync
> ต้องรันใน `spawn_blocking` เสมอ ไม่งั้น block tokio reactor; bounded pool กัน thread exhaustion

ดู [[Iron Rules]] · [[Performance Budget]]
