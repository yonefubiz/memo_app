import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// READ
export async function readMemos() {
    return await prisma.memos.findMany({
        orderBy: {
            updated_at: 'desc',
        },
    });
}