import prisma from "../lib/prisma";

export const findUserIdByEmail = async (email: string) => {
 const user = await prisma.user.findUnique({
  where: {
   email: email,
  },
  select: {
   id: true,
  },
 });

 if (!user) throw new Error("User not found");

 return user;
}