import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/providers/global-context";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function LandingButtons() {
  return (
    <div className="mx-auto flex w-fit items-center gap-4 bg-transparent">
      <SignedIn>
        <Link href={"/notes"}>
          <Button className="flex items-center gap-2 p-6">
            Notes <ArrowRight className="size-5 stroke-2" />
          </Button>
        </Link>
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Button className="flex items-center gap-2 p-6">
            Get Started <ArrowRight className="size-5 stroke-2" />
          </Button>
        </Link>
      </SignedOut>
    </div>
  );
}
