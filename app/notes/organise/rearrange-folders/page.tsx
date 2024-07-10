import prisma from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import RearrangeFoldersList from "../_components/RearrangeFoldersList";
import GoBackButton from "../_components/GoBackButton";

export default async function RearrangeFoldersPage() {
  const user = await currentUser();
  const folders = await prisma.folder.findMany({
    where: {
      userId: user!.id,
      trashed: false,
    },
  });
  return (
    <div className="w-full p-12">
      <GoBackButton />
      <h1 className="mt-3 text-3xl font-bold">Rearrange Folders</h1>
      <p className="text-sm text-muted-foreground">
        Rearrange the order of your folders. Drag and drop to rearrange the
        folders.
      </p>
      <hr className="mb-5 mt-3" />

      <RearrangeFoldersList folders={folders} />
    </div>
  );
}
