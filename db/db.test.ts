import { describe, vi } from "vitest";

import prisma from "@/db/__mocks__/prisma";
import tests from "@/db/user/tests";

vi.mock("./index", () => ({
  default: prisma,
}));
describe("All Tests of DB", () => {
  tests();
});
