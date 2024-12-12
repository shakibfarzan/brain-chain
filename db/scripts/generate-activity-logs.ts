/* eslint-disable no-console */

import { format } from "date-fns";

import prisma from "@/db";
import { safePromise } from "@/utils";
import { DATETIME_FORMATS } from "@/config/constants";

(async () => {
  const [, err] = await safePromise(
    (async () => {
      const users = await prisma.user.findMany();

      for (const user of users) {
        const userId = user.id;

        // 1. Fetch user's questions and create activity logs
        const questions = await prisma.question.findMany({
          where: { userId },
        });

        for (const question of questions) {
          await prisma.activityLog.create({
            data: {
              userId,
              activityType: "QUESTION_POSTED",
              relatedId: question.id,
              description: `Posted a question: "${question.title}"`,
              createdAt: question.createdAt,
            },
          });

          // Fetch question upvotes
          const questionUpvotes = await prisma.vote.findMany({
            where: { questionId: question.id },
          });

          for (const upvote of questionUpvotes) {
            await prisma.activityLog.create({
              data: {
                userId: upvote.userId,
                activityType: "QUESTION_UPVOTED",
                relatedId: upvote.id,
                description: `Upvoted a question: "${question.title}"`,
                createdAt: upvote.createdAt,
              },
            });
          }
        }

        // 2. Fetch user's answers and create activity logs
        const answers = await prisma.answer.findMany({
          where: { userId },
        });

        for (const answer of answers) {
          await prisma.activityLog.create({
            data: {
              userId,
              activityType: "ANSWER_POSTED",
              relatedId: answer.id,
              description: `Answered a question: "${answer.content.slice(0, 50)}..."`,
              createdAt: answer.createdAt,
            },
          });

          // Fetch answer upvotes
          const answerUpvotes = await prisma.vote.findMany({
            where: { answerId: answer.id },
          });

          for (const upvote of answerUpvotes) {
            await prisma.activityLog.create({
              data: {
                userId: upvote.userId,
                activityType: "ANSWER_UPVOTED",
                relatedId: upvote.id,
                description: `Upvoted an answer: "${answer.content.slice(0, 50)}..."`,
                createdAt: upvote.createdAt,
              },
            });
          }

          // Fetch accepted answers
          if (answer.isAccepted) {
            await prisma.activityLog.create({
              data: {
                userId,
                activityType: "ANSWER_ACCEPTED",
                relatedId: answer.id,
                description: `Answer accepted for: "${answer.content.slice(0, 50)}..."`,
                createdAt: answer.updatedAt, // Assuming updatedAt is set when accepted
              },
            });
          }
        }

        // 3. Fetch user's comments and create activity logs
        const comments = await prisma.comment.findMany({
          where: { userId },
        });

        for (const comment of comments) {
          await prisma.activityLog.create({
            data: {
              userId,
              activityType: "COMMENT_POSTED",
              relatedId: comment.id,
              description: `Commented: "${comment.content.slice(0, 50)}..."`,
              createdAt: comment.createdAt,
            },
          });
        }

        // 4. Log registration activity
        await prisma.activityLog.create({
          data: {
            userId,
            activityType: "USER_REGISTERED",
            description: `User registered on ${format(user.createdAt, DATETIME_FORMATS.DATE_DASH_SEPARATOR)}`,
            createdAt: user.createdAt,
          },
        });

        // 5. Fetch badges earned
        const badges = await prisma.userBadge.findMany({
          where: { userId },
          include: { badge: true },
        });

        for (const userBadge of badges) {
          await prisma.activityLog.create({
            data: {
              userId,
              activityType: "BADGE_EARNED",
              relatedId: userBadge.id,
              description: `Earned badge: "${userBadge.badge.title}"`,
              createdAt: userBadge.earnedAt,
            },
          });
        }

        console.log(`Activity logs generated for user: ${userId}`);
      }

      console.log("Activity log generation completed.");
    })(),
  );

  if (err) {
    console.log("Errrroooorrr");
  }
})();
