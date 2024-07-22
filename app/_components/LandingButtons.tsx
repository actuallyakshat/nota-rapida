"use client";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/providers/global-context";
import { GithubIcon } from "lucide-react";
import React from "react";

export default function LandingButtons() {
  const { isAuthenticated } = useGlobalContext();
  return (
    <div className="mx-auto flex w-fit items-center gap-4 bg-transparent">
      {isAuthenticated ? (
        <Button size={"lg"}>Notes</Button>
      ) : (
        <Button>Get Started</Button>
      )}
      <Button size={"lg"} className="flex items-center gap-2">
        GitHub <GithubIcon />
      </Button>
    </div>
  );
}
