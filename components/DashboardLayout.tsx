import type { ComponentChildren } from "preact";

interface Props {
  children: ComponentChildren;
  title: string;
  activeNav?: "dashboard" | "blog" | "projects" | "skills" | "media" | "settings";
}

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard" },
  { id: "blog", label: "Blog Posts", href: "/dashboard/blog" },
  { id: "projects", label: "Projects", href: "/dashboard/projects" },
  { id: "skills", label: "Skills", href: "/dashboard/skills" },
  { id: "media", label: "Media", href: "/dashboard/media" },
  { id: "settings", label: "Settings", href: "/dashboard/settings" },
] as const;

export default function DashboardLayout({ children, title, activeNav }: Props) {
  return (
    <div class="flex min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <aside class="fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-800/80 border-r border-slate-200 dark:border-slate-700/50 flex flex-col z-50">
        <div class="px-6 py-5 border-b border-slate-200 dark:border-slate-700/50">
          <a href="/dashboard" class="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            RD Dashboard
          </a>
        </div>

        <nav class="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <a
              href={item.href}
              class={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeNav === item.id
                  ? "bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-500 dark:text-cyan-400"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div class="px-3 py-4 border-t border-slate-200 dark:border-slate-700/50 space-y-1">
          <a
            href="/"
            class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Site
          </a>
          <a
            href="/dashboard/logout"
            class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </a>
        </div>
      </aside>

      <main class="ml-64 flex-1 min-h-screen">
        <div class="max-w-4xl mx-auto px-6 pt-12 pb-24">
          <h1 class="text-3xl font-bold text-slate-900 dark:text-white font-heading mb-8">{title}</h1>
          {children}
        </div>
      </main>
    </div>
  );
}
