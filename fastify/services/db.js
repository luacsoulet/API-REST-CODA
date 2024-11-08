import { PrismaClient } from '@prisma/client';

let client = new PrismaClient();
console.log("[DEBUG] connected to DB");

export const prisma = client;