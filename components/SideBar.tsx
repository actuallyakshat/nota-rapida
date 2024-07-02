"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  FilePlus2,
  FolderPlus,
  SquareChevronLeft,
  SquareChevronRight,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const dummyFolders = [
  {
    name: "Folder 1",
    id: "1",
    notes: [
      {
        id: "1",
        title: "Note 1",
        content: "This is a note",
      },
      {
        id: "2",
        title: "Note 2",
        content: "This is another note",
      },
    ],
  },
  {
    name: "Folder 2",
    id: "2",
    notes: [
      {
        id: "1",
        title: "Note 1",
        content: "This is a note",
      },
      {
        id: "2",
        title: "Note 2",
        content: "This is another note",
      },
    ],
  },
];
export default function SideBar() {
  const [collpased, setCollapsed] = useState(false);
  return (
    <>
      <MobileSideBar />
      <div
        className={`hidden lg:block ${
          collpased ? "w-[50px]" : "flex-[1]"
        } noscrollbar h-full max-w-sm overflow-y-auto border-r border-zinc-300 pb-12 transition-all duration-300`}
      >
        <div className="px-4">
          <div className="flex w-full items-center justify-between py-4">
            {!collpased && (
              <div className="flex h-full items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button>
                        <FilePlus2 className="size-6 stroke-zinc-600" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>New Note</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button>
                        <FolderPlus className="size-6 stroke-zinc-600" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>New Folder</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
            <button
              onClick={() => setCollapsed(!collpased)}
              className="ml-auto flex w-fit items-center justify-center font-bold"
            >
              <SquareChevronLeft
                className={`size-6 stroke-zinc-600 ${collpased ? "rotate-180" : ""} transition-transform`}
              />
            </button>
          </div>

          {!collpased &&
            [...dummyFolders, ...dummyFolders, ...dummyFolders].map(
              (folder) => (
                <Accordion key={folder.id} type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>{folder.name}</AccordionTrigger>
                    <AccordionContent>
                      {folder.notes.map((note) => (
                        <div key={note.id}>
                          <p>{note.title}</p>
                          <p>{note.content}</p>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ),
            )}
        </div>
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
