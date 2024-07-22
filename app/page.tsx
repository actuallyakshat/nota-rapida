import Image from "next/image";
import HomeNavigation from "./_components/HomeNavigation";
import LandingButtons from "./_components/LandingButtons";

export default function Home() {
  return (
    <main className="noscrollbar h-[100dvh] w-full overflow-y-auto">
      <section className="noscrollbar bg-gradient-to-br from-zinc-100 to-zinc-200">
        <HomeNavigation />
        <div className="noscrollbar mx-auto max-w-7xl px-8 pt-16">
          <div className="mx-auto w-full text-left md:w-11/12 md:text-center xl:w-9/12">
            <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
              <span>Let&apos;s make</span>{" "}
              <span className="leading-12 block w-full bg-gradient-to-b from-red-500 to-rose-700 bg-clip-text py-2 text-transparent lg:inline">
                note-taking
              </span>{" "}
              <span>
                fun and{" "}
                <span className="leading-12 block w-full bg-gradient-to-b from-zinc-700 to-sky-600 bg-clip-text py-2 text-transparent lg:inline">
                  intuitive
                </span>{" "}
                again?
              </span>
            </h1>
            <p className="mb-8 px-0 text-lg font-medium text-gray-600 md:text-xl lg:px-24">
              Nota Rapida is a simple note taking app that wishes to provide a
              minimalistic note-taking experience.
            </p>
            <LandingButtons />
          </div>
          <div className="mx-auto mt-20 w-full pb-20 text-center md:w-10/12">
            <Image
              src={"/hero.png"}
              alt="Dashboard"
              width={2000}
              height={2000}
              className="w-full rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
