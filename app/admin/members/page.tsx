"use client";

import { useEffect, useState } from "react";
import { Search, MessageCircle, UserX, ArrowRightLeft } from "lucide-react";
import { generateWhatsAppLink, formatDate, isDue } from "@/lib/utils";
import { getMembers, updateMember, deactivateMember } from "@/lib/storage";
import type { Member } from "@/lib/supabase";

export default function MembersList() {
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "due" | "gym" | "pt">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getMembers();
      setMembers(data);
      setLoading(false);
    }
    load();
  }, []);

  async function handleDeactivate(id: string) {
    if (!confirm("Deactivate this member?")) return;
    const success = await deactivateMember(id);
    if (success) setMembers(members.filter((m) => m.id !== id));
  }

  async function handleMarkPaid(member: Member) {
    const months = member.plan === "monthly" ? 1 : member.plan === "quarterly" ? 3 : 6;
    const nextDue = new Date(member.next_due_date);
    nextDue.setMonth(nextDue.getMonth() + months);
    const newDueDate = nextDue.toISOString().split("T")[0];
    const updated = await updateMember(member.id, { next_due_date: newDueDate });
    if (updated) setMembers(members.map((m) => m.id === member.id ? { ...m, next_due_date: newDueDate } : m));
  }

  async function handleTransferToGym(member: Member) {
    if (!confirm(`Transfer ${member.name} from PT to Gym Membership (₹1,000/month)?`)) return;
    const updated = await updateMember(member.id, { plan_type: "gym", plan: "monthly", fee_amount: 1000 });
    if (updated) setMembers(members.map((m) => m.id === member.id ? { ...m, plan_type: "gym" as const, plan: "monthly" as const, fee_amount: 1000 } : m));
  }

  const filtered = members.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.phone.includes(search) || m.town.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || (filter === "due" && isDue(m.next_due_date)) || (filter === "gym" && m.plan_type === "gym") || (filter === "pt" && m.plan_type === "pt");
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#e63946] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Members</h1>
          <p className="text-gray-500 mt-1 text-sm">{members.length} active members</p>
        </div>
        <a href="/admin/members/register" className="bg-[#e63946] hover:bg-[#c1121f] text-white px-5 py-2.5 rounded-xl font-medium transition-all hover:scale-105 active:scale-95">+ Register New</a>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input type="text" placeholder="Search name, phone, town..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-[#e63946] transition-colors" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["all", "due", "gym", "pt"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${filter === f ? (f === "due" ? "bg-red-600 text-white" : "bg-[#e63946] text-white") : "bg-[#0a0a0a] border border-white/10 text-gray-400 hover:text-white"}`}>
              {f === "all" ? "All" : f === "due" ? "Dues" : f === "gym" ? "Gym" : "PT"}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-12 text-center text-gray-500">
          No members found. <a href="/admin/members/register" className="text-[#e63946] hover:underline">Register first member</a>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((member) => {
            const memberIsDue = isDue(member.next_due_date);
            return (
              <div key={member.id} className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:border-white/10 transition-all">
                {member.photo_url ? (
                  <img src={member.photo_url} alt="" className="w-12 h-12 rounded-full object-cover border border-white/10 flex-shrink-0" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#e63946]/10 flex items-center justify-center text-[#e63946] font-bold flex-shrink-0">{member.name.charAt(0)}</div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-white truncate">{member.name}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${member.plan_type === "pt" ? "bg-green-500/10 text-green-400" : "bg-purple-500/10 text-purple-400"}`}>{member.plan_type === "pt" ? "PT" : "GYM"}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{member.town} • {member.phone} • Due: {formatDate(member.next_due_date)}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {memberIsDue ? <span className="text-xs bg-red-500/10 text-red-400 px-2 py-1 rounded-lg font-medium">Due</span> : <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-lg font-medium">Paid</span>}
                  <span className="text-sm font-bold text-white">₹{member.fee_amount.toLocaleString()}</span>
                  {memberIsDue && (
                    <>
                      <a href={generateWhatsAppLink(member.phone, member.name, member.fee_amount)} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-green-600/10 text-green-400 hover:bg-green-600 hover:text-white transition-all" title="WhatsApp Reminder"><MessageCircle className="w-4 h-4" /></a>
                      <button onClick={() => handleMarkPaid(member)} className="px-3 py-1.5 rounded-lg bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white transition-all text-xs font-medium">Paid ✓</button>
                    </>
                  )}
                  {member.plan_type === "pt" && (
                    <button onClick={() => handleTransferToGym(member)} className="p-2 rounded-lg bg-yellow-600/10 text-yellow-400 hover:bg-yellow-600 hover:text-white transition-all" title="Transfer to Gym"><ArrowRightLeft className="w-4 h-4" /></button>
                  )}
                  <button onClick={() => handleDeactivate(member.id)} className="p-2 rounded-lg bg-red-600/10 text-red-400 hover:bg-red-600 hover:text-white transition-all" title="Deactivate"><UserX className="w-4 h-4" /></button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
