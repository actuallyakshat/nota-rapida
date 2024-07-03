"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Folder, LogOut, SquareChevronLeft } from "lucide-react";
import SidebarOptions from "./SidebarOptions";
import { useGlobalContext } from "@/providers/global-context";

const dummyFolders = [
  {
    name: "Projects",
    id: "1",
    notes: [
      {
        id: "1",
        title: "StudySnap",
        content: "This is a note",
      },
      {
        id: "2",
        title: "Wishly",
        content: "This is another note",
      },
    ],
  },
  {
    name: "Journal",
    id: "2",
    notes: [
      {
        id: "1",
        title: "Birthday Experience",
        content: "This is a note",
      },
      {
        id: "2",
        title: "Weekly Review",
        content: "This is another note",
      },
    ],
  },
  {
    name: "Tasks",
    id: "3",
    notes: [],
  },
];

export default function SideBar() {
  const { selectedFolder, setSelectedFolder } = useGlobalContext();
  const [newNoteName, setNewNoteName] = useState("");
  const [newFolderName, setNewFolder] = useState("");
  const [addingNote, setAddingNote] = useState(false);
  const [addingFolder, setAddingFolder] = useState(false);
  const [collpased, setCollapsed] = useState(false);
  const newNoteRef = useRef<HTMLInputElement>(null);
  const newFolderRef = useRef<HTMLInputElement>(null);

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

  return (
    <>
      <MobileSideBar />
      <div
        className={`hidden lg:block ${
          collpased ? "w-[50px]" : "flex-[1]"
        } noscrollbar h-full max-w-sm overflow-y-auto border-r pb-12 transition-all duration-300`}
      >
        <div className="px-4 py-4">
          <button
            onClick={() => setCollapsed(!collpased)}
            className="relative ml-auto flex w-fit items-center justify-center font-bold"
          >
            <SquareChevronLeft
              className={`size-6 stroke-muted-foreground ${collpased ? "rotate-180" : ""} transition-transform`}
            />
          </button>
        </div>

        {!collpased && (
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
                {dummyFolders.map((folder) => (
                  <Accordion key={folder.id} type="single" collapsible>
                    <AccordionItem value={folder.id} className="border-0">
                      <AccordionTrigger
                        className="text-muted-foreground"
                        onClick={() => {
                          setAddingNote(false);
                          setNewNoteName("");
                          setSelectedFolder(Number(folder.id));
                        }}
                      >
                        {folder.name}
                      </AccordionTrigger>
                      <AccordionContent className="mt-1 flex flex-col items-start justify-start gap-2">
                        {folder.notes.map((note) => (
                          <button
                            key={note.id}
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
                          >
                            {note.title}
                          </button>
                        ))}
                        {folder.notes.length === 0 && !addingNote && (
                          <div className="text-sm text-muted-foreground">
                            No notes in this folder
                          </div>
                        )}
                        {addingNote && selectedFolder === Number(folder.id) && (
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              console.log(newNoteName);
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
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newFolderName) {
                        console.log("Exiting...");
                        setAddingFolder(false);
                        return;
                      }
                      console.log(newFolderName);
                    }}
                  >
                    <span className="flex items-center gap-2 px-4 py-2">
                      <Folder fill="#737373" stroke="none" className="size-4" />
                      <input
                        type="text"
                        ref={newFolderRef}
                        onChange={(e) => setNewFolder(e.target.value)}
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
        )}
      </div>
    </>
  );
}

function MobileSideBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute left-4 top-16 lg:hidden"
      >
        Open
      </button>

      <div
        onClick={() => setIsOpen(false)}
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-[100%]"
        } absolute left-0 h-full w-3/4 border-r border-zinc-300 bg-windowBackground transition-all duration-300`}
      >
        hey
      </div>
    </>
  );
}
