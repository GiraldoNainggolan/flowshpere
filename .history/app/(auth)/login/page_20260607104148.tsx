"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, Github } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// 1. Import Supabase Client yang baru kita buat
import { createClient } from "../../../src/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // 2. Inisialisasi Supabase
  const supabase = createClient();

  // (Fungsi handleLogin Email biarkan seperti sebelumnya sementara waktu)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard"); 
    }, 1000);
  };

  // 3. Fungsi Social Login SUNGGUHAN
  const handleSocialLogin = async (provider: 'google' | 'github') => {
    toast.info(`Menghubungkan ke ${provider}...`);
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        // Setelah login sukses di Google/Github, arahkan ke dashboard
        redirectTo: `${location.origin}/dashboard`, 
      },
    });

    if (error) {
      toast.error(`Gagal login dengan ${provider}`);
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ... (Kode bagian form email tetap sama) ... */}

          {/* Social Buttons yang SUNGGUHAN AKTIF */}
          <div className="mt-6 flex gap-3">
            <button 
              type="button"
              // 4. Panggil provider 'google'
              onClick={() => handleSocialLogin('google')}
              className="flex-1 py-2.5 border border-border rounded-lg bg-surface hover:bg-surface-float hover:border-brand-200 transition-all active:scale-95 font-medium text-sm flex justify-center items-center gap-2 cursor-pointer shadow-xs"
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
              // 4. Panggil provider 'github'
              onClick={() => handleSocialLogin('github')}
              className="flex-1 py-2.5 border border-border rounded-lg bg-surface hover:bg-surface-float hover:border-brand-200 transition-all active:scale-95 font-medium text-sm flex justify-center items-center gap-2 cursor-pointer shadow-xs"
            >
              <Github className="w-4 h-4 text-text-primary" />
              GitHub
            </button>
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