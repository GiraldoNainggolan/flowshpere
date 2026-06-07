"use client";

import React, { useRef, useState } from "react";
// Hanya memanggil ArrowRight karena icon sosial kita jadikan SVG murni
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// Path yang sudah dikoreksi (mundur 2 folder: login -> (auth) -> app)
import { createClient } from "../../src/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const supabase = createClient();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard"); 
    }, 1000);
  };

  const handleSocialLogin = async (provider: 'github' | 'gitlab') => {
    toast.info(`Menghubungkan ke ${provider}...`);
    
    // Menghapus variabel 'data' agar terminal tidak protes
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`, 
      },
    });

    if (error) {
      toast.error(`Gagal login dengan ${provider}`);
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Form Section (Kiri) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-surface">
        <div className="max-w-md w-full">
          <h1 className="text-display-xl tracking-tight mb-2">Welcome back</h1>
          <p className="text-text-secondary mb-8">Sign in to your workspace and keep shipping.</p>

          <form ref={formRef} onSubmit={handleLogin} className="space-y-4">
            <div className="input-group flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-secondary">Email address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface-raise focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-shadow"
                placeholder="you@company.com"
                required
              />
            </div>
            
            <div className="input-group flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-text-secondary">Password</label>
                <span className="text-xs text-brand-500 hover:text-brand-600 cursor-pointer">Forgot?</span>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface-raise focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-shadow"
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full mt-6 px-4 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-transform active:scale-[0.98] disabled:opacity-70 flex justify-center items-center gap-2 shadow-sm"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center">
            <div className="flex-1 border-t border-border-soft"></div>
            <div className="px-4 text-sm text-text-muted">Or continue with</div>
            <div className="flex-1 border-t border-border-soft"></div>
          </div>

          {/* Social Buttons dengan SVG murni (Anti-Error) */}
          <div className="mt-6 flex gap-3">
            <button 
              type="button"
              onClick={() => handleSocialLogin('gitlab')}
              className="flex-1 py-2.5 border border-border rounded-lg bg-surface hover:bg-surface-float hover:border-brand-200 transition-all active:scale-95 font-medium text-sm flex justify-center items-center gap-2 cursor-pointer shadow-xs text-[#FC6D26]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z"/>
              </svg>
              GitLab
            </button>
            <button 
              type="button"
              onClick={() => handleSocialLogin('github')}
              className="flex-1 py-2.5 border border-border rounded-lg bg-surface hover:bg-surface-float hover:border-brand-200 transition-all active:scale-95 font-medium text-sm flex justify-center items-center gap-2 cursor-pointer shadow-xs"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-text-primary">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
              GitHub
            </button>
          </div>
        </div>
      </div>

      {/* Ambient Visual (Kanan) */}
      <div className="hidden lg:flex w-1/2 bg-surface-raise relative overflow-hidden items-center justify-center border-l border-border-soft">
        <div className="absolute inset-0 bg-linear-to-br from-brand-50 via-surface-raise to-brand-100 opacity-60"></div>
        <div className="w-125 h-125 bg-brand-200/40 blur-[100px] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-lg p-8 bg-surface/60 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl">
          <p className="text-xl font-medium text-text-primary leading-relaxed mb-6">
            &quot;FlowSphere completely changed how our engineering and design teams collaborate. The real-time Kanban feels like magic.&quot;
          </p>
          <div className="flex items-center gap-4">
            {/* Mematikan paksa peringatan Linter agar aplikasi tidak crash karena konfigurasi Next Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" 
              alt="Alex Chen" 
              className="w-10 h-10 rounded-full object-cover border border-border"
            />
            <div>
              <p className="text-sm font-bold text-text-primary">Alex Chen</p>
              <p className="text-xs text-text-secondary">CTO at TechNova</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}