import { Note } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function RecentNotes({ notes }: { notes: Note[] }) {
  return (
    <div className="mt-4 flex flex-col gap-1">
      {notes.map((note) => (
        <Link
          key={note.id}
          href={`/notes/${note.id}`}
          className="flex items-center gap-2 text-lg font-medium transition-all duration-500 hover:underline"
        >
          <Image
            src="/page.png"
            width={20}
            height={20}
            alt="page"
            className="size-5"
          />
          <h2>{note.title}</h2>
        </Link>
      ))}
    </div>
  );
}
