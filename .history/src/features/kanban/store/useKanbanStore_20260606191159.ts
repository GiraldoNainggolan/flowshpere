import { create } from 'zustand';
import { Task, Column } from '@/types';

interface KanbanState {
  tasks: Task[];
  columns: Column[];
  setTasks: (tasks: Task[]) => void;
  setColumns: (columns: Column[]) => void;
  
  // Optimistic Mutations
  moveTaskOptimistically: (taskId: string, newColumnId: string) => void;
  rollbackTasks: (previousTasks: Task[]) => void;
}

export const useKanbanStore = create<KanbanState>((set) => ({
  tasks: [],
  columns: [],
  
  setTasks: (tasks) => set({ tasks }),
  setColumns: (columns) => set({ columns }),
  
  moveTaskOptimistically: (taskId, newColumnId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, column_id: newColumnId } : task
      ),
    })),
    
  rollbackTasks: (previousTasks) => set({ tasks: previousTasks }),
}));