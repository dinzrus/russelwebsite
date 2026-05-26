let _kv: Deno.Kv | null | false = false;

async function getKv(): Promise<Deno.Kv | null> {
  if (_kv === false) {
    try {
      _kv = await Deno.openKv();
    } catch {
      _kv = null;
    }
  }
  return _kv;
}

function kvAvailable(kv: Deno.Kv | null): kv is Deno.Kv {
  return kv !== null;
}

// ---- Blog ----

export async function getBlogPost(slug: string): Promise<string | null> {
  const kv = await getKv();
  if (kvAvailable(kv)) {
    const result = await kv.get<string>(["blog", slug]);
    if (result.value) return result.value;
  }
  try {
    return await Deno.readTextFile(`./posts/${slug}.md`);
  } catch {
    return null;
  }
}

export async function setBlogPost(slug: string, content: string): Promise<void> {
  const kv = await getKv();
  if (kvAvailable(kv)) {
    await kv.set(["blog", slug], content);
  }
  try {
    await Deno.mkdir("./posts", { recursive: true });
    await Deno.writeTextFile(`./posts/${slug}.md`, content);
  } catch {
    // read-only filesystem (Deno Deploy)
  }
}

export async function deleteBlogPost(slug: string): Promise<void> {
  const kv = await getKv();
  if (kvAvailable(kv)) {
    await kv.delete(["blog", slug]);
  }
  try {
    await Deno.remove(`./posts/${slug}.md`);
  } catch {
    // file doesn't exist or read-only filesystem
  }
}

export async function listBlogPosts(): Promise<string[]> {
  const kv = await getKv();
  if (kvAvailable(kv)) {
    const entries = await Array.fromAsync(kv.list<string>({ prefix: ["blog"] }));
    if (entries.length > 0) return entries.map((e) => e.key[1] as string);
  }
  try {
    const slugs: string[] = [];
    for await (const entry of Deno.readDir("./posts")) {
      if (entry.name.endsWith(".md") && !entry.isDirectory) {
        slugs.push(entry.name.replace(".md", ""));
      }
    }
    return slugs;
  } catch {
    return [];
  }
}

// ---- Projects ----

export async function getProject(slug: string): Promise<string | null> {
  const kv = await getKv();
  if (kvAvailable(kv)) {
    const result = await kv.get<string>(["project", slug]);
    if (result.value) return result.value;
  }
  try {
    return await Deno.readTextFile(`./projects/${slug}.md`);
  } catch {
    return null;
  }
}

export async function setProject(slug: string, content: string): Promise<void> {
  const kv = await getKv();
  if (kvAvailable(kv)) {
    await kv.set(["project", slug], content);
  }
  try {
    await Deno.mkdir("./projects", { recursive: true });
    await Deno.writeTextFile(`./projects/${slug}.md`, content);
  } catch {
    // read-only filesystem (Deno Deploy)
  }
}

export async function deleteProject(slug: string): Promise<void> {
  const kv = await getKv();
  if (kvAvailable(kv)) {
    await kv.delete(["project", slug]);
  }
  try {
    await Deno.remove(`./projects/${slug}.md`);
  } catch {
    // file doesn't exist or read-only filesystem
  }
}

export async function listProjects(): Promise<string[]> {
  const kv = await getKv();
  if (kvAvailable(kv)) {
    const entries = await Array.fromAsync(kv.list<string>({ prefix: ["project"] }));
    if (entries.length > 0) return entries.map((e) => e.key[1] as string);
  }
  try {
    const slugs: string[] = [];
    for await (const entry of Deno.readDir("./projects")) {
      if (entry.name.endsWith(".md") && !entry.isDirectory) {
        slugs.push(entry.name.replace(".md", ""));
      }
    }
    return slugs;
  } catch {
    return [];
  }
}

// ---- Skills ----

export async function getSkills<T = unknown>(): Promise<T[]> {
  const kv = await getKv();
  if (kvAvailable(kv)) {
    const result = await kv.get<string>(["skills"]);
    if (result.value) return JSON.parse(result.value);
  }
  try {
    return JSON.parse(await Deno.readTextFile("./data/skills.json"));
  } catch {
    return [];
  }
}

export async function setSkills(skills: unknown[]): Promise<void> {
  const kv = await getKv();
  const raw = JSON.stringify(skills, null, 2);
  if (kvAvailable(kv)) {
    await kv.set(["skills"], raw);
  }
  try {
    await Deno.writeTextFile("./data/skills.json", raw);
  } catch {
    // read-only filesystem
  }
}

// ---- Config ----

export async function getConfig(): Promise<{ postsPerPage: number; projectsPerPage: number }> {
  const kv = await getKv();
  if (kvAvailable(kv)) {
    const result = await kv.get<string>(["config"]);
    if (result.value) return JSON.parse(result.value);
  }
  try {
    return JSON.parse(await Deno.readTextFile("./data/config.json"));
  } catch {
    return { postsPerPage: 5, projectsPerPage: 6 };
  }
}

export async function setConfig(config: { postsPerPage: number; projectsPerPage: number }): Promise<void> {
  const kv = await getKv();
  const raw = JSON.stringify(config, null, 2);
  if (kvAvailable(kv)) {
    await kv.set(["config"], raw);
  }
  try {
    await Deno.writeTextFile("./data/config.json", raw);
  } catch {
    // read-only filesystem
  }
}
