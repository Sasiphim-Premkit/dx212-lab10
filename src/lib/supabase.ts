import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

// ค่ามาจากไฟล์ .env.local (ชื่อขึ้นต้น EXPO_PUBLIC_ = แอปอ่านได้)
const url = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const key = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient(url, key, {
  auth: { persistSession: false }, // ยังไม่มี Login (คาบ 11)
});
