import { Handlers, PageProps } from "$fresh/server.ts";
import DashboardLayout from "../../components/DashboardLayout.tsx";
import { getConfig, setConfig } from "../../utils/db.ts";

interface SiteConfig { postsPerPage: number; projectsPerPage: number }

export const handler: Handlers<SiteConfig> = {
  async GET(_req, ctx) {
    const config = await getConfig();
    return ctx.render(config);
  },

  async POST(req, _ctx) {
    const form = await req.formData();
    const postsPerPage = parseInt(form.get("postsPerPage") as string, 10);
    const projectsPerPage = parseInt(form.get("projectsPerPage") as string, 10);

    const config = await getConfig();
    if (!isNaN(postsPerPage) && postsPerPage > 0) config.postsPerPage = postsPerPage;
    if (!isNaN(projectsPerPage) && projectsPerPage > 0) config.projectsPerPage = projectsPerPage;
    await setConfig(config);

    return new Response(null, {
      status: 302,
      headers: { Location: "/dashboard/settings" },
    });
  },
};

export default function Settings({ data }: PageProps<SiteConfig>) {
  return (
    <DashboardLayout title="Site Settings" activeNav="settings">
      <form method="POST" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Posts Per Page
          </label>
          <input type="number" name="postsPerPage" min="1" max="50" required value={data.postsPerPage}
            class="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Projects Per Page
          </label>
          <input type="number" name="projectsPerPage" min="1" max="50" required value={data.projectsPerPage}
            class="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <button type="submit"
          class="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
        >
          Save Settings
        </button>
      </form>
    </DashboardLayout>
  );
}
