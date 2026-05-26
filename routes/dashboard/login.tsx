import { Handlers, PageProps } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";
import { sha256, getToken } from "../../utils/crypto.ts";

interface LoginData {
  error?: string;
}

export const handler: Handlers<LoginData> = {
  async GET(_req, ctx) {
    return ctx.render({});
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const password = form.get("password") as string;
    const expected = Deno.env.get("DASHBOARD_PASSWORD") || "admin";

    if (password === expected) {
      const token = await sha256(getToken());
      const headers = new Headers();
      setCookie(headers, {
        name: "dashboard_session",
        value: token,
        path: "/",
        httpOnly: true,
        sameSite: "Lax",
        maxAge: 60 * 60 * 24 * 7,
      });
      headers.set("Location", "/dashboard");
      return new Response(null, { status: 302, headers });
    }

    return ctx.render({ error: "Invalid password" });
  },
};

export default function Login({ data }: PageProps<LoginData>) {
  return (
    <main class="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-6 transition-colors duration-300">
      <div class="w-full max-w-sm">
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2 text-center font-heading">Dashboard</h1>
        <p class="text-slate-500 dark:text-slate-400 text-center mb-8">Enter your password to continue</p>
        <form method="POST" class="space-y-4">
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              autofocus
              class="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          {data.error && (
            <p class="text-red-500 text-sm">{data.error}</p>
          )}
          <button
            type="submit"
            class="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
