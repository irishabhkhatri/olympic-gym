export function calculateNextDueDate(
  startDate: string,
  plan: "monthly" | "quarterly" | "half_yearly"
): string {
  const date = new Date(startDate);
  const months = plan === "monthly" ? 1 : plan === "quarterly" ? 3 : 6;
  date.setMonth(date.getMonth() + months);
  return date.toISOString().split("T")[0];
}

export function isDue(nextDueDate: string): boolean {
  return new Date(nextDueDate) <= new Date();
}

export function daysOverdue(nextDueDate: string): number {
  const diff = new Date().getTime() - new Date(nextDueDate).getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

export function generateWhatsAppLink(phone: string, name: string, amount: number): string {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const phoneWithCountry = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;
  const message = encodeURIComponent(
    `Namaste ${name} ji, aapki Olympic Gym ki fees due ho gayi hai. Kripya ₹${amount} jama karein. Dhanyavaad! - Olympic Gym, Raisinghnagar`
  );
  return `https://wa.me/${phoneWithCountry}?text=${message}`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export const GYM_PLANS = [
  { value: "monthly", label: "1 Month", price: 1000, months: 1 },
  { value: "quarterly", label: "3 Months", price: 2700, months: 3 },
  { value: "half_yearly", label: "6 Months", price: 5400, months: 6 },
] as const;

export const PT_PLANS = [
  { value: "monthly", label: "1 Month PT", price: 3500, months: 1 },
] as const;
