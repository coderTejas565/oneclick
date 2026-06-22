"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    try {
      setLoading(true);
      setError("");

      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(
          result.error.message || "Something went wrong"
        );
        return;
      }

      router.push("/app/dashboard");
    } catch {
      setError("Failed to sign in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full blur-3xl opacity-10 bg-primary" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full blur-3xl opacity-10 bg-primary" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border bg-card p-8 shadow-lg">
          <div className="space-y-2 text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome Back
            </h1>

            <p className="text-sm text-muted-foreground">
              Sign in to continue to OneClick
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Email
              </label>

              <Input
                type="email"
                placeholder="tejas@gmail.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm text-muted-foreground hover:text-foreground transition"
                >
                  Forgot password?
                </button>
              </div>

              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2">
                <p className="text-sm text-red-500">
                  {error}
                </p>
              </div>
            )}

            <Button
              className="w-full h-11 font-medium"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}