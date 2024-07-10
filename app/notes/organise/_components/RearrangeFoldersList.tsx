"use client";
import { Folder } from "@prisma/client";
import React, { useState } from "react";
import { Reorder } from "framer-motion";
import debounce from "lodash.debounce";
import { FolderIcon } from "lucide-react";

// Debounced function to handle order update
const debouncedUpdateOrder = debounce((newOrder) => {
  console.log("Updating order:", newOrder);
  // Here you would add your API call to update the order in the backend
}, 1000); // Adjust the debounce delay as needed

export default function RearrangeFoldersList({
  folders: initialFolders,
}: {
  folders: Folder[];
}) {
  const [folders, setFolders] = useState(initialFolders);

  // Update the state and trigger the debounced function
  const handleReorder = (newOrder: Folder[]) => {
    setFolders(newOrder);
    debouncedUpdateOrder(newOrder);
  };

  return (
    <Reorder.Group
      axis="y"
      values={folders}
      onReorder={handleReorder}
      className="flex flex-col gap-2"
    >
      {folders.map((folder) => (
        <Reorder.Item key={folder.id} value={folder}>
          <p className="flex max-w-md cursor-grab items-center gap-3 truncate rounded-md border border-zinc-700 bg-hover p-4 text-lg shadow-md">
            <FolderIcon className="size-4 stroke-muted-foreground" />
            {folder.name}
          </p>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
