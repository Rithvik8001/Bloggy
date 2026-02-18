import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

const FOOTER_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;

export function Footer() {
  return (
    <footer className="px-6 py-7">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="font-display italic text-base text-foreground tracking-tight"
        >
          {APP_NAME}
        </Link>

        {/* Links and copyright */}
        <div className="flex items-center gap-5 text-[12px] text-muted-foreground">
          <span>© {new Date().getFullYear()} {APP_NAME}</span>
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
