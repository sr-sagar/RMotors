import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined;
}

// Prevent multiple instances in dev
export const prisma = global.prisma || new PrismaClient({
    log: ["query"],
  });




  
  
if(process.env.NODE_ENV === "development") global.prisma = prisma;
