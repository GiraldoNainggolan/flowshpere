import React from "react";
// Menggunakan relative path untuk menghindari error TS2307
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        <input
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-lg border border-border bg-surface-raise px-3 py-2 text-sm text-text-primary",
            "focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all",
            "placeholder:text-text-muted",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-danger focus:border-danger focus:ring-danger/20",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-danger">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";