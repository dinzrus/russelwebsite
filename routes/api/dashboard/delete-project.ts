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
    const slug = form.get("slug") as string;

    if (!slug) {
      return new Response(null, { status: 400, headers: { Location: "/dashboard/projects" } });
    }

    try {
      await Deno.remove(`./projects/${slug}.md`);
    } catch {
      // file doesn't exist
    }

    return new Response(null, {
      status: 302,
      headers: { Location: "/dashboard/projects" },
    });
  },
};
