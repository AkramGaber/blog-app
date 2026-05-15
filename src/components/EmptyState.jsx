import React from "react";

export default function EmptyState({
  title = "No posts found",
  description = "There are no blog posts available yet",
}) {
  return (
    <div className="text-center py-16">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-base-content/70">{description}</p>
    </div>
  );
}
