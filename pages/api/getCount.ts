// getting count from db and return value
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const visitor = await prisma.visitor.findFirst();

    if (!visitor) {
        await prisma.visitor.create({ data: { count: 1 } });
        return res.status(200).json({ count: 1 });
    }

    res.status(200).json({ count: visitor.count });
}