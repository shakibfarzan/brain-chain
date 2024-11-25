import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import UserCreateManyInput = Prisma.UserCreateManyInput;

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    query: {
      user: {
        async create({ args, query }) {
          if (args.data.password)
            args.data.password = await bcrypt.hash(args.data.password, 10);

          return query(args);
        },
        async createMany({ args, query }) {
          if (Array.isArray(args.data)) {
            const data: UserCreateManyInput[] = [];

            for (const d of args.data) {
              if (d.password?.length)
                data.push({
                  ...d,
                  password: await bcrypt.hash(d.password!, 10),
                });
              else data.push(d);
            }
            args.data = data;
          }

          return query(args);
        },
      },
    },
  });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
