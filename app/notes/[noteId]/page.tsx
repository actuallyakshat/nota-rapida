import prisma from "@/db";
import React from "react";
import NoteTitle from "./_components/NoteTitle";
import TextEditor from "@/components/TextEditor";
export const dynamic = "force-dynamic";
export const revalidate = 0;

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
      <div className="w-full px-16 py-12">
        <NoteTitle note={note} />
        <TextEditor note={note} />
      </div>
    </div>
  );
}
