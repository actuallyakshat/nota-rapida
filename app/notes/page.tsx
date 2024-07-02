import MainContent from "@/components/MainContent";
import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React from "react";

export default function Dashboard() {
  return (
    <main className="w-full h-[calc(100vh-2rem)] relative my-auto rounded-3xl bg-windowBackground overflow-hidden border shadow-lg">
      <TopBar />
      <div className="flex h-full">
        <SideBar />
        <MainContent />
      </div>
    </main>
  );
}
