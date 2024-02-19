import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// CREATE
export async function createMemo(params: {title: string, content: string}) {
    return await prisma.memos.create({
        data: {
            title: params.title,
            content: params.content
        }
    });
}
// READ
export async function readMemo(id: string) {
    return await prisma.memos.findUnique({
        where: {
            id : id
        }
    });
}
// UPDATE
export async function updateMemo(params: {title: string, content: string}, id: string) {
    return await prisma.memos.update({
        where: {
            id: id
        },
        data: {
            title: params.title,
            content: params.content
        }
    });
}
// DELETE
export async function deleteMemo(id: string) {
    return await prisma.memos.delete({
        where: {
            id : id
        }
    });
}