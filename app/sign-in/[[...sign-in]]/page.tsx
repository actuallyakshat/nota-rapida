import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex h-full min-h-[100dvh] w-full flex-col items-center justify-center">
      <div className="mb-4 space-y-1">
        <h1 className="ml-2 flex items-center gap-2 text-center text-3xl font-extrabold">
          Welcome Back to{" "}
          <span className="bg-gradient-to-b from-zinc-700 to-sky-600 bg-clip-text text-transparent">
            Nota Rapida
          </span>
        </h1>
        <p className="text-center text-sm font-medium text-muted-foreground">
          Your Notes, Anytime, Anywhere
        </p>
      </div>

      <SignIn />
    </div>
  );
}
