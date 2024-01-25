import prisma from "@/lib/prisma";

export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
  } catch (e) {}
};
