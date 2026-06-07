import React, { useMemo } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { Column as ColumnType, Task } from "../../../types";
import { TaskCard } from "./TaskCard";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
}

export function Column({ column, tasks }: ColumnProps) {
  const taskIds = useMemo(() => tasks.map((t) => t.id), [tasks]);

  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  return (
    <div className="flex h-full w-[280px] shrink-0 flex-col rounded-xl bg-surface-raise p-3">
      {/* Column Header */}
      <div className="mb-4 flex items-center justify-between px-1">
        <h3 className="font-medium text-sm text-text-primary">{column.title}</h3>
        <div className="flex h-5 items-center justify-center rounded-full bg-surface-float px-2 text-xs font-medium text-text-secondary">
          {tasks.length}
        </div>
      </div>

      {/* Drop Area */}
      <div
        ref={setNodeRef}
        className={`flex flex-1 flex-col gap-3 rounded-lg transition-colors ${
          isOver ? "bg-brand-50/50 ring-1 ring-brand-200" : ""
        }`}
      >
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
        
        {/* Placeholder if empty to maintain drop zone size */}
        {tasks.length === 0 && (
          <div className="h-[100px] w-full rounded-lg border-2 border-dashed border-border-soft" />
        )}
      </div>
    </div>
  );
}