import DashboardLayout from "../../components/DashboardLayout.tsx";

export default async function Dashboard() {
  let posts = 0;
  let projects = 0;
  let skills = 0;

  try {
    for await (const _entry of Deno.readDir("./posts")) {
      posts++;
    }
  } catch {
    // dir doesn't exist yet
  }

  try {
    for await (const _entry of Deno.readDir("./projects")) {
      projects++;
    }
  } catch {
    // dir doesn't exist yet
  }

  try {
    const raw = await Deno.readTextFile("./data/skills.json");
    skills = JSON.parse(raw).length;
  } catch {
    // file doesn't exist yet
  }

  return (
    <DashboardLayout title="Dashboard" activeNav="dashboard">
      <div class="grid md:grid-cols-3 gap-6">
        <a
          href="/dashboard/blog"
          class="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500 transition-all"
        >
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">Blog Posts</h2>
          <p class="text-3xl font-bold text-cyan-400">{posts}</p>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your blog content</p>
        </a>
        <a
          href="/dashboard/projects"
          class="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500 transition-all"
        >
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">Projects</h2>
          <p class="text-3xl font-bold text-cyan-400">{projects}</p>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your project showcase</p>
        </a>
        <a
          href="/dashboard/skills"
          class="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500 transition-all"
        >
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">Skills</h2>
          <p class="text-3xl font-bold text-cyan-400">{skills}</p>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your skills & expertise</p>
        </a>
      </div>
    </DashboardLayout>
  );
}
