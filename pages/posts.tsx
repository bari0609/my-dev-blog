import { useEffect,useState } from 'react';
import Link from 'next/link';

interface Post{
    id:number,
    title:string;
    content:string;
    createdAt:string;
}

export default function PostsPage(){
    const[posts,setPosts]=useState<Post[]>([]);
    const[loading,setLoading] = useState(true);

    const fetchPosts = async () =>{
        const res = await fetch('api/posts');
        if(res.ok){
            const data:Post[] = await res.json();
            setPosts(data);
        }
        setLoading(false);
    };

    useEffect(()=>{
        // fetch('/api/posts')
        // .then((res)=>res.json())
        // .then((data)=>setPosts(data));

        fetchPosts();
    },[]);

    return(
        <div style={{padding:'2rem'}}>
            <h1>投稿一覧</h1>
            {loading ? (
                <p>読み込み中...</p>
            ):(
                <ul>
                    {posts.map((post)=>(
                        <li key={post.id} style={{marginBottom:'1rem'}}>
                            <Link href={`/posts/${post.id}`}>
                            <strong>{post.title}</strong>
                            </Link>
                            <p>{post.content}</p>
                            <small>{new Date(post.createdAt).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}