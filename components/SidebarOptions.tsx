import React, { useEffect } from "react";
import {
  ArrowUpDown,
  CirclePlus,
  FolderPlus,
  LogOut,
  Search,
  Trash,
} from "lucide-react";
import ThemeToggler from "./ThemeToggler";
import { useGlobalContext } from "@/providers/global-context";
import Link from "next/link";

export default function SidebarOptions({
  addingNote,
  setAddingNote,
  addingFolder,
  setAddingFolder,
}: {
  addingNote: boolean;
  setAddingNote: (arg0: boolean) => void;
  addingFolder: boolean;
  setAddingFolder: (arg0: boolean) => void;
}) {
  const { selectedFolder } = useGlobalContext();
  const [error, setError] = React.useState<string>("");
  useEffect(() => {
    setError("");
  }, [selectedFolder]);
  const sidebarOption = [
    {
      id: 1,
      name: "Search",
      icon: <Search className="size-5 stroke-muted-foreground" />,
      type: "link",
      href: "/notes",
    },
    {
      id: 2,
      name: "Add Note",
      icon: <CirclePlus className="size-5 stroke-muted-foreground" />,
      type: "button",
      method: () => {
        if (!selectedFolder) {
          setError("No Folder Selected");
          return;
        }
        setAddingNote(true);
      },
    },
    {
      id: 3,
      name: "Add Folder",
      icon: <FolderPlus className="size-5 stroke-muted-foreground" />,
      type: "button",
      method: () => setAddingFolder(true),
    },
    // {
    //   id: 4,
    //   name: "Organise",
    //   type: "link",
    //   href: "/notes/organise",
    //   icon: <ArrowUpDown className="size-5 stroke-muted-foreground" />,
    // },
    {
      id: 4,
      name: "Trash",
      href: "/notes/trash",
      icon: <Trash className="size-5 stroke-muted-foreground" />,
    },
  ];
  return (
    <div className="space-y-1">
      {sidebarOption.map((option) => {
        return option.type === "button" ? (
          <button
            key={option.id}
            onClick={option.method}
            className="flex w-full items-center gap-3 px-4 py-2 transition-colors hover:bg-hover"
          >
            {option.icon}
            <p className="text-sm text-muted-foreground">{option.name}</p>
            {option.name == "Add Note" && error && (
              <span className="text-xs text-red-500">{error}</span>
            )}
          </button>
        ) : (
          <Link
            key={option.id}
            href={option.href as string}
            className="flex w-full items-center gap-3 px-4 py-2 transition-colors hover:bg-hover"
          >
            {option.icon}
            <p className="text-sm text-muted-foreground">{option.name}</p>
          </Link>
        );
      })}
      <ThemeToggler />
    </div>
  );
}
