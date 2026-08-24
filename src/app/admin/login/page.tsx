"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid credentials");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center h-screen bg-surface p-margin-mobile">
      <div className="bg-surface border border-outline shadow-card rounded-xl p-xl w-full max-w-md">
        <div className="text-center mb-lg">
          <div className="w-12 h-12 bg-surface-variant rounded-full flex items-center justify-center mx-auto mb-md">
            <ShieldCheck className="text-[24px] text-primary w-6 h-6" />
          </div>
          <h1 className="font-display-md text-[28px] font-medium text-primary tracking-tight">
            Admin Access
          </h1>
          <p className="font-body-md text-on-surface-variant mt-xs">
            Sign in to manage the Easy Rent platform.
          </p>
        </div>

        {error && (
          <div className="bg-error-bg text-error-text border border-error-text/20 rounded-md p-sm mb-md font-utility-label text-[13px] text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-md">
          <div className="flex flex-col gap-xs">
            <label className="font-utility-label text-[12px] text-on-surface-variant uppercase tracking-wider">Username</label>
            <input
              required
              type="text"
              className="border border-outline focus:border-primary focus:ring-1 focus:ring-primary rounded-md bg-surface p-sm font-body-md text-primary w-full transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-xs">
            <label className="font-utility-label text-[12px] text-on-surface-variant uppercase tracking-wider">Password</label>
            <input
              required
              type="password"
              className="border border-outline focus:border-primary focus:ring-1 focus:ring-primary rounded-md bg-surface p-sm font-body-md text-primary w-full transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-sm bg-primary text-on-primary rounded-md py-sm font-utility-label text-[14px] font-medium shadow-soft hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
