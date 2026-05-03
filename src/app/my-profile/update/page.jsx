"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/login?redirect=/my-profile/update");
    }

    if (user) {
      setFormData({
        name: user.name || "",
        image: user.image || "",
      });
    }
  }, [isPending, user, router]);

  const updateField = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await authClient.updateUser({
      name: formData.name,
      image: formData.image,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Update failed");
      return;
    }

    toast.success("Profile updated successfully");
    router.push("/my-profile");
    router.refresh();
  };

  if (isPending) {
    return (
      <div className="grid min-h-[70vh] place-items-center">
        <span className="loading loading-spinner loading-lg text-orange-500" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <section className="mx-auto flex min-h-[75vh] max-w-7xl items-center justify-center px-4 py-14 md:px-8">
      <div className="w-full max-w-md rounded-[2rem] border border-orange-100 bg-white p-6 shadow-xl md:p-8">
        <div className="mb-8 text-center">
          <p className="font-bold text-orange-500">Profile Settings</p>

          <h1 className="mt-2 text-3xl font-black text-gray-950">
            Update Information
          </h1>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Name
            </label>

            <input
              name="name"
              required
              value={formData.name}
              onChange={updateField}
              placeholder="Enter name"
              className="w-full rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3 outline-none focus:border-orange-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Image URL
            </label>

            <input
              name="image"
              type="url"
              value={formData.image}
              onChange={updateField}
              placeholder="https://example.com/photo.jpg"
              className="w-full rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3 outline-none focus:border-orange-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600 disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Information"}
          </button>
        </form>
      </div>
    </section>
  );
}