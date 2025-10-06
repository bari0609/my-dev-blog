import type {NextApiRequest,NextApiResponse} from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    // 一覧取得
    if(req.method == 'GET'){
        const posts = await prisma.post.findMany({
            orderBy:{createdAt:'desc'},
        });
        res.status(200).json(posts);
    // 投稿
    }else if(req.method === 'POST'){
        const {title,content} = req.body;
        if(!title || !content){
            return res.status(400).json({message:'Title and content are required'})
        }
        const newPost = await prisma.post.create({
            data:{title,content},
        });
        res.status(201).json(newPost);
    } else {
        res.status(405).json({message:'Method not allowed'});
    }
}