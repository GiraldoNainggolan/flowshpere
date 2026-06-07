"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
// import { ArrowRight, Github } from "lucide-react";
import { useRouter } from "next/navigation"; // Hook untuk pindah halaman
import { toast } from "sonner"; // Untuk memunculkan notifikasi sukses

export default function LoginPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi Login Email
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi proses API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Jika password salah (Simulasi)
      if (password === "error") {
        toast.error("Invalid email or password");
        gsap.to(".input-group", {
          keyframes: [{ x: -8 }, { x: 8 }, { x: -6 }, { x: 6 }, { x: -4 }, { x: 4 }, { x: 0 }],
          duration: 0.4,
          ease: "none"
        });
        return;
      }

      // Jika berhasil
      toast.success("Welcome back to FlowSphere! 🚀");
      router.push("/dashboard"); // Pindah ke halaman dashboard
    }, 1000);
  };

  // Fungsi Login Social
  const handleSocialLogin = (provider: string) => {
    toast.info(`Redirecting to ${provider}...`);
    setTimeout(() => {
      toast.success("Successfully authenticated!");
      router.push("/dashboard");
    }, 800);
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
                placeholder="•••••••• (Ketik 'error' untuk test animasi gagal)"
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

          {/* Pemisah Garis */}
          <div className="mt-8 flex items-center">
            <div className="flex-1 border-t border-border-soft"></div>
            <div className="px-4 text-sm text-text-muted">Or continue with</div>
            <div className="flex-1 border-t border-border-soft"></div>
          </div>

          {/* Social Buttons yang sudah aktif & punya hover jelas */}
          <div className="mt-6 flex gap-3">
            <button 
              type="button"
              onClick={() => handleSocialLogin("Google")}
              className="flex-1 py-2.5 border border-border rounded-lg bg-surface hover:bg-surface-float hover:border-border-soft transition-all duration-normal active:scale-95 font-medium text-sm flex justify-center items-center gap-2 cursor-pointer shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button 
              type="button"
              onClick={() => handleSocialLogin("GitHub")}
              className="flex-1 py-2.5 border border-border rounded-lg bg-surface hover:bg-surface-float hover:border-border-soft transition-all duration-normal active:scale-95 font-medium text-sm flex justify-center items-center gap-2 cursor-pointer shadow-xs"
            >
              <Github className="w-4 h-4 text-text-primary" />
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