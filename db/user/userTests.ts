import { Prisma } from "@prisma/client";
import { expect, test } from "vitest";

import prisma from "@/db/__mocks__/prisma";
import { createUser } from "@/db/user";

const userTests = () => {
  test("createUser should return the generated user", async () => {
    const newUser: Prisma.UserCreateInput = {
      password: "12345678A*",
      email: "test@test.com",
    };
    const completeUserObj = {
      ...newUser,
      id: "123",
      bio: null,
      createdAt: new Date(),
      profileImage: null,
      isAdmin: false,
      reputation: 0,
      updatedAt: new Date(),
    };

    prisma.user.create.mockResolvedValue(completeUserObj);
    const { data: user, dbError, schemaError } = await createUser(newUser);

    expect(dbError).toBeNull();
    expect(schemaError).toBeUndefined();
    expect(user?.username).toBe(newUser.username);
    expect(user?.email).toBe(newUser.email);
  });
};

export default userTests;
