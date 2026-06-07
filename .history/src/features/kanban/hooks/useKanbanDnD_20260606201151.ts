import { useCallback } from 'react';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { useKanbanStore } from '../store/useKanbanStore';
import { updateTaskColumn } from '../api/kanbanApi';
import { toast } from 'sonner';

export const useKanbanDnD = () => {
  const { tasks, moveTaskOptimistically, rollbackTasks } = useKanbanStore();

  const handleDragStart = useCallback((_event: DragStartEvent) => {
    // Parameter di-prefix dengan _ jika tidak digunakan untuk lolos linter
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

    const previousState = [...tasks];
    moveTaskOptimistically(taskId, newColumnId);

    try {
      await updateTaskColumn(taskId, newColumnId);
    } catch {
      // Menghapus argumen (error) karena kita hanya mengeksekusi aksi generic
      rollbackTasks(previousState);
      toast.error('Gagal sinkronisasi data. Mengembalikan posisi kartu.');
    }
  }, [tasks, moveTaskOptimistically, rollbackTasks]);

  return { handleDragStart, handleDragEnd };
};