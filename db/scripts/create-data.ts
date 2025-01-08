/* eslint-disable no-console */
import { faker } from "@faker-js/faker";

import { safePromise } from "@/utils";
import prisma from "@/db";

(async () => {
  const [users, usersErr] = await safePromise(prisma.user.findMany());

  if (usersErr) {
    console.error("Error on finding users");

    return;
  }
  if (users?.length === 0) {
    console.error("No users found. Please add users to the database first.");

    return;
  }
  console.log(`Found ${users?.length} users.`);

  // Step 1: Create Tags
  const tags = Array.from({ length: 15 }, () => ({
    name: faker.lorem.word(),
  }));

  const [createdTags, tagsErr] = await safePromise(
    prisma.tag.createMany({ data: tags }),
  );

  if (tagsErr) {
    console.error("Error on creating tag", tagsErr);

    return;
  }
  console.log(`Created ${createdTags?.count} tags.`);

  // Fetch created tag
  const [allTags, fTagsErr] = await safePromise(prisma.tag.findMany());

  if (fTagsErr) {
    console.error("Error on finding tag");

    return;
  }

  // Step 2: Create Questions
  for (const user of users ?? []) {
    const questionCount = faker.number.int({ min: 8, max: 15 }); // Each user creates 3-5 questions

    for (let i = 0; i < questionCount; i++) {
      const questionTags = faker.helpers.arrayElements(allTags ?? [], 5); // Randomly pick 3 tag
      const [createdQuestion, cQuestionsErr] = await safePromise(
        prisma.question.create({
          data: {
            title: faker.lorem.sentence(),
            slug: faker.lorem.slug(),
            description: faker.lorem.paragraph(),
            userId: user.id,
            createdAt: faker.date.past({ years: 1 }), // Random date in the past year
            tags: {
              connect: questionTags.map((tag) => ({ id: tag.id })),
            },
          },
        }),
      );

      if (cQuestionsErr) {
        console.error("Error on creating cQuestions");

        return;
      }

      console.log(`Created question: ${createdQuestion?.title}`);
    }
  }

  // Fetch all questions
  const [questions, fQuestionsErr] = await safePromise(
    prisma.question.findMany(),
  );

  if (fQuestionsErr) {
    console.error("Error on finding fQuestions");

    return;
  }

  // Step 3: Create Answers
  for (const user of users ?? []) {
    for (const question of questions ?? []) {
      if (question.userId === user.id) continue; // Skip own questions

      const answerDate = faker.date.between({
        from: question.createdAt,
        to: new Date(),
      }); // Date after question creation

      const [answer, cAnswerErr] = await safePromise(
        prisma.answer.create({
          data: {
            content: faker.lorem.paragraph(),
            questionId: question.id,
            userId: user.id,
            createdAt: answerDate,
          },
        }),
      );

      if (cAnswerErr) {
        console.error("Error on creating cAnswer");

        return;
      }

      console.log(`User ${user?.name} answered question: ${question?.title}`);

      // Randomly mark one answer as accepted
      const [answersOfQ, answersOfQErr] = await safePromise(
        prisma.question
          .findUnique({
            where: { id: question.id },
          })
          .answers(),
      );

      if (answersOfQErr) {
        console.error("Error on finding answer of question");

        return;
      }

      if (faker.datatype.boolean() && !answersOfQ?.some((a) => a.isAccepted)) {
        const [, updateAnswerErr] = await safePromise(
          prisma.answer.update({
            where: { id: answer?.id },
            data: { isAccepted: true },
          }),
        );

        if (updateAnswerErr) {
          console.error("Error on update answer");

          return;
        }
        console.log(`Marked answer as accepted: ${answer?.id}`);
      }
    }
  }

  // Step 4: Add Comments to Questions and Answers
  for (const question of questions ?? []) {
    const commentCount = faker.number.int({ min: 2, max: 8 });

    for (let i = 0; i < commentCount; i++) {
      const commentDate = faker.date.between({
        from: question.createdAt,
        to: new Date(),
      }); // Date after question creation

      const [, cCommentErr] = await safePromise(
        prisma.comment.create({
          data: {
            content: faker.lorem.sentence(),
            userId: faker.helpers.arrayElement(users ?? []).id,
            questionId: question.id,
            createdAt: commentDate,
          },
        }),
      );

      if (cCommentErr) {
        console.error("Error on creating comment");

        return;
      }
    }

    console.log(
      `Added ${commentCount} comments to question: ${question.title}`,
    );
  }

  const [answers, fAnswersErr] = await safePromise(prisma.answer.findMany());

  if (fAnswersErr) {
    console.error("Error on finding Answers");

    return;
  }

  for (const answer of answers ?? []) {
    const commentCount = faker.number.int({ min: 2, max: 8 });

    for (let i = 0; i < commentCount; i++) {
      const commentDate = faker.date.between({
        from: answer.createdAt,
        to: new Date(),
      }); // Date after answer creation

      const [, cCommentErr] = await safePromise(
        prisma.comment.create({
          data: {
            content: faker.lorem.sentence(),
            userId: faker.helpers.arrayElement(users ?? []).id,
            answerId: answer.id,
            createdAt: commentDate,
          },
        }),
      );

      if (cCommentErr) {
        console.error("Error on creating comment");

        return;
      }
    }

    console.log(`Added ${commentCount} comments to answer: ${answer.id}`);
  }

  // Step 5: Add Votes to Answers
  for (const answer of answers ?? []) {
    const voteCount = faker.number.int({ min: 3, max: 7 });

    for (let i = 0; i < voteCount; i++) {
      const [, cVoteErr] = await safePromise(
        prisma.vote.create({
          data: {
            value: faker.helpers.arrayElement([1, -1]), // Upvote or downvote
            userId: faker.helpers.arrayElement(users ?? []).id,
            answerId: answer.id,
          },
        }),
      );

      if (cVoteErr) {
        console.error("Error on creating vote");

        return;
      }
    }

    console.log(`Added ${voteCount} votes to answer: ${answer.id}`);
  }

  // Step 6: Report Content
  for (const question of questions ?? []) {
    if (faker.datatype.boolean()) {
      const [, cReportedErr] = await safePromise(
        prisma.reportedContent.create({
          data: {
            reason: faker.lorem.sentence(),
            userId: faker.helpers.arrayElement(users ?? []).id,
            questionId: question.id,
          },
        }),
      );

      if (cReportedErr) {
        console.error("Error on creating reported contents");

        return;
      }
      console.log(`Reported question: ${question.title}`);
    }
  }

  for (const answer of answers ?? []) {
    if (faker.datatype.boolean()) {
      const [, cReportedErr] = await safePromise(
        prisma.reportedContent.create({
          data: {
            reason: faker.lorem.sentence(),
            userId: faker.helpers.arrayElement(users ?? []).id,
            answerId: answer.id,
          },
        }),
      );

      if (cReportedErr) {
        console.error("Error on creating reported contents");

        return;
      }
      console.log(`Reported answer: ${answer.id}`);
    }
  }
})();
