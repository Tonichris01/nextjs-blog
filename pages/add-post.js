import '../app/globals.css';
import { useState } from "react";
import { useRouter } from "next/router";

export default function AddPostPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const router  = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try{
            const response = await fetch('api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, content})
            });

            if(!response.ok){
                throw new Error('Something went wrong while creating the new post');
            }
            router.push('/');
        }catch(error){
            setError(error.message);
        }finally{
            setLoading(false);
        }
    }
    return (
        <div className="container mx-auto p-4 bg-white" >
            <h1 className="text-2xl font-bold mb-4 text-black">Add a New Post</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label 
                        htmlFor="title" 
                        className="block text-sm font-medium text-gray-700"
                    >
                        Title
                    </label>
                    <input 
                        type='text' 
                        id="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-900 text-black shadow-sm p-2"
                    ></input>
                </div>
                <div>
                    <label 
                        htmlFor="content" 
                        className="block text-sm font-medium text-gray-700"
                    >
                        Content
                    </label>
                    <textarea 
                        type='text' 
                        id="content" 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-900 text-black shadow-sm p-2"
                    ></textarea>
                </div>
                <div>
                    <button
                        type="submit" 
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        disabled={loading}
                    >
                        {loading? 'Creating...' : 'Create Post...'}
                    </button>
                </div>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    )
}