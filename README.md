A modern and responsive Gaming Dashboard built with React, TypeScript, Tailwind CSS, and ShadCN UI. This project showcases a clean and dynamic UI for tracking gaming stats, recent activity, leaderboards, and more. Ideal for gamers, streamers, or developers building game-related dashboards.

✨ Features
🎮 Interactive game statistics and leaderboards

📊 Modular components styled with Tailwind CSS

🧩 UI components powered by ShadCN UI & Lucide Icons

⚡ Built using React Server Components (RSC)

🎨 Theming via CSS variables with neutral base colors

🔄 Easily extendable component and utility structure

🛠️ Tech Stack
React (with tsx)

Tailwind CSS (tailwind.config.ts)

TypeScript

ShadCN UI

Lucide Icons

Vite / Next.js (inferred from usage patterns)

📁 Project Structure
bash
Copy
Edit
/app
  └── globals.css         # Tailwind CSS globals
/components              # Reusable UI components (aliased as @/components)
/lib                     # Utility functions (aliased as @/lib)
/hooks                   # Custom React hooks
Aliases are defined in components.json for clean imports like:

ts
Copy
Edit
import { Button } from "@/components/ui/button"
📦 Installation
bash
Copy
Edit
# Clone the repository
git clone https://github.com/yourusername/gaming-dashboard.git
cd gaming-dashboard

# Install dependencies
pnpm install

# Start the dev server
pnpm dev
📄 Configuration
Tailwind CSS configuration: tailwind.config.ts

CSS entry point: app/globals.css

ShadCN UI config: Defined in components.json

🚀 Deployment
The app is optimized for deployment on platforms like Vercel or Netlify. Static assets and dynamic routes can be handled seamlessly.

🧼 .gitignore Highlights
Ignores node_modules, .next/, dist/, and environment config files.

🙌 Acknowledgments
shadcn/ui

Lucide Icons

Tailwind CSS

