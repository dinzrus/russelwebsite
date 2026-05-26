import { Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { sha256, getToken } from "../../../utils/crypto.ts";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/gif", "image/svg+xml", "image/webp"];

export const handler: Handlers = {
  async POST(req) {
    const cookies = getCookies(req.headers);
    const session = cookies["dashboard_session"];
    if (!session || session !== await sha256(getToken())) {
      return new Response(null, { status: 401 });
    }

    const form = await req.formData();
    const file = form.get("image") as File | null;

    if (!file || !ALLOWED_TYPES.includes(file.type)) {
      return new Response(null, {
        status: 302,
        headers: { Location: "/dashboard/media" },
      });
    }

    const name = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").toLowerCase();
    const bytes = await file.arrayBuffer();

    try {
      await Deno.mkdir("./static/images", { recursive: true });
    } catch {
      // already exists
    }

    try {
      await Deno.writeFile(`./static/images/${name}`, new Uint8Array(bytes));
    } catch {
      // filesystem may be read-only (Deno Deploy)
    }

    return new Response(null, {
      status: 302,
      headers: { Location: "/dashboard/media" },
    });
  },
};
