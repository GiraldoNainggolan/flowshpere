"use client";

import React, { useState, useEffect } from "react";
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  DragOverlay,
  DragStartEvent,
  DragEndEvent
} from "@dnd-kit/core";
import { 
  SortableContext, 
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy 
} from "@dnd-kit/sortable";

// Menggunakan relative path absolut untuk menghindari error TS2307
import { createClient } from "../../../lib/supabase/client";
import { useKanbanStore } from "../store/useKanbanStore";
import { Column } from "./Column";
import { TaskCard } from "./TaskCard";
import { toast } from "sonner";
import { Task, Column as ColumnType } from "../../../types";

export function KanbanBoard({ boardId }: { boardId: string }) {
  const supabase = createClient();

  // Menghapus setTasks karena tidak digunakan (diselesaikan via Optimistic UI)
  const { columns, tasks, moveTaskOptimistically, rollbackTasks } = useKanbanStore();
  
  // Perbaikan tipe 'any' menjadi 'Task | null'
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks', filter: `board_id=eq.${boardId}` },
        (payload) => {
          console.log("Realtime update received:", payload);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [boardId, supabase]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    // Perbaikan TS7006: Deklarasi tipe 'Task' pada parameter 't'
    const draggedTask = tasks.find((t: Task) => t.id === active.id);
    if (draggedTask) setActiveTask(draggedTask);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Perbaikan TS7006: Deklarasi tipe eksplisit
    const activeTaskData = tasks.find((t: Task) => t.id === activeId);
    const overColumn = columns.find((c: ColumnType) => c.id === overId);
    
    if (!activeTaskData || !overColumn) return;

    const previousTasksState = [...tasks];

    // Optimistic Update
    moveTaskOptimistically(activeId, overColumn.id);

    try {
      const { error } = await supabase
        .from('tasks')
        .update({ column_id: overColumn.id })
        .eq('id', activeId);

      if (error) throw error;
      
    } catch {
      // Menghapus argumen 'error' yang tidak digunakan dari blok catch
      rollbackTasks(previousTasksState);
      toast.error("⚠️ Connection lost. Could not move task.");
    }
  };

  if (columns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-display-lg text-text-primary mt-6 tracking-tight">Clean slate 🎉</h2>
        <p className="text-text-secondary text-lg mt-2 max-w-md">
          {/* Perbaikan ESLint: Escape single quote */}
          Nothing in the backlog. Either your team is incredibly efficient, or it&apos;s time to plan the next sprint.
        </p>
        <button className="mt-8 bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-lg font-medium transition-transform active:scale-95 duration-fast ease-spring">
          Add First Task
        </button>
      </div>
    );
  }

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCenter} 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory">
        <SortableContext items={columns.map((c: ColumnType) => c.id)} strategy={horizontalListSortingStrategy}>
          {columns.map((col: ColumnType) => {
            // Perbaikan TS7006: Deklarasi tipe eksplisit
            const columnTasks = tasks.filter((t: Task) => t.column_id === col.id);
            return (
              <Column key={col.id} column={col} tasks={columnTasks} />
            );
          })}
        </SortableContext>
      </div>

      <DragOverlay dropAnimation={{ duration: 200, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
        {activeTask ? (
          <div className="rotate-2 scale-105 shadow-float opacity-90 cursor-grabbing">
            <TaskCard task={activeTask} isOverlay />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}