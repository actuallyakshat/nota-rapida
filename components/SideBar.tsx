"use client";
import React, { useEffect, useRef, useState } from "react";

import { SquareChevronLeft } from "lucide-react";
import { useGlobalContext } from "@/providers/global-context";
import SidebarFolders from "./SidebarFolders";
import { FolderWithNotes } from "@/types/User";

export default function SideBar({
  allFolders,
}: {
  allFolders: FolderWithNotes[];
}) {
  const { selectedFolder, setSelectedFolder, clientUser } = useGlobalContext();
  const [addingNote, setAddingNote] = useState(false);
  const [addingFolder, setAddingFolder] = useState(false);
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
          <SidebarFolders
            userDetails={clientUser}
            allFolders={allFolders}
            addingNote={addingNote}
            setAddingNote={setAddingNote}
            addingFolder={addingFolder}
            setAddingFolder={setAddingFolder}
            selectedFolder={selectedFolder}
            setSelectedFolder={setSelectedFolder}
          />
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
