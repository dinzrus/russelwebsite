import { Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { sha256, getToken } from "../../../utils/crypto.ts";
import { deleteBlogPost } from "../../../utils/db.ts";

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
      return new Response(null, { status: 400, headers: { Location: "/dashboard/blog" } });
    }

    await deleteBlogPost(slug);

    return new Response(null, {
      status: 302,
      headers: { Location: "/dashboard/blog" },
    });
  },
};
