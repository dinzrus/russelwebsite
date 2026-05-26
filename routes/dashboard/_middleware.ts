import { FreshContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { sha256, getToken } from "../../utils/crypto.ts";

export async function handler(req: Request, ctx: FreshContext) {
  const url = new URL(req.url);
  if (url.pathname === "/dashboard/login" || url.pathname === "/dashboard/logout") {
    return await ctx.next();
  }

  const cookies = getCookies(req.headers);
  const session = cookies["dashboard_session"];

  if (session) {
    const expected = await sha256(getToken());
    if (session === expected) {
      return await ctx.next();
    }
  }

  return new Response(null, {
    status: 302,
    headers: { Location: "/dashboard/login" },
  });
}
