import React from "react";
import Link from "next/link";
import { FolderKanban, ArrowRight } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-display-lg text-text-primary tracking-tight mb-2">All Projects</h1>
        <p className="text-text-secondary text-lg">Manage and track your team's current initiatives.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Project Card */}
        <Link 
          href="/dashboard/projects/1" 
          className="group flex flex-col p-6 rounded-xl border border-border-soft bg-surface-raise hover:border-brand-300 hover:shadow-md transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 rounded-lg bg-brand-100 flex items-center justify-center">
              <FolderKanban size={20} className="text-brand-600" />
            </div>
            <span className="px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-semibold">Active</span>
          </div>
          
          <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-brand-600 transition-colors">FlowSphere Dev Sprint</h3>
          <p className="text-sm text-text-secondary mb-6 flex-1">Building the ultimate real-time Kanban board with DnD Kit and Supabase.</p>
          
          <div className="flex items-center justify-between border-t border-border-soft pt-4 mt-auto">
            <div className="flex -space-x-2">
              <div className="h-7 w-7 rounded-full border-2 border-surface bg-brand-200 flex items-center justify-center text-[10px] font-bold text-brand-700">AC</div>
              <div className="h-7 w-7 rounded-full border-2 border-surface bg-warning/20 flex items-center justify-center text-[10px] font-bold text-warning">JD</div>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-brand-500 group-hover:translate-x-1 transition-transform">
              View Board <ArrowRight size={16} />
            </div>
          </div>
        </Link>

        {/* Create New Project Placeholder */}
        <div className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-border-soft bg-surface hover:bg-surface-raise transition-colors cursor-pointer min-h-[220px]">
          <div className="h-10 w-10 rounded-full bg-surface-float flex items-center justify-center mb-3 text-text-muted">
            <span className="text-xl">+</span>
          </div>
          <p className="text-sm font-medium text-text-primary">Create New Project</p>
        </div>
      </div>
    </div>
  );
}