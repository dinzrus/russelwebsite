import { useSignal } from "@preact/signals";

export default function Home() {
  const count = useSignal(3);
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/russeldinoy-profile.webp"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Hello!, I'm Russel</h1>
        <p class="my-4">
          For a little introduction, I am a software engineer with a passion for building web applications. I love working with modern technologies and frameworks to create efficient and user-friendly experiences.
        </p>
        <p>
          I really believe in the power of technologies to transform lives and make the world a better place. I am always eager to learn new things and improve my skills.
        </p>
      </div>

      <section class="max-w-screen-md mx-auto mt-8">
        <h2 class="text-2xl">Skills</h2>
      </section>

      <section class="max-w-screen-md mx-auto mt-8">
        <h2 class="text-2xl">Projects</h2>
      </section>

      <section class="max-w-screen-md mx-auto mt-8">
        <h2 class="text-2xl">Hobbies</h2>
      </section>
    </div>
  );
}
