import { useForm } from "react-hook-form";
import React from "react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/loginSchema";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import FormField from "./FormField";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      toast.success("Logged in successfully.");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data || "Invalid Email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        label="Email"
        name="email"
        type="email"
        register={register}
        error={errors.email}
      />

      <FormField
        label="Password"
        name="password"
        type="password"
        register={register}
        error={errors.email}
      />

      <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
