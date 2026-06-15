"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/actions/admin";
import Image from "next/image";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const res = await loginAction(null, formData);

    if (res && res.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-tr from-[#0f1d45] via-[#1a2b5e] to-[#1B69F4] px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_40%)] pointer-events-none" />

      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 sm:p-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo-white.svg"
            alt="Adhitama 89 Logo"
            width={120}
            height={53}
            priority
            className="h-14 w-auto object-contain"
          />
        </div>

        <h1 className="text-2xl font-black text-white text-center mb-2 tracking-wide uppercase italic">
          Admin Portal
        </h1>
        <p className="text-white/60 text-sm text-center mb-8">
          Silakan masuk untuk mengelola portal Adhitama89
        </p>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm font-semibold rounded-xl px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-white/80 text-sm font-bold uppercase tracking-wider mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              disabled={loading}
              className="w-full bg-white/5 border border-white/10 focus:border-white/40 focus:ring-1 focus:ring-white/40 text-white rounded-xl px-4 py-3 text-base outline-none transition-all"
              placeholder="Masukkan username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-white/80 text-sm font-bold uppercase tracking-wider mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              disabled={loading}
              className="w-full bg-white/5 border border-white/10 focus:border-white/40 focus:ring-1 focus:ring-white/40 text-white rounded-xl px-4 py-3 text-base outline-none transition-all"
              placeholder="Masukkan password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white hover:bg-white/90 disabled:bg-white/50 text-[#1a2b5e] font-black text-base uppercase tracking-widest py-4 rounded-xl transition-all duration-200 shadow-xl cursor-pointer"
          >
            {loading ? "Menghubungkan..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
