"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/analytics", label: "Analytics" },
  { href: "/campaigns", label: "Campaigns" },
  { href: "/recommendations", label: "Recommendations" },
  { href: "/research", label: "Research" },
  { href: "/collaborations", label: "Collaborations" },
  { href: "/editor", label: "Editor" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-md bg-gradient-to-br from-purple-500 to-blue-500" />
          <Link href="/" className="text-lg font-semibold">
            Arc Marketing Engine
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`transition-colors hover:text-purple-500 ${
                pathname === l.href ? "text-purple-600 font-medium" : "text-foreground/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="#demo"
            className="h-9 px-4 rounded-full border border-foreground/20 hover:bg-foreground/5 text-sm flex items-center"
          >
            Book a demo
          </Link>
          <Link
            href="#trial"
            className="h-9 px-4 rounded-full bg-purple-600 text-white hover:bg-purple-500 text-sm flex items-center"
          >
            Free trial
          </Link>
        </div>
      </div>
    </header>
  );
}

