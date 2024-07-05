import React, { useEffect, useRef, useState } from "react";
import SidebarOptions from "./SidebarOptions";
import UserDetails, { FolderWithNotes } from "@/types/User";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Folder } from "lucide-react";
import { addNote, createFolder } from "@/app/notes/_actions/actions";
import DeleteFolder from "./DeleteFolder";

export default function SidebarFolders({
  userDetails,
  addingNote,
  setAddingNote,
  addingFolder,
  setAddingFolder,
  selectedFolder,
  setSelectedFolder,
  allFolders,
}: {
  userDetails: UserDetails | null;
  addingNote: boolean;
  setAddingNote: (arg0: boolean) => void;
  addingFolder: boolean;
  setAddingFolder: (arg0: boolean) => void;
  selectedFolder: string;
  setSelectedFolder: (arg0: string) => void;
  allFolders: FolderWithNotes[];
}) {
  const newNoteRef = useRef<HTMLInputElement>(null);
  const newFolderRef = useRef<HTMLInputElement>(null);
  const [newNoteName, setNewNoteName] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (newNoteRef.current) {
      newNoteRef.current.focus();
    }
  }, [newNoteRef, addingNote]);

  useEffect(() => {
    if (newFolderRef.current) {
      newFolderRef.current.focus();
    }
  }, [newFolderRef, addingFolder]);

  useEffect(() => {
    setAddingFolder(false);
    setAddingNote(false);
    setNewFolderName("");
    setNewNoteName("");
  }, [allFolders, setAddingFolder, setAddingNote]);

  return (
    <div>
      <SidebarOptions
        addingNote={addingNote}
        setAddingNote={setAddingNote}
        addingFolder={addingFolder}
        setAddingFolder={setAddingFolder}
      />
      <hr className="mt-4" />

      <h4 className="mt-4 px-4 text-sm font-bold text-muted-foreground">
        Notes
      </h4>
      <div className="flex flex-col">
        <div className="mt-3 flex-grow">
          {!addingFolder && allFolders.length === 0 && (
            <p className="px-4 text-sm text-muted-foreground">
              Create a folder to get started.
            </p>
          )}
          {allFolders.map((folder) => (
            <Accordion key={folder.id} type="single" collapsible>
              <AccordionItem value={folder.id} className="border-0">
                <AccordionTrigger
                  className="text-muted-foreground"
                  onClick={() => {
                    setAddingNote(false);
                    setNewNoteName("");
                    console.log(folder.id);
                    setSelectedFolder(folder.id);
                  }}
                >
                  <span>{folder.name}</span>
                  <div onClick={(e) => e.preventDefault()} className="ml-auto">
                    <DeleteFolder folderId={folder.id} />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mt-1 flex flex-col items-start justify-start gap-2">
                  {folder.notes.map((note) => (
                    <Link
                      href={`/notes/${note.id}`}
                      key={note.id}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
                    >
                      {note.title}
                    </Link>
                  ))}
                  {folder.notes.length === 0 && !addingNote && (
                    <div className="text-sm text-muted-foreground">
                      No notes in this folder
                    </div>
                  )}
                  {addingNote && selectedFolder == folder.id && (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        if (!newNoteName) {
                          console.log("Exiting...");
                          setAddingNote(false);
                          return;
                        }
                        try {
                          setLoading(true);
                          const response = await addNote({
                            title: newNoteName,
                            folderId: folder.id,
                            clerkId: userDetails?.clerkId as string,
                            order: folder.notes.length + 1,
                          });
                          console.log(response);
                        } catch (error) {
                          console.log(error);
                        } finally {
                          setLoading(false);
                        }
                      }}
                    >
                      <input
                        type="text"
                        value={newNoteName}
                        ref={newNoteRef}
                        onChange={(e) => setNewNoteName(e.target.value)}
                        onBlur={(e) => {
                          e.preventDefault();
                          e.target.form!.dispatchEvent(
                            new Event("submit", {
                              cancelable: true,
                              bubbles: true,
                            }),
                          );
                        }}
                        className="bg-windowBackground text-sm text-muted-foreground focus:outline-none"
                        placeholder="New Note"
                      />
                    </form>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
          {addingFolder && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!newFolderName) {
                  console.log("Exiting...");
                  setAddingFolder(false);
                  return;
                }
                console.log(newFolderName);
                console.log("sending request");
                console.log(userDetails?.clerkId);
                console.log(allFolders.length);
                try {
                  setLoading(true);
                  const response = await createFolder(
                    newFolderName,
                    userDetails?.clerkId as string,
                    allFolders.length + 1,
                  );
                  console.log(response);
                } catch (error) {
                  console.log(error);
                } finally {
                  setLoading(false);
                }
              }}
            >
              <span className="flex items-center gap-2 px-4 py-2">
                <Folder fill="#737373" stroke="none" className="size-4" />
                <input
                  type="text"
                  ref={newFolderRef}
                  disabled={loading}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  onBlur={(e) => {
                    e.preventDefault();
                    e.target.form!.dispatchEvent(
                      new Event("submit", {
                        cancelable: true,
                        bubbles: true,
                      }),
                    );
                  }}
                  className="bg-transparent text-muted-foreground focus:outline-none"
                  placeholder="New Folder"
                />
              </span>
            </form>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
}
