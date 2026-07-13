import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { calculateNextDueDate } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dueOnly = searchParams.get("due") === "true";

  let query = supabase.from("members").select("*").eq("is_active", true);

  if (dueOnly) {
    const today = new Date().toISOString().split("T")[0];
    query = query.lte("next_due_date", today);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ members: data });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, phone, town, photo_url, plan, fee_amount, start_date } = body;

  const next_due_date = calculateNextDueDate(start_date, plan);

  const { data, error } = await supabase
    .from("members")
    .insert({
      name,
      phone,
      town,
      photo_url,
      plan,
      fee_amount,
      start_date,
      next_due_date,
      is_active: true,
    })
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ member: data }, { status: 201 });
}
