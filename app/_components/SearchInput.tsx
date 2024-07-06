"use client";
import React from "react";
export default function SearchInput() {
  const [query, setQuery] = React.useState("");
  return (
    <div>
      <input
        type="text"
        placeholder="Search notes..."
        onChange={(e) => setQuery(e.target.value)}
        className="mt-3 w-full rounded-md bg-background px-3 py-2 text-sm font-light text-foreground focus:outline-none dark:bg-[#262626]"
      />
    </div>
  );
}
