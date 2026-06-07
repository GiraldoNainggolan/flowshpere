"use client";

import React, { useState, useEffect } from "react";
import { User, Mail, Bell, Shield, Monitor, Camera } from "lucide-react";
// PERBAIKAN PATH: Mundur 2 folder (dari settings ke dashboard, lalu ke app)
import { createClient } from "../../src/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
    // Membungkam peringatan linter
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userName = user?.user_metadata?.full_name || user?.user_metadata?.name || "Developer";
  const userEmail = user?.email || "user@flowsphere.com";
  const avatarUrl = user?.user_metadata?.avatar_url;
  const initials = userName.substring(0, 2).toUpperCase();

  return (
    <div className="max-w-5xl mx-auto w-full animate-in fade-in duration-500 pb-10">
      <div className="mb-8">
        <h1 className="text-display-lg text-gray-900 font-bold tracking-tight mb-2">Settings</h1>
        <p className="text-gray-500 text-lg">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Navigasi Settings */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex flex-col space-y-1">
            <button 
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "profile" ? "bg-brand-50 text-brand-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}
            >
              <User size={18} className={activeTab === "profile" ? "text-brand-600" : "text-gray-400"} />
              Public Profile
            </button>
            <button 
              onClick={() => setActiveTab("account")}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "account" ? "bg-brand-50 text-brand-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}
            >
              <Shield size={18} className={activeTab === "account" ? "text-brand-600" : "text-gray-400"} />
              Account Security
            </button>
            <button 
              onClick={() => setActiveTab("notifications")}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "notifications" ? "bg-brand-50 text-brand-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}
            >
              <Bell size={18} className={activeTab === "notifications" ? "text-brand-600" : "text-gray-400"} />
              Notifications
            </button>
            <button 
              onClick={() => setActiveTab("appearance")}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "appearance" ? "bg-brand-50 text-brand-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}
            >
              <Monitor size={18} className={activeTab === "appearance" ? "text-brand-600" : "text-gray-400"} />
              Appearance
            </button>
          </nav>
        </aside>

        {/* Konten Settings */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="relative group cursor-pointer">
                  <div className="h-24 w-24 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-2xl overflow-hidden ring-4 ring-white shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {avatarUrl ? <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" /> : initials}
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">Profile picture</h3>
                  <p className="text-xs text-gray-500 mb-3">PNG, JPG or GIF under 3MB.</p>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Change</button>
                    <button className="px-4 py-2 bg-white text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">Remove</button>
                  </div>
                </div>
              </div>

              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={userName}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-gray-900"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Display Name</label>
                    <input 
                      type="text" 
                      defaultValue={initials}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-gray-900"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input 
                      type="email" 
                      defaultValue={userEmail}
                      disabled
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Your email is managed by your OAuth provider (GitHub/GitLab).</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Bio</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us a little bit about yourself..."
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-gray-900 resize-none"
                  ></textarea>
                </div>

                <div className="pt-4 flex justify-end">
                  <button type="button" className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors shadow-sm">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Theme Preferences</h2>
              <p className="text-sm text-gray-500 mb-6">Choose how FlowSphere looks to you. Select a single theme, or sync with your system.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Opsi Light */}
                <div className="border-2 border-brand-500 rounded-xl p-4 cursor-pointer relative bg-gray-50">
                  <div className="absolute top-3 right-3 w-4 h-4 rounded-full border-4 border-brand-500 bg-white"></div>
                  <div className="h-24 w-full bg-white border border-gray-200 rounded-lg mb-3 shadow-sm flex flex-col gap-2 p-2">
                    <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                    <div className="h-8 w-full bg-blue-50 rounded"></div>
                    <div className="h-8 w-full bg-gray-100 rounded"></div>
                  </div>
                  <p className="text-center font-semibold text-gray-900 text-sm">Light Mode</p>
                </div>

                {/* Opsi Dark (Coming Soon) */}
                <div className="border-2 border-gray-200 hover:border-gray-300 rounded-xl p-4 cursor-pointer bg-gray-50 transition-colors group">
                  <div className="absolute top-3 right-3 w-4 h-4 rounded-full border-2 border-gray-300 bg-transparent group-hover:border-gray-400"></div>
                  <div className="h-24 w-full bg-gray-900 border border-gray-700 rounded-lg mb-3 shadow-sm flex flex-col gap-2 p-2">
                    <div className="h-3 w-1/2 bg-gray-700 rounded"></div>
                    <div className="h-8 w-full bg-blue-900/30 rounded"></div>
                    <div className="h-8 w-full bg-gray-800 rounded"></div>
                  </div>
                  <p className="text-center font-medium text-gray-600 text-sm flex items-center justify-center gap-1">
                    Dark Mode <span className="text-[10px] bg-brand-100 text-brand-700 px-1.5 py-0.5 rounded uppercase font-bold">Soon</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder untuk tab lain */}
          {(activeTab === "account" || activeTab === "notifications") && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col items-center justify-center text-center h-64 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <Shield size={48} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-1">Coming Soon</h3>
              <p className="text-sm text-gray-500 max-w-sm">This settings module is currently under development. Please check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}