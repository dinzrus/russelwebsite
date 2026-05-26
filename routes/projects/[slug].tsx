import type { PageProps, Handlers } from "$fresh/server.ts";
import frontmatter from "front-matter";
import { marked } from "marked";
import Nav from "../../components/Nav.tsx";
import Footer from "../../components/Footer.tsx";

interface ProjectData {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  html: string;
  notFound?: boolean;
}

export const handler: Handlers<ProjectData> = {
  async GET(_req, ctx) {
    const slug = ctx.params.slug;

    try {
      const fileContent = await Deno.readTextFile(`./projects/${slug}.md`);
      const { attributes, body } = frontmatter<{
        title: string;
        description: string;
        tags: string[];
        liveUrl?: string;
        githubUrl?: string;
      }>(fileContent);
      const html = await marked.parse(body);

      return ctx.render({
        title: attributes.title,
        description: attributes.description,
        tags: attributes.tags,
        liveUrl: attributes.liveUrl,
        githubUrl: attributes.githubUrl,
        html,
      });
    } catch {
      return ctx.render({
        title: "",
        description: "",
        tags: [],
        html: "",
        notFound: true,
      });
    }
  },
};

export default function ProjectPage({ data }: PageProps<ProjectData>) {
  if (data.notFound) {
    return (
      <main class="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <Nav />
        <div class="min-h-[60vh] flex items-center justify-center px-6">
          <div class="text-center">
            <h1 class="text-4xl font-bold text-slate-900 dark:text-white font-heading mb-4">Project Not Found</h1>
            <p class="text-slate-500 dark:text-slate-400 mb-8">The project you're looking for doesn't exist.</p>
            <a
              href="/projects"
              class="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </a>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main class="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Nav />
      <article class="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <a
          href="/projects"
          class="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors mb-8"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </a>

        <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-heading">
          {data.title}
        </h1>

        <p class="text-lg text-slate-500 dark:text-slate-400 mb-4">
          {data.description}
        </p>

        {data.tags && (
          <div class="flex gap-2 flex-wrap mb-6">
            {data.tags.map((tag) => (
              <span class="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div class="flex gap-3 mb-8">
          {data.liveUrl && (
            <a
              href={data.liveUrl}
              target="_blank"
              class="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
          {data.githubUrl && (
            <a
              href={data.githubUrl}
              target="_blank"
              class="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 100 100">
                <path fill-rule="evenodd" d="M49.998 11.963C28.461 11.963 11 29.425 11 50.965c0 17.231 11.172 31.849 26.671 37.003c1.952.361 2.662-.84 2.662-1.877c0-.924-.034-3.375-.051-6.633c-10.849 2.359-13.138-5.229-13.138-5.229c-1.774-4.505-4.331-5.703-4.331-5.703c-3.541-2.418.269-2.371.269-2.371c3.914.277 5.974 4.018 5.974 4.018c3.478 5.96 9.129 4.235 11.35 3.243c.353-2.525 1.363-4.24 2.476-5.217c-8.659-.984-17.763-4.33-17.763-19.274c0-4.259 1.519-7.741 4.013-10.468c-.399-.982-1.74-4.947.383-10.319c0 0 3.274-1.048 10.726 4.001c3.109-.869 6.446-1.303 9.763-1.316c3.312.014 6.65.447 9.763 1.316c7.447-5.049 10.716-4.001 10.716-4.001c2.128 5.372.788 9.337.388 10.319c2.5 2.727 4.008 6.209 4.008 10.468c0 14.979-9.117 18.279-17.805 19.241c1.398 1.205 2.646 3.59 2.646 7.229c0 5.211-.047 9.416-.047 10.695c0 1.045.701 2.26 2.681 1.873C77.836 82.798 89 68.191 89 50.965c0-21.54-17.461-39.002-39.002-39.002" clip-rule="evenodd" />
              </svg>
              Source Code
            </a>
          )}
        </div>

        <div class="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-slate-700/50 shadow-xl">
          <div
            class="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-heading prose-headings:text-slate-900 dark:prose-headings:text-white
              prose-a:text-cyan-500 prose-a:no-underline hover:prose-a:underline
              prose-code:before:content-none prose-code:after:content-none
              prose-code:bg-slate-100 dark:prose-code:bg-slate-700 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-700
              prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: data.html }}
          />
        </div>
      </article>
      <Footer />
    </main>
  );
}
