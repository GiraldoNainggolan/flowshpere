export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-display-lg text-text-primary tracking-tight mb-2">Good morning!</h1>
        {/* Perbaikan ESLint: Mengganti ' dengan &apos; */}
        <p className="text-text-secondary text-lg">Here&apos;s a quick overview of your workspace today.</p>
      </div>
      
      {/* KPI Cards Grid (3 Kartu Sesuai Spek) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {/* Card 1 */}
        <div className="p-5 rounded-xl border border-border-soft bg-surface-raise shadow-xs hover:-translate-y-0.5 hover:shadow-sm transition-all duration-normal">
          <p className="text-sm font-medium text-text-secondary mb-1">Active Projects</p>
          <div className="flex items-end justify-between">
            <h2 className="text-display-xl text-text-primary">8</h2>
            <span className="text-sm font-medium text-success mb-2 bg-success/10 px-2 py-1 rounded-md">↑ 2 from last month</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-xl border border-border-soft bg-surface-raise shadow-xs hover:-translate-y-0.5 hover:shadow-sm transition-all duration-normal">
          <p className="text-sm font-medium text-text-secondary mb-1">Tasks Due Today</p>
          <div className="flex items-end justify-between">
            <h2 className="text-display-xl text-text-primary">12</h2>
            <span className="text-sm font-medium text-danger mb-2 bg-danger/10 px-2 py-1 rounded-md">High Workload</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-xl border border-border-soft bg-surface-raise shadow-xs hover:-translate-y-0.5 hover:shadow-sm transition-all duration-normal">
          <p className="text-sm font-medium text-text-secondary mb-1">Team Velocity</p>
          <div className="flex items-end justify-between">
            <h2 className="text-display-xl text-text-primary">87%</h2>
            <span className="text-sm font-medium text-brand-500 mb-2">On Track</span>
          </div>
          {/* Mini Progress Bar */}
          <div className="w-full bg-surface-float rounded-full h-1.5 mt-4">
            <div className="bg-brand-500 h-1.5 rounded-full" style={{ width: '87%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}