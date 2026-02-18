import Link from "next/link";

export function CTA() {
  return (
    <section className="bg-foreground text-background border-b border-border px-6 py-24 md:py-32">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-background/40 mb-5">
        Get started
      </p>
      <h2 className="font-display font-light text-4xl md:text-6xl tracking-tight mb-6 max-w-lg leading-none">
        Ready to start writing?
      </h2>
      <p className="text-[13px] text-background/60 max-w-xs mb-10 leading-relaxed">
        Your first post is just minutes away. No setup required.
      </p>
      <Link
        href="/signup"
        className="inline-flex items-center justify-center text-[13px] bg-background text-foreground px-6 py-2.5 hover:opacity-90 transition-opacity duration-200"
      >
        Start writing for free
      </Link>
    </section>
  );
}
