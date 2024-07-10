import prisma from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import RecentNotes from "../_components/RecentNotes";
import SearchInput from "../_components/SearchInput";

export default async function Search() {
  const user = await currentUser();
  const allNotes = await prisma.note.findMany({
    where: {
      userId: user?.id,
      trashed: false,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      folder: true,
    },
  });
  const recent = allNotes.slice(0, 7);
  return (
    <div className="w-full p-12">
      {recent.length > 0 && <RecentNotes notes={recent} />}
      <SearchInput allNotes={allNotes} />
    </div>
  );
}
