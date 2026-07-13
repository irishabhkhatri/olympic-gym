"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  LogOut,
  Dumbbell,
  Menu,
  X,
  Globe,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/members", label: "Members", icon: Users },
  { href: "/admin/members/register", label: "Register", icon: UserPlus },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") return;
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  function handleLogout() {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Mobile overlay - BLURRED background */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0a0a0a] border-r border-white/5 transform transition-transform lg:transform-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center gap-3 p-6 border-b border-white/5">
          <Dumbbell className="w-7 h-7 text-[#e63946]" />
          <div>
            <h2 className="font-bold text-base">
              <span className="text-[#e63946]">O</span>lympic <span className="text-[#e63946]">G</span>ym
            </h2>
            <p className="text-[10px] text-gray-500">Admin Panel</p>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-[#e63946]/10 text-[#e63946] border border-[#e63946]/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </a>
            );
          })}

          {/* View Website link */}
          <a
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-blue-400 hover:bg-blue-500/5 transition-all mt-4"
          >
            <Globe className="w-5 h-5" />
            View Website
          </a>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-white/5 bg-[#0a0a0a]">
          <button onClick={() => setSidebarOpen(true)} className="text-white">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-bold text-sm">
            <span className="text-[#e63946]">O</span>lympic <span className="text-[#e63946]">G</span>ym Admin
          </span>
          <a href="/" className="text-gray-400">
            <Globe className="w-5 h-5" />
          </a>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
