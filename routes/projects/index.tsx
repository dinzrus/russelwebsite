import type { PageProps, Handlers } from "$fresh/server.ts";
import frontmatter from "front-matter";
import Nav from "../../components/Nav.tsx";
import Footer from "../../components/Footer.tsx";
import { listProjects, getProject, getConfig } from "../../utils/db.ts";

interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

interface ProjectsData {
  projects: Project[];
  page: number;
  totalPages: number;
}

export const handler: Handlers<ProjectsData> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const page = Math.max(1, parseInt(url.searchParams.get("page") as string, 10) || 1);
    const config = await getConfig();
    const perPage = config.projectsPerPage;

    const slugs = await listProjects();
    const allProjects: Project[] = [];

    for (const slug of slugs) {
      const content = await getProject(slug);
      if (!content) continue;
      const { attributes } = frontmatter<Record<string, unknown>>(content);
      allProjects.push({
        slug,
        title: attributes.title as string,
        description: attributes.description as string,
        tags: attributes.tags as string[],
        liveUrl: attributes.liveUrl as string | undefined,
        githubUrl: attributes.githubUrl as string | undefined,
        featured: attributes.featured as boolean | undefined,
      });
    }

    allProjects.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));

    const totalPages = Math.max(1, Math.ceil(allProjects.length / perPage));
    const start = (page - 1) * perPage;
    const projects = allProjects.slice(start, start + perPage);

    return ctx.render({ projects, page, totalPages });
  },
};

export default function ProjectsPage({ data }: PageProps<ProjectsData>) {
  const { projects, page, totalPages } = data;

  return (
    <main class="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Nav />
      <div class="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <div class="flex items-center gap-4 mb-12">
          <h1 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-heading">
            Projects
          </h1>
          <div class="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
        </div>

        {projects.length === 0 && (
          <p class="text-slate-500 dark:text-slate-400 text-lg">No projects yet.</p>
        )}

        <div class="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div class="group relative bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500 dark:hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 overflow-hidden"
            >
              <a href={`/projects/${project.slug}`} class="absolute inset-0 z-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900" aria-label={`View ${project.title}`}>
                <span class="sr-only">View project details</span>
              </a>

              <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              {project.featured && (
                <span class="inline-block px-2 py-0.5 text-xs font-medium text-cyan-400 bg-cyan-500/10 rounded-full mb-3">
                  Featured
                </span>
              )}

              <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2 font-heading">
                {project.title}
              </h2>

              <p class="text-slate-500 dark:text-slate-400 mb-4">
                {project.description}
              </p>

              <div class="flex gap-2 flex-wrap mb-4">
                {project.tags?.map((tag) => (
                  <span class="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div class="flex gap-3 relative z-10">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    class="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    class="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 100 100">
                      <path fill-rule="evenodd" d="M49.998 11.963C28.461 11.963 11 29.425 11 50.965c0 17.231 11.172 31.849 26.671 37.003c1.952.361 2.662-.84 2.662-1.877c0-.924-.034-3.375-.051-6.633c-10.849 2.359-13.138-5.229-13.138-5.229c-1.774-4.505-4.331-5.703-4.331-5.703c-3.541-2.418.269-2.371.269-2.371c3.914.277 5.974 4.018 5.974 4.018c3.478 5.96 9.129 4.235 11.35 3.243c.353-2.525 1.363-4.24 2.476-5.217c-8.659-.984-17.763-4.33-17.763-19.274c0-4.259 1.519-7.741 4.013-10.468c-.399-.982-1.74-4.947.383-10.319c0 0 3.274-1.048 10.726 4.001c3.109-.869 6.446-1.303 9.763-1.316c3.312.014 6.65.447 9.763 1.316c7.447-5.049 10.716-4.001 10.716-4.001c2.128 5.372.788 9.337.388 10.319c2.5 2.727 4.008 6.209 4.008 10.468c0 14.979-9.117 18.279-17.805 19.241c1.398 1.205 2.646 3.59 2.646 7.229c0 5.211-.047 9.416-.047 10.695c0 1.045.701 2.26 2.681 1.873C77.836 82.798 89 68.191 89 50.965c0-21.54-17.461-39.002-39.002-39.002" clip-rule="evenodd" />
                    </svg>
                    Code
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div class="flex items-center justify-center gap-2 mt-12">
            {page > 1 && (
              <a href={`/projects?page=${page - 1}`}
                class="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-cyan-500 transition-colors"
              >
                &larr; Previous
              </a>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <a href={`/projects?page=${p}`}
                class={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  p === page
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    : "text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-cyan-500"
                }`}
              >
                {p}
              </a>
            ))}
            {page < totalPages && (
              <a href={`/projects?page=${page + 1}`}
                class="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-cyan-500 transition-colors"
              >
                Next &rarr;
              </a>
            )}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
