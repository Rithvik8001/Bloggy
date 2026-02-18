import Link from "next/link";
import { APP_DESCRIPTION } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative min-h-svh flex flex-col items-center justify-center px-6 pt-14 border-b border-border">
      <div className="max-w-3xl mx-auto text-center">
        {/* Eyebrow badge */}
        <div
          className="animate-enter inline-flex items-center border border-border px-3 py-1 mb-10"
          style={{ animationDelay: "0ms" }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Minimal blogging
          </span>
        </div>

        {/* Hero headline */}
        <h1
          className="animate-enter font-display font-light text-[64px] sm:text-[88px] md:text-[116px] leading-[0.88] tracking-tight text-foreground mb-8"
          style={{ animationDelay: "80ms" }}
        >
          Write what
          <br />
          <em>matters.</em>
        </h1>

        {/* Subheadline */}
        <p
          className="animate-enter text-[15px] md:text-base text-muted-foreground max-w-sm mx-auto mb-12 leading-relaxed"
          style={{ animationDelay: "180ms" }}
        >
          {APP_DESCRIPTION}
        </p>

        {/* CTA buttons */}
        <div
          className="animate-enter flex items-center justify-center gap-3"
          style={{ animationDelay: "260ms" }}
        >
          <Link
            href="/signup"
            className="inline-flex items-center justify-center text-[13px] bg-foreground text-background px-6 py-2.5 hover:opacity-80 transition-opacity duration-200"
          >
            Start writing
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center text-[13px] border border-border text-foreground px-6 py-2.5 hover:border-foreground transition-colors duration-200"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="animate-enter absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ animationDelay: "600ms" }}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50">
          Scroll
        </span>
        <div className="relative h-10 w-px bg-border overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-muted-foreground/60 animate-scroll-indicator" />
        </div>
      </div>
    </section>
  );
}
