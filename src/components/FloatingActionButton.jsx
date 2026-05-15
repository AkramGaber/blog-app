import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function FloatingActionButton() {
  const { isAuthenticated } = useAuth();
  if(!isAuthenticated) return null;
  return (
    <Link
      to='/posts/new'
      className="btn btn-primary btn-circle btn-lg fixed bottom-6 right-6 shadow-xl z-50"
      title="Add New Post"
      aria-label="Add New Post"
    >
      +
    </Link>
  );
}
