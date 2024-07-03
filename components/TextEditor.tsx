// import "@blocknote/core/fonts/inter.css";
// import { useCreateBlockNote } from "@blocknote/react";
// import { BlockNoteView, Theme } from "@blocknote/mantine";
// import "@blocknote/mantine/style.css";

// export default function TextEditor() {
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
//         background: "#fff",
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

//   const notesTheme = {
//     light: darkTheme,
//     dark: darkTheme,
//   };

//   // Renders the editor instance using a React component.
//   return (
//     <BlockNoteView editor={editor} className="editor" theme={notesTheme} />
//   );
// }

export default function TextEditor() {
  return <div>TextEditor</div>;
}
