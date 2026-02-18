import { Edit3, ShieldCheck, Zap, type LucideIcon } from "lucide-react";
import { FEATURES } from "@/lib/constants";
import type { FeatureIconName } from "@/types";

const ICONS: Record<FeatureIconName, LucideIcon> = {
  Edit3,
  ShieldCheck,
  Zap,
};

export function Features() {
  return (
    <section
      id="features"
      className="border-b border-border px-6 py-24 md:py-32"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-5">
        Features
      </p>
      <h2 className="font-display font-light text-4xl md:text-5xl tracking-tight text-foreground mb-16 max-w-md leading-none">
        Everything you need,{" "}
        <em className="text-muted-foreground">nothing you don&apos;t.</em>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 border border-border">
        {FEATURES.map((feature, index) => {
          const Icon = ICONS[feature.iconName];
          const isNotLast = index < FEATURES.length - 1;
          return (
            <div
              key={feature.title}
              className={[
                "group p-8 md:p-10 transition-colors duration-300 cursor-default",
                "hover:bg-muted/40",
                isNotLast
                  ? "border-b border-border md:border-b-0 md:border-r md:border-border"
                  : "",
              ].join(" ")}
            >
              <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 mb-7">
                <Icon size={16} strokeWidth={1.5} />
              </div>

              <h3 className="text-[13px] font-medium text-foreground mb-2.5 tracking-tight">
                {feature.title}
              </h3>

              <p className="text-[13px] text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
