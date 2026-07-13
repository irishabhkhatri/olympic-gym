import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Member = {
  id: string;
  name: string;
  phone: string;
  town: string;
  photo_url: string | null;
  plan_type: "gym" | "pt";
  plan: "monthly" | "quarterly" | "half_yearly";
  fee_amount: number;
  start_date: string;
  next_due_date: string;
  is_active: boolean;
  created_at: string;
};
