import ThemeToggle from "../islands/ThemeToggle.tsx";

export default function Nav() {
  return (
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700/50" role="navigation" aria-label="Main navigation">
      <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" class="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          RD
        </a>
        <div class="flex items-center gap-6">
          <div class="flex gap-6">
            <a href="/#about" class="text-slate-600 dark:text-slate-300 hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 rounded">About</a>
            <a href="/#skills" class="text-slate-600 dark:text-slate-300 hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 rounded">Skills</a>
            <a href="/projects" class="text-slate-600 dark:text-slate-300 hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 rounded">Projects</a>
            <a href="/blog" class="text-slate-600 dark:text-slate-300 hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 rounded">Blog</a>
            <a href="/#contact" class="text-slate-600 dark:text-slate-300 hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 rounded">Contact</a>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
