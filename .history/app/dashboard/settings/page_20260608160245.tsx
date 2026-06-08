"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  User, Mail, Bell, Shield, Camera, 
  Check, Key, Smartphone, Laptop, Palette 
} from "lucide-react";
import { createClient } from "../../src/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { toast } from "sonner";

// Komponen Toggle ditaruh di LUAR agar tidak memicu error React
const ToggleSwitch = ({ checked, onChange }: { checked: boolean, onChange: (val: boolean) => void }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 dark:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
  </label>
);

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [localName, setLocalName] = useState("");
  const [localBio, setLocalBio] = useState("");
  const [localAvatar, setLocalAvatar] = useState<string | null>(null);

  const [twoFactor, setTwoFactor] = useState(false);
  const [theme, setTheme] = useState("light");
  const [accentColor, setAccentColor] = useState("blue");
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifMentions, setNotifMentions] = useState(true);

  useEffect(() => {
    // Membaca URL parameter dengan aman tanpa membuat Next.js Crash
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab && ["profile", "account", "notifications", "appearance"].includes(tab)) {
        setActiveTab(tab);
      }
    }

    const loadDefaultUser = (currentUser: SupabaseUser | null) => {
      if (currentUser) {
        const name = currentUser.user_metadata?.full_name || currentUser.user_metadata?.name || "Developer";
        setLocalName(name);
        setLocalAvatar(currentUser.user_metadata?.avatar_url || null);
      }
    };

    const initializeData = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);

      const savedData = localStorage.getItem("flowsphere_settings");
      
      if (savedData) {
        const parsed = JSON.parse(savedData);
        const now = new Date().getTime();
        const timePassed = now - parsed.timestamp;
        
        if (timePassed > 86400000) {
          localStorage.removeItem("flowsphere_settings");
          loadDefaultUser(currentUser);
        } else {
          setLocalName(parsed.name || "");
          setLocalBio(parsed.bio || "");
          setLocalAvatar(parsed.avatar || null);
          setTwoFactor(parsed.twoFactor || false);
          setTheme(parsed.theme || "light");
          setAccentColor(parsed.accentColor || "blue");
          setNotifEmail(parsed.notifEmail !== undefined ? parsed.notifEmail : true);
          setNotifMentions(parsed.notifMentions !== undefined ? parsed.notifMentions : true);
        }
      } else {
        loadDefaultUser(currentUser);
      }
    };
    
    initializeData();
  }, [supabase.auth]);

  const userEmail = user?.email || "user@flowsphere.com";
  const initials = localName.substring(0, 2).toUpperCase();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLocalAvatar(imageUrl);
      toast.success("Avatar dimuat. Klik Save untuk menerapkan.");
    }
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    setTimeout(() => {
      const dataToSave = {
        timestamp: new Date().getTime(),
        name: localName,
        bio: localBio,
        avatar: localAvatar,
        twoFactor,
        theme,
        accentColor,
        notifEmail,
        notifMentions
      };
      
      localStorage.setItem("flowsphere_settings", JSON.stringify(dataToSave));
      window.dispatchEvent(new Event("theme_updated")); // Memicu transisi Dark Mode secara instan
      setIsSaving(false);
      toast.success("Perubahan berhasil disimpan!");
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto w-full animate-in fade-in duration-500 pb-10">
      <div className="mb-8">
        <h1 className="text-display-lg text-gray-900 dark:text-white font-bold tracking-tight mb-2">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Manage your workspace preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex flex-col space-y-1">
            {[
              { id: "profile", label: "Public Profile", icon: User },
              { id: "account", label: "Account Security", icon: Shield },
              { id: "notifications", label: "Notifications", icon: Bell },
              { id: "appearance", label: "Appearance", icon: Palette },
            ].map((tab) => (
              <button 
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  window.history.pushState(null, '', `/dashboard/settings?tab=${tab.id}`);
                }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? "bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 shadow-sm border border-brand-100 dark:border-brand-500/20" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white border border-transparent"}`}
              >
                <tab.icon size={18} className={activeTab === tab.id ? "text-brand-600 dark:text-brand-400" : "text-gray-400 dark:text-gray-500"} />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden transition-colors">
          <form onSubmit={handleSaveChanges} className="p-6 md:p-8">
            
            {/* TAMPILAN PROFILE ASLI DENGAN UPLOAD FOTO */}
            {activeTab === "profile" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Profile Information</h2>
                
                <div className="flex items-center gap-6 mb-8">
                  <input type="file" ref={fileInputRef} onChange={handlePhotoChange} accept="image/*" className="hidden" />
                  <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <div className="h-24 w-24 rounded-full bg-brand-100 dark:bg-gray-800 flex items-center justify-center text-brand-700 dark:text-brand-400 font-bold text-3xl overflow-hidden ring-4 ring-white dark:ring-gray-900 shadow-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {localAvatar ? <img src={localAvatar} alt="Avatar" className="w-full h-full object-cover" /> : initials}
                    </div>
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="text-white" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Profile picture</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Click avatar to change. PNG/JPG under 3MB.</p>
                    <button type="button" onClick={() => setLocalAvatar(null)} className="text-xs font-semibold text-red-500 hover:text-red-700 dark:hover:text-red-400">Remove picture</button>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                      <input type="text" value={localName} onChange={(e) => setLocalName(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Display Initials</label>
                      <input type="text" value={initials} disabled className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 text-gray-400 dark:text-gray-500 cursor-not-allowed" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={18} />
                      <input type="email" value={userEmail} disabled className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 text-gray-400 dark:text-gray-500 cursor-not-allowed" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Managed by your OAuth provider (GitHub/GitLab).</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                    <textarea rows={4} value={localBio} onChange={(e) => setLocalBio(e.target.value)} placeholder="Developer at heart..." className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 resize-none"></textarea>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "account" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Account Security</h2>
                <div className="space-y-6">
                  <div className="p-5 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-950/40">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"><Key size={20} className="text-gray-600 dark:text-gray-400" /></div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">OAuth Authentication</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">You signed in using a social provider. Passwords are handled securely by them.</p>
                        <button type="button" disabled className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 rounded-lg text-sm font-medium cursor-not-allowed">Change Password</button>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 border border-gray-200 dark:border-gray-800 rounded-xl flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white">Two-factor Authentication (2FA)</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Add an extra layer of security to your account.</p>
                    </div>
                    <ToggleSwitch checked={twoFactor} onChange={setTwoFactor} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Active Sessions</h3>
                    <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
                      <div className="p-4 flex items-center justify-between bg-white dark:bg-gray-900/50">
                        <div className="flex items-center gap-3">
                          <Laptop size={18} className="text-green-500" />
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">Windows PC - Chrome <span className="text-[10px] bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full ml-2">Current</span></p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Surabaya, ID • Active now</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between bg-white dark:bg-gray-900/50">
                        <div className="flex items-center gap-3">
                          <Smartphone size={18} className="text-gray-400 dark:text-gray-500" />
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">iPhone 13 - Safari</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Jakarta, ID • Last active 2 hours ago</p>
                          </div>
                        </div>
                        <button type="button" className="text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400 font-medium">Revoke</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Notifications</h2>
                <div className="space-y-6">
                  <div className="p-5 border border-gray-200 dark:border-gray-800 rounded-xl flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white">Email Notifications</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Receive daily sprint summaries and digests.</p>
                    </div>
                    <ToggleSwitch checked={notifEmail} onChange={setNotifEmail} />
                  </div>
                  <div className="p-5 border border-gray-200 dark:border-gray-800 rounded-xl flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white">Mentions & Activity</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Get notified when someone tags you in a Kanban card.</p>
                    </div>
                    <ToggleSwitch checked={notifMentions} onChange={setNotifMentions} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Theme Preferences</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Customize the look and feel of your workspace.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mb-8">
                  <div onClick={() => setTheme("light")} className={`border-2 rounded-xl p-4 cursor-pointer relative transition-all ${theme === "light" ? "border-brand-500 bg-brand-50/40 dark:bg-brand-500/5 text-brand-700 dark:text-brand-400" : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/40 hover:border-brand-300 dark:hover:border-gray-700 text-gray-600 dark:text-gray-400"}`}>
                    <div className={`absolute top-3 right-3 w-4 h-4 rounded-full border-4 ${theme === "light" ? "border-brand-500 bg-white dark:bg-gray-900" : "border-gray-300 dark:border-gray-600 bg-transparent"}`}></div>
                    <div className="h-24 w-full bg-white border border-gray-200 rounded-lg mb-3 flex flex-col gap-2 p-2">
                      <div className="h-3 w-1/2 bg-gray-200 rounded"></div><div className="h-8 w-full bg-blue-50 rounded"></div>
                    </div>
                    <p className="text-center font-bold text-sm">Light Mode</p>
                  </div>
                  <div onClick={() => setTheme("dark")} className={`border-2 rounded-xl p-4 cursor-pointer relative transition-all ${theme === "dark" ? "border-brand-500 bg-gray-50 dark:bg-gray-950 text-brand-600 dark:text-brand-400" : "border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900/60 hover:border-gray-400 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400"}`}>
                    <div className={`absolute top-3 right-3 w-4 h-4 rounded-full border-4 ${theme === "dark" ? "border-brand-500 bg-white dark:bg-gray-900" : "border-gray-400 dark:border-gray-600 bg-transparent"}`}></div>
                    <div className="h-24 w-full bg-gray-800 border border-gray-700 rounded-lg mb-3 flex flex-col gap-2 p-2">
                      <div className="h-3 w-1/2 bg-gray-600 rounded"></div><div className="h-8 w-full bg-brand-900/20 rounded"></div>
                    </div>
                    <p className="text-center font-bold text-sm">Dark Mode</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end">
              <button 
                type="submit" 
                disabled={isSaving}
                className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-all active:scale-[0.98] shadow-sm disabled:opacity-70 flex items-center justify-center gap-2 min-w-35"
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>Save Settings <Check size={18} /></>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}