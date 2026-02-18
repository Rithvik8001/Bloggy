import { STEPS } from "@/lib/constants";

export function HowItWorks() {
  return (
    <section
      id="process"
      className="border-b border-border px-6 py-24 md:py-32"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-5">
        Process
      </p>
      <h2 className="font-display font-light text-4xl md:text-5xl tracking-tight text-foreground mb-16 max-w-md leading-[1.05]">
        Get started <em className="text-muted-foreground">in minutes.</em>
      </h2>
      <div className="border-t border-border grid grid-cols-1 md:grid-cols-3">
        {STEPS.map((step) => (
          <div
            key={step.number}
            className="relative pt-8 pb-8 md:pr-10 border-b border-border md:border-b-0 group"
          >
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 font-display font-light text-[120px] leading-none select-none pointer-events-none text-foreground/4"
            >
              {step.number}
            </span>
            <p className="relative font-mono text-[10px] tracking-[0.2em] text-muted-foreground/60 mb-6 uppercase">
              {step.number}
            </p>
            <h3 className="relative text-[13px] font-medium text-foreground mb-2 tracking-tight">
              {step.title}
            </h3>
            <p className="relative text-[13px] text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
