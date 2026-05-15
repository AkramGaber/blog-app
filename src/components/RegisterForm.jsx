import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/registerSchema";
import toast from "react-hot-toast";
import FormField from "./FormField";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...userData } = data;
      await registerUser(userData);
      toast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data || "Registeration Failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        label="Name"
        name="name"
        register={register}
        error={errors.name}
      />

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
        error={errors.password}
      />

      <FormField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        register={register}
        error={errors.confirmPassword}
      />

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating Account... اصبر" : "Register"}
      </button>
    </form>
  );
}
