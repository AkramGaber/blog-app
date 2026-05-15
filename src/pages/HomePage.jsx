import React, { useEffect, useState } from 'react'
import { getPosts } from '../services/postService'

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
            } catch (err) {
                setError(err.message || 'Failed to load posts');
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    if(loading) {
        return <span className='loading loading-dots loading-xl'></span>
    }

    if(error) {
        return <p className='text-center text-error'>{error}</p>
    }


  return (
    <div className='space-y-6'>
        <h1 className='text-4xl font-bold'>Recent Posts</h1>
        <div className='flex gap-6'>
            {posts.length === 0 ? (
                <p>No posts Found</p>
            ) : (
                posts.map((post) => (
                    <div className='card bg-base-100 w-96 shadow-md p-6' key={post.id}>
                        <h2 className='text-2xl font-semibold'>{post.title}</h2>
                        <figure>
                            <img src={post.image} alt='post-image' />
                        </figure>
                        <p className='mt-2'>{post.description}</p>
                        <p className='text-sm opacity-70 mt-4'>By: {post.authorName}</p>
                    </div>
                ))
            )}
        </div>
    </div>
  )
}
