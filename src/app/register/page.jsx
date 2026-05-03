"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const updateField = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    const { error } = await authClient.signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      image: "https://i.ibb.co/4pDNDk1/avatar.png",
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Registration failed");
      return;
    }

    toast.success("Registration successful. Please login.");

    setTimeout(() => {
      window.location.replace("/login");
    }, 500);
  };

  const handleGoogleLogin = async () => {
    if (loading) return;

    setLoading(true);

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      setLoading(false);
      toast.error(error.message || "Google login failed");
      return;
    }

    toast.success("Google login successful");

    setTimeout(() => {
      window.location.replace("/");
    }, 500);
  };

  return (
    <section className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-14 md:px-8">
      <div className="w-full max-w-md rounded-[2rem] border border-orange-100 bg-white p-6 shadow-xl md:p-8">
        <div className="mb-8 text-center">
          <p className="font-bold text-orange-500">Create Account</p>

          <h1 className="mt-2 text-3xl font-black text-gray-950">
            Register on SunCart
          </h1>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Name
            </label>

            <input
              name="name"
              required
              value={formData.name}
              onChange={updateField}
              placeholder="Enter your name"
              className="w-full rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3 outline-none focus:border-orange-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Email
            </label>

            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={updateField}
              placeholder="Enter your email"
              className="w-full rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3 outline-none focus:border-orange-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Password
            </label>

            <input
              name="password"
              type="password"
              required
              minLength={8}
              value={formData.password}
              onChange={updateField}
              placeholder="Enter at least 8 characters"
              className="w-full rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3 outline-none focus:border-orange-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600 disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="mt-4 w-full rounded-2xl border border-gray-200 bg-white px-5 py-3 font-bold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-orange-600">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}