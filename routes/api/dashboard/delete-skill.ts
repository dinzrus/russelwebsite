import { Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { sha256, getToken } from "../../../utils/crypto.ts";
import { getSkills, setSkills } from "../../../utils/db.ts";

interface Skill { name: string; percent: number }

export const handler: Handlers = {
  async POST(req) {
    const cookies = getCookies(req.headers);
    const session = cookies["dashboard_session"];
    if (!session || session !== await sha256(getToken())) {
      return new Response(null, { status: 401 });
    }

    const form = await req.formData();
    const name = form.get("name") as string;

    if (!name) {
      return new Response(null, { status: 400, headers: { Location: "/dashboard/skills" } });
    }

    const skills = await getSkills<Skill>();
    const filtered = skills.filter((s) => s.name !== name);
    await setSkills(filtered);

    return new Response(null, {
      status: 302,
      headers: { Location: "/dashboard/skills" },
    });
  },
};
