import { Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { sha256, getToken } from "../../../utils/crypto.ts";

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

    try {
      const raw = await Deno.readTextFile("./data/skills.json");
      const skills = JSON.parse(raw);
      const filtered = skills.filter((s: { name: string }) => s.name !== name);
      await Deno.writeTextFile("./data/skills.json", JSON.stringify(filtered, null, 2));
    } catch {
      // file doesn't exist
    }

    return new Response(null, {
      status: 302,
      headers: { Location: "/dashboard/skills" },
    });
  },
};
