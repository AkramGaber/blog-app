import React from "react";

export default function PostCard({ post }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="h-56 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>

        <p className="text-base-content/80 line-clamp-4">
            {post.description}
        </p>

        <div className="mt-4 text-sm text-base-content/60">
            By: {post.authorName}
        </div>
      </div>
    </div>
  );
}
