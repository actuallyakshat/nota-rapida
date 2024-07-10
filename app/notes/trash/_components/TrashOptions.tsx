"use client";
import { NoteWithFolder, FolderWithNotes } from "@/types/User";
import { Loader, Trash, Undo2 } from "lucide-react";
import React from "react";

export default function TrashOptions({
  data,
  restoreMethod,
  deleteMethod,
}: {
  data: NoteWithFolder | FolderWithNotes;
  restoreMethod: Function;
  deleteMethod: Function;
}) {
  const [loading, setLoading] = React.useState(false);
  async function handleRestore() {
    try {
      setLoading(true);
      const response = await restoreMethod(data.id);
      if (response.success) {
        console.log(response.data);
      } else {
        console.log(response.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    try {
      setLoading(true);
      const response = await deleteMethod(data.id);
      if (response.success) {
        console.log(response.data);
      } else {
        console.log(response.error);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  if (loading)
    return (
      <div>
        <Loader className="size-5 animate-spin" />
      </div>
    );

  return (
    <div className="flex items-center gap-2">
      <button disabled={loading} onClick={handleRestore}>
        <Undo2 className="size-5" />
      </button>
      <button disabled={loading} onClick={handleDelete}>
        <Trash className="size-5" />
      </button>
    </div>
  );
}
