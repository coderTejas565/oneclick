"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

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
  <div className="min-h-screen p-4">
  <div
    className="
    relative
    flex
    min-h-[calc(100vh-2rem)]
    flex-col
    rounded-[32px]
    border
    border-border
    bg-background
    "
  >


    {/* Center */}

    <div
      className="
      flex-1
      flex
      items-center
      justify-center
      px-6
      "
    >

      <Card
        className="
        w-full
        max-w-md
        border-border/80
        bg-card
        shadow-none
        "
      >
        <CardContent className="p-8">

          <div className="space-y-2">

            <h2
              className="
              text-4xl
              font-bold
              tracking-tight
              "
            >
              Create workspace
            </h2>

            <p className="text-muted-foreground">
              Start using OneClick today.
            </p>

          </div>

          <div className="mt-8 space-y-5">

            <div className="space-y-2">
              <Label>Full Name</Label>

              <Input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Tejas A."
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>

              <Input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="tejas@gmail.com"
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>

              <Input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            <Button
              onClick={handleSignup}
              disabled={loading}
              className="
              h-11
              w-full
              rounded-xl
              "
            >
              {loading
                ? "Creating..."
                : "Create Workspace"}
            </Button>

            <p
              className="
              text-center
              text-sm
              text-muted-foreground
              "
            >
              Already have an account?
              <button
                onClick={() =>
                  router.push("/login")
                }
                className="
                ml-1
                text-foreground
                "
              >
                Sign in
              </button>
            </p>

          </div>

        </CardContent>
      </Card>

    </div>

  </div>
</div>
 
);

}