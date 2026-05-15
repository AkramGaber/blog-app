import React, { useEffect, useState } from 'react'
import { getPosts } from '../services/postService'
import { useAuth } from '../contexts/AuthContext';


export default function HomePage() {
    const { user, isAuthenticated, logout, } = useAuth();
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
        <h1 className='text-4xl font-bold'>Authentication test</h1>
        {isAuthenticated ? (
            <div className='card bg-base-100 shadow-md p-6 space-y-4'>
                <p>Welcome, <strong>{user?.name}</strong></p>
                <p>Email: {user?.email}</p>
                <button onClick={logout} className='btn btn-error'>Logout</button>
            </div>
        ) : (
            <div className='card bg-base-100 shadow-md p-6'>
                <p>No user is currently logged in.</p>
            </div>
        )}
        {/* <div className='flex gap-6'>
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
        </div> */}
    </div>
  )
}
