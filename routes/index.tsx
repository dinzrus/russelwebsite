export default function Home() {
  return (
    <main class="mx-auto p-8">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6 rounded-full"
          src="/russeldinoy-profile.webp"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">
          Russel Dinoy | Full Stack Developer
        </h1>
        <p class="my-4">
          For a little introduction, I am a software engineer with a passion for
          building web applications. I love working with modern technologies and
          frameworks to create efficient and user-friendly experiences.
        </p>
        <p>
          I really believe in the power of technologies to transform lives and
          make the world a better place. I am always eager to learn new things
          and improve my skills.
        </p>
      </div>

      <section class="max-w-screen-md mx-auto mt-8">
        <h2 class="text-2xl">Projects</h2>
        <hr class="my-2"></hr>
        <div class="flex border my-4">
          <div class="p-4">
            <h3 class="font-bold text-base">
              Realtour Boss - Real Estate Website
            </h3>
            <p>
              This is a project description
            </p>
            <a href="#" class="text-blue-600">View Project</a>
          </div>
        </div>

        <div class="flex border my-4">
          <div class="p-4">
            <h3 class="font-bold text-base">
              Realtour Boss - Real Estate Website
            </h3>
            <p>
              This is a project description
            </p>
            <a href="#" class="text-blue-600">View Project</a>
          </div>
        </div>
      </section>

      <section class="max-w-screen-md mx-auto mt-8">
        <h2 class="text-2xl">About Me</h2>
        <hr class="my-2"></hr>
      </section>

      <section class="max-w-screen-md mx-auto mt-8">
        <h2 class="text-2xl">Skills and Technologies</h2>
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
            <div class="bg-green-400 h-4 rounded-full" style="width: 85%;">
            </div>
          </div>
        </div>
        <div class="mb-6">
          <div class="flex justify-between items-center mb-1">
            <span class="text-md font-medium text-gray-700">Javascript</span>
            <span class="text-sm font-semibold text-blue-600">70%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-4">
            <div class="bg-yellow-600 h-4 rounded-full" style="width: 70%;">
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
            <div class="bg-red-600 h-4 rounded-full" style="width: 60%;">
            </div>
          </div>
        </div>
        <div class="mb-6">
          <div class="flex justify-between items-center mb-1">
            <span class="text-md font-medium text-gray-700">Laravel</span>
            <span class="text-sm font-semibold text-blue-600">65%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-4">
            <div class="bg-orange-600 h-4 rounded-full" style="width: 65%;">
            </div>
          </div>
        </div>
        <div class="mb-6">
          <div class="flex justify-between items-center mb-1">
            <span class="text-md font-medium text-gray-700">Wordpress</span>
            <span class="text-sm font-semibold text-blue-600">90%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-4">
            <div class="bg-gray-600 h-4 rounded-full" style="width: 90%;">
            </div>
          </div>
        </div>
      </section>

      <section class="max-w-screen-md mx-auto mt-8">
        <h2 class="text-2xl">Contact</h2>
        <hr class="my-2"></hr>
      </section>

      <footer class="bg-gray-800 text-white text-center py-4 mt-8">
        <p>&copy; 2025 Russel Dinoy. All rights reserved.</p>
      </footer>
    </main>
  );
}
