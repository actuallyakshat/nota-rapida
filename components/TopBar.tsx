import React from "react";
import CurrentTime from "./CurrentTime";
import { currentUser } from "@clerk/nextjs/server";

export default async function TopBar() {
  const user = await currentUser();
  return (
    <div className="flex h-12 w-full items-center justify-center bg-foregroundSecondary text-white">
      <div className="mx-auto flex w-full max-w-[98%] items-center justify-center px-4 py-2 md:justify-between">
        <span className="hidden md:block">
          <CurrentTime />
        </span>
        <h4 className="font-bold">Nota Rapida</h4>
        <span className="hidden font-light md:block">{user?.fullName}</span>
      </div>
    </div>
  );
}
