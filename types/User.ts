import { Folder, Note, User } from "@prisma/client";

export interface FolderWithNotes extends Folder {
  notes: {
    id: string;
    title: string;
  }[];
}

interface UserDetails extends User {
  folders: FolderWithNotes[];
}

export default UserDetails;
