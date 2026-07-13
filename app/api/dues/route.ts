import { supabase } from "@/lib/supabase";

export async function GET() {
  const today = new Date().toISOString().split("T")[0];

  const { data: dueMembers, error } = await supabase
    .from("members")
    .select("*")
    .eq("is_active", true)
    .lte("next_due_date", today)
    .order("next_due_date", { ascending: true });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const { count: totalMembers } = await supabase
    .from("members")
    .select("*", { count: "exact", head: true })
    .eq("is_active", true);

  return Response.json({
    dueMembers: dueMembers || [],
    totalDue: dueMembers?.length || 0,
    totalMembers: totalMembers || 0,
  });
}
