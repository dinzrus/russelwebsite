export default function Home() {
  const myname = "Russel Dinoy";
  return (
    <main class="mx-auto">
      <div class="w-full p-5">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center px-8">
        <img
          class="my-6 rounded-full border-4 border-cyan-700"
          src="/russeldinoy-profile.webp"
          width="128"
          height="128"
          alt="Russel Dinoy Profile Photo"
        />
        <div class="flex flex-row gap-2 mb-3">
        <a href="" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 100 100"><path fill="currentColor" fill-rule="evenodd" d="M49.998 11.963C28.461 11.963 11 29.425 11 50.965c0 17.231 11.172 31.849 26.671 37.003c1.952.361 2.662-.84 2.662-1.877c0-.924-.034-3.375-.051-6.633c-10.849 2.359-13.138-5.229-13.138-5.229c-1.774-4.505-4.331-5.703-4.331-5.703c-3.541-2.418.269-2.371.269-2.371c3.914.277 5.974 4.018 5.974 4.018c3.478 5.96 9.129 4.235 11.35 3.243c.353-2.525 1.363-4.24 2.476-5.217c-8.659-.984-17.763-4.33-17.763-19.274c0-4.259 1.519-7.741 4.013-10.468c-.399-.982-1.74-4.947.383-10.319c0 0 3.274-1.048 10.726 4.001c3.109-.869 6.446-1.303 9.763-1.316c3.312.014 6.65.447 9.763 1.316c7.447-5.049 10.716-4.001 10.716-4.001c2.128 5.372.788 9.337.388 10.319c2.5 2.727 4.008 6.209 4.008 10.468c0 14.979-9.117 18.279-17.805 19.241c1.398 1.205 2.646 3.59 2.646 7.229c0 5.211-.047 9.416-.047 10.695c0 1.045.701 2.26 2.681 1.873C77.836 82.798 89 68.191 89 50.965c0-21.54-17.461-39.002-39.002-39.002" clip-rule="evenodd"/></svg>
        </a>
        <a href="" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 512 512"><path fill="currentColor" d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32m-273.3 373.43h-64.18V205.88h64.18ZM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43c0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43m264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44c-17.74 0-28.24 12-32.91 23.69c-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44c42.13 0 74 27.77 74 87.64Z"/></svg>
        </a>
        </div>
        <h1 class="text-xl md:text-4xl font-bold">
          {myname} </h1>
          <h2 class="text-xl font-bold">Full Stack Developer</h2>
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
      </div>
      <footer class="bg-gray-800 text-white text-center py-4 mt-8">
        <p>&copy; 2025 Russel Dinoy. All rights reserved.</p>
      </footer>

    </main>
  );
}
