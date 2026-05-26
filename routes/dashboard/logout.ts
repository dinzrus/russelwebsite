import { Handlers } from "$fresh/server.ts";
import { deleteCookie } from "$std/http/cookie.ts";

export const handler: Handlers = {
  GET(_req) {
    const headers = new Headers();
    deleteCookie(headers, "dashboard_session", { path: "/" });
    headers.set("Location", "/dashboard/login");
    return new Response(null, { status: 302, headers });
  },
};
