import { readMemos } from 'database/memos';

export async function GET(req: Request) {
    try {
        return await Response.json(readMemos(), {status: 200});
    } catch (e) {
        return Response.json({ message: 'Failed to read memos' }, {status: 500});
    }
  }