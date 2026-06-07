import React from "react";
import Link from "next/link";
import { FolderKanban, ArrowRight, Plus } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-display-lg text-text-primary tracking-tight mb-2">All Projects</h1>
        <p className="text-text-secondary text-lg">Manage and track your team's current initiatives.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Project Card (Sudah Dipercantik) */}
        <Link 
          href="/dashboard/projects/1" 
          className="group flex flex-col p-6 rounded-2xl border border-border-soft bg-surface hover:border-brand-300 hover:shadow-float transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="h-12 w-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center">
              <FolderKanban size={24} className="text-brand-600" />
            </div>
            <span className="px-3 py-1 rounded-full bg-success/10 border border-success/20 text-success text-xs font-bold uppercase tracking-wider">
              Active
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-brand-600 transition-colors">FlowSphere Dev Sprint</h3>
          <p className="text-sm text-text-secondary mb-8 flex-1 leading-relaxed">
            Building the ultimate real-time Kanban board with DnD Kit and Supabase.
          </p>
          
          <div className="flex items-center justify-between border-t border-border-soft pt-5 mt-auto">
            {/* Perbaikan Overlapping Avatars menggunakan ring */}
            <div className="flex -space-x-3 overflow-hidden px-1">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-surface bg-brand-100 text-[10px] font-bold text-brand-700 z-20">AC</div>
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-surface bg-warning/20 text-[10px] font-bold text-warning z-10">JD</div>
            </div>
            
            <div className="flex items-center gap-1.5 text-sm font-semibold text-brand-500 group-hover:translate-x-1 transition-transform">
              View Board <ArrowRight size={16} />
            </div>
          </div>
        </Link>

        {/* Create New Project (Sudah Dipercantik) */}
        <div className="group flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-border-soft hover:border-brand-400 hover:bg-brand-50/30 transition-all duration-300 cursor-pointer min-h-[240px]">
          <div className="h-14 w-14 rounded-full bg-surface-float group-hover:bg-brand-100 group-hover:scale-110 flex items-center justify-center mb-4 transition-all duration-300">
            <Plus size={28} className="text-text-muted group-hover:text-brand-600 transition-colors" />
          </div>
          <p className="text-base font-bold text-text-primary group-hover:text-brand-600 transition-colors">Create New Project</p>
          <p className="text-sm text-text-muted mt-1 text-center">Set up a blank kanban board</p>
        </div>

      </div>
    </div>
  );
}