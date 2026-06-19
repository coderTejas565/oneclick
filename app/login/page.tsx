"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleLogin() {
    try {
      setLoading(true);
      setError("");

      const result =
        await authClient.signIn.email({
          email,
          password,
        });

      if (result.error) {
        setError(
  result.error?.message || "Something went wrong"
);
        return;
      }

      router.push("/app/dashboard");
    } catch {
      setError(
        "Failed to sign in"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-md space-y-6">

        <div className="space-y-2 text-center">

          <h1 className="text-3xl font-bold">
            Welcome Back
          </h1>

          <p className="text-muted-foreground">
            Login to OneClick
          </p>

        </div>

        <div className="space-y-4">

          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <Button
            className="w-full"
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
  );
}