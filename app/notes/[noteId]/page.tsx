import prisma from "@/db";
import React from "react";
import NoteTitle from "./_components/NoteTitle";
export default async function Note({ params }: { params: { noteId: string } }) {
  const note = await prisma.note.findUnique({
    where: {
      id: params.noteId,
    },
  });

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <div className="flex-[3]">
      <div className="w-full p-12">
        <NoteTitle note={note} />
      </div>
    </div>
  );
}
