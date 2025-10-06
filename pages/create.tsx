import {useState} from 'react';
import {useRouter} from 'next/router';

export default function createPost(){
    const [title,setTitle] = useState('');
    const[content,setContent] = useState('');
    const [loading,setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault();
        if(!title || !content) return;
        setLoading(true);

        const res = await fetch('/api/posts',{
            method:'POST',
            headers:{ 'Content-Type':'application/json' },
            body: JSON.stringify({title,content}),
        });

        if(res.ok){
            setTitle('');
            setContent('');
            router.push('/posts');
        }else{
            alert('投稿に失敗しました');
        }
        setLoading(false);
    };

    return(
        <div style={{padding:'2rem'}}>
            <h1>新しい投稿を作成</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>タイトル</label><br />
                    <input
                        type="text"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        style={{ width:'300px',marginBottom:'1rem'}}
                    />
                </div>
                <div>
                    <label>本文</label><br />
                    <textarea
                        value={content}
                        onChange={(e)=>setContent(e.target.value)}
                        rows={50}
                        style={{width:'300px',marginBottom:'1rem'}}
                        />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? '送信中...' : '投稿する'}
                </button>
            </form>
        </div>
    );
}