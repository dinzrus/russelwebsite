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
      return new Response(null, { status: 400, headers: { Location: "/dashboard/media" } });
    }

    try {
      await Deno.remove(`./static/images/${name}`);
    } catch {
      // file doesn't exist or read-only filesystem
    }

    return new Response(null, {
      status: 302,
      headers: { Location: "/dashboard/media" },
    });
  },
};
