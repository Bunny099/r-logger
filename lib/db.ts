import { PrismaClient } from "../src/generated/prisma/client";
import {PrismaPg} from "@prisma/adapter-pg";
import 'dotenv/config'
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!
})

export const prismaDb = new PrismaClient({adapter})