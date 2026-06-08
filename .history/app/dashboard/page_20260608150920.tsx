"use client"; // Wajib ditambahkan agar bisa membaca waktu device secara real-time

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, FolderKanban } from "lucide-react";

export default function DashboardPage() {
  // State untuk menyimpan sapaan waktu
  const [greeting, setGreeting] = useState("Good day!");

  // Deteksi waktu saat halaman dimuat (Aman dari Hydration Error Next.js)
  useEffect(() => {
    const currentHour = new Date().getHours(); // Mengambil jam dari device pengguna
    
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good morning!");
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good afternoon!");
    } else if (currentHour >= 17 && currentHour < 21) {
      setGreeting("Good evening!");
    } else {
      setGreeting("Good night!");
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto w-full animate-in fade-in duration-500">
      
      <div className="mb-8">
        {/* Teks sapaan yang sudah dinamis! */}
        <h1 className="text-display-lg text-gray-900 dark:text-white font-bold tracking-tight mb-2 transition-colors">{greeting}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg transition-colors">Here&apos;s a quick overview of your workspace today.</p>
      </div>

      {/* Stats Cards (Full Support Dark Mode) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md dark:shadow-none transition-all duration-300">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 transition-colors">Active Projects</p>
          <div className="flex items-end justify-between">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white leading-none transition-colors">8</h2>
            <span className="text-xs font-bold px-2.5 py-1 bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 rounded-md flex items-center gap-1 transition-colors">
              <ArrowUpRight size={14} /> 2 from last month
            </span>
          </div>
        </div>
        
        <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md dark:shadow-none transition-all duration-300">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 transition-colors">Tasks Due Today</p>
          <div className="flex items-end justify-between">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white leading-none transition-colors">12</h2>
            <span className="text-xs font-bold px-2.5 py-1 bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 rounded-md transition-colors">
              High Workload
            </span>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md dark:shadow-none transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors">Team Velocity</p>
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 px-2.5 py-1 rounded-md transition-colors">On Track</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white leading-none mb-3 transition-colors">87%</h2>
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden transition-colors">
            <div className="bg-brand-500 h-2.5 rounded-full w-[87%]"></div>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors">Recent Sprints</h3>
        <Link href="/dashboard/projects" className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors">
          View all projects
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project Card 1 */}
        <Link href="/dashboard/projects/1" className="group flex flex-col p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-brand-300 dark:hover:border-brand-500/50 hover:shadow-lg dark:shadow-none transition-all duration-300 cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded-xl transition-colors">
              <FolderKanban size={24} />
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 text-xs font-bold transition-colors">
              In Progress
            </span>
          </div>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-2">FlowSphere Dev Sprint</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-1 transition-colors">Implementing real-time Kanban architecture and OAuth integration.</p>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 transition-colors">
            <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 font-medium transition-colors">
              <Clock size={14} /> Updated 2 hours ago
            </div>
            
            {/* Avatar Stack with Dark Mode Ring */}
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 border-2 border-white dark:border-gray-900 flex items-center justify-center text-[10px] font-bold relative z-10 shadow-sm transition-colors">GN</div>
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-2 border-white dark:border-gray-900 flex items-center justify-center text-[10px] font-bold relative z-0 shadow-sm transition-colors">AC</div>
            </div>
          </div>
        </Link>

        {/* Project Card 2 */}
        <div className="group flex flex-col p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 cursor-pointer opacity-80 hover:opacity-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-xl group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
              <FolderKanban size={24} />
            </div>
            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-xs font-bold transition-colors">
              Planning
            </span>
          </div>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors mb-2">Q3 Marketing Site</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-1 transition-colors">Redesigning the landing page and optimizing SEO metadata.</p>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 transition-colors">
            <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 font-medium transition-colors">
              <Clock size={14} /> Updated 3 days ago
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}