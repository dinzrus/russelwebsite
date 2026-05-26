export function buildFrontmatter(attrs: Record<string, unknown>): string {
  const lines = ["---"];
  for (const [key, value] of Object.entries(attrs)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      lines.push(`${key}: [${value.map(v => `"${v}"`).join(", ")}]`);
    } else if (typeof value === "boolean") {
      lines.push(`${key}: ${value}`);
    } else if (typeof value === "number") {
      lines.push(`${key}: ${value}`);
    } else if (typeof value === "string") {
      const escaped = value.includes('"') ? value.replace(/"/g, '\\"') : value;
      lines.push(`${key}: "${escaped}"`);
    }
  }
  lines.push("---");
  return lines.join("\n");
}
