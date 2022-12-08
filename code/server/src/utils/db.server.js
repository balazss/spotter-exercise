import { PrismaClient } from "@prisma/client";

// Prevent multiple instances of Prisma Client in development javascript
let db;

if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
} else {
  if (!global.db) {
    global.db = new PrismaClient();
  }
  db = global.db;
}

export { db };
