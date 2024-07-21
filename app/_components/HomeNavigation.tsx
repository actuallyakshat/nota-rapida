import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export default function HomeNavigation() {
  return (
    <nav className="flex h-20 w-full items-center justify-center py-4">
      <div className="flex h-full w-full max-w-2xl items-center justify-between rounded-xl bg-windowBackground px-6 shadow-lg">
        <Link href="/" className="text-sm font-black">
          Nota Rapida
        </Link>
        <SignedIn>
          <div className="flex items-center gap-2">
            <Link href="/notes" className="text-sm font-black">
              Notes
            </Link>
            <SignOutButton>
              <button className="text-sm font-black">Logout</button>
            </SignOutButton>
          </div>
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className="text-sm font-black">Sign in</button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}
