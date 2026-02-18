export default function Home() {
  const myname = "Russel Dinoy";
  return (
    <main class="mx-auto">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center px-8">
        <img
          class="my-6 rounded-full border-4 border-cyan-700"
          src="/russeldinoy-profile.webp"
          width="128"
          height="128"
          alt="Russel Dinoy Profile Photo"
        />
        <h1 class="text-xl md:text-4xl font-bold">
          {myname} | Full Stack Developer
        </h1>
      </div>

      <section class="max-w-screen-md mx-auto mt-8 px-8 border shadow-md rounded-lg p-5 border-gray-400">
        <h2 class="text-2xl font-bold">About Me</h2>
        <hr class="my-2"></hr>
        <p class="mb-2">
          Hi, I'm Russel, a passionate Full-stack developer dedicated to
          crafting intuitive and engaging user experiences. My journey into web
          development started with a fascination for how design and code come
          together to create something beautiful and functional. I thrive on
          bringing ideas to life, transforming complex concepts into clean,
          efficient, and user-friendly web applications.
        </p>
        <p class="mb
          -2">
          I specialize in React.js, JavaScript, HTML, and CSS, and I'm always
          eager to learn new technologies that enhance the user experience. What
          truly excites me is the collaborative process—working with designers
          and back-end developers to solve challenges and build seamless digital
          products that users love.
        </p>
        <p class="mb-2">
          When I'm not coding, you can find me [mention a brief, relatable
          hobby, e.g., "exploring new hiking trails," "experimenting with new
          recipes," "diving into a good sci-fi novel"]. I'm currently seeking
          opportunities to join a forward-thinking team where I can contribute
          to impactful projects and continue to grow as a developer.
        </p>
      </section>

      <section class="max-w-screen-md mx-auto mt-8 px-8 border shadow-md rounded-lg p-5 border-gray-400">
        <h2 class="text-2xl font-bold">Skills and Technologies</h2>
        <hr class="my-2"></hr>
        <div class="mb-6">
          <div class="flex justify-between items-center mb-1">
            <span class="text-md font-medium text-gray-700">HTML</span>
            <span class="text-sm font-semibold text-blue-600">90%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-4">
            <div class="bg-blue-600 h-4 rounded-full" style="width: 90%;"></div>
          </div>
        </div>
        <div class="mb-6">
          <div class="flex justify-between items-center mb-1">
            <span class="text-md font-medium text-gray-700">CSS</span>
            <span class="text-sm font-semibold text-blue-600">85%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-4">
            <div
              class="bg-green-400 h-4 rounded-full"
              style="width: 85%;"
            >
            </div>
          </div>
        </div>
        <div class="mb-6">
          <div class="flex justify-between items-center mb-1">
            <span class="text-md font-medium text-gray-700">Javascript</span>
            <span class="text-sm font-semibold text-blue-600">70%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-4">
            <div
              class="bg-yellow-600 h-4 rounded-full"
              style="width: 70%;"
            >
            </div>
          </div>
        </div>
        <div class="mb-6">
          <div class="flex justify-between items-center mb-1">
            <span class="text-md font-medium text-gray-700">PHP</span>
            <span class="text-sm font-semibold text-blue-600">75%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-4">
            <div class="bg-blue-400 h-4 rounded-full" style="width: 75%;"></div>
          </div>
        </div>
        <div class="mb-6">
          <div class="flex justify-between items-center mb-1">
            <span class="text-md font-medium text-gray-700">
              Deno/JS Runtime
            </span>
            <span class="text-sm font-semibold text-blue-600">50%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-4">
            <div class="bg-cyan-600 h-4 rounded-full" style="width: 50%;"></div>
          </div>
        </div>
        <div class="mb-6">
          <div class="flex justify-between items-center mb-1">
            <span class="text-md font-medium text-gray-700">Tailwind CSS</span>
            <span class="text-sm font-semibold text-blue-600">60%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-4">
            <div class="bg-red-600 h-4 rounded-full" style="width: 60%;"></div>
          </div>
        </div>
        <div class="mb-6">
          <div class="flex justify-between items-center mb-1">
            <span class="text-md font-medium text-gray-700">Laravel</span>
            <span class="text-sm font-semibold text-blue-600">65%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-4">
            <div
              class="bg-orange-600 h-4 rounded-full"
              style="width: 65%;"
            >
            </div>
          </div>
        </div>
        <div class="mb-6">
          <div class="flex justify-between items-center mb-1">
            <span class="text-md font-medium text-gray-700">Wordpress</span>
            <span class="text-sm font-semibold text-blue-600">90%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-4">
            <div class="bg-gray-600 h-4 rounded-full" style="width: 90%;"></div>
          </div>
        </div>
      </section>

      <section class="max-w-screen-md mx-auto mt-8 px-8 border shadow-md rounded-lg p-5 border-gray-400">
        <h2 class="text-2xl font-bold">Projects</h2>
        <hr class="my-2"></hr>
        <div className="flex flex-col gap-2 shadow-lg">
            <div className="w-full border rounded-md border-gray-300 p-5">
              <h3 class="font-semibold">Project 1</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
            <div className="w-full border rounded-md border-gray-300 p-5">
              <h3 class="font-semibold">Project 1</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
            <div className="w-full border rounded-md border-gray-300 p-5">
              <h3 class="font-semibold">Project 1</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
            <div className="w-full border rounded-md border-gray-300 p-5">
              <h3 class="font-semibold">Project 1</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
        </div>    
      </section>

      <section class="max-w-screen-md mx-auto mt-8 px-8 border rounded-lg p-5 border-gray-400">
        <h2 class="text-2xl font-bold">Contact</h2>
        <hr class="my-2"></hr>
      </section>

      <footer class="bg-gray-800 text-white text-center py-4 mt-8">
        <p>&copy; 2025 Russel Dinoy. All rights reserved.</p>
      </footer>
    </main>
  );
}
