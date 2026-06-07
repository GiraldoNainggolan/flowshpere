export type Priority = 'urgent' | 'high' | 'medium' | 'low' | 'none';

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  owner_id: string;
  created_at: string;
}

export interface Board {
  id: string;
  workspace_id: string;
  name: string;
  created_at: string;
}

export interface Column {
  id: string;
  board_id: string;
  title: string;
  position: number;
  created_at?: string;
}

export interface Task {
  id: string;
  column_id: string;
  title: string;
  description?: string;
  priority: Priority;
  position: number;
  assignee_id?: string;
  due_date?: string;
  created_at?: string;
  updated_at?: string;
}