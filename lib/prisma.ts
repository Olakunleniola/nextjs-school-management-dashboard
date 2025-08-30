import { PrismaClient } from "@/generated/prisma";

// Create PrismaClient instance
const createPrismaClient = () => new PrismaClient();

// Extend globalThis to cache prisma in dev (so hot reloads don’t spawn multiple clients)
declare const globalThis: {
  prismaGlobal: ReturnType<typeof createPrismaClient>;
} & typeof global;

// Either use cached PrismaClient or create a new one
const prisma = globalThis.prismaGlobal ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
