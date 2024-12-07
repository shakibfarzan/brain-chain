import { auth } from "@/auth";
import { safePromise } from "@/utils";
import prisma from "@/db/index";

export const getCurrentUserId = async () => {
  const session = await auth();
  const [user] = await safePromise(
    prisma.user.findUnique({
      where: { email: session?.user?.email ?? "" },
      select: { id: true },
    }),
  );

  return user?.id;
};
