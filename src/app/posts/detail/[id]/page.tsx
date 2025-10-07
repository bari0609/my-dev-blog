import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Params {
  params: { id: string };
}

export default async function PostDetail({ params }: Params) {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(params.id, 10) },
  });

  if (!post) return <p>Post not found</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="mb-2 text-gray-500">
        作成日: {post.createdAt.toLocaleString()}
      </p>
      <p>{post.content}</p>
    </div>
  );
}
