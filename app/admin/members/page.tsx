"use client";

import { useEffect, useState } from "react";
import { Search, MessageCircle, UserX, ArrowRightLeft, X } from "lucide-react";
import { generateWhatsAppLink, formatDate, isDue } from "@/lib/utils";
import { getMembers, updateMember, deactivateMember } from "@/lib/storage";
import type { Member } from "@/lib/supabase";

export default function MembersList() {
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "due" | "gym" | "pt">("all");
  const [loading, setLoading] = useState(true);
  const [payingMember, setPayingMember] = useState<Member | null>(null);

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

  async function handleMarkPaid(member: Member, months: number) {
    const nextDue = new Date(member.next_due_date);
    nextDue.setMonth(nextDue.getMonth() + months);
    const newDueDate = nextDue.toISOString().split("T")[0];
    const updated = await updateMember(member.id, { next_due_date: newDueDate });
    if (updated) setMembers(members.map((m) => m.id === member.id ? { ...m, next_due_date: newDueDate } : m));
    setPayingMember(null);
  }

  async function handleTransferToGym(member: Member) {
    if (!confirm(`Transfer ${member.name} from PT to Gym (₹1,000/month)?`)) return;
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
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Members</h1>
          <p className="text-gray-500 text-xs md:text-sm mt-1">{members.length} active</p>
        </div>
        <a href="/admin/members/register" className="bg-[#e63946] text-white px-4 py-2 rounded-xl text-sm font-medium">+ New</a>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#e63946]" />
        </div>
        <div className="flex gap-2">
          {(["all", "due", "gym", "pt"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 rounded-xl text-xs font-medium ${filter === f ? (f === "due" ? "bg-red-600 text-white" : "bg-[#e63946] text-white") : "bg-[#0a0a0a] border border-white/10 text-gray-400"}`}>
              {f === "all" ? "All" : f === "due" ? "Dues" : f === "gym" ? "Gym" : "PT"}
            </button>
          ))}
        </div>
      </div>

      {/* Members List */}
      {filtered.length === 0 ? (
        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-12 text-center text-gray-500">
          No members found. <a href="/admin/members/register" className="text-[#e63946]">Register first</a>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((member) => {
            const memberIsDue = isDue(member.next_due_date);
            return (
              <div key={member.id} className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-3 md:p-4">
                <div className="flex items-center gap-3">
                  {/* Photo */}
                  {member.photo_url ? (
                    <img src={member.photo_url} alt="" className="w-10 h-10 rounded-full object-cover border border-white/10 flex-shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#e63946]/10 flex items-center justify-center text-[#e63946] font-bold flex-shrink-0 text-sm">{member.name.charAt(0)}</div>
                  )}

                  {/* Name + status */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white text-sm truncate">{member.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${member.plan_type === "pt" ? "bg-green-500/10 text-green-400" : "bg-purple-500/10 text-purple-400"}`}>{member.plan_type === "pt" ? "PT" : "GYM"}</span>
                      {memberIsDue ? (
                        <span className="text-[10px] text-red-400 font-medium">Due</span>
                      ) : (
                        <span className="text-[10px] text-green-400">Paid</span>
                      )}
                    </div>
                  </div>

                  {/* Actions - compact for mobile */}
                  <div className="flex items-center gap-1.5">
                    {memberIsDue && (
                      <>
                        <a href={generateWhatsAppLink(member.phone, member.name, member.fee_amount)} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-green-600/10 flex items-center justify-center text-green-400 active:bg-green-600 active:text-white transition-all" title="Remind">
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        <button onClick={() => setPayingMember(member)} className="h-8 px-2.5 rounded-lg bg-blue-600/10 text-blue-400 active:bg-blue-600 active:text-white transition-all text-xs font-medium" title="Mark Paid">
                          Paid
                        </button>
                      </>
                    )}
                    {member.plan_type === "pt" && (
                      <button onClick={() => handleTransferToGym(member)} className="w-8 h-8 rounded-lg bg-yellow-600/10 flex items-center justify-center text-yellow-400 active:bg-yellow-600 active:text-white transition-all" title="Transfer to Gym">
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button onClick={() => handleDeactivate(member.id)} className="w-8 h-8 rounded-lg bg-red-600/10 flex items-center justify-center text-red-400 active:bg-red-600 active:text-white transition-all" title="Deactivate">
                      <UserX className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Desktop: extra info row */}
                <div className="hidden md:flex items-center gap-4 mt-2 ml-[52px] text-xs text-gray-500">
                  <span>{member.town}</span>
                  <span>{member.phone}</span>
                  <span>Due: {formatDate(member.next_due_date)}</span>
                  <span>₹{member.fee_amount.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Payment Modal */}
      {payingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setPayingMember(null)} />
          <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 w-full max-w-sm">
            <button onClick={() => setPayingMember(null)} className="absolute top-4 right-4 text-gray-500">
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-lg mb-1">Mark as Paid</h3>
            <p className="text-gray-500 text-sm mb-6">{payingMember.name} — how many months?</p>

            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((m) => (
                <button
                  key={m}
                  onClick={() => handleMarkPaid(payingMember, m)}
                  className="p-3 rounded-xl border border-white/10 text-center hover:border-[#e63946] hover:bg-[#e63946]/10 active:bg-[#e63946] active:text-white transition-all"
                >
                  <p className="text-lg font-bold text-white">{m}</p>
                  <p className="text-[10px] text-gray-500">{m === 1 ? "month" : "months"}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
