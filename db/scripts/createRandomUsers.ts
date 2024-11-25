import { faker } from "@faker-js/faker/locale/en";

import { safePromise } from "@/utils";
import prisma from "@/db";

(async (count: number) => {
  const users = Array.from({ length: count }, () => ({
    name: faker.internet.displayName(),
    email: faker.internet.email(),
    password: "1234Test$",
    bio: faker.lorem.sentence(),
    image: faker.image.avatar(),
  }));
  const [res, error] = await safePromise(
    prisma.user.createMany({
      data: users,
      skipDuplicates: true,
    }),
  );

  if (res) console.log(`${count} random users created successfully!`);
  else if (error) console.error("Error creating random users:", error);
  await prisma.$disconnect();
})(20);
