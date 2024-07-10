// incrementing viewer count in db

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const visitor = await prisma.visitor.findFirst();

    if (!visitor) {
        const newVisitor = await prisma.visitor.create({ data: { count: 1 } });
        return res.status(200).json({ count: newVisitor.count });
    }

    const updatedVisitor = await prisma.visitor.update({
        where: { id: visitor.id },
        data: { count: visitor.count + 1 },
    });

    res.status(200).json({ count: updatedVisitor.count });
}