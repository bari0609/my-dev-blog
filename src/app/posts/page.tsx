import Link from "next/link";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <Link
        href="/posts/edit"
        className="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded"
      >
        新規作成
      </Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-2">
            <Link href={`/posts/detail/${post.id}`} className="text-blue-600">
              {post.title}
            </Link>{" "}
            <Link
              href={`/posts/edit/${post.id}`}
              className="ml-2 text-sm text-green-600"
            >
              編集
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}