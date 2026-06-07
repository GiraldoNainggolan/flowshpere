{/* Mockup Right Side */}
        {/* Perbaikan Tailwind: max-w-150 */}
        <div className="flex-1 relative w-full aspect-square max-w-150 hero-mockup">
          {/* Perbaikan Tailwind: bg-linear-to-tr */}
          <div className="absolute inset-0 bg-linear-to-tr from-brand-100 to-transparent rounded-full blur-3xl opacity-50"></div>
          
          {/* Main App Window Mockup */}
          {/* Perbaikan Tailwind: h-100 */}
          <div className="relative z-10 w-full h-100 bg-surface border border-border shadow-float rounded-2xl overflow-hidden mt-12 flex flex-col">
            <div className="h-10 border-b border-border-soft bg-surface-raise flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-danger/80"></div>
              <div className="w-3 h-3 rounded-full bg-warning/80"></div>
              <div className="w-3 h-3 rounded-full bg-success/80"></div>
            </div>
            {/* Implementasi Unsplash */}
            <div className="flex-1 bg-surface-raise overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" 
                alt="Dashboard Mockup" 
                className="w-full h-full object-cover opacity-90 mix-blend-multiply dark:mix-blend-screen"
              />
            </div>
          </div>