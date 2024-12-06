import { ActivityType } from "@prisma/client";

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

export const ActivityTypes: Record<ActivityType, string> = {
  ANSWER_ACCEPTED: "Answer Accepted",
  ANSWER_POSTED: "Answer Posted",
  ANSWER_UPVOTED: "Answer Upvoted",
  BADGE_EARNED: "Badge Earned",
  COMMENT_POSTED: "Comment Posted",
  PROFILE_UPDATED: "Profile Updated",
  QUESTION_POSTED: "Question Posted",
  QUESTION_UPVOTED: "Question Upvoted",
  USER_REGISTERED: "User Registered",
};
