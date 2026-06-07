"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-text-primary/20 backdrop-blur-sm flex items-start justify-center pt-[20vh]">
      <div className="w-full max-w-xl bg-surface rounded-xl shadow-float border border-border-soft overflow-hidden">
        <div className="flex items-center px-4 py-3 border-b border-border-soft">
          <Search size={18} className="text-text-muted mr-3" />
          <input 
            type="text" 
            placeholder="Search projects, tasks, or people..." 
            className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder:text-text-muted"
            autoFocus
          />
          <kbd className="font-mono text-[10px] bg-surface-raise px-2 py-1 rounded text-text-muted border border-border-soft">
            ESC
          </kbd>
        </div>
        <div className="p-4 text-center text-sm text-text-secondary">
          No recent searches
        </div>
      </div>
    </div>
  );
}