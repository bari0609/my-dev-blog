import {useRouter} from 'next/router';
import {useEffect,useState} from 'react';

type Post ={
    id:number;
    title:string;
    content:string;
    createdAt:string;
}

export default function PostDetail(){
    const router = useRouter();
    const {id} = router.query;

    const [post,setPost] = useState<Post | null>(null);
    const[loading,setLoading] = useState(true);

    useEffect(()=>{
        if (!id) return;
        fetch(`/api/posts/${id}`)
        .then((res)=>res.json())
        .then((data)=>setPost(data))
        .finally(()=>setLoading(false));
    },[id]);

    if (loading) return <p>読み込み中...</p>;
    if (!post) return <p>投稿が見つかりません</p>;

    return(
        <div style={{padding:'2rem'}}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <small>{new Date(post.createdAt).toLocaleString()}</small>
        </div>
    );
}