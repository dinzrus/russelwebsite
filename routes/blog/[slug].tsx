import type { PageProps, Handlers } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import frontmatter from "front-matter";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import Nav from "../../components/Nav.tsx";
import Footer from "../../components/Footer.tsx";

marked.use(markedHighlight({
  langPrefix: "hljs language-",
  highlight(code: string, lang: string) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
}));

interface PostData {
  title: string;
  date: string;
  tags: string[];
  html: string;
  readingTime: number;
  seoTitle?: string;
  metaDescription?: string;
  notFound?: boolean;
}

export const handler: Handlers<PostData> = {
  async GET(_req, ctx) {
    const slug = ctx.params.slug;

    try {
      const fileContent = await Deno.readTextFile(`./posts/${slug}.md`);
      const { attributes, body } = frontmatter<{
        title: string;
        date: string;
        tags: string[];
        seoTitle: string;
        metaDescription: string;
      }>(fileContent);
      const html = await marked.parse(body);
      const wordCount = body.split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / 200);

      return ctx.render({
        title: attributes.title,
        date: attributes.date,
        tags: attributes.tags,
        html,
        readingTime,
        seoTitle: attributes.seoTitle,
        metaDescription: attributes.metaDescription,
      });
    } catch {
      return ctx.render({
        title: "",
        date: "",
        tags: [],
        html: "",
        readingTime: 0,
        notFound: true,
      });
    }
  },
};

export default function BlogPost({ data }: PageProps<PostData>) {
  if (data.notFound) {
    return (
      <main class="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <Nav />
        <div class="min-h-[60vh] flex items-center justify-center px-6">
          <div class="text-center">
            <h1 class="text-4xl font-bold text-slate-900 dark:text-white font-heading mb-4">Post Not Found</h1>
            <p class="text-slate-500 dark:text-slate-400 mb-8">The blog post you're looking for doesn't exist.</p>
            <a
              href="/blog"
              class="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </a>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main class="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Head>
        <title>{data.seoTitle || data.title} | Russel Dinoy</title>
        {data.metaDescription && <meta name="description" content={data.metaDescription} />}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/github-dark.min.css" />
      </Head>
      <Nav />
      <article class="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <a
          href="/blog"
          class="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors mb-8"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </a>

        <div class="flex items-center gap-4 mb-2 text-sm text-slate-500 dark:text-slate-400">
          <time>
            {new Date(data.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>·</span>
          <span>{data.readingTime} min read</span>
        </div>

        <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-heading">
          {data.title}
        </h1>

        {data.tags && (
          <div class="flex gap-2 flex-wrap mb-8">
            {data.tags.map((tag) => (
              <span class="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div class="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-slate-700/50 shadow-xl">
          <div
            class="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-heading prose-headings:text-slate-900 dark:prose-headings:text-white
              prose-a:text-cyan-500 prose-a:no-underline hover:prose-a:underline
              prose-code:before:content-none prose-code:after:content-none
              prose-code:bg-slate-100 dark:prose-code:bg-slate-700 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-700
              prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: data.html }}
          />
        </div>
      </article>
      <Footer />
    </main>
  );
}
