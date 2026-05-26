import { Handlers, PageProps } from "$fresh/server.ts";
import DashboardLayout from "../../../components/DashboardLayout.tsx";

const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp", ".ico"];

interface MediaFile {
  name: string;
  path: string;
  size: number;
  mtime: Date | null;
}

interface MediaData {
  files: MediaFile[];
}

export const handler: Handlers<MediaData> = {
  async GET(_req, ctx) {
    const files: MediaFile[] = [];
    try {
      for await (const entry of Deno.readDir("./static/images")) {
        if (entry.isDirectory) continue;
        const ext = entry.name.slice(entry.name.lastIndexOf(".")).toLowerCase();
        if (!IMAGE_EXTS.includes(ext)) continue;
        const stat = await Deno.stat(`./static/images/${entry.name}`);
        files.push({
          name: entry.name,
          path: `/images/${entry.name}`,
          size: stat.size,
          mtime: stat.mtime,
        });
      }
    } catch {
      // dir doesn't exist
    }
    files.sort((a, b) => (b.mtime?.getTime() || 0) - (a.mtime?.getTime() || 0));
    return ctx.render({ files });
  },
};

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function MediaPage({ data }: PageProps<MediaData>) {
  const { files } = data;

  return (
    <DashboardLayout title="Media" activeNav="media">
      <div class="mb-8 p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50 border-dashed">
        <p class="text-sm text-slate-500 dark:text-slate-400 mb-3">
          Upload images to use in your blog posts and projects. Supported: PNG, JPG, GIF, SVG, WebP.
        </p>
        <form method="POST" action="/api/dashboard/upload-image" enctype="multipart/form-data">
          <div class="flex items-center gap-3">
            <input type="file" name="image" accept="image/png,image/jpeg,image/gif,image/svg+xml,image/webp" required
              class="text-sm text-slate-500 dark:text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-cyan-500 file:text-white hover:file:bg-cyan-600 file:cursor-pointer file:transition-colors"
            />
            <button type="submit"
              class="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-full text-sm hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              Upload
            </button>
          </div>
        </form>
      </div>

      {files.length === 0 && (
        <p class="text-slate-500 dark:text-slate-400">No images yet.</p>
      )}

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {files.map((file) => (
          <div class="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50 overflow-hidden group">
            <a href={file.path} target="_blank" class="block aspect-square bg-slate-100 dark:bg-slate-700 overflow-hidden">
              <img src={file.path} alt={file.name} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
            </a>
            <div class="p-3">
              <p class="text-sm text-slate-900 dark:text-white font-medium truncate" title={file.name}>{file.name}</p>
              <p class="text-xs text-slate-400 dark:text-slate-500 mb-2">{formatSize(file.size)}</p>
              <div class="space-y-1.5">
                <input type="text" readonly value={`![${file.name}](${file.path})`}
                  class="w-full px-2 py-1 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 outline-none"
                  onclick="this.select()" />
                <form method="POST" action="/api/dashboard/delete-image" class="inline w-full">
                  <input type="hidden" name="name" value={file.name} />
                  <button type="submit"
                    onclick={`return confirm('Delete ${file.name.replace(/'/g, "\\'")}?')`}
                    class="w-full px-2 py-1 text-xs font-medium text-red-400 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
