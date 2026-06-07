"use client";

import React, { use } from "react";
import { Settings, Users, Filter } from "lucide-react";
// Path yang sudah dikoreksi
import { KanbanBoard } from "../../../src/features/kanban/components/KanbanBoard";

// 1. Ubah tipe params menjadi Promise
export default function ProjectBoardPage({ params }: { params: Promise<{ id: string }> }) {
  // 2. Buka (unwrap) params menggunakan React.use()
  const resolvedParams = use(params);
  const boardId = resolvedParams.id;

  return (
    <div className="h-full flex flex-col -mx-2 md:mx-0">
      {/* Board Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 px-2 md:px-0">
        <div>
          <h1 className="text-display-md text-text-primary font-bold tracking-tight">FlowSphere Dev Sprint</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse"></span>
            {/* 3. Gunakan boardId yang sudah di-unwrap */}
            <p className="text-sm text-text-secondary">Board ID: {boardId} • Real-time sync active</p>
          </div>
        </div>
        
        {/* Board Actions */}
        <div className="flex items-center gap-3">
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
      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
        {/* 4. Oper boardId ke dalam komponen */}
        <KanbanBoard boardId={boardId} />
      </div>
    </div>
  );
}