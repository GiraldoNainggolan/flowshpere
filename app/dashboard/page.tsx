import React from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, FolderKanban } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto w-full animate-in fade-in duration-500">
      
      <div className="mb-8">
        <h1 className="text-display-lg text-text-primary font-bold tracking-tight mb-2">Good morning!</h1>
        <p className="text-text-secondary text-lg">Here&apos;s a quick overview of your workspace today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-surface border border-border-soft rounded-2xl shadow-xs hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-text-secondary mb-4">Active Projects</p>
          <div className="flex items-end justify-between">
            <h2 className="text-display-xl font-bold text-text-primary leading-none">8</h2>
            <span className="text-xs font-bold px-2 py-1 bg-success/10 text-success rounded-md flex items-center gap-1">
              <ArrowUpRight size={14} /> 2 from last month
            </span>
          </div>
        </div>
        
        <div className="p-6 bg-surface border border-border-soft rounded-2xl shadow-xs hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-text-secondary mb-4">Tasks Due Today</p>
          <div className="flex items-end justify-between">
            <h2 className="text-display-xl font-bold text-text-primary leading-none">12</h2>
            <span className="text-xs font-bold px-2 py-1 bg-danger/10 text-danger rounded-md">
              High Workload
            </span>
          </div>
        </div>

        <div className="p-6 bg-surface border border-border-soft rounded-2xl shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-text-secondary">Team Velocity</p>
            <span className="text-xs font-medium text-brand-600">On Track</span>
          </div>
          <h2 className="text-display-xl font-bold text-text-primary leading-none mb-3">87%</h2>
          <div className="w-full bg-surface-raise rounded-full h-2 overflow-hidden">
            <div className="bg-brand-500 h-2 rounded-full w-[87%]"></div>
          </div>
        </div>
      </div>

      {/* Recent Projects Section */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold text-text-primary">Recent Sprints</h3>
        <Link href="/dashboard/projects" className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
          View all projects
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project Card 1 */}
        <Link href="/dashboard/projects/1" className="group flex flex-col p-6 rounded-2xl border border-border-soft bg-surface hover:border-brand-300 hover:shadow-float transition-all duration-300 cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-brand-50 text-brand-600 rounded-xl">
              <FolderKanban size={24} />
            </div>
            <span className="px-3 py-1 rounded-full bg-warning/10 border border-warning/20 text-warning text-xs font-bold">
              In Progress
            </span>
          </div>
          <h4 className="text-lg font-bold text-text-primary group-hover:text-brand-600 transition-colors mb-2">FlowSphere Dev Sprint</h4>
          <p className="text-sm text-text-secondary mb-6 flex-1">Implementing real-time Kanban architecture and OAuth integration.</p>
          <div className="flex items-center justify-between pt-4 border-t border-border-soft">
            <div className="flex items-center gap-2 text-xs text-text-muted font-medium">
              <Clock size={14} /> Updated 2 hours ago
            </div>
            {/* Perbaikan Avatar: Potongan Rapi Anti-Berantakan */}
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 border-2 border-white flex items-center justify-center text-[10px] font-bold relative z-10 shadow-sm">GN</div>
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 border-2 border-white flex items-center justify-center text-[10px] font-bold relative z-0 shadow-sm">AC</div>
            </div>
          </div>
        </Link>

        {/* Project Card 2 (Dummy Tambahan) */}
        <div className="group flex flex-col p-6 rounded-2xl border border-border-soft bg-surface hover:border-brand-300 hover:shadow-float transition-all duration-300 cursor-pointer opacity-70 hover:opacity-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-surface-raise text-text-secondary rounded-xl">
              <FolderKanban size={24} />
            </div>
            <span className="px-3 py-1 rounded-full bg-surface-raise border border-border-soft text-text-muted text-xs font-bold">
              Planning
            </span>
          </div>
          <h4 className="text-lg font-bold text-text-primary group-hover:text-brand-600 transition-colors mb-2">Q3 Marketing Site</h4>
          <p className="text-sm text-text-secondary mb-6 flex-1">Redesigning the landing page and optimizing SEO metadata.</p>
          <div className="flex items-center justify-between pt-4 border-t border-border-soft">
            <div className="flex items-center gap-2 text-xs text-text-muted font-medium">
              <Clock size={14} /> Updated 3 days ago
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}