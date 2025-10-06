import {NextApiRequest,NextApiResponse} from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {id} = req.query;

    if(req.method === 'GET'){
        const post = await prisma.post.findUnique({
            where:{id:Number(id)},
        });

        if(!post){
            return res.status(404).json({message:'投稿が見つかりません'});
        }

        return res.status(200).json(post);
    }

    res.status(405).json({message:'Method not allowed'});
}