import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MessageSquare, Paperclip } from "lucide-react";
import { Task } from "../../../types";
import { cn } from "../../../lib/utils";

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  // Desain saat kartu sedang ditarik (meninggalkan bayangan di tempat asalnya)
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        // Perbaikan Tailwind: Mengubah h-[120px] menjadi h-30
        className="h-30 w-full rounded-lg border-2 border-dashed border-brand-500 bg-brand-50 opacity-50"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "group relative flex cursor-grab flex-col gap-3 rounded-lg border border-border bg-surface p-4 shadow-xs transition-all active:cursor-grabbing",
        "hover:-translate-y-0.5 hover:shadow-sm",
        isOverlay && "rotate-2 scale-105 shadow-float ring-1 ring-brand-500"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-2">
          {/* Priority Label */}
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
              task.priority === "urgent" && "bg-danger/10 text-danger",
              task.priority === "high" && "bg-warning/10 text-warning",
              task.priority === "medium" && "bg-brand-100 text-brand-700",
              task.priority === "low" && "bg-surface-float text-text-secondary",
              task.priority === "none" && "bg-surface-raise text-text-muted"
            )}
          >
            {task.priority}
          </span>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-text-primary">{task.title}</h4>
        {task.description && (
          <p className="mt-1 line-clamp-2 text-xs text-text-secondary">
            {task.description}
          </p>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-border-soft pt-3">
        {/* Mock Avatar */}
        <div className="flex -space-x-2">
          <div className="h-6 w-6 rounded-full border-2 border-surface bg-brand-200" />
        </div>
        
        {/* Meta Info */}
        <div className="flex items-center gap-3 text-xs text-text-muted">
          <div className="flex items-center gap-1">
            <Paperclip size={14} />
            <span>2</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare size={14} />
            <span>4</span>
          </div>
        </div>
      </div>
    </div>
  );
}