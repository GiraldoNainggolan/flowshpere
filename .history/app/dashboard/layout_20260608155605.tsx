"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, FolderKanban, CheckSquare, Search, 
  Bell, Menu, X, LogOut, settings, User as UserIcon, 
  Shield, Palette // <-- Ikon yang tadi error sudah dijamin masuk di sini
} from "lucide-react";
import { createClient } from "../src/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const UserAvatar = ({ avatarUrl, initials }: { avatarUrl?: string | null, initials: string }) => (
  <div className="h-9 w-9 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-sm overflow-hidden shrink-0 ring-2 ring-white dark:ring-gray-800">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    {avatarUrl ? <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" /> : initials}
  </div>
);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const [user, setUser] = useState<User | null>(null);
  
  const [profileData, setProfileData] = useState({ name: "Developer", avatar: null as string | null });
  const [userEmail, setUserEmail] = useState("user@flowsphere.com");

  useEffect(() => {
    const syncData = (currentUser: User | null = user) => {
      const savedSettings = localStorage.getItem("flowsphere_settings");
      
      let fallbackName = "Developer";
      let fallbackAvatar = null;
      
      if (currentUser) {
        fallbackName = currentUser.user_metadata?.full_name || currentUser.user_metadata?.name || "Developer";
        fallbackAvatar = currentUser.user_metadata?.avatar_url || null;
      }

      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        const now = new Date().getTime();
        
        if (now - parsed.timestamp > 86400000) {
          localStorage.removeItem("flowsphere_settings");
          setProfileData({ name: fallbackName, avatar: fallbackAvatar });
        } else {
          setProfileData({ 
            name: parsed.name || fallbackName, 
            avatar: parsed.avatar !== undefined ? parsed.avatar : fallbackAvatar 
          });
          
          if (parsed.theme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
      } else {
         setProfileData({ name: fallbackName, avatar: fallbackAvatar });
      }
    };

    const initData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if(user && user.email) setUserEmail(user.email);
      syncData(user); 
    };

    initData();

    window.addEventListener("theme_updated", () => syncData(user));
    return () => window.removeEventListener("theme_updated", () => syncData(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
    { name: "My Tasks", href: "/dashboard/tasks", icon: CheckSquare },
  ];

  const initials = profileData.name.substring(0, 2).toUpperCase();

  return (
    <div className="flex h-screen bg-surface dark:bg-gray-900 overflow-hidden text-text-primary dark:text-gray-100 font-sans transition-colors duration-300">
      
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
      
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-surface dark:bg-gray-900 border-r border-border-soft dark:border-gray-800 flex flex-col transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-border-soft dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 bg-brand-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">FS</div>
            <span className="font-bold text-xl tracking-tight text-text-primary dark:text-white">FlowSphere</span>
          </div>
          <button className="md:hidden text-text-muted dark:text-gray-400" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <p className="px-3 text-xs font-bold text-text-muted dark:text-gray-500 uppercase tracking-wider mb-2 mt-2">Workspace</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? "bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400" 
                      : "text-text-secondary dark:text-gray-400 hover:bg-surface-float dark:hover:bg-gray-800 hover:text-text-primary dark:hover:text-gray-100"
                  }`}
                >
                  <item.icon size={18} className={isActive ? "text-brand-600 dark:text-brand-400" : "text-text-muted dark:text-gray-500"} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-3 border-t border-border-soft dark:border-gray-800 bg-surface dark:bg-gray-900 mt-auto">
          <div className="flex items-center gap-3 px-2 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
            <UserAvatar avatarUrl={profileData.avatar} initials={initials} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-text-primary dark:text-gray-100 truncate">{profileData.name}</p>
              <p className="text-[10px] text-text-secondary dark:text-gray-400 truncate">{userEmail}</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-slate-50 dark:bg-gray-950 transition-colors duration-300">
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-border-soft dark:border-gray-800 bg-white dark:bg-gray-900 z-30 shrink-0 shadow-sm dark:shadow-none transition-colors duration-300">
          
          <div className="flex items-center gap-4 flex-1">
            <button className="md:hidden text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="hidden sm:block text-sm font-medium text-text-secondary dark:text-gray-400">
              <span className="hover:text-text-primary dark:hover:text-gray-200 cursor-pointer transition-colors">Home</span> 
              <span className="mx-2 text-border-strong dark:text-gray-600">/</span> 
              <span className="text-text-primary dark:text-gray-100 capitalize">{pathname.split('/').pop() || 'Dashboard'}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 border rounded-lg transition-all ${isSearchFocused ? 'border-brand-400 ring-4 ring-brand-50 dark:ring-brand-900/20 w-64' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 w-48'}`}>
              <Search size={16} className="text-gray-400 dark:text-gray-500" />
              <input 
                type="text" placeholder="Search projects..." 
                className="bg-transparent border-none focus:outline-none text-sm w-full text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                onFocus={() => setIsSearchFocused(true)} onBlur={() => setIsSearchFocused(false)}
              />
              <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-1.5 font-mono text-[10px] font-medium text-gray-400 dark:text-gray-500">⌘K</kbd>
            </div>

            <div className="relative">
              <button 
                onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
                className="relative p-2 text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
              </button>
              
              {isNotifOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl dark:shadow-2xl rounded-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 ring-1 ring-black/5 dark:ring-white/5">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-gray-900 dark:text-white">Notifications</h4>
                    <span className="text-xs font-medium text-brand-600 dark:text-brand-400 cursor-pointer">Mark all read</span>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 flex gap-3 cursor-pointer">
                    <div className="w-2 h-2 mt-1.5 bg-brand-500 rounded-full shrink-0"></div>
                    <div>
                      <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">Sprint Planning</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Alex mentioned you.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 hidden sm:block"></div>

            <div className="relative">
              <button 
                onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <UserAvatar avatarUrl={profileData.avatar} initials={initials} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl dark:shadow-2xl rounded-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 ring-1 ring-black/5 dark:ring-white/5">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 mb-1">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{profileData.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{userEmail}</p>
                  </div>
                  
                  <Link href="/dashboard/settings?tab=profile" onClick={() => setIsProfileOpen(false)} className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 transition-colors">
                    <UserIcon size={16} /> Edit Profile
                  </Link>
                  <Link href="/dashboard/settings?tab=account" onClick={() => setIsProfileOpen(false)} className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 transition-colors">
                    <Shield size={16} /> Account Security
                  </Link>
                  <Link href="/dashboard/settings?tab=appearance" onClick={() => setIsProfileOpen(false)} className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 transition-colors">
                    <Palette size={16} /> Appearance
                  </Link>
                  
                  <div className="my-1 border-t border-gray-100 dark:border-gray-800"></div>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2 transition-colors font-medium">
                    <LogOut size={16} /> Sign out
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}