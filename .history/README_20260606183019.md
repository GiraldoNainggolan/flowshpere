# FlowSphere — Real-time Project Management App

FlowSphere is a premium, real-time project management workspace built with a meticulous focus on pixel-perfect UI, seamless micro-interactions, and high-performance state management.

## 🚀 Tech Stack

* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript (Strict Mode)
* **Styling:** TailwindCSS v4 + Custom CSS Variables + Shadcn/UI
* **State & Data:** Zustand v5 + TanStack Query v5
* **Real-time & Auth:** Supabase (PostgreSQL, WebSockets)
* **Interactions:** GSAP 3.x, @dnd-kit/core

## 📦 Local Setup

1.  **Clone & Install:**
    \`\`\`bash
    git clone <repository-url>
    cd flowsphere
    npm install
    \`\`\`

2.  **Environment Variables:**
    Create a \`.env.local\` file in the root directory:
    \`\`\`env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    \`\`\`

3.  **Run Development Server:**
    \`\`\`bash
    npm run dev
    \`\`\`
    Open [http://localhost:3000](http://localhost:3000) in your browser.