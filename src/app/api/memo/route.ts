import { createMemo } from 'database/memo';

export async function POST(req: Request) {
    try {
        // Bodyの取得
        const body = await req.json();
        // パラメータの設定
        const params : {title: string, content: string} = {title: body.title, content: body.content};
        // レスポンスの設定
        return await Response.json(createMemo(params),{status: 200});
    } catch (e) {
        return Response.json({ message: 'Failed to create memo' }, {status: 500});
    }
}
