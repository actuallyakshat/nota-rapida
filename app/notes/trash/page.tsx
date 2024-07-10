import prisma from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import TrashOptions from "./_components/TrashOptions";
import {
  deleteFolder,
  deleteNote,
  restoreFolder,
  restoreNote,
} from "../_actions/actions";

export default async function Trash() {
  const user = await currentUser();
  const trashedNotes = await prisma.note.findMany({
    where: {
      userId: user?.id,
      OR: [{ trashed: true }, { folder: { trashed: true } }],
    },
    orderBy: {
      trashedDate: "desc",
    },
    include: {
      folder: true,
    },
  });

  const trashedFolders = await prisma.folder.findMany({
    where: {
      trashed: true,
    },
    orderBy: {
      trashedDate: "desc",
    },
    include: {
      notes: true,
    },
  });

  function getDaysRemaining(date: Date) {
    // 15 - days covered from given date:
    const daysRemaining =
      15 -
      Math.floor(
        (new Date().getTime() - date?.getTime()) / (1000 * 60 * 60 * 24),
      );
    return daysRemaining;
  }

  return (
    <div className="w-full p-12">
      <h1 className="text-3xl font-black">Trash</h1>
      <p className="text-sm text-muted-foreground">
        Notes that you have moved to the trash.
      </p>
      <hr className="mb-3 mt-2" />
      <h2 className="mt-4 text-2xl font-bold">Notes</h2>
      <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-3">
        {trashedNotes.map((note) => (
          <div
            key={note.id}
            className="mt-1 flex items-center justify-between gap-4 rounded-lg border px-6 py-3 shadow-md"
          >
            <div className="flex w-full items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">{note.title}</h2>
                  <p className="text-xs text-muted-foreground">
                    {getDaysRemaining(note.trashedDate as Date)} days left
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {note.folder?.name}
                </p>
              </div>

              <TrashOptions
                data={note}
                restoreMethod={restoreNote}
                deleteMethod={deleteNote}
              />
            </div>
          </div>
        ))}

        {trashedNotes.length === 0 && (
          <p className="text-sm text-muted-foreground">
            You have no notes in the trash.
          </p>
        )}
      </div>
      <h2 className="mt-8 text-2xl font-bold">Folders</h2>
      <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-3">
        {trashedFolders.map((folder) => (
          <div
            key={folder.id}
            className="mt-2 flex items-center justify-between gap-4 rounded-lg border px-6 py-3 shadow-md"
          >
            <div className="flex w-full items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">{folder.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {getDaysRemaining(folder.trashedDate as Date)} days left
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {folder.notes.length} notes
                </p>
              </div>

              <TrashOptions
                data={folder}
                restoreMethod={restoreFolder}
                deleteMethod={deleteFolder}
              />
            </div>
          </div>
        ))}

        {trashedFolders.length === 0 && (
          <p className="text-sm text-muted-foreground">
            You have no folders in the trash.
          </p>
        )}
      </div>
    </div>
  );
}
