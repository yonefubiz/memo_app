import { readMemo, updateMemo, deleteMemo } from 'database/memo';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        // Queryの取得
        const id = params.id;
        return Response.json(await readMemo(id), {status: 200});
    } catch (e) {
        return Response.json({ message: 'Failed to read memo' }, {status: 500});
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        // Queryの取得
        const id = params.id;
        // Bodyの取得
        const body = await req.json();
        // パラメータの設定
        const data : {title: string, content: string} = {title: body.title, content: body.content};
        // レスポンスの設定
        return await Response.json(await updateMemo(data, id), {status: 200});
    } catch (e) {
        return Response.json({ message: 'Failed to update memo' }, {status: 500});
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        // Queryの取得
        const id = params.id;
        return await Response.json(await deleteMemo(id), {status: 200});
    } catch (e) {
        return Response.json({ message: 'Failed to delete memo' }, {status: 500});
    }
}
