"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi Error
    setTimeout(() => {
      setIsLoading(false);
      // GSAP Shake Animation untuk Error
      gsap.to(".input-group", {
        x: [-8, 8, -6, 6, -4, 4, 0],
        duration: 0.4,
        ease: "none"
      });
      // Di dunia nyata, tampilkan toast error di sini
    }, 1000);
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
              className="w-full mt-6 px-4 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border-soft"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-surface text-text-muted">Or continue with</span></div>
          </div>

          <div className="mt-6 flex gap-3">
            <button className="flex-1 py-2.5 border border-border-soft rounded-lg hover:bg-surface-raise transition-colors font-medium text-sm flex justify-center items-center gap-2">
              Google
            </button>
            <button className="flex-1 py-2.5 border border-border-soft rounded-lg hover:bg-surface-raise transition-colors font-medium text-sm flex justify-center items-center gap-2">
              GitHub
            </button>
          </div>
        </div>
      </div>

      {/* Ambient Visual (Kanan) - Disembunyikan di Mobile */}
      <div className="hidden lg:flex w-1/2 bg-surface-raise relative overflow-hidden items-center justify-center border-l border-border-soft">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-surface-raise to-brand-100 opacity-60"></div>
        {/* Abstract Mesh Effect Placeholder */}
        <div className="w-[500px] h-[500px] bg-brand-200/40 blur-[100px] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-lg p-8 bg-surface/60 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl">
          <p className="text-xl font-medium text-text-primary leading-relaxed mb-6">
            "FlowSphere completely changed how our engineering and design teams collaborate. The real-time Kanban feels like magic."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold">A</div>
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