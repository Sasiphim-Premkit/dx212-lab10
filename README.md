# dx212-lab9 — แอป "กินในงบ" (จบคาบ 9)

โค้ดตั้งต้นฉบับสมบูรณ์ของ dX212 Mobile Programming คาบ 9 (UI Design & Navigation) ใช้เป็นจุดเริ่มของ **Lab 10: Database & Supabase**

- Expo SDK 57 · Expo Router · TypeScript
- หน้าแรก (ค้นหา + ปรับงบ ±10) · หน้ารายละเอียด `menu/[id]` · ฟอร์มเพิ่มเมนู · หน้าเกี่ยวกับ — แท็บล่าง 3 แท็บ
- ข้อมูลเมนูยังอยู่ใน `src/lib/data.ts` และ `MenuContext` (หายเมื่อรีเฟรช) → คาบ 10 ย้ายไปไว้ใน Supabase

## เริ่มใช้งาน

ต้องมี Node.js LTS, Git, VS Code (ชุดเดียวกับคาบ 8)

```bash
git clone https://github.com/gobelmoo/dx212-lab9.git dx212-lab9
cd dx212-lab9
npm install
npx expo start        # กด w = เว็บ · a = Android Emulator · สแกน QR = Expo Go
```

ดาวน์โหลดแบบ ZIP (ปุ่ม Code → Download ZIP) ก็ได้ — แตกไฟล์แล้วเปิด Terminal ในโฟลเดอร์นั้น แล้วเริ่มที่ `npm install`

> **ต้องรัน `npm install` ก่อนทุกครั้ง** — repo นี้ไม่มีโฟลเดอร์ `node_modules` (ใหญ่ ~600 MB)

## เริ่ม Lab 10 จาก repo นี้

ใช้แทนขั้น ML8-A ในสไลด์คาบ 10 (`cp -R dx212-lab9 dx212-lab10`):

```bash
git clone https://github.com/gobelmoo/dx212-lab9.git dx212-lab10
cd dx212-lab10
rm -rf .git && git init       # Windows PowerShell: Remove-Item -Recurse -Force .git
npm install
npx expo install @supabase/supabase-js react-native-url-polyfill
code .
```

จากนั้นทำต่อ ML8-B (`.env.local`) และ ML8-C (`src/lib/supabase.ts`) ตามสไลด์/Lab Sheet 10 ได้เลย

## โครงไฟล์

```
src/
├── app/                  ← หน้าจอ (1 ไฟล์ = 1 หน้า)
│   ├── _layout.tsx       ← Stack + MenuProvider ครอบทั้งแอป
│   ├── (tabs)/
│   │   ├── _layout.tsx   ← Tabs 🏠 ➕ ℹ️
│   │   ├── index.tsx     ← หน้าแรก "/"
│   │   ├── add.tsx       ← ฟอร์มเพิ่มเมนู "/add"
│   │   └── about.tsx     ← เกี่ยวกับ "/about"
│   └── menu/
│       └── [id].tsx      ← รายละเอียด "/menu/1", "/menu/2", ...
├── components/
│   └── MenuCard.tsx
└── lib/
    ├── logic.ts          ← type Menu + filterByBudget, sortByPrice, searchByName
    ├── data.ts           ← MENUS 5 รายการ (คาบ 10 ย้ายไปฐานข้อมูล)
    ├── theme.ts          ← COLORS, SPACING
    └── MenuContext.tsx   ← state กลาง (menus, addMenu)
```

## ก่อนส่งงาน

- แก้ `src/app/(tabs)/about.tsx` บรรทัด "ผู้พัฒนา" เป็นชื่อ-รหัสนักศึกษาของตัวเอง
- ตรวจ type: `npx tsc --noEmit` (ต้องไม่มี error) · ตรวจรูปแบบโค้ด: `npx expo lint`

## ปัญหาที่พบบ่อย

| อาการ | วิธีแก้ |
|---|---|
| `expo: command not found` / `Cannot find module` | ยังไม่ได้ `npm install` |
| Expo Go ขึ้น incompatible SDK | อัปเดต Expo Go หรือกด `w` / `a` แทน |
| มือถือสแกน QR แล้วต่อไม่ได้ (Wi-Fi มหาวิทยาลัย) | `npx expo start --tunnel` |
| VS Code ขีดฆ่า `Tabs` (deprecated) | ใช้ได้ปกติ หรือ `import { Tabs } from "expo-router/js-tabs"` |
