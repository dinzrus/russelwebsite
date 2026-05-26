import type { PageProps } from "$fresh/server.ts";
import frontmatter from "front-matter";
import Nav from "../../components/Nav.tsx";
import Footer from "../../components/Footer.tsx";
import { loadConfig } from "../../utils/config.ts";

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

interface BlogData {
  posts: Post[];
  page: number;
  totalPages: number;
  perPage: number;
}

export const handler = {
  async GET(req: Request, ctx: { render: (data: BlogData) => Response }) {
    const url = new URL(req.url);
    const page = Math.max(1, parseInt(url.searchParams.get("page") as string, 10) || 1);
    const config = await loadConfig();
    const perPage = config.postsPerPage;

    const allPosts: Post[] = [];

    for await (const entry of Deno.readDir("./posts")) {
      if (!entry.name.endsWith(".md") || entry.isDirectory) continue;
      const content = await Deno.readTextFile(`./posts/${entry.name}`);
      const { attributes } = frontmatter<Record<string, unknown>>(content);
      allPosts.push({
        slug: entry.name.replace(".md", ""),
        title: attributes.title as string,
        date: attributes.date as string,
        excerpt: attributes.excerpt as string,
        tags: attributes.tags as string[],
      });
    }

    allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const totalPages = Math.max(1, Math.ceil(allPosts.length / perPage));
    const start = (page - 1) * perPage;
    const posts = allPosts.slice(start, start + perPage);

    return ctx.render({ posts, page, totalPages, perPage });
  },
};

export default function BlogIndex({ data }: PageProps<BlogData>) {
  const { posts, page, totalPages } = data;

  return (
    <main class="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Nav />
      <div class="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <div class="flex items-center gap-4 mb-12">
          <h1 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-heading">
            Blog
          </h1>
          <div class="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
        </div>

        {posts.length === 0 && (
          <p class="text-slate-500 dark:text-slate-400 text-lg">No posts yet.</p>
        )}

        <div class="grid gap-6">
          {posts.map((post) => (
            <a
              href={`/blog/${post.slug}`}
              class="group relative bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500 dark:hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            >
              <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="flex items-center gap-3 mb-2">
                <time class="text-sm text-cyan-400 font-medium">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2 font-heading">
                {post.title}
              </h2>
              <p class="text-slate-500 dark:text-slate-400 mb-4">
                {post.excerpt}
              </p>
              <div class="flex gap-2 flex-wrap">
                {post.tags?.map((tag) => (
                  <span class="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        {totalPages > 1 && (
          <div class="flex items-center justify-center gap-2 mt-12">
            {page > 1 && (
              <a href={`/blog?page=${page - 1}`}
                class="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-cyan-500 transition-colors"
              >
                &larr; Previous
              </a>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <a href={`/blog?page=${p}`}
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
              <a href={`/blog?page=${page + 1}`}
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
