/* eslint-disable no-console */
import { Prisma } from ".prisma/client";

import { safePromise } from "@/utils";
import prisma from "@/db";

const data: Prisma.BadgeCreateManyInput[] = [
  {
    title: "First Question",
    description: "Awarded for asking the first question.",
    criteria: "User posts their first question.",
  },
  {
    title: "First Answer",
    description: "Awarded for answering the first question.",
    criteria: "User posts their first answer.",
  },
  {
    title: "Top Contributor",
    description: "Awarded for reaching 100 upvotes on contributions.",
    criteria:
      "Total upvotes across questions, answers, and comments exceed 100.",
  },
  {
    title: "Popular Question",
    description: "Awarded for a question receiving 50 upvotes.",
    criteria: "A single question posted by the user gets 50 upvotes.",
  },
  {
    title: "Accepted Answer",
    description:
      "Awarded for having an answer marked as accepted for the first time.",
    criteria: "User’s answer is accepted as the best answer.",
  },
  {
    title: "Tag Specialist",
    description:
      "Awarded for contributing to a specific tag with 10 questions or answers.",
    criteria: "User posts 10 questions or answers using the same tag.",
  },
  {
    title: "Early Bird",
    description:
      "Awarded for answering a question within 15 minutes of it being posted.",
    criteria:
      "User submits an answer within 15 minutes of the question's creation time.",
  },
  {
    title: "Community Helper",
    description: "Awarded for commenting on 20 different questions or answers.",
    criteria: "User posts 20 comments.",
  },
  {
    title: "Mentor",
    description: "Awarded for having 10 of your answers accepted by others.",
    criteria: "10 answers marked as accepted.",
  },
];

(async () => {
  const [badges, badgesErr] = await safePromise(
    prisma.badge.createManyAndReturn({ data }),
  );

  if (badgesErr) {
    console.error("Error on creating badges", badgesErr);

    return;
  }

  const firstQuestionBadge = badges?.find((bg) => bg.title === data[0].title);
  const firstAnswerBadge = badges?.find((bg) => bg.title === data[1].title);
  const topContributorBadge = badges?.find((bg) => bg.title === data[2].title);
  const popularQuestionBadge = badges?.find((bg) => bg.title === data[3].title);
  const acceptedAnswerBadge = badges?.find((bg) => bg.title === data[4].title);
  const tagSpecialistBadge = badges?.find((bg) => bg.title === data[5].title);
  const earlyBirdBadge = badges?.find((bg) => bg.title === data[6].title);
  const communityHelperBadge = badges?.find((bg) => bg.title === data[7].title);
  const mentorBadge = badges?.find((bg) => bg.title === data[8].title);

  const [users, getUsersErr] = await safePromise(prisma.user.findMany());

  if (getUsersErr) {
    console.error("Error on getting users", getUsersErr);

    return;
  }

  for (const user of users ?? []) {
    //   search for first question
    {
      const [firstQuestion, fqErr] = await safePromise(
        prisma.question.findFirst({
          where: { id: user.id },
          orderBy: { createdAt: "asc" },
        }),
      );

      if (fqErr) {
        console.error("Error on getting FQ", fqErr);

        return;
      }
      if (firstQuestion?.id && firstQuestionBadge?.id) {
        const [, err] = await safePromise(
          prisma.userBadge.create({
            data: { userId: user.id, badgeId: firstQuestionBadge.id },
          }),
        );

        if (err) {
          console.error("Error on creating FQ badge", err);

          return;
        }
      }
    }
    // search for first answer
    {
      const [firstAnswer, faError] = await safePromise(
        prisma.answer.findFirst({
          where: { id: user.id },
          orderBy: { createdAt: "asc" },
        }),
      );

      if (faError) {
        console.error("Error on getting FA", faError);

        return;
      }
      if (firstAnswer?.id && firstAnswerBadge?.id) {
        const [, err] = await safePromise(
          prisma.userBadge.create({
            data: { userId: user.id, badgeId: firstAnswerBadge.id },
          }),
        );

        if (err) {
          console.error("Error on creating FA badge", err);

          return;
        }
      }
    }
  }
})();
