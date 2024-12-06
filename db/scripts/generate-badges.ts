/* eslint-disable no-console */
import { Prisma } from ".prisma/client";
import dayjs from "dayjs";

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
    prisma.badge.createManyAndReturn({ data, skipDuplicates: true }),
  );

  if (badgesErr) {
    console.error("Error on creating badges", badgesErr);

    return;
  }

  console.log("Badges created");

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
    // general queries
    const [userQuestions, uqErr] = await safePromise(
      prisma.question.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "asc" },
        include: { votes: true },
      }),
    );

    if (uqErr) {
      console.error("Error on getting user questions", uqErr);

      return;
    }
    const [userAnswers, uaErr] = await safePromise(
      prisma.answer.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "asc" },
        include: { votes: true, question: true },
      }),
    );

    if (uaErr) {
      console.error("Error on getting user answers", uaErr);

      return;
    }

    //   search for first question
    {
      const firstQuestion = userQuestions?.length
        ? userQuestions[0]
        : undefined;

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
      const firstAnswer = userAnswers?.length ? userAnswers[0] : undefined;

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
    let hasPopularQuestion = false;

    // search for top contributor
    {
      let count = 0;

      userQuestions?.forEach((userQuestion) => {
        const singleQCount = userQuestion.votes.filter(
          (v) => v.value === 1,
        ).length;

        if (singleQCount >= 50) hasPopularQuestion = true;
        count += singleQCount;
      });

      userAnswers?.forEach((userAnswer) => {
        count += userAnswer.votes.filter((v) => v.value === 1).length;
      });

      if (count >= 100 && topContributorBadge?.id) {
        const [, err] = await safePromise(
          prisma.userBadge.create({
            data: { userId: user.id, badgeId: topContributorBadge.id },
          }),
        );

        if (err) {
          console.error("Error on creating TC badge", err);

          return;
        }
      }
    }
    // search for popular question
    {
      if (hasPopularQuestion && popularQuestionBadge?.id) {
        const [, err] = await safePromise(
          prisma.userBadge.create({
            data: { userId: user.id, badgeId: popularQuestionBadge.id },
          }),
        );

        if (err) {
          console.error("Error on creating PQ badge", err);

          return;
        }
      }
    }
    const numberOfAcceptedAnswers = userAnswers?.filter(
      (a) => a.isAccepted,
    ).length;

    // search for accepted answer
    {
      if (numberOfAcceptedAnswers && acceptedAnswerBadge?.id) {
        const [, err] = await safePromise(
          prisma.userBadge.create({
            data: { userId: user.id, badgeId: acceptedAnswerBadge.id },
          }),
        );

        if (err) {
          console.error("Error on creating AA badge", err);

          return;
        }
      }
    }
    // search for tag specialist
    {
      const [count, tagsErr] = await safePromise(
        prisma.tag.count({
          where: {
            OR: [
              { Question: { some: { userId: user.id } } },
              {
                Question: { some: { answers: { some: { userId: user.id } } } },
              },
            ],
          },
        }),
      );

      if (tagsErr) {
        console.error("Error on getting count of tags");

        return;
      }
      if (count && count >= 10 && tagSpecialistBadge?.id) {
        const [, err] = await safePromise(
          prisma.userBadge.create({
            data: { userId: user.id, badgeId: tagSpecialistBadge.id },
          }),
        );

        if (err) {
          console.error("Error on creating TS badge", err);

          return;
        }
      }
    }
    // search for early birds
    {
      for (const userAnswer of userAnswers ?? []) {
        const questionCreatedAt = userAnswer.question.createdAt;
        const isFewerThan15 = dayjs(questionCreatedAt)
          .add(15, "minutes")
          .isBefore(dayjs(userAnswer.createdAt), "minutes");

        if (isFewerThan15 && earlyBirdBadge?.id) {
          const [, err] = await safePromise(
            prisma.userBadge.create({
              data: { userId: user.id, badgeId: earlyBirdBadge.id },
            }),
          );

          if (err) {
            console.error("Error on creating EB badge", err);

            return;
          }
          break;
        }
      }
    }
    // search for community helper
    {
      const [userCommentsCount, ucErr] = await safePromise(
        prisma.comment.count({
          where: { userId: user.id },
        }),
      );

      if (ucErr) {
        console.error("Error on getting user comments count", ucErr);

        return;
      }

      if (
        userCommentsCount &&
        userCommentsCount >= 20 &&
        communityHelperBadge?.id
      ) {
        const [, err] = await safePromise(
          prisma.userBadge.create({
            data: { userId: user.id, badgeId: communityHelperBadge.id },
          }),
        );

        if (err) {
          console.error("Error on creating CH badge", err);

          return;
        }
      }
    }
    // search for mentor
    {
      if (
        numberOfAcceptedAnswers &&
        numberOfAcceptedAnswers >= 10 &&
        mentorBadge?.id
      ) {
        const [, err] = await safePromise(
          prisma.userBadge.create({
            data: { userId: user.id, badgeId: mentorBadge.id },
          }),
        );

        if (err) {
          console.error("Error on creating M badge", err);

          return;
        }
      }
    }
    console.log("All badges created for user", user.name);
  }
})();
