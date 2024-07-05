"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { deleteFolder } from "@/app/notes/_actions/actions";

export default function DeleteFolder({ folderId }: { folderId: string }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  async function deleteFolderHandler() {
    try {
      setLoading(true);
      const response = await deleteFolder(folderId);
      if (response.success) {
        console.log("Folder deleted");
        setOpen(false);
      } else {
        console.log(response.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="ml-auto" disabled={loading}>
          <Trash className="size-4 fill-muted-foreground stroke-none transition-colors hover:fill-destructive" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            You are about to delete this folder
          </AlertDialogTitle>
          <AlertDialogDescription>
            This folder along with all of its notes will be moved to the trash
            folder for 15 days before being permanently deleted.
            <p className="text-sm text-destructive-foreground">{error}</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              deleteFolderHandler();
            }}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
