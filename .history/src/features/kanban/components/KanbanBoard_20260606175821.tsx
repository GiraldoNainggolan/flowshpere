"use client";

import React, { useState, useEffect, useTransition } from "react";
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
  arrayMove, 
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy 
} from "@dnd-kit/sortable";
import { createBrowserClient } from '@supabase/ssr';
import { useKanbanStore } from "../store/useKanbanStore"; // Your Zustand Store
import { Column } from "./Column";
import { TaskCard } from "./TaskCard";
import { toast } from "sonner"; // For elegant error states

export function KanbanBoard({ boardId }: { boardId: string }) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Zustand: Holds our optimistic UI state
  const { columns, tasks, setTasks, moveTaskOptimistically, rollbackTasks } = useKanbanStore();
  const [activeTask, setActiveTask] = useState<any | null>(null);
  const [isPending, startTransition] = useTransition();

  // Snappy pointer setup. Requires a 5px drag before initiating to prevent accidental clicks
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // 1. SUPABASE REALTIME SUBSCRIPTION
  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks', filter: `board_id=eq.${boardId}` },
        (payload) => {
          // If the change came from someone else, update Zustand
          // (Logic here to merge incoming payload with local state without disrupting current drag)
          console.log("Realtime update received:", payload);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [boardId, supabase]);

  // 2. DRAG START: Set ghost state and prepare overlay
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const draggedTask = tasks.find((t) => t.id === active.id);
    if (draggedTask) setActiveTask(draggedTask);
  };

  // 3. DRAG END: Optimistic UI & Server Sync
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks.find((t) => t.id === activeId);
    const overColumn = columns.find((c) => c.id === overId);
    
    if (!activeTask || !overColumn) return;

    // Snapshot current state in case we need to rollback (Supabase failure)
    const previousTasksState = [...tasks];

    // OPTIMISTIC UPDATE: Update UI instantly
    startTransition(() => {
      moveTaskOptimistically(activeId, overColumn.id);
    });

    // BACKGROUND SYNC: Send to Supabase
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ column_id: overColumn.id })
        .eq('id', activeId);

      if (error) throw error;

      // Optional: Trigger GSAP FLIP here to animate surrounding cards
      
    } catch (error) {
      // ROLLBACK: If network fails, revert UI and show toast
      rollbackTasks(previousTasksState);
      toast.error("⚠️ Connection lost. Could not move task.");
      
      // GSAP Shake animation trigger would go here on the specific card
    }
  };

  if (columns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        {/* Placeholder for custom SVG Illustration */}
        <h2 className="text-display-lg text-text-primary mt-6 tracking-tight">Clean slate 🎉</h2>
        <p className="text-text-secondary text-lg mt-2 max-w-md">
          Nothing in the backlog. Either your team is incredibly efficient, or it's time to plan the next sprint.
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
      {/* Horizontal Scroll Container */}
      <div className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory">
        <SortableContext items={columns.map(c => c.id)} strategy={horizontalListSortingStrategy}>
          {columns.map((col) => {
            const columnTasks = tasks.filter((t) => t.column_id === col.id);
            return (
              <Column key={col.id} column={col} tasks={columnTasks} />
            );
          })}
        </SortableContext>
      </div>

      {/* DRAG OVERLAY: The tilted card following the cursor */}
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