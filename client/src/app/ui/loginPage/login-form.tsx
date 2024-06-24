"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/app/hooks/useLogin";
import { useLogout } from "@/app/hooks/useLogout";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

type FormFields = z.infer<typeof schema>;

const LoginPage: React.FC = () => {
  const { logIn, isLoading } = useLogin();
  const { logOut } = useLogout();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const result = await logIn(data.email, data.password);
      if (result === 200) {
        console.log("Login successful");
        console.log(result);
      }
    } catch (err: any) {}
  };

  const handleLogout = async (e: any) => {
    e.preventDefault();
    await logOut();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 to-lightTeal mb-20">
      <div className="p-12 bg-white max-w-lg rounded-lg shadow-lg w-full">
        <h4 className="text-center text-3xl mb-6 text-dark">Login</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input
              type="text"
              placeholder="Email"
              {...register("email")}
              className="border border-mediumGrey p-4 rounded-md w-full"
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="border border-mediumGrey p-4 rounded-md w-full"
            />
            {errors.password && (
              <p className="text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="flex justify-between">
            <Button
              disabled={isLoading}
              type="submit"
              className="bg-darkOrange text-white hover:bg-lightYellowOrange focus:outline-none focus:ring-2 focus:ring-darkOrange px-6 py-3 rounded-md"
            >
              Login
            </Button>
            <Button
              onClick={handleLogout}
              className="bg-mediumGrey text-white hover:bg-darkGrey focus:outline-none focus:ring-2 focus:ring-mediumGrey px-6 py-3 rounded-md"
            >
              Logout
            </Button>
          </div>
          {errors.root && (
            <p className="text-red-500 text-center">{errors.root.message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
