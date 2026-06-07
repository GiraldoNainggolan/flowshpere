import { useCallback } from 'react';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { useKanbanStore } from '../store/useKanbanStore';
import { updateTaskColumn } from '../api/kanbanApi';
import { toast } from 'sonner';

export const useKanbanDnD = () => {
  const { tasks, moveTaskOptimistically, rollbackTasks } = useKanbanStore();

  const handleDragStart = useCallback((event: DragStartEvent) => {
    // Logic tambahan jika ingin nge-trigger haptic feedback atau visual update spesifik
    const { active } = event;
    document.body.style.cursor = 'grabbing';
  }, []);

  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    document.body.style.cursor = '';
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newColumnId = over.id as string;

    const task = tasks.find(t => t.id === taskId);
    if (!task || task.column_id === newColumnId) return;

    // 1. Snapshot untuk Rollback
    const previousState = [...tasks];

    // 2. Optimistic Update (UI Instan)
    moveTaskOptimistically(taskId, newColumnId);

    // 3. Network Call ke Supabase
    try {
      await updateTaskColumn(taskId, newColumnId);
    } catch (error) {
      // 4. Rollback jika jaringan gagal (Edge case handling yang sempurna)
      rollbackTasks(previousState);
      toast.error('Gagal sinkronisasi data. Mengembalikan posisi kartu.');
    }
  }, [tasks, moveTaskOptimistically, rollbackTasks]);

  return { handleDragStart, handleDragEnd };
};