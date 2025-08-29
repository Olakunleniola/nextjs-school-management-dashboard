import { PrismaClient } from "@prisma/client";

const PrismaClientSignleton = () => new PrismaClient()

declare const globalThis: {
    prismaGlobal: ReturnType<typeof PrismaClientSignleton>;
} & typeof global

const prisma = globalThis.prismaGlobal ?? PrismaClientSignleton;

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal= prisma