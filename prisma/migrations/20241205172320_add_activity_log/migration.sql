-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('QUESTION_POSTED', 'ANSWER_POSTED', 'COMMENT_POSTED', 'QUESTION_UPVOTED', 'ANSWER_UPVOTED', 'ANSWER_ACCEPTED', 'BADGE_EARNED', 'PROFILE_UPDATED', 'USER_REGISTERED');

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "activityType" "ActivityType" NOT NULL,
    "relatedId" TEXT,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
