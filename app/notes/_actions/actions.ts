"use server";
import prisma from "@/db";
import { revalidatePath } from "next/cache";

export async function addNote({
  title,
  folderId,
  clerkId,
  order,
}: {
  title: string;
  folderId: string;
  clerkId: string;
  order: number;
}) {
  try {
    if (!title || !folderId || !clerkId) {
      return { success: false, data: null, error: "Missing required fields" };
    }
    const note = await prisma.note.create({
      data: {
        title: title,
        content: "",
        userId: clerkId,
        folderId: folderId,
        order: order,
      },
    });
    revalidatePath("/notes");
    return { success: true, data: note, error: null };
  } catch (e: any) {
    console.log(e);
    return { success: false, data: null, error: e.message };
  }
}

export async function createFolder(
  folderName: string,
  clerkId: string,
  order: number,
) {
  try {
    if (!folderName || !clerkId || !order) {
      return { success: false, data: null, error: "Missing required fields" };
    }
    const folder = await prisma.folder.create({
      data: {
        name: folderName,
        userId: clerkId,
        order: order,
      },
    });
    revalidatePath("/notes");
    return { success: true, data: folder, error: null };
  } catch (e: any) {
    console.log(e);
    return { success: false, data: null, error: e.message };
  }
}

export async function trashFolder(folderId: string, date: Date) {
  try {
    if (!folderId) {
      return { success: false, data: null, error: "Missing required fields" };
    }
    const folder = await prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
        trashed: true,
        trashedDate: date,
      },
    });
    revalidatePath("/notes");
    return { success: true, data: folder, error: null };
  } catch (e: any) {
    console.log(e);
    return { success: false, data: null, error: e.message };
  }
}

export async function trashNote(noteId: string, date: Date) {
  try {
    if (!noteId) {
      return { success: false, data: null, error: "Missing required fields" };
    }
    const note = await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        trashed: true,
        trashedDate: date,
      },
    });
    revalidatePath("/notes");
    return { success: true, data: note, error: null };
  } catch (e: any) {
    console.log(e);
    return { success: false, data: null, error: e.message };
  }
}

export async function updateNoteTitle(noteId: string, title: string) {
  try {
    if (!noteId || !title) {
      return { success: false, data: null, error: "Missing required fields" };
    }
    const note = await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        title: title,
      },
    });
    revalidatePath("/notes");
    return { success: true, data: note, error: null };
  } catch (e: any) {
    console.log(e);
    return { success: false, data: null, error: e.message };
  }
}

export async function saveNote(noteId: string, content: string) {
  try {
    if (!noteId || !content) {
      return { success: false, data: null, error: "Missing required fields" };
    }
    const note = await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        content: content,
      },
    });
    return { success: true, data: note, error: null };
  } catch (e: any) {
    console.log(e);
    return { success: false, data: null, error: e.message };
  }
}

export async function restoreNote(noteId: string) {
  try {
    if (!noteId) {
      return { success: false, data: null, error: "Missing required fields" };
    }
    const note = await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        trashed: false,
        trashedDate: null,
      },
    });
    revalidatePath("/notes");
    return { success: true, data: note, error: null };
  } catch (e: any) {
    console.log(e);
    return { success: false, data: null, error: e.message };
  }
}

export async function deleteNote(noteId: string) {
  try {
    if (!noteId) {
      return { success: false, data: null, error: "Missing required fields" };
    }
    const note = await prisma.note.delete({
      where: {
        id: noteId,
      },
    });
    revalidatePath("/notes");
    return { success: true, data: note, error: null };
  } catch (e: any) {
    console.log(e);
    return { success: false, data: null, error: e.message };
  }
}

export async function restoreFolder(folderId: string) {
  try {
    if (!folderId) {
      return { success: false, data: null, error: "Missing required fields" };
    }
    const folder = await prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
        trashed: false,
        trashedDate: null,
      },
    });
    revalidatePath("/notes");
    return { success: true, data: folder, error: null };
  } catch (e: any) {
    console.log(e);
    return { success: false, data: null, error: e.message };
  }
}

export async function deleteFolder(folderId: string) {
  try {
    if (!folderId) {
      return { success: false, data: null, error: "Missing required fields" };
    }
    const folder = await prisma.folder.delete({
      where: {
        id: folderId,
      },
    });
    revalidatePath("/notes");
    return { success: true, data: folder, error: null };
  } catch (e: any) {
    console.log(e);
    return { success: false, data: null, error: e.message };
  }
}

export async function renameFolder(folderId: string, name: string) {
  try {
    if (!folderId || !name) {
      return { success: false, data: null, error: "Missing required fields" };
    }
    const folder = await prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
        name: name,
      },
    });
    revalidatePath("/notes");
    return { success: true, data: folder, error: null };
  } catch (e: any) {
    console.log(e);
    return { success: false, data: null, error: e.message };
  }
}
