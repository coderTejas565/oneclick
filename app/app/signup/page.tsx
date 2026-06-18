"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSignup() {
    try {
      setLoading(true);
      setError("");

      const result =
        await authClient.signUp.email({
          name,
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
        "Failed to create account"
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
            Create Account
          </h1>

          <p className="text-muted-foreground">
            Start using OneClick
          </p>
        </div>

        <div className="space-y-4">

          <Input
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

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
            onClick={handleSignup}
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </Button>

        </div>

      </div>

    </div>
  );
}