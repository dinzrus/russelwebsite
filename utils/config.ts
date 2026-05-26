export interface SiteConfig {
  postsPerPage: number;
  projectsPerPage: number;
}

export async function loadConfig(): Promise<SiteConfig> {
  try {
    const raw = await Deno.readTextFile("./data/config.json");
    return JSON.parse(raw);
  } catch {
    return { postsPerPage: 5, projectsPerPage: 6 };
  }
}

export async function saveConfig(config: SiteConfig): Promise<void> {
  await Deno.writeTextFile("./data/config.json", JSON.stringify(config, null, 2));
}
