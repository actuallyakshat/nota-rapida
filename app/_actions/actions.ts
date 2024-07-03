"use server";

import prisma from "@/db";

export async function getUserDetails(
  clerkId: string,
  email: string,
  name: string,
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
      include: {
        notes: true,
        folders: true,
      },
    });
    if (!user) {
      const newUser = await prisma.user.create({
        data: {
          clerkId,
          email: email,
          name: name,
        },
      });
      return { success: true, data: newUser };
    }
    return { success: true, data: user };
  } catch (error) {
    console.log(error);
    return { success: false, data: null };
  }
}
