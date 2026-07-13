import { supabase } from "./supabase";
import type { Member } from "./supabase";
import { calculateNextDueDate } from "./utils";

export async function getMembers(): Promise<Member[]> {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch members:", error);
    return [];
  }
  return data || [];
}

export async function addMember(input: {
  name: string;
  phone: string;
  town: string;
  photo_url: string | null;
  plan_type: "gym" | "pt";
  plan: "monthly" | "quarterly" | "half_yearly";
  fee_amount: number;
  start_date: string;
}): Promise<Member | null> {
  let photoUrl = input.photo_url;

  // Upload photo to Supabase Storage if it's a base64 string
  if (photoUrl && photoUrl.startsWith("data:")) {
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`;
    const base64Data = photoUrl.split(",")[1];
    const blob = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("members-photos")
      .upload(fileName, blob, { contentType: "image/jpeg" });

    if (!uploadError && uploadData) {
      const { data: urlData } = supabase.storage
        .from("members-photos")
        .getPublicUrl(uploadData.path);
      photoUrl = urlData.publicUrl;
    } else {
      console.error("Photo upload failed:", uploadError);
      photoUrl = null;
    }
  }

  const next_due_date = calculateNextDueDate(input.start_date, input.plan);

  const { data, error } = await supabase
    .from("members")
    .insert({
      name: input.name,
      phone: input.phone,
      town: input.town,
      photo_url: photoUrl,
      plan_type: input.plan_type,
      plan: input.plan,
      fee_amount: input.fee_amount,
      start_date: input.start_date,
      next_due_date,
      is_active: true,
    })
    .select()
    .single();

  if (error) {
    console.error("Failed to add member:", error);
    return null;
  }
  return data;
}

export async function updateMember(id: string, updates: Partial<Member>): Promise<Member | null> {
  const { data, error } = await supabase
    .from("members")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Failed to update member:", error);
    return null;
  }
  return data;
}

export async function deactivateMember(id: string): Promise<boolean> {
  const { error } = await supabase
    .from("members")
    .update({ is_active: false })
    .eq("id", id);

  if (error) {
    console.error("Failed to deactivate member:", error);
    return false;
  }
  return true;
}
