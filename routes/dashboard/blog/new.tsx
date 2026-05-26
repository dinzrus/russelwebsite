import { Handlers } from "$fresh/server.ts";
import MarkdownEditor from "../../../islands/MarkdownEditor.tsx";
import DashboardLayout from "../../../components/DashboardLayout.tsx";
import { buildFrontmatter } from "../../../utils/frontmatter.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    return ctx.render({
      slug: "",
      title: "",
      date: new Date().toISOString().split("T")[0],
      excerpt: "",
      tags: "",
      seoTitle: "",
      metaDescription: "",
      body: "",
    });
  },
  async POST(req, ctx) {
    const form = await req.formData();
    let slug = (form.get("slug") as string || "").trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const title = form.get("title") as string;
    const date = form.get("date") as string;
    const excerpt = form.get("excerpt") as string;
    const tagsStr = form.get("tags") as string;
    const seoTitle = form.get("seoTitle") as string;
    const metaDescription = form.get("metaDescription") as string;
    const body = form.get("body") as string || "";

    if (!title) {
      return ctx.render({
        slug,
        title,
        date,
        excerpt,
        tags: tagsStr,
        seoTitle,
        metaDescription,
        body,
        error: "Title is required",
      });
    }

    if (!slug) {
      slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    }

    const tags = tagsStr.split(",").map((t) => t.trim()).filter(Boolean);
    const attrs: Record<string, unknown> = { title, date, excerpt, tags };
    if (seoTitle) attrs.seoTitle = seoTitle;
    if (metaDescription) attrs.metaDescription = metaDescription;
    const frontmatter = buildFrontmatter(attrs);
    const content = frontmatter + "\n" + body;

    try {
      await Deno.mkdir("./posts", { recursive: true });
    } catch {
      // already exists
    }
    await Deno.writeTextFile(`./posts/${slug}.md`, content);

    return new Response(null, {
      status: 302,
      headers: { Location: "/dashboard/blog" },
    });
  },
};

interface FormData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string;
  seoTitle: string;
  metaDescription: string;
  body: string;
  error?: string;
}

export default function NewBlogPost({ data }: { data: FormData }) {
  return (
    <DashboardLayout title="New Blog Post" activeNav="blog">
      <form method="POST" class="space-y-6">
        {data.error && (
          <p class="text-red-500 text-sm">{data.error}</p>
        )}

        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={data.title}
              required
              class="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Slug (auto-generated)</label>
            <input
              type="text"
              name="slug"
              value={data.slug}
              placeholder="leave empty to auto-generate"
              class="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={data.date}
              required
              class="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={data.tags}
              placeholder="deno, javascript, tutorial"
              class="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Excerpt</label>
          <input
            type="text"
            name="excerpt"
            value={data.excerpt}
            class="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div class="border-t border-slate-200 dark:border-slate-700 pt-6">
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white mb-4 font-heading">SEO Settings</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">SEO Title (optional)</label>
              <input type="text" name="seoTitle" value={data.seoTitle} placeholder="Leave empty to use post title"
                class="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Meta Description (optional)</label>
              <textarea name="metaDescription" rows="2" placeholder="Brief description for search results"
                class="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">{data.metaDescription}</textarea>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Content (Markdown)</label>
          <MarkdownEditor name="body" value={data.body} />
        </div>

        <div class="flex gap-3">
          <button
            type="submit"
            class="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
          >
            Save Post
          </button>
          <a
            href="/dashboard/blog"
            class="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </DashboardLayout>
  );
}
