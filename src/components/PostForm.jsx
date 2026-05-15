import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { postSchema } from "../schemas/postSchema";
import { createPost, getPostById, updatePost } from "../services/postService";
import toast from "react-hot-toast";
import { uploadImage } from "../services/imageService";
import FormField from "./FormField";
import { useAuth } from "../contexts/AuthContext";

export default function PostForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  const isEditMode = Boolean(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
  });

  useEffect(() => {
    if (!isEditMode) return;

    const fetchPost = async () => {
      try {
        const post = await getPostById(id);
        reset({
          title: post.title,
          description: post.description,
          image: post.image,
        });
      } catch {
        toast.error("Failed to load post");
        navigate("/");
      }
    };

    fetchPost();
  }, [id, isEditMode, navigate, reset]);

  const onSubmit = async (data) => {
    try {
      let imageUrl = data.image;
      const fileInput = document.getElementById("imageFile");

      if (fileInput?.files?.[0]) {
        imageUrl = await uploadImage(fileInput.files[0]);
      }

      const postData = {
        title: data.title,
        description: data.description,
        image: imageUrl,
        authorId: user.id,
        authorName: user.name,
        createdAt: new Date().toISOString(),
      };

      if (isEditMode) {
        await updatePost(id, postData);
        toast.success("Post updated successfully");
      } else {
        await createPost(postData);
        toast.success("Post created successfully");
      }

      navigate("/");
    } catch {
      toast.error("Failed to save post");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold mb-6">
            {isEditMode ? "Edit Post" : "Create New Post"}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              label="Title"
              name="title"
              register={register}
              error={errors.title}
            />

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Description</span>
              </label>

              <textarea
                rows="6"
                className={`textarea textarea-bordered w-full ${
                  errors.description ? "textarea-error" : ""
                }`}
                {...register("description")}
              />

              {errors.description && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.description.message}
                  </span>
                </label>
              )}
            </div>

            <FormField
              label="Image URL (optional if uplading a file)"
              name="image"
              register={register}
              error={errors.image}
            />

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Upload Image</span>
              </label>

              <input
                id="imageFile"
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : isEditMode
                  ? "Update Post"
                  : "Create Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
