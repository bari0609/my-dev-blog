"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface PostFormProps {
  id?: string;
}

export default function PostFormClient({ id }: PostFormProps) {
  const router = useRouter();
  const [post, setPost] = useState({ title: "", content: "" });

  // 編集の場合は既存データを取得
  useEffect(() => {
    if (id) {
      fetch(`/api/posts/${id}`)
        .then((res) => res.json())
        .then((data) => setPost({ title: data.title, content: data.content }));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = id ? "PUT" : "POST";
    const url = id ? `/api/posts/${id}` : "/api/posts";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });

    router.push("/posts");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{id ? "投稿編集" : "新規作成"}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="タイトル"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="内容"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          保存
        </button>
      </form>
    </div>
  );
}
