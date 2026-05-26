import { Handlers, PageProps } from "$fresh/server.ts";
import DashboardLayout from "../../../components/DashboardLayout.tsx";

interface Skill {
  name: string;
  percent: number;
}

interface SkillData {
  skill: Skill;
}

async function loadSkills(): Promise<Skill[]> {
  try {
    const raw = await Deno.readTextFile("./data/skills.json");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function saveSkills(skills: Skill[]): Promise<void> {
  await Deno.writeTextFile("./data/skills.json", JSON.stringify(skills, null, 2));
}

export const handler: Handlers<SkillData> = {
  async GET(_req, ctx) {
    const name = decodeURIComponent(ctx.params.name);
    const skills = await loadSkills();
    const skill = skills.find((s) => s.name === name);

    if (!skill) return new Response("Skill not found", { status: 404 });

    return ctx.render({ skill });
  },

  async POST(req, ctx) {
    const originalName = decodeURIComponent(ctx.params.name);
    const form = await req.formData();
    const newName = (form.get("name") as string)?.trim();
    const percent = parseInt(form.get("percent") as string, 10);

    if (!newName || isNaN(percent) || percent < 0 || percent > 100) {
      return new Response("Invalid input", { status: 400 });
    }

    const skills = await loadSkills();
    const idx = skills.findIndex((s) => s.name === originalName);
    if (idx === -1) return new Response("Skill not found", { status: 404 });

    if (newName.toLowerCase() !== originalName.toLowerCase() &&
        skills.some((s) => s.name.toLowerCase() === newName.toLowerCase())) {
      return new Response("Skill name already exists", { status: 409 });
    }

    skills[idx] = { name: newName, percent };
    await saveSkills(skills);

    return new Response(null, {
      status: 302,
      headers: { Location: "/dashboard/skills" },
    });
  },
};

export default function EditSkill({ data }: PageProps<SkillData>) {
  const { skill } = data;

  return (
    <DashboardLayout title="Edit Skill" activeNav="skills">
      <form method="POST" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Skill Name</label>
          <input type="text" name="name" required value={skill.name}
            class="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Expertise (%)</label>
          <input type="number" name="percent" min="0" max="100" required value={skill.percent}
            class="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <button type="submit"
          class="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
        >
          Save Changes
        </button>
      </form>
    </DashboardLayout>
  );
}
