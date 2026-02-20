"use client";

import useSignup from "@/hooks/auth/signup";
import { useState } from "react";
import Link from "next/link";
import { SignUpPayload } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const initialFormData: SignUpPayload = {
  userName: "",
  email: "",
  password: "",
};

const formDelays = {
  label: 0,
  username: 40,
  email: 80,
  password: 120,
  submit: 160,
  footer: 220,
};

export default function SignUp() {
  const { isLoading, error, success, signup } = useSignup();
  const [formData, setFormData] = useState<SignUpPayload>(initialFormData);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signup(formData);
    } catch {
      // Error handled by useSignup
    }
  };

  return (
    <div className="min-h-svh border-x border-border max-w-5xl mx-auto bg-background">
      <div className="max-w-sm mx-auto px-6 py-20 sm:py-28">
        <div
          className="animate-enter inline-flex items-center border border-border px-3 py-1 mb-8"
          style={{ animationDelay: `${formDelays.label}ms` }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Create account
          </span>
        </div>

        <h1
          className="animate-enter font-display font-semibold text-5xl tracking-tight text-foreground mb-2"
          style={{ animationDelay: `${formDelays.label + 40}ms` }}
        >
          Sign up
        </h1>
        <p
          className="animate-enter text-[13px] text-muted-foreground mb-10"
          style={{ animationDelay: `${formDelays.label + 60}ms` }}
        >
          One account. Write anywhere.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            className="animate-enter space-y-1.5"
            style={{ animationDelay: `${formDelays.username}ms` }}
          >
            <label
              htmlFor="userName"
              className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
            >
              Username
            </label>
            <Input
              id="userName"
              type="text"
              placeholder="6-15 characters"
              autoComplete="username"
              value={formData.userName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, userName: e.target.value }))
              }
              className="h-9 rounded-none border-border bg-input/20 focus-visible:border-foreground/40"
              disabled={isLoading}
            />
          </div>

          <div
            className="animate-enter space-y-1.5"
            style={{ animationDelay: `${formDelays.email}ms` }}
          >
            <label
              htmlFor="email"
              className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="h-9 rounded-none border-border bg-input/20 focus-visible:border-foreground/40"
              disabled={isLoading}
            />
          </div>

          <div
            className="animate-enter space-y-1.5"
            style={{ animationDelay: `${formDelays.password}ms` }}
          >
            <label
              htmlFor="password"
              className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="8+ chars, mixed case & symbol"
              autoComplete="new-password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              className="h-9 rounded-none border-border bg-input/20 focus-visible:border-foreground/40"
              disabled={isLoading}
            />
          </div>

          {error && (
            <p
              className="animate-enter font-mono text-[11px] text-destructive"
              role="alert"
            >
              {error}
            </p>
          )}
          {success && (
            <p
              className="animate-enter font-mono text-[11px] text-foreground"
              role="status"
            >
              {success}
            </p>
          )}

          <div
            className="animate-enter pt-1"
            style={{ animationDelay: `${formDelays.submit}ms` }}
          >
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 rounded-none bg-foreground text-background text-[13px] font-normal hover:opacity-90 transition-opacity duration-200"
            >
              {isLoading ? "Creating account…" : "Create account"}
            </Button>
          </div>
        </form>

        <p
          className="animate-enter mt-6 font-mono text-[11px] text-muted-foreground"
          style={{ animationDelay: `${formDelays.footer}ms` }}
        >
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-foreground underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
