import { PrismaClient } from '@prisma/client';

declare global {
  // allow attaching prisma to global to prevent multiple instances during hot-reload in dev
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

const prisma = (global as any).__prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  (global as any).__prisma = prisma;
}

export default prisma;
