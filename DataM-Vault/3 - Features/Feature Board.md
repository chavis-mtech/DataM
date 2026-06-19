---
tags: [datam, dashboard, features]
type: dashboard
status: active
---

# 📋 Feature Board — กระดานรวม TODO ทั้งหมด

> [!info] ต้องลง plugin ก่อน
> โน้ตนี้ใช้ **Tasks** + **Dataview** (Settings → Community plugins) ถ้ายังไม่ลง จะเห็นแค่โค้ดบล็อก ลงแล้วมันจะ render เป็นรายการสดที่ดึง checkbox จากทุกโน้ต F01–F12 มาเอง

## ✅ งานที่ยังไม่เสร็จ เรียงตาม tier

### Tier 1 — ใช้งานได้จริง
```tasks
not done
tag includes #t1
group by filename
sort by filename
```

### Tier 2 — เทียบ phpMyAdmin
```tasks
not done
tag includes #t2
group by filename
```

### Tier 3 — เทียบ DataGrip
```tasks
not done
tag includes #t3
group by filename
```

### Tier 4 — เต็มขีด + desktop
```tasks
not done
tag includes #t4
group by filename
```

## 📊 ความคืบหน้าต่อ epic (Dataview)
```dataview
TABLE
  length(filter(file.tasks, (t) => !t.completed)) AS "เหลือ",
  length(filter(file.tasks, (t) => t.completed)) AS "เสร็จ"
FROM #features
WHERE type = "epic"
SORT file.name ASC
```

## 🔭 milestone ที่ค้าง (engine track)
```dataview
TABLE status AS "สถานะ"
FROM #milestone
SORT milestone ASC
```

> [!tip] ถ้าไม่อยากลง plugin
> ดูรายการแบบ manual ที่ [[Feature Roadmap]] (จัด tier ให้แล้ว) หรือเปิดทีละ epic จาก [[Feature Catalog]]

กลับ [[Home]] · [[Feature Catalog]] · [[Feature Roadmap]]
