import { Prisma } from "@prisma/client";
import { expect, test } from "vitest";

import prisma from "@/db/__mocks__/prisma";
import { createUser } from "@/db/user";

const tests = () => {
  test("createUser should return the generated user-dropdown", async () => {
    const newUser: Prisma.UserCreateInput = {
      password: "12345678A*",
      email: "test@test.com",
      name: "Test user",
    };
    const completeUserObj = {
      ...newUser,
      id: "123",
      bio: null,
      createdAt: new Date(),
      image: null,
      isAdmin: false,
      reputation: 0,
      updatedAt: new Date(),
    };

    prisma.user.create.mockResolvedValue(completeUserObj as any);
    const { data: user, dbError, schemaError } = await createUser(newUser);

    expect(dbError).toBeNull();
    expect(schemaError).toBeUndefined();
    expect(user?.name).toBe(newUser.name);
    expect(user?.email).toBe(newUser.email);
  });
};

export default tests;
