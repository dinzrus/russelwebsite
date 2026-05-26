import Nav from "../components/Nav.tsx";
import Footer from "../components/Footer.tsx";
import frontmatter from "front-matter";
import { listBlogPosts, getBlogPost, listProjects, getProject, getSkills } from "../utils/db.ts";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const SKILL_COLORS = [
  "from-orange-500 to-red-500",
  "from-blue-500 to-cyan-500",
  "from-yellow-400 to-orange-500",
  "from-red-500 to-pink-500",
  "from-blue-600 to-blue-400",
  "from-cyan-400 to-teal-500",
  "from-slate-400 to-slate-500",
  "from-purple-500 to-pink-500",
  "from-green-500 to-teal-500",
  "from-rose-500 to-red-500",
];

export default async function Home() {
  const posts: BlogPost[] = [];
  const blogSlugs = await listBlogPosts();
  for (const slug of blogSlugs) {
    const content = await getBlogPost(slug);
    if (!content) continue;
    const { attributes } = frontmatter<Record<string, unknown>>(content);
    posts.push({
      slug,
      title: attributes.title as string,
      date: attributes.date as string,
      excerpt: attributes.excerpt as string,
      tags: attributes.tags as string[],
    });
  }
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const projects: ProjectItem[] = [];
  const projectSlugs = await listProjects();
  for (const slug of projectSlugs) {
    const content = await getProject(slug);
    if (!content) continue;
    const { attributes } = frontmatter<Record<string, unknown>>(content);
    if (attributes.featured) {
      projects.push({
        slug,
        title: attributes.title as string,
        description: attributes.description as string,
        tags: attributes.tags as string[],
        liveUrl: attributes.liveUrl as string | undefined,
        githubUrl: attributes.githubUrl as string | undefined,
      });
    }
  }

  const skills: { name: string; percent: number }[] = await getSkills();

  const recentPosts = posts.slice(0, 2);
  const recentProjects = projects.slice(0, 2);

  return (
    <main class="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Nav />

      <section class="min-h-screen flex items-center justify-center px-6 pt-20">
        <div class="text-center">
          <div class="relative inline-block mb-8">
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-2xl opacity-30 dark:opacity-30 animate-pulse"></div>
            <img
              class="relative rounded-full border-4 border-cyan-500/50 shadow-2xl shadow-cyan-500/20"
              src="/russeldinoy-profile.webp"
              width="180"
              height="180"
              alt="Russel Dinoy Profile Photo"
            />
          </div>
          <h1 class="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-4">
            Hi, I'm <span class="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Russel</span>
          </h1>
          <h2 class="text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-8">
            Full Stack Developer
          </h2>
          <div class="flex justify-center gap-4">
            <a href="https://github.com/dinzrus" target="_blank" class="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/10 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900" aria-label="GitHub Profile">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 100 100"><path fill="currentColor" fill-rule="evenodd" d="M49.998 11.963C28.461 11.963 11 29.425 11 50.965c0 17.231 11.172 31.849 26.671 37.003c1.952.361 2.662-.84 2.662-1.877c0-.924-.034-3.375-.051-6.633c-10.849 2.359-13.138-5.229-13.138-5.229c-1.774-4.505-4.331-5.703-4.331-5.703c-3.541-2.418.269-2.371.269-2.371c3.914.277 5.974 4.018 5.974 4.018c3.478 5.96 9.129 4.235 11.35 3.243c.353-2.525 1.363-4.24 2.476-5.217c-8.659-.984-17.763-4.33-17.763-19.274c0-4.259 1.519-7.741 4.013-10.468c-.399-.982-1.74-4.947.383-10.319c0 0 3.274-1.048 10.726 4.001c3.109-.869 6.446-1.303 9.763-1.316c3.312.014 6.65.447 9.763 1.316c7.447-5.049 10.716-4.001 10.716-4.001c2.128 5.372.788 9.337.388 10.319c2.5 2.727 4.008 6.209 4.008 10.468c0 14.979-9.117 18.279-17.805 19.241c1.398 1.205 2.646 3.59 2.646 7.229c0 5.211-.047 9.416-.047 10.695c0 1.045.701 2.26 2.681 1.873C77.836 82.798 89 68.191 89 50.965c0-21.54-17.461-39.002-39.002-39.002" clip-rule="evenodd"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/russeldinoy/" target="_blank" class="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/10 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900" aria-label="LinkedIn Profile">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 512 512"><path fill="currentColor" d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32m-273.3 373.43h-64.18V205.88h64.18ZM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43c0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43m264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44c-17.74 0-28.24 12-32.91 23.69c-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44c42.13 0 74 27.77 74 87.64Z"/></svg>
            </a>
          </div>
          <div class="mt-12 animate-bounce [animation-iteration-count:3]">
            <svg class="w-6 h-6 mx-auto text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
          </div>
        </div>
      </section>

      <section id="about" class="py-24 px-6" data-animate>
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center gap-4 mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-heading">About Me</h2>
            <div class="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
          </div>
          <div class="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-slate-700/50 shadow-xl transition-colors duration-300">
            <p class="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Hi, I'm Russel, a passionate Full-stack developer dedicated to crafting intuitive and engaging user experiences. My journey into web development started with a fascination for how design and code come together to create something beautiful and functional.
            </p>
            <p class="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              I specialize in React.js, JavaScript, HTML, CSS, and PHP with Laravel. I'm always eager to learn new technologies that enhance the user experience. What truly excites me is the collaborative process—working with designers and back-end developers to solve challenges and build seamless digital products.
            </p>
            <p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              When I'm not coding, you can find me gaming or exploring new technologies. I'm currently seeking opportunities to join a forward-thinking team where I can contribute to impactful projects and continue to grow as a developer.
            </p>
          </div>
        </div>
      </section>

      <section id="skills" class="py-24 px-6 bg-slate-100 dark:bg-slate-900/50 transition-colors duration-300" data-animate-skills>
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center gap-4 mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-heading">Skills & Technologies</h2>
            <div class="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
          </div>
          <div class="grid gap-6">
            {skills.map((skill, i) => (
              <div class="group">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-slate-600 dark:text-slate-300 font-medium">{skill.name}</span>
                  <span class="text-cyan-400 font-bold">{skill.percent}%</span>
                </div>
                <div class="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    class={`skill-bar-fill h-full bg-gradient-to-r ${SKILL_COLORS[i % SKILL_COLORS.length]} rounded-full transition-all duration-1000 group-hover:shadow-lg group-hover:shadow-cyan-500/30`}
                    style={`--skill-percent: ${skill.percent}%;`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" class="py-24 px-6" data-animate>
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center gap-4 mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-heading">Projects</h2>
            <div class="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
          </div>
          {recentProjects.length > 0 && (
            <div class="grid md:grid-cols-2 gap-6 mb-8">
              {recentProjects.map((project) => (
                <div class="group relative bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500 dark:hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 overflow-hidden">
                  <a href={`/projects/${project.slug}`} class="absolute inset-0 z-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900" aria-label={`View ${project.title}`}>
                    <span class="sr-only">View project details</span>
                  </a>
                  <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span class="inline-block px-2 py-0.5 text-xs font-medium text-cyan-400 bg-cyan-500/10 rounded-full mb-3">Featured</span>
                  <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2 font-heading">{project.title}</h3>
                  <p class="text-slate-500 dark:text-slate-400 mb-4">{project.description}</p>
                  <div class="flex gap-2 flex-wrap mb-4">
                    {project.tags?.map((tag) => (
                      <span class="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div class="flex gap-3 relative z-10">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" class="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" class="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 100 100"><path fill-rule="evenodd" d="M49.998 11.963C28.461 11.963 11 29.425 11 50.965c0 17.231 11.172 31.849 26.671 37.003c1.952.361 2.662-.84 2.662-1.877c0-.924-.034-3.375-.051-6.633c-10.849 2.359-13.138-5.229-13.138-5.229c-1.774-4.505-4.331-5.703-4.331-5.703c-3.541-2.418.269-2.371.269-2.371c3.914.277 5.974 4.018 5.974 4.018c3.478 5.96 9.129 4.235 11.35 3.243c.353-2.525 1.363-4.24 2.476-5.217c-8.659-.984-17.763-4.33-17.763-19.274c0-4.259 1.519-7.741 4.013-10.468c-.399-.982-1.74-4.947.383-10.319c0 0 3.274-1.048 10.726 4.001c3.109-.869 6.446-1.303 9.763-1.316c3.312.014 6.65.447 9.763 1.316c7.447-5.049 10.716-4.001 10.716-4.001c2.128 5.372.788 9.337.388 10.319c2.5 2.727 4.008 6.209 4.008 10.468c0 14.979-9.117 18.279-17.805 19.241c1.398 1.205 2.646 3.59 2.646 7.229c0 5.211-.047 9.416-.047 10.695c0 1.045.701 2.26 2.681 1.873C77.836 82.798 89 68.191 89 50.965c0-21.54-17.461-39.002-39.002-39.002" clip-rule="evenodd" /></svg>
                        Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div class="text-center">
            <a
              href="/projects"
              class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-cyan-500/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            >
              View All Projects
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section id="blog" class="py-24 px-6 bg-slate-100 dark:bg-slate-900/50 transition-colors duration-300" data-animate>
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center gap-4 mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-heading">Latest Posts</h2>
            <div class="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
          </div>
          {recentPosts.length > 0 && (
            <div class="grid gap-6">
              {recentPosts.map((post) => (
                <a
                  href={`/blog/${post.slug}`}
                  class="group relative bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500 dark:hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
                >
                  <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <time class="text-sm text-cyan-400 font-medium">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </time>
                  <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-1 mb-2 font-heading">{post.title}</h3>
                  <p class="text-slate-500 dark:text-slate-400">{post.excerpt}</p>
                </a>
              ))}
            </div>
          )}
          <div class="text-center mt-8">
            <a
              href="/blog"
              class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-cyan-500/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            >
              View All Posts
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section id="contact" class="py-24 px-6 bg-slate-100 dark:bg-slate-900/50 transition-colors duration-300" data-animate>
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 font-heading">Get In Touch</h2>
          <p class="text-slate-500 dark:text-slate-400 mb-8 text-lg">I'm always open to new opportunities and collaborations.</p>
          <a 
            href="mailto:dinoyrussel@gmail.com" 
            class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-cyan-500/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            dinoyrussel@gmail.com
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
