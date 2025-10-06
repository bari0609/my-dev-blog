import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handler(req,res){
    // データ取得
    const posts = await prisma.post.findMany();
    
    res.status(200).json(posts);
}

// 動作確認用
await prisma.post.create({
    data:{
        title:"テスト記事2",
        content:"これがDBに入るかテスト！2"
    }
});