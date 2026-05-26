export async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function getToken(): string {
  const password = Deno.env.get("DASHBOARD_PASSWORD") || "admin";
  const secret = Deno.env.get("COOKIE_SECRET") || "dev-secret";
  return password + ":" + secret;
}
