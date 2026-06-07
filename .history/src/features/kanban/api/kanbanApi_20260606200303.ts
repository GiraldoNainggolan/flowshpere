import { createClient } from '../../../lib/supabase/client';
import { Task, Column } from '../../../types';

const supabase = createClient();

export const fetchBoardData = async (boardId: string) => {
  const { data: columns, error: colError } = await supabase
    .from('columns')
    .select('*')
    .eq('board_id', boardId)
    .order('position');

  if (colError) throw colError;

  // Perbaikan TS7006: Deklarasi tipe eksplisit pada parameter 'c'
  const columnIds = columns.map((c: Column) => c.id);
  const { data: tasks, error: taskError } = await supabase
    .from('tasks')
    .select('*')
    .in('column_id', columnIds)
    .order('position');

  if (taskError) throw taskError;

  return { columns: columns as Column[], tasks: tasks as Task[] };
};

export const updateTaskColumn = async (taskId: string, newColumnId: string) => {
  const { error } = await supabase
    .from('tasks')
    .update({ column_id: newColumnId, updated_at: new Date().toISOString() })
    .eq('id', taskId);

  if (error) throw error;
};