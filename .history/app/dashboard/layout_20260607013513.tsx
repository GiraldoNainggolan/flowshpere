"use client";

import React, { useState } from "react";
import { Search, Bell, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  // State untuk mengontrol buka/tutup menu profile
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Fungsi simulasi logout
  const handleLogout = () => {
    setIsProfileOpen(false);
    router.push("/login");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface text-text-primary">
      {/* Sidebar Kiri */}
      <aside className="w-64 border-r border-border-soft bg-surface hidden md:flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-border-soft">
          <div className="h-7 w-7 rounded-lg bg-brand-500 mr-3 shadow-sm flex items-center justify-center text-white font-bold text-xs">
            FS
          </div>
          <span className="font-bold text-xl font-display tracking-tight text-text-primary">FlowSphere</span>
        </div>
        <nav className="flex-1 p-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 px-2">Workspace</p>
          <ul className="space-y-1">
            <li className="px-3 py-2 text-sm font-medium text-brand-600 bg-brand-50 rounded-lg cursor-pointer">Dashboard</li>
            <li className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-float rounded-lg cursor-pointer transition-colors">Projects</li>
            <li className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-float rounded-lg cursor-pointer transition-colors">My Tasks</li>
          </ul>
        </nav>
      </aside>

      {/* Area Kanan (Navbar & Konten Utama) */}
      <div className="flex-1 flex flex-col h-full relative min-w-0 bg-surface-raise/30">
        
        {/* Top Navigation Bar yang sudah dirapikan */}
        <header className="h-16 border-b border-border-soft bg-surface flex items-center px-6 justify-between z-30 sticky top-0">
          
          {/* Breadcrumbs */}
          <div className="hidden sm:flex text-sm font-medium text-text-secondary items-center gap-2">
            <span className="hover:text-text-primary cursor-pointer transition-colors">Home</span>
            <span className="text-border-soft">/</span>
            <span className="text-text-primary font-semibold">Dashboard</span>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4 ml-auto">
            
            {/* Search Bar yang lebih rapi */}
            <button className="hidden md:flex items-center gap-2 w-64 px-3 py-2 bg-surface-raise border border-border-soft rounded-lg text-sm text-text-muted hover:border-brand-300 hover:bg-surface transition-all focus:outline-none focus:ring-2 focus:ring-brand-500/20 group">
              <Search size={16} className="text-text-muted group-hover:text-brand-500 transition-colors" />
              <span className="flex-1 text-left">Search projects...</span>
              <kbd className="font-mono bg-surface border border-border-soft rounded px-1.5 py-0.5 text-[10px] font-bold shadow-xs">⌘K</kbd>
            </button>

            {/* Notification Bell */}
            <button className="p-2 text-text-muted hover:text-text-primary hover:bg-surface-raise rounded-full transition-colors relative">
              <Bell size={20} />
              {/* Red dot notification */}
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border-2 border-surface"></span>
            </button>

            {/* Garis Pembatas Vertikal */}
            <div className="h-6 w-px bg-border-soft mx-1"></div>

            {/* Profile Dropdown Container */}
            <div className="relative">
              
              {/* Tombol Profile */}
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 pr-2 rounded-full border border-transparent hover:bg-surface-raise hover:border-border-soft transition-all focus:outline-none"
              >
                <div className="h-8 w-8 rounded-full bg-brand-100 border border-brand-200 overflow-hidden flex items-center justify-center">
                   <img src="https://ui-avatars.com/api/?name=Alex+Chen&background=eff6ff&color=3b82f6" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <ChevronDown size={14} className="text-text-muted" />
              </button>

              {/* Menu Dropdown */}
              {isProfileOpen && (
                <>
                  {/* Backdrop tak terlihat untuk menutup dropdown saat klik di luar area */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileOpen(false)}
                  ></div>
                  
                  {/* Kotak Menu */}
                  <div className="absolute right-0 mt-2 w-56 bg-surface border border-border rounded-xl shadow-float z-50 py-1 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Header Menu */}
                    <div className="px-4 py-3 border-b border-border-soft bg-surface-raise/50">
                      <p className="text-sm font-bold text-text-primary">Alex Chen</p>
                      <p className="text-xs text-text-secondary truncate">alex@technova.com</p>
                    </div>
                    
                    {/* Daftar Menu */}
                    <div className="py-1.5 p-1.5 flex flex-col gap-1">
                      <button className="w-full px-3 py-2 text-sm text-left text-text-secondary hover:bg-surface-raise hover:text-text-primary rounded-md flex items-center gap-2.5 transition-colors">
                        <User size={16} /> Edit Profile
                      </button>
                      <button className="w-full px-3 py-2 text-sm text-left text-text-secondary hover:bg-surface-raise hover:text-text-primary rounded-md flex items-center gap-2.5 transition-colors">
                        <Settings size={16} /> Account Settings
                      </button>
                    </div>
                    
                    {/* Menu Logout */}
                    <div className="border-t border-border-soft p-1.5">
                      <button 
                        onClick={handleLogout}
                        className="w-full px-3 py-2 text-sm text-left text-danger hover:bg-danger/10 rounded-md flex items-center gap-2.5 transition-colors font-medium"
                      >
                        <LogOut size={16} /> Log out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>
        </header>

        {/* Tempat render page.tsx */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}