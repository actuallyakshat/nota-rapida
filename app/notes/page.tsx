import prisma from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import RecentNotes from "../_components/RecentNotes";

export default async function Search() {
  const user = await currentUser();
  const allNotes = await prisma.note.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  const recent = allNotes.slice(0, 12);
  return (
    <div className="w-full p-12">
      <h1 className="text-3xl font-black">Search Notes</h1>
      {/* <SearchInput /> */}
      <RecentNotes notes={recent} />
    </div>
  );
}
