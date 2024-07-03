import MainContent from "@/components/MainContent";
import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React from "react";

export default function Dashboard() {
  return (
    <main className="relative my-auto h-[calc(100vh-2rem)] w-full overflow-hidden rounded-3xl bg-windowBackground shadow-lg">
      <TopBar />
      <div className="flex h-full">
        <SideBar />
        <MainContent />
      </div>
    </main>
  );
}
