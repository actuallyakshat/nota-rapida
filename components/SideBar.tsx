"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { LogOut, SquareChevronLeft } from "lucide-react";
import SidebarOptions from "./SidebarOptions";
import { useTheme } from "next-themes";

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
];

export default function SideBar() {
  const { setTheme } = useTheme();
  const [collpased, setCollapsed] = useState(false);
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
            <SidebarOptions />
            <hr className="mt-4" />

            <h4 className="mt-4 px-4 text-sm font-bold text-muted-foreground">
              Notes
            </h4>
            <div className="flex flex-col">
              <div className="mt-3 flex-grow">
                {dummyFolders.map((folder) => (
                  <Accordion key={folder.id} type="single" collapsible>
                    <AccordionItem value="item-1" className="border-0">
                      <AccordionTrigger>{folder.name}</AccordionTrigger>
                      <AccordionContent className="mt-1 flex flex-col items-start justify-start gap-2">
                        {folder.notes.map((note) => (
                          <button
                            key={note.id}
                            className="text-sm hover:underline"
                          >
                            {note.title}
                          </button>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
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
