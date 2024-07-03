import React from "react";
import { CirclePlus, FolderPlus, LogOut, Search, Trash } from "lucide-react";
import ThemeToggler from "./ThemeToggler";

const sidebarOption = [
  {
    id: 1,
    name: "Search",
    icon: <Search className="size-5 stroke-muted-foreground" />,
  },
  {
    id: 2,
    name: "Add Note",
    icon: <CirclePlus className="size-5 stroke-muted-foreground" />,
  },
  {
    id: 3,
    name: "Add Folder",
    icon: <FolderPlus className="size-5 stroke-muted-foreground" />,
  },
  {
    id: 4,
    name: "Trash",
    icon: <Trash className="size-5 stroke-muted-foreground" />,
  },
];
export default function SidebarOptions() {
  return (
    <div className="space-y-1">
      {sidebarOption.map((option) => (
        <button
          key={option.id}
          onClick={() => console.log(option.id)}
          className="hover:bg-hover flex w-full items-center gap-3 px-4 py-2 transition-colors"
        >
          {option.icon}
          <p className="text-sm text-muted-foreground">{option.name}</p>
        </button>
      ))}
      <ThemeToggler />
    </div>
  );
}
