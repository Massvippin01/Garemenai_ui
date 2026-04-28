import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const connectionString = (process.env.DATABASE_URL || "postgresql://neondb_owner:npg_rVTqksD64NHL@ep-aged-night-aorsyuon.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require").trim();

const pool = new Pool({ connectionString });
// @ts-ignore: Prisma adapter-neon typings clash with latest neondatabase/serverless Pool
const adapter = new PrismaNeon(pool);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
