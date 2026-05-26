import { Handlers, PageProps } from "$fresh/server.ts";
import frontmatter from "front-matter";
import MarkdownEditor from "../../../islands/MarkdownEditor.tsx";
import DashboardLayout from "../../../components/DashboardLayout.tsx";
import { buildFrontmatter } from "../../../utils/frontmatter.ts";

interface EditData {
  slug: string;
  origSlug: string;
  title: string;
  description: string;
  tags: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  seoTitle: string;
  metaDescription: string;
  body: string;
  error?: string;
  notFound?: boolean;
}

export const handler: Handlers<EditData> = {
  async GET(_req, ctx) {
    const slug = ctx.params.slug;

    try {
      const fileContent = await Deno.readTextFile(`./projects/${slug}.md`);
      const { attributes, body } = frontmatter<{
        title: string;
        description: string;
        tags: string[];
        liveUrl: string;
        githubUrl: string;
        featured: boolean;
        seoTitle: string;
        metaDescription: string;
      }>(fileContent);

      return ctx.render({
        slug,
        origSlug: slug,
        title: attributes.title || "",
        description: attributes.description || "",
        tags: (attributes.tags || []).join(", "),
        liveUrl: attributes.liveUrl || "",
        githubUrl: attributes.githubUrl || "",
        featured: !!attributes.featured,
        seoTitle: attributes.seoTitle || "",
        metaDescription: attributes.metaDescription || "",
        body,
      });
    } catch {
      return ctx.render({
        slug: "", origSlug: "", title: "", description: "", tags: "",
        liveUrl: "", githubUrl: "", featured: false, seoTitle: "", metaDescription: "", body: "",
        notFound: true,
      });
    }
  },
  async POST(req, ctx) {
    const slug = ctx.params.slug;
    const form = await req.formData();
    let newSlug = (form.get("slug") as string || "").trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const title = form.get("title") as string;
    const description = form.get("description") as string;
    const tagsStr = form.get("tags") as string;
    const liveUrl = form.get("liveUrl") as string;
    const githubUrl = form.get("githubUrl") as string;
    const featured = form.get("featured") === "on";
    const seoTitle = form.get("seoTitle") as string;
    const metaDescription = form.get("metaDescription") as string;
    const body = form.get("body") as string || "";

    if (!newSlug) newSlug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    if (!title) {
      return ctx.render({
        slug: newSlug, origSlug: slug, title, description, tags: tagsStr,
        liveUrl, githubUrl, featured, seoTitle, metaDescription, body,
        error: "Title is required",
      });
    }

    const tags = tagsStr.split(",").map((t) => t.trim()).filter(Boolean);
    const attrs: Record<string, unknown> = { title, description, tags };
    if (liveUrl) attrs.liveUrl = liveUrl;
    if (githubUrl) attrs.githubUrl = githubUrl;
    attrs.featured = featured;
    if (seoTitle) attrs.seoTitle = seoTitle;
    if (metaDescription) attrs.metaDescription = metaDescription;

    const fm = buildFrontmatter(attrs);
    await Deno.writeTextFile(`./projects/${newSlug}.md`, fm + "\n" + body);

    if (newSlug !== slug) {
      try { await Deno.remove(`./projects/${slug}.md`); } catch { /* ignore */ }
    }

    return new Response(null, {
      status: 302,
      headers: { Location: "/dashboard/projects" },
    });
  },
};

export default function EditProject({ data }: PageProps<EditData>) {
  if (data.notFound) {
    return (
      <DashboardLayout title="Edit Project" activeNav="projects">
        <p class="text-slate-500 dark:text-slate-400">Project not found.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Edit Project" activeNav="projects">
      <form method="POST" class="space-y-6">
        {data.error && <p class="text-red-500 text-sm">{data.error}</p>}

        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
            <input type="text" name="title" value={data.title} required
              class="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Slug</label>
            <input type="text" name="slug" value={data.slug}
              class="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
          <input type="text" name="description" value={data.description}
            class="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Live URL</label>
            <input type="text" name="liveUrl" value={data.liveUrl}
              class="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">GitHub URL</label>
            <input type="text" name="githubUrl" value={data.githubUrl}
              class="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tags (comma-separated)</label>
            <input type="text" name="tags" value={data.tags}
              class="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          </div>
          <div class="flex items-end pb-2.5">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="featured" checked={data.featured}
                class="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-cyan-500 focus:ring-cyan-500" />
              <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Featured project</span>
            </label>
          </div>
        </div>

        <div class="border-t border-slate-200 dark:border-slate-700 pt-6">
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white mb-4 font-heading">SEO Settings</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">SEO Title (optional)</label>
              <input type="text" name="seoTitle" value={data.seoTitle} placeholder="Leave empty to use project title"
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
          <button type="submit"
            class="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
            Save Changes
          </button>
          <a href="/dashboard/projects"
            class="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            Cancel
          </a>
        </div>
      </form>
    </DashboardLayout>
  );
}
