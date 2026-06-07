"use client";

import React, { useState } from "react";
import { Plus, MoreHorizontal, MessageSquare, Paperclip } from "lucide-react";
import { useRouter } from "next/navigation";

export function KanbanBoard({ boardId }: { boardId: string }) {
  const router = useRouter();
  
  // State untuk mengontrol apakah papan kosong
  const [hasTasks, setHasTasks] = useState(false);

  // State Dummy untuk Kolom
  const [columns, setColumns] = useState([
    { id: "todo", title: "To Do", color: "bg-border-strong" },
    { id: "inprogress", title: "In Progress", color: "bg-warning" }
  ]);

  // State Dummy untuk Tugas (Cards)
  const [tasks, setTasks] = useState([
    { id: "task-1", title: "Setup DnD Kit for drag and drop column interactions", columnId: "todo" }
  ]);

  // Fungsi Interaktif
  const handleAddFirstTask = () => setHasTasks(true);

  const handleAddNewTask = (columnId: string) => {
    const newTask = {
      id: `task-${Date.now()}`,
      title: "New frontend dummy task 🚀",
      columnId: columnId
    };
    setTasks([...tasks, newTask]);
  };

  const handleAddColumn = () => {
    // Membatasi maksimal 3 kolom untuk dummy
    if (!columns.find(col => col.id === "done")) {
      setColumns([...columns, { id: "done", title: "Done", color: "bg-success" }]);
    }
  };

  const handleCardClick = (taskId: string) => {
    // Navigasi dummy ke halaman detail task
    router.push(`/dashboard/tasks/${taskId}`);
  };


  // --- TAMPILAN KOSONG ---
  if (!hasTasks) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[500px] border-2 border-dashed border-border-soft rounded-2xl bg-surface-raise/30">
        <h2 className="text-display-lg text-text-primary mb-3 font-bold flex items-center gap-3">
          Clean slate <span className="text-3xl">🎉</span>
        </h2>
        <p className="text-text-secondary mb-8 text-center max-w-md text-lg">
          Nothing in the backlog. Either your team is incredibly efficient, or it's time to plan the next sprint.
        </p>
        <button
          onClick={handleAddFirstTask}
          className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-medium transition-all active:scale-95 shadow-md flex items-center gap-2"
        >
          <Plus size={20} /> Add First Task
        </button>
      </div>
    );
  }

  // --- TAMPILAN PAPAN KANBAN ---
  return (
    <div className="flex gap-6 h-full items-start overflow-x-auto pb-8 pt-2">
      
      {columns.map((column, index) => {
        // Ambil task yang sesuai dengan ID kolom
        const columnTasks = tasks.filter(task => task.columnId === column.id);

        return (
          <div 
            key={column.id} 
            className="w-80 shrink-0 flex flex-col bg-surface-raise rounded-2xl border border-border-soft shadow-xs overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Header Kolom */}
            <div className="p-4 border-b border-border-soft flex justify-between items-center bg-surface/50">
              <h3 className="font-bold text-text-primary flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${column.color}`}></span> 
                {column.title}
                <span className="text-text-muted text-xs font-semibold bg-surface px-2 py-0.5 rounded-full border border-border-soft">
                  {columnTasks.length}
                </span>
              </h3>
              <button className="text-text-muted hover:text-text-primary transition-colors p-1 rounded hover:bg-surface">
                <MoreHorizontal size={18}/>
              </button>
            </div>
            
            {/* Isi Kolom */}
            <div className="p-3 flex flex-col gap-3">
              
              {columnTasks.length === 0 ? (
                <div className="h-28 border-2 border-dashed border-border-soft rounded-xl flex items-center justify-center text-text-muted text-sm font-medium bg-surface/30">
                  Drop tasks here
                </div>
              ) : (
                columnTasks.map((task) => (
                  <div 
                    key={task.id}
                    onClick={() => handleCardClick(task.id)}
                    className="bg-surface p-4 rounded-xl border border-border hover:border-brand-300 shadow-sm cursor-pointer active:scale-[0.98] transition-all group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 border border-brand-100 px-2 py-1 rounded-md">
                        Feature
                      </span>
                      <button className="text-text-muted opacity-0 group-hover:opacity-100 hover:text-text-primary transition-all">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                    
                    <p className="text-sm font-semibold text-text-primary mb-4 leading-relaxed group-hover:text-brand-600 transition-colors">
                      {task.title}
                    </p>
                    
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex -space-x-2">
                        <div className="h-7 w-7 rounded-full bg-brand-100 border-2 border-surface flex items-center justify-center text-[10px] font-bold text-brand-700">GS</div>
                      </div>
                      <div className="flex items-center gap-3 text-text-muted text-xs font-medium">
                        <span className="flex items-center gap-1 hover:text-text-primary"><MessageSquare size={14} /> 2</span>
                        <span className="flex items-center gap-1 hover:text-text-primary"><Paperclip size={14} /> 1</span>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Tombol Add Task di dalam kolom */}
              <button 
                onClick={() => handleAddNewTask(column.id)}
                className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-text-primary p-2.5 rounded-lg hover:bg-surface-float transition-colors w-full border border-dashed border-transparent hover:border-border-soft mt-1"
              >
                <Plus size={16} /> Add new task
              </button>
            </div>
          </div>
        );
      })}

      {/* Tombol Add Column Baru */}
      {!columns.find(col => col.id === "done") && (
        <button 
          onClick={handleAddColumn}
          className="w-80 shrink-0 h-14 rounded-2xl border-2 border-dashed border-border-soft hover:border-brand-300 bg-surface-raise/50 hover:bg-surface-float flex items-center justify-center gap-2 text-text-muted hover:text-brand-600 font-medium transition-all animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200"
        >
          <Plus size={18} /> Add Column
        </button>
      )}

    </div>
  );
}