import HomeNavigation from "@/app/_components/HomeNavigation";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex h-full min-h-[100dvh] w-full flex-col items-center justify-center">
      <div className="mb-4 space-y-1">
        <h1 className="bg-clip-text0 ml-2 flex items-center gap-2 text-center text-3xl font-extrabold">
          Hey There! Welcome to{" "}
          <span className="bg-gradient-to-b from-red-400 to-rose-800 bg-clip-text text-transparent">
            Nota Rapida
          </span>
        </h1>
        <p className="text-center text-sm font-medium text-muted-foreground">
          Your Notes, Anytime, Anywhere
        </p>
      </div>

      <SignUp />
    </div>
  );
}
