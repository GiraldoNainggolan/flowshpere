"use client";

import React from "react";
import { Settings, Users, Filter } from "lucide-react";
// Karena folder app ada di luar, kita mundur 4 tingkat untuk masuk ke src/
import { KanbanBoard } from "../../../../src/components/KanbanBoard"; // HAPUS BARIS INI

export default function ProjectBoardPage({ params }: { params: { id: string } }) {
  // params.id akan berisi angka "1" (atau apapun ID di URL)
  
  return (
    <div className="h-full flex flex-col -mx-2 md:mx-0">
      {/* Board Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 px-2 md:px-0">
        <div>
          <h1 className="text-display-md text-text-primary font-bold tracking-tight">FlowSphere Dev Sprint</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse"></span>
            <p className="text-sm text-text-secondary">Board ID: {params.id} • Real-time sync active</p>
          </div>
        </div>
        
        {/* Board Actions */}
        <div className="flex items-center gap-3">
          {/* Active Users Avatar */}
          <div className="hidden sm:flex -space-x-2 mr-2 overflow-hidden px-1">
             <div className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-surface bg-brand-100 text-[10px] font-bold text-brand-700 z-20">AC</div>
             <div className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-surface bg-warning/20 text-[10px] font-bold text-warning z-10">JD</div>
          </div>
          
          <button className="p-2 border border-border-soft bg-surface rounded-lg text-text-secondary hover:text-text-primary hover:border-brand-300 transition-colors shadow-xs">
            <Filter size={18} />
          </button>
          <button className="p-2 border border-border-soft bg-surface rounded-lg text-text-secondary hover:text-text-primary hover:border-brand-300 transition-colors shadow-xs">
            <Users size={18} />
          </button>
          <button className="p-2 border border-border-soft bg-surface rounded-lg text-text-secondary hover:text-text-primary hover:border-brand-300 transition-colors shadow-xs">
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Board Area */}
      {/* Kita beri margin negatif agar scroll board bisa menyentuh ujung layar */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
        <KanbanBoard boardId={params.id} />
      </div>
    </div>
  );
}