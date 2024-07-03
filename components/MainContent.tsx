"use client";
import React from "react";
import TextEditor from "./TextEditor";
export default function TextEditorContent() {
  const [content, setContent] = React.useState(null);
  return (
    <div className="noscrollbar flex-[3] overflow-y-auto bg-windowBackground px-2 pb-20 pt-10 lg:py-10">
      <TextEditor />
    </div>
  );
}
