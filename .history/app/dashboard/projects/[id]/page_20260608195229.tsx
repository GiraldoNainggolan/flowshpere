"use client";

import React, { use, useState, useEffect } from "react";
import { Settings, Users, Filter, Loader2 } from "lucide-react";
import { KanbanBoard } from "../../../src/features/kanban/components/KanbanBoard";
import { createClient } from "../../../src/lib/supabase/client";

export default function ProjectBoardPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const boardId = resolvedParams.id;
  const supabase = createClient();

  const [projectTitle, setProjectTitle] = useState("Memuat Proyek...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('title')
        .eq('id', boardId)
        .single();

      // OPTIMASI: Memanfaatkan variabel error agar lulus linter
      if (error) {
        console.error("Kesalahan saat memuat judul proyek:", error);
      }

      if (data) setProjectTitle(data.title);
      else setProjectTitle("Proyek Tidak Ditemukan");
      
      setIsLoading(false);
    };

    fetchProjectDetails();
  }, [boardId, supabase]);

  return (
    <div className="h-full flex flex-col -mx-2 md:mx-0 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 px-2 md:px-0">
        <div>
          <h1 className="text-3xl text-gray-900 dark:text-white font-bold tracking-tight transition-colors flex items-center gap-3">
            {projectTitle}
            {isLoading && <Loader2 size={20} className="animate-spin text-brand-500" />}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">ID: {boardId.substring(0, 8)}... • Real-time sync active</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex -space-x-2 mr-2 overflow-hidden px-1">
             <div className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-white dark:ring-gray-900 bg-brand-100 dark:bg-brand-900/50 text-[10px] font-bold text-brand-700 dark:text-brand-400 z-20 transition-colors">AC</div>
             <div className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-white dark:ring-gray-900 bg-amber-100 dark:bg-amber-900/50 text-[10px] font-bold text-amber-700 dark:text-amber-400 z-10 transition-colors">JD</div>
          </div>
          
          <button className="p-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-brand-300 dark:hover:border-brand-500 transition-colors shadow-sm">
            <Filter size={18} />
          </button>
          <button className="p-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-brand-300 dark:hover:border-brand-500 transition-colors shadow-sm">
            <Users size={18} />
          </button>
          <button className="p-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-brand-300 dark:hover:border-brand-500 transition-colors shadow-sm">
            <Settings size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
        <KanbanBoard boardId={boardId} />
      </div>
    </div>
  );
}