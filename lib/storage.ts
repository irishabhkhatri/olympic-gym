import type { Member } from "./supabase";
import { calculateNextDueDate } from "./utils";

const STORAGE_KEY = "olympic_gym_members";

function compressImage(dataUrl: string, maxWidth = 200): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ratio = maxWidth / img.width;
      canvas.width = maxWidth;
      canvas.height = img.height * ratio;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.6));
    };
    img.src = dataUrl;
  });
}

export function getMembers(): Member[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
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
}): Promise<Member> {
  const members = getMembers();
  let photo = input.photo_url;
  if (photo && photo.startsWith("data:")) {
    photo = await compressImage(photo);
  }
  const newMember: Member = {
    id: crypto.randomUUID(),
    ...input,
    photo_url: photo,
    next_due_date: calculateNextDueDate(input.start_date, input.plan),
    is_active: true,
    created_at: new Date().toISOString(),
  };
  members.push(newMember);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  return newMember;
}

export function updateMember(id: string, updates: Partial<Member>): Member | null {
  const members = getMembers();
  const index = members.findIndex((m) => m.id === id);
  if (index === -1) return null;
  members[index] = { ...members[index], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  return members[index];
}

export function deactivateMember(id: string): boolean {
  const members = getMembers();
  const index = members.findIndex((m) => m.id === id);
  if (index === -1) return false;
  members[index].is_active = false;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  return true;
}
