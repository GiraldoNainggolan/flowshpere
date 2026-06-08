"use client";

import React from "react";
import Link from "next/link";
import { FolderKanban, Plus, ArrowRight } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto w-full animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-display-lg text-gray-900 dark:text-white font-bold tracking-tight mb-2 transition-colors">Semua Proyek</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg transition-colors">Kelola dan lacak inisiatif terkini tim Anda.</p>
      </div>

      {/* Grid Proyek */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* KARTU 1: Proyek Aktif (Siap diarahkan ke Kanban Board) */}
        <Link 
          href="/dashboard/projects/1" 
          className="group flex flex-col p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-brand-300 dark:hover:border-brand-500/50 hover:shadow-lg dark:shadow-none transition-all duration-300 cursor-pointer"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded-xl transition-colors">
              <FolderKanban size={24} />
            </div>
            <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20 text-xs font-bold uppercase tracking-wider transition-colors">
              Aktif
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-3">
            Sprint Pengembangan FlowSphere
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-1 transition-colors leading-relaxed">
            Membangun papan Kanban real-time terbaik dengan DnD Kit dan Supabase.
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 transition-colors">
            {/* Avatar Tim */}
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 border-2 border-white dark:border-gray-900 flex items-center justify-center text-[10px] font-bold relative z-10 shadow-sm transition-colors">GN</div>
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 border-2 border-white dark:border-gray-900 flex items-center justify-center text-[10px] font-bold relative z-0 shadow-sm transition-colors">AC</div>
            </div>
            
            <div className="flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
              Lihat Papan <ArrowRight size={16} />
            </div>
          </div>
        </Link>

        {/* KARTU 2: Tombol Buat Proyek Baru (Siap Memicu Modal/Fungsi Insert Supabase) */}
        <button 
          onClick={() => console.log("Buka Modal Buat Proyek Baru di sini")}
          className="group flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 hover:bg-brand-50 dark:hover:bg-brand-500/5 hover:border-brand-400 dark:hover:border-brand-500 transition-all duration-300 cursor-pointer min-h-[280px]"
        >
          <div className="w-12 h-12 mb-4 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:text-brand-600 dark:group-hover:text-brand-400 group-hover:scale-110 transition-all shadow-sm">
            <Plus size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-1">
            Buat Proyek Baru
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center transition-colors">
            Siapkan papan kanban kosong.
          </p>
        </button>

      </div>
    </div>
  );
}