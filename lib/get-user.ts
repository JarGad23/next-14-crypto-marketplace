import { clerkClient } from "@clerk/nextjs";

export const getUserById = async (userId: string) => {
  const user = await clerkClient.users.getUser(userId);

  return user;
};
