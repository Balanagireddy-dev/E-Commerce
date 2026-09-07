"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { shopConfig } from "@/config/shop.config";

export default function AdminLoginPage() {
  const { login } = useAdminAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      router.push("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-alt dark:bg-surface-alt-dark px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-6 shadow-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white">
            {shopConfig.logoText}
          </span>
          <h1 className="text-lg font-bold text-ink dark:text-ink-dark">Admin Login</h1>
          <p className="text-sm text-ink-muted dark:text-ink-muted-dark">Sign in to manage {shopConfig.shortName}</p>
        </div>

        <div className="flex flex-col gap-4">
          <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" required />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <Button type="submit" size="lg" fullWidth>
            Login
          </Button>
          <p className="text-center text-xs text-ink-muted dark:text-ink-muted-dark">Demo credentials: admin / admin123</p>
        </div>
      </form>
    </div>
  );
}
