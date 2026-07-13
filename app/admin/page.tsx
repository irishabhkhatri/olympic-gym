"use client";

import { useEffect, useState } from "react";
import { Users, AlertTriangle, IndianRupee, MessageCircle, TrendingUp, Dumbbell, User, ArrowUpRight, Activity } from "lucide-react";
import { generateWhatsAppLink, formatDate, daysOverdue, isDue } from "@/lib/utils";
import { getMembers } from "@/lib/storage";
import type { Member } from "@/lib/supabase";

function MiniChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-[3px] h-10">
      {data.map((val, i) => (
        <div
          key={i}
          className="w-[6px] rounded-full transition-all duration-700"
          style={{
            height: `${(val / max) * 100}%`,
            background: color,
            opacity: 0.4 + (i / data.length) * 0.6,
            animationDelay: `${i * 100}ms`,
          }}
        />
      ))}
    </div>
  );
}

function DonutChart({ gym, pt }: { gym: number; pt: number }) {
  const total = gym + pt || 1;
  const gymPct = (gym / total) * 100;
  const circumference = 2 * Math.PI * 36;
  const gymStroke = (gymPct / 100) * circumference;

  return (
    <div className="relative w-28 h-28">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
        <circle
          cx="40" cy="40" r="36" fill="none" stroke="#e63946" strokeWidth="6"
          strokeDasharray={`${gymStroke} ${circumference}`}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
        <circle
          cx="40" cy="40" r="36" fill="none" stroke="#22c55e" strokeWidth="6"
          strokeDasharray={`${circumference - gymStroke} ${circumference}`}
          strokeDashoffset={`-${gymStroke}`}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-xl font-bold text-white">{gym + pt}</p>
        <p className="text-[9px] text-gray-500">TOTAL</p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [dueMembers, setDueMembers] = useState<Member[]>([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [gymCount, setGymCount] = useState(0);
  const [ptCount, setPtCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const all = getMembers().filter((m) => m.is_active);
    const due = all.filter((m) => isDue(m.next_due_date));
    setTotalMembers(all.length);
    setGymCount(all.filter((m) => m.plan_type === "gym").length);
    setPtCount(all.filter((m) => m.plan_type === "pt").length);
    setDueMembers(due);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#e63946] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const totalRevenueDue = dueMembers.reduce((sum, m) => sum + m.fee_amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome back, <span className="text-[#e63946]">Anil sir</span> 👋
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
          </p>
        </div>
        <a
          href="/admin/members/register"
          className="hidden md:flex items-center gap-2 bg-[#e63946] text-white px-5 py-2.5 rounded-xl font-medium transition-all hover:brightness-110 active:scale-95"
        >
          + Register
        </a>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-gradient-to-br from-[#0f0f0f] to-[#0a0a0a] border border-white/5 rounded-2xl p-4 md:p-5 relative overflow-hidden group hover:border-white/10 transition-all">
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-all" />
          <Users className="w-5 h-5 text-blue-400 mb-3" />
          <p className="text-2xl md:text-3xl font-bold text-white">{totalMembers}</p>
          <p className="text-gray-500 text-xs mt-1">Total Members</p>
          <MiniChart data={[2, 4, 3, 7, 5, 8, totalMembers || 1]} color="#3b82f6" />
        </div>

        <div className="bg-gradient-to-br from-[#0f0f0f] to-[#0a0a0a] border border-white/5 rounded-2xl p-4 md:p-5 relative overflow-hidden group hover:border-red-500/20 transition-all">
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-red-500/5 rounded-full blur-xl group-hover:bg-red-500/10 transition-all" />
          <AlertTriangle className="w-5 h-5 text-red-400 mb-3" />
          <p className="text-2xl md:text-3xl font-bold text-red-400">{dueMembers.length}</p>
          <p className="text-gray-500 text-xs mt-1">Fees Due</p>
          <MiniChart data={[1, 3, 2, 4, dueMembers.length || 1, 2, 3]} color="#ef4444" />
        </div>

        <div className="bg-gradient-to-br from-[#0f0f0f] to-[#0a0a0a] border border-white/5 rounded-2xl p-4 md:p-5 relative overflow-hidden group hover:border-white/10 transition-all">
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition-all" />
          <Dumbbell className="w-5 h-5 text-purple-400 mb-3" />
          <p className="text-2xl md:text-3xl font-bold text-white">{gymCount}</p>
          <p className="text-gray-500 text-xs mt-1">Gym Members</p>
        </div>

        <div className="bg-gradient-to-br from-[#0f0f0f] to-[#0a0a0a] border border-white/5 rounded-2xl p-4 md:p-5 relative overflow-hidden group hover:border-white/10 transition-all">
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-green-500/5 rounded-full blur-xl group-hover:bg-green-500/10 transition-all" />
          <User className="w-5 h-5 text-green-400 mb-3" />
          <p className="text-2xl md:text-3xl font-bold text-white">{ptCount}</p>
          <p className="text-gray-500 text-xs mt-1">PT Members</p>
        </div>
      </div>

      {/* Revenue + Donut Chart Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Revenue */}
        <div className="bg-gradient-to-br from-[#e63946]/10 via-[#0a0a0a] to-[#0a0a0a] border border-[#e63946]/20 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#e63946]/5 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <IndianRupee className="w-4 h-4 text-[#e63946]" />
              <span className="text-gray-400 text-sm">Total Due</span>
            </div>
            <p className="text-4xl font-bold text-white">₹{totalRevenueDue.toLocaleString()}</p>
            <p className="text-gray-500 text-xs mt-2">{dueMembers.length} members pending</p>
          </div>
          <div className="absolute bottom-4 right-4">
            <Activity className="w-16 h-16 text-[#e63946]/10" />
          </div>
        </div>

        {/* Donut chart */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 flex items-center gap-6">
          <DonutChart gym={gymCount} pt={ptCount} />
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#e63946]" />
              <span className="text-sm text-gray-300">Gym — {gymCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-gray-300">PT — {ptCount}</span>
            </div>
            <p className="text-[10px] text-gray-600 mt-2">Member Distribution</p>
          </div>
        </div>
      </div>

      {/* Due Members */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            Pending Fees
          </h2>
          <span className="text-[10px] bg-red-500/10 text-red-400 px-3 py-1 rounded-full font-bold">
            {dueMembers.length} OVERDUE
          </span>
        </div>

        {dueMembers.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-green-500/50" />
            </div>
            <p className="text-gray-400 font-medium">All fees are collected!</p>
            <p className="text-gray-600 text-sm mt-1">No pending dues right now.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {dueMembers.map((member) => (
              <div key={member.id} className="p-4 flex items-center gap-3 hover:bg-white/[0.02] transition-colors">
                {member.photo_url ? (
                  <img src={member.photo_url} alt="" className="w-10 h-10 rounded-full object-cover border border-white/10" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#e63946]/10 flex items-center justify-center text-[#e63946] font-bold text-sm">
                    {member.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white text-sm truncate">{member.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                      member.plan_type === "pt" ? "bg-green-500/10 text-green-400" : "bg-purple-500/10 text-purple-400"
                    }`}>
                      {member.plan_type === "pt" ? "PT" : "GYM"}
                    </span>
                    <span className="text-[10px] text-red-400">{daysOverdue(member.next_due_date)}d overdue</span>
                  </div>
                </div>
                <span className="text-[#e63946] font-bold text-sm">₹{member.fee_amount.toLocaleString()}</span>
                <a
                  href={generateWhatsAppLink(member.phone, member.name, member.fee_amount)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:brightness-110 active:scale-95 transition-all"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span className="hidden sm:inline">Remind</span>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile register button */}
      <a
        href="/admin/members/register"
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-[#e63946] rounded-full flex items-center justify-center shadow-lg shadow-[#e63946]/30 active:scale-90 transition-transform z-40"
      >
        <span className="text-white text-2xl font-light">+</span>
      </a>
    </div>
  );
}
