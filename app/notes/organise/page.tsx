import {
  ArrowDownUp,
  Folder,
  FolderPen,
  FolderSync,
  Shuffle,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const organise_options = [
  {
    id: 1,
    name: "Rearrange Folders",
    icon: <ArrowDownUp className="size-5 stroke-muted-foreground" />,
    href: "organise/rearrange-folders",
  },
  {
    id: 2,
    name: "Rearrange Notes",
    icon: <Shuffle className="size-5 stroke-muted-foreground" />,
    href: "organise/rearrange-notes",
  },
  {
    id: 3,
    name: "Transfer Notes",
    icon: <FolderSync className="size-5 stroke-muted-foreground" />,
    href: "organise/transfer-notes",
  },
  {
    id: 4,
    name: "Rename Folder",
    icon: <FolderPen className="size-5 stroke-muted-foreground" />,
    href: "organise/rename-folders",
  },
];

export default function Organise() {
  return (
    <div className="w-full p-12">
      <h1 className="text-3xl font-black">Organise</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Tools that will help you organise your notes without any hassle.
      </p>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-3 md:flex-nowrap">
        {organise_options.map((option) => (
          <Link
            href={option.href}
            key={option.id}
            className="rounded-md p-2 transition-colors duration-300 hover:bg-hover"
          >
            <button className="flex flex-col items-center gap-2 px-4 py-2">
              {option.icon}
              <p className="text-sm text-muted-foreground">{option.name}</p>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
