"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, Camera, CheckCircle, Dumbbell, User } from "lucide-react";
import { addMember } from "@/lib/storage";
import { GYM_PLANS, PT_PLANS } from "@/lib/utils";

export default function RegisterMember() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    town: "",
    plan_type: "gym" as "gym" | "pt",
    plan: "monthly" as "monthly" | "quarterly" | "half_yearly",
    fee_amount: 1000,
    start_date: new Date().toISOString().split("T")[0],
  });

  function handlePlanTypeChange(type: "gym" | "pt") {
    if (type === "pt") {
      setForm({ ...form, plan_type: type, plan: "monthly", fee_amount: 3500 });
    } else {
      setForm({ ...form, plan_type: type, plan: "monthly", fee_amount: 1000 });
    }
  }

  function handlePlanChange(planValue: string) {
    const plans = form.plan_type === "gym" ? GYM_PLANS : PT_PLANS;
    const plan = plans.find((p) => p.value === planValue);
    setForm({ ...form, plan: planValue as "monthly" | "quarterly" | "half_yearly", fee_amount: plan?.price || 1000 });
  }

  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoError(false);
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!photoPreview) {
      setPhotoError(true);
      return;
    }

    setLoading(true);
    try {
      await addMember({ ...form, photo_url: photoPreview });
      setSuccess(true);
      setTimeout(() => router.push("/admin/members"), 1500);
    } catch (err) {
      console.error("Failed to register:", err);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center animate-[fadeIn_0.5s_ease-out]">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Member Registered!</h2>
          <p className="text-gray-500 mt-2">Redirecting...</p>
        </div>
      </div>
    );
  }

  const activePlans = form.plan_type === "gym" ? GYM_PLANS : PT_PLANS;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <UserPlus className="w-7 h-7 text-[#e63946]" />
          Register Member
        </h1>
        <p className="text-gray-500 mt-1">Add a new member to Olympic Gym</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 space-y-8">
        {/* Photo Upload - REQUIRED */}
        <div className="flex flex-col items-center">
          <label
            htmlFor="photo"
            className={`cursor-pointer group relative w-32 h-32 rounded-full border-2 border-dashed overflow-hidden transition-all duration-300 ${
              photoError ? "border-red-500 bg-red-500/5" : "border-white/20 hover:border-[#e63946]"
            }`}
          >
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 group-hover:text-[#e63946] transition-colors">
                <Camera className="w-8 h-8 mb-1" />
                <span className="text-xs font-medium">Add Photo *</span>
              </div>
            )}
            <input type="file" id="photo" accept="image/*" className="hidden" onChange={handlePhotoUpload} required />
          </label>
          {photoError && <p className="text-red-400 text-xs mt-2">Photo is required</p>}
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#e63946] transition-colors"
            placeholder="Member's full name"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#e63946] transition-colors"
            placeholder="e.g., 9876543210"
            required
          />
        </div>

        {/* Town */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Town / Village *</label>
          <input
            type="text"
            value={form.town}
            onChange={(e) => setForm({ ...form, town: e.target.value })}
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#e63946] transition-colors"
            placeholder="e.g., Raisinghnagar"
            required
          />
        </div>

        {/* Plan Type: Gym vs PT */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">Membership Type *</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handlePlanTypeChange("gym")}
              className={`p-5 rounded-xl border-2 text-center transition-all duration-300 ${
                form.plan_type === "gym"
                  ? "border-[#e63946] bg-[#e63946]/10 text-white"
                  : "border-white/10 text-gray-400 hover:border-white/20"
              }`}
            >
              <Dumbbell className={`w-7 h-7 mx-auto mb-2 ${form.plan_type === "gym" ? "text-[#e63946]" : "text-gray-500"}`} />
              <p className="font-bold text-lg">Gym</p>
              <p className="text-xs text-gray-500 mt-1">From ₹1,000/mo</p>
            </button>
            <button
              type="button"
              onClick={() => handlePlanTypeChange("pt")}
              className={`p-5 rounded-xl border-2 text-center transition-all duration-300 ${
                form.plan_type === "pt"
                  ? "border-[#e63946] bg-[#e63946]/10 text-white"
                  : "border-white/10 text-gray-400 hover:border-white/20"
              }`}
            >
              <User className={`w-7 h-7 mx-auto mb-2 ${form.plan_type === "pt" ? "text-[#e63946]" : "text-gray-500"}`} />
              <p className="font-bold text-lg">Personal Training</p>
              <p className="text-xs text-gray-500 mt-1">₹3,500/mo</p>
            </button>
          </div>
        </div>

        {/* Plan Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">Duration *</label>
          <div className={`grid gap-3 ${activePlans.length === 1 ? "grid-cols-1" : "grid-cols-3"}`}>
            {activePlans.map((plan) => (
              <button
                key={plan.value}
                type="button"
                onClick={() => handlePlanChange(plan.value)}
                className={`p-4 rounded-xl border text-center transition-all duration-300 ${
                  form.plan === plan.value
                    ? "border-[#e63946] bg-[#e63946]/10 text-[#e63946]"
                    : "border-white/10 text-gray-400 hover:border-white/20"
                }`}
              >
                <p className="font-bold">{plan.label}</p>
                <p className="text-xl font-bold mt-1">₹{plan.price.toLocaleString()}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Start Date *</label>
          <input
            type="date"
            value={form.start_date}
            onChange={(e) => setForm({ ...form, start_date: e.target.value })}
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#e63946] transition-colors"
            required
          />
        </div>

        {/* Summary */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Plan</span>
            <span className="text-white font-medium">{form.plan_type === "pt" ? "Personal Training" : "Gym Membership"} — {activePlans.find(p => p.value === form.plan)?.label}</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-400">Amount</span>
            <span className="text-[#e63946] font-bold text-lg">₹{form.fee_amount.toLocaleString()}</span>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#e63946] hover:bg-[#c1121f] disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all duration-300 text-lg hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? "Registering..." : "Register Member"}
        </button>
      </form>
    </div>
  );
}
