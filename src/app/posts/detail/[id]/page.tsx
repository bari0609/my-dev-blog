"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function PostDetail() {
  const pathname = usePathname(); // /posts/detail/5
  const id = pathname.split("/").pop(); // 最後の部分をIDとして取得

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!id) return;
    // API経由でデータ取得
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8 prose max-w-none">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="mb-2 text-gray-500">
        作成日: {new Date(post.createdAt).toLocaleString()}
      </p>
      <Markdown remarkPlugins={[remarkGfm]}>
        {post.content}
      </Markdown>
    </div>
  );
}
