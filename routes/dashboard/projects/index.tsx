import { Handlers, PageProps } from "$fresh/server.ts";
import frontmatter from "front-matter";
import DashboardLayout from "../../../components/DashboardLayout.tsx";

interface ProjectItem {
  slug: string;
  title: string;
  featured: boolean;
}

interface ProjectsData {
  projects: ProjectItem[];
}

export const handler: Handlers<ProjectsData> = {
  async GET(_req, ctx) {
    const projects: ProjectItem[] = [];
    try {
      for await (const entry of Deno.readDir("./projects")) {
        if (!entry.name.endsWith(".md") || entry.isDirectory) continue;
        const content = await Deno.readTextFile(`./projects/${entry.name}`);
        const { attributes } = frontmatter<{ title: string; featured: boolean }>(content);
        projects.push({
          slug: entry.name.replace(".md", ""),
          title: attributes.title || entry.name,
          featured: !!attributes.featured,
        });
      }
    } catch {
      // dir doesn't exist
    }
    projects.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
    return ctx.render({ projects });
  },
};

export default function ProjectList({ data }: PageProps<ProjectsData>) {
  const { projects } = data;

  return (
    <DashboardLayout title="Projects" activeNav="projects">
      <div class="flex items-center justify-between mb-8">
        <a
          href="/dashboard/projects/new"
          class="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-full text-sm hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
        >
          + New Project
        </a>
      </div>

      {projects.length === 0 && (
        <p class="text-slate-500 dark:text-slate-400">No projects yet.</p>
      )}

      <div class="space-y-3">
        {projects.map((project) => (
          <div class="bg-white dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700/50 flex items-center justify-between">
            <div>
              <a
                href={`/dashboard/projects/${project.slug}`}
                class="text-slate-900 dark:text-white font-medium hover:text-cyan-400 transition-colors"
              >
                {project.title}
              </a>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {project.slug}
                {project.featured && <span class="ml-2 text-cyan-400">Featured</span>}
              </p>
            </div>
            <div class="flex items-center gap-3">
              <a
                href={`/dashboard/projects/${project.slug}`}
                class="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Edit
              </a>
              <form method="POST" action="/api/dashboard/delete-project">
                <input type="hidden" name="slug" value={project.slug} />
                <button
                  type="submit"
                  class="text-sm text-red-400 hover:text-red-300 transition-colors"
                  onclick="return confirm('Delete this project?')"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
