"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { APP_NAME, NAV_ITEMS } from "@/lib/constants";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/90 backdrop-blur-md"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-display italic text-lg tracking-tight text-foreground"
        >
          {APP_NAME}
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <Link
            href="/login"
            className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-200 px-3 py-2"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="text-[13px] bg-foreground text-background px-4 py-2 hover:opacity-80 transition-opacity duration-200"
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
}
