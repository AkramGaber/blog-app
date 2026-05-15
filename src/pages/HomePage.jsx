import React, { useEffect, useState } from "react";
import { getPosts } from "../services/postService";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import PostList from "../components/PostList";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = (deleteId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== deleteId));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <EmptyState title="Error Loading Posts" description={error} />;
  }

  if (posts.length === 0) return <EmptyState />;

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Feed</h1>
        <p className="text-base-content/70">
          Explore the Latest posts from Our ITI -ذوي الشوارب- Community.
        </p>
      </div>
      <PostList posts={posts} onDelete={handleDelete} />
    </section>
  );
}
