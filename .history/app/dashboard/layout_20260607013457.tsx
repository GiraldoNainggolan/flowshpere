import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface">
      {/* Sidebar Kiri */}
      <aside className="w-60 border-r border-border-soft bg-surface-raise hidden md:flex flex-col transition-all duration-300 shrink-0">
        <div className="h-14 flex items-center px-6 border-b border-border-soft">
          <div className="h-6 w-6 rounded bg-brand-500 mr-2" />
          <span className="font-bold text-lg font-display tracking-tight text-text-primary">FlowSphere</span>
        </div>
        <nav className="flex-1 p-4">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">Workspace</p>
          <ul className="space-y-1">
            <li className="px-3 py-2 text-sm font-medium text-brand-500 bg-brand-50 rounded-md cursor-pointer">Dashboard</li>
            <li className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-float rounded-md cursor-pointer transition-colors">Projects</li>
            <li className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-float rounded-md cursor-pointer transition-colors">My Tasks</li>
          </ul>
        </nav>
      </aside>

      {/* Area Kanan (Navbar & Konten Utama) */}
      <div className="flex-1 flex flex-col h-full relative min-w-0">
        {/* Top Navigation Bar */}
        <header className="h-14 border-b border-border-soft bg-surface/80 backdrop-blur-md flex items-center px-6 justify-between z-10 sticky top-0">
          <div className="text-sm font-medium text-text-secondary flex items-center gap-2">
            <span className="hover:text-text-primary cursor-pointer transition-colors">Home</span>
            <span>/</span>
            <span className="text-text-primary">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-surface-float border border-border-soft rounded-md text-xs text-text-muted hover:border-brand-200 transition-colors">
              <span>Search...</span>
              <kbd className="font-mono bg-surface rounded px-1 text-[10px]">⌘K</kbd>
            </button>
            <div className="h-8 w-8 rounded-full bg-brand-100 border border-brand-200 cursor-pointer hover:ring-2 ring-brand-500 ring-offset-2 transition-all"></div>
          </div>
        </header>

        {/* Tempat render page.tsx */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}