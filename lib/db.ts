import { PrismaClient } from "@prisma/client";//for interacting with database
declare global {//global variable declaration
    var prisma: PrismaClient | undefined;// holds the database instance
}

export const db = globalThis.prisma || new PrismaClient();
                // either the existing globalThis.prisma instance or a new instance of PrismaClient.
if (process.env.NODE_ENV !== "production")
    globalThis.prisma = db
// This ensures that the prisma variable is globally accessible and retains the database connection across the application.
