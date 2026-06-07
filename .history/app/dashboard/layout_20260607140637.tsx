"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  Search, 
  Bell, 
  Menu, 
  X, 
  LogOut, 
  Settings, 
  User as UserIcon 
} from "lucide-react";
import { createClient } from "../src/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
    { name: "My Tasks", href: "/dashboard/tasks", icon: CheckSquare },
  ];

  const userName = user?.user_metadata?.full_name || user?.user_metadata?.name || "Developer";
  const userEmail = user?.email || "user@flowsphere.com";
  const avatarUrl = user?.user_metadata?.avatar_url;
  const initials = userName.substring(0, 2).toUpperCase();

  // Komponen Avatar agar konsisten di atas dan di bawah
  const UserAvatar = () => (
    <div className="h-9 w-9 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-sm overflow-hidden shrink-0 ring-2 ring-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {avatarUrl ? <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" /> : initials}
    </div>
  );

  return (
    <div className="flex h-screen bg-surface overflow-hidden text-text-primary font-sans">
      
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* SIDEBAR */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border-soft flex flex-col transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-border-soft shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 bg-brand-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">FS</div>
            <span className="font-bold text-xl tracking-tight text-text-primary">FlowSphere</span>
          </div>
          <button className="ml-auto md:hidden text-text-muted" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <p className="px-3 text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Workspace</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive ? "bg-brand-50 text-brand-600" : "text-text-secondary hover:bg-surface-float hover:text-text-primary"
                  }`}
                >
                  <item.icon size={18} className={isActive ? "text-brand-600" : "text-text-muted"} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Profil Bawah (Sudah Konsisten) */}
        <div className="p-4 border-t border-border-soft bg-surface">
          <div className="flex items-center gap-3">
            <UserAvatar />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-text-primary truncate">{userName}</p>
              <p className="text-xs text-text-secondary truncate">{userEmail}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* KONTEN UTAMA */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-slate-50">
        
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-border-soft bg-white z-30 shrink-0 shadow-sm">
          
          <div className="flex items-center gap-4 flex-1">
            <button className="md:hidden text-text-secondary hover:text-text-primary" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="hidden sm:block text-sm font-medium text-text-secondary">
              <span className="hover:text-text-primary cursor-pointer transition-colors">Home</span> 
              <span className="mx-2 text-border-strong">/</span> 
              <span className="text-text-primary capitalize">{pathname.split('/').pop() || 'Dashboard'}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 border rounded-lg transition-all ${isSearchFocused ? 'border-brand-400 ring-4 ring-brand-50 w-64' : 'border-gray-200 bg-gray-50 w-48'}`}>
              <Search size={16} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="bg-transparent border-none focus:outline-none text-sm w-full text-gray-700 placeholder:text-gray-400"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-gray-200 bg-white px-1.5 font-mono text-[10px] font-medium text-gray-400">⌘K</kbd>
            </div>

            {/* Tombol Notifikasi */}
            <div className="relative">
              <button 
                onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
                className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-gray-100 rounded-full transition-colors"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              {/* Dropdown Notifikasi (Solid Background) */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 shadow-xl rounded-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 ring-1 ring-black/5">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-gray-900">Notifications</h4>
                    <span className="text-xs font-medium text-brand-600 hover:text-brand-700 cursor-pointer">Mark all as read</span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex gap-3 cursor-pointer hover:border-brand-300 transition-colors">
                      <div className="w-2 h-2 mt-1.5 bg-brand-500 rounded-full shrink-0"></div>
                      <div>
                        <p className="text-sm text-gray-900 font-medium">Sprint Planning</p>
                        <p className="text-xs text-gray-500 mt-0.5">Alex mentioned you in &quot;FlowSphere Dev Sprint&quot;</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="w-px h-6 bg-gray-200 hidden sm:block"></div>

            {/* Tombol Profil */}
            <div className="relative">
              <button 
                onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <UserAvatar />
              </button>

              {/* Dropdown Profil (Solid Background) */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 shadow-xl rounded-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 ring-1 ring-black/5">
                  <div className="px-4 py-3 border-b border-gray-100 mb-1">
                    <p className="text-sm font-bold text-gray-900 truncate">{userName}</p>
                    <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                  </div>
                  {/* ... kode sebelumnya ... */}
                  <div className="px-4 py-3 border-b border-gray-100 mb-1">
                    <p className="text-sm font-bold text-gray-900 truncate">{userName}</p>
                    <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                  </div>
                  
                  {/* UBAH DUA TOMBOL INI MENJADI LINK */}
                  <Link 
                    href="/dashboard/settings" 
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-g