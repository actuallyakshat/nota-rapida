// import "@blocknote/core/fonts/inter.css";
// import { useCreateBlockNote } from "@blocknote/react";
// import { BlockNoteView, Theme } from "@blocknote/mantine";
// import "@blocknote/mantine/style.css";
// import { useTheme } from "next-themes";

// export default function TextEditor() {
//   const { theme } = useTheme();
//   // Creates a new editor instance.
//   const editor = useCreateBlockNote({
//     initialContent: [
//       {
//         type: "heading",
//         content: "New Note",
//       },
//     ],
//   });
//   const lightTheme = {
//     colors: {
//       editor: {
//         background: "#f5f5f5",
//       },
//     },
//   } satisfies Theme;
//   const darkTheme = {
//     colors: {
//       editor: {
//         background: "#141414",
//         text: "#fff",
//       },
//     },
//   } satisfies Theme;

//   // Renders the editor instance using a React component.
//   return (
//     <BlockNoteView
//       editor={editor}
//       className="editor"
//       theme={theme == "light" ? lightTheme : darkTheme}
//     />
//   );
// }

export default function TextEditor() {
  return <div>TextEditor</div>;
}
