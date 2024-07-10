"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView, Theme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Note } from "@prisma/client";
import debounce from "lodash/debounce";
import { saveNote } from "@/app/notes/_actions/actions";

const lightTheme = {
  colors: {
    editor: {
      text: "#222222",
      background: "#f5f5f5",
    },
    menu: {
      text: "#222222",
      background: "#e0e0e0",
    },
    tooltip: {
      text: "#ffffff",
      background: "#333333",
    },
    hovered: {
      text: "#222222",
      background: "#d0d0d0",
    },
    selected: {
      text: "#222222",
      background: "#c0c0c0",
    },
    disabled: {
      text: "#a0a0a0",
      background: "#e0e0e0",
    },
    shadow: "#b0b0b0",
    border: "#d0d0d0",
    sideMenu: "#f0f0f0",
  },
  borderRadius: 4,
  fontFamily: "Helvetica Neue, sans-serif",
} satisfies Theme;

const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    editor: {
      text: "#ffffff",
      background: "#141414",
    },
    menu: {
      text: "#ffffff",
      background: "#333333",
    },
    tooltip: {
      text: "#ffffff",
      background: "#555555",
    },
    hovered: {
      text: "#ffffff",
      background: "#444444",
    },
    selected: {
      text: "#ffffff",
      background: "#555555",
    },
    disabled: {
      text: "#666666",
      background: "#333333",
    },
    shadow: "#000000",
    border: "#444444",
    sideMenu: "#202020",
  },
} satisfies Theme;

async function getNoteContent(note: Note) {
  const noteContentString = note.content;
  return noteContentString
    ? (JSON.parse(noteContentString) as PartialBlock[])
    : undefined;
}

export default function TextEditor({ note }: { note: Note }) {
  const { theme } = useTheme();
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "loading"
  >("loading");

  useEffect(() => {
    if (note) {
      getNoteContent(note).then((content) => {
        setInitialContent(content);
      });
    }
  }, [note]);

  const saveDataHandler = useCallback(
    async (data: Block[]) => {
      async function saveData(content: Block[]) {
        try {
          const dataString = JSON.stringify(content);
          const response = await saveNote(note.id, dataString);
          if (response.success) {
            console.log("Note saved successfully");
          } else {
            console.error("Error saving note:", response.error);
          }
        } catch (error) {
          console.error(error);
        }
      }
      await saveData(data);
    },
    [note],
  );

  const debouncedSaveData = useMemo(
    () => debounce(saveDataHandler, 1000),
    [saveDataHandler],
  );

  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({ initialContent });
  }, [initialContent]);

  if (editor === undefined) {
    return (
      <p className="mt-4 text-sm font-medium text-muted-foreground">
        Fetching contents of your note...
      </p>
    );
  }

  return (
    <BlockNoteView
      editor={editor}
      onChange={() => debouncedSaveData(editor.document)}
      className="editor mt-4"
      theme={theme == "light" ? lightTheme : darkTheme}
    />
  );
}
