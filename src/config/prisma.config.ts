import { PrismaClient } from '@prisma/client';

/* 
Use This When You want to Log the SQL Query prisma is using as well
const prisma = new PrismaClient({ log: ['query'] }); 
*/

const prisma = new PrismaClient();

export default prisma;
