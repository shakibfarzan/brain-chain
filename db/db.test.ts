import { describe, vi } from "vitest";

import prisma from "@/db/__mocks__/prisma";
import userTests from "@/db/user/userTests";

vi.mock("./index", () => ({
  default: prisma,
}));
describe("All Tests of DB", () => {
  userTests();
});
