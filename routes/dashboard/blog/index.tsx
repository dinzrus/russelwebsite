import { Handlers, PageProps } from "$fresh/server.ts";
import frontmatter from "front-matter";
import DashboardLayout from "../../../components/DashboardLayout.tsx";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
}

interface BlogData {
  posts: BlogPost[];
}

export const handler: Handlers<BlogData> = {
  async GET(_req, ctx) {
    const posts: BlogPost[] = [];
    try {
      for await (const entry of Deno.readDir("./posts")) {
        if (!entry.name.endsWith(".md") || entry.isDirectory) continue;
        const content = await Deno.readTextFile(`./posts/${entry.name}`);
        const { attributes } = frontmatter<Record<string, unknown>>(content);
        posts.push({
          slug: entry.name.replace(".md", ""),
          title: typeof attributes.title === "string" ? attributes.title : entry.name,
          date: typeof attributes.date === "string" ? attributes.date : "",
        });
      }
    } catch {
      // dir doesn't exist
    }
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return ctx.render({ posts });
  },
};

export default function BlogList({ data }: PageProps<BlogData>) {
  const { posts } = data;

  return (
    <DashboardLayout title="Blog Posts" activeNav="blog">
      <div class="flex items-center justify-between mb-8">
        <a href="/dashboard/blog/new"
          class="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-full text-sm hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
        >
          + New Post
        </a>
      </div>

      {posts.length === 0 && (
        <p class="text-slate-500 dark:text-slate-400">No blog posts yet.</p>
      )}

      <div class="space-y-3">
        {posts.map((post) => (
          <div class="bg-white dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700/50 flex items-center justify-between">
            <div>
              <a
                href={`/dashboard/blog/${post.slug}`}
                class="text-slate-900 dark:text-white font-medium hover:text-cyan-400 transition-colors"
              >
                {post.title}
              </a>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">{post.slug} · {post.date || "No date"}</p>
            </div>
            <div class="flex items-center gap-3">
              <a
                href={`/dashboard/blog/${post.slug}`}
                class="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Edit
              </a>
              <form method="POST" action="/api/dashboard/delete-blog">
                <input type="hidden" name="slug" value={post.slug} />
                <button
                  type="submit"
                  class="text-sm text-red-400 hover:text-red-300 transition-colors"
                  onClick={(e) => { if (!confirm("Delete this post?")) e.preventDefault(); }}
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
