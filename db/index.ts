import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    query: {
      user: {
        async create({ args, query }) {
          args.data.password = await bcrypt.hash(args.data.password, 10);

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
