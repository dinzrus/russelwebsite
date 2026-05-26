import { Handlers, PageProps } from "$fresh/server.ts";
import DashboardLayout from "../../../components/DashboardLayout.tsx";
import { getSkills } from "../../../utils/db.ts";

interface Skill {
  name: string;
  percent: number;
}

interface SkillsData {
  skills: Skill[];
}

export const handler: Handlers<SkillsData> = {
  async GET(_req, ctx) {
    const skills = await getSkills<Skill>();
    return ctx.render({ skills });
  },
};

export default function SkillsList({ data }: PageProps<SkillsData>) {
  const { skills } = data;

  return (
    <DashboardLayout title="Skills" activeNav="skills">
      <div class="flex items-center justify-between mb-8">
        <a
          href="/dashboard/skills/new"
          class="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-full text-sm hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
        >
          + New Skill
        </a>
      </div>

      {skills.length === 0 && (
        <p class="text-slate-500 dark:text-slate-400">No skills yet.</p>
      )}

      <div class="space-y-3">
        {skills.map((skill, i) => (
          <div class="bg-white dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700/50 flex items-center justify-between">
            <div class="flex items-center gap-4">
              <span class="text-slate-400 dark:text-slate-500 text-sm w-6">{i + 1}.</span>
              <div>
                <span class="text-slate-900 dark:text-white font-medium">{skill.name}</span>
                <div class="flex items-center gap-2 mt-1">
                  <div class="w-32 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={`width: ${skill.percent}%`}></div>
                  </div>
                  <span class="text-sm text-cyan-400 font-medium">{skill.percent}%</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <a href={`/dashboard/skills/${encodeURIComponent(skill.name)}`} class="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">Edit</a>
              <form method="POST" action="/api/dashboard/delete-skill">
                <input type="hidden" name="name" value={skill.name} />
                <button type="submit" class="text-sm text-red-400 hover:text-red-300 transition-colors"
                  onclick={`return confirm('Delete ${skill.name.replace(/'/g, "\\'")}?')`}
                >Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
