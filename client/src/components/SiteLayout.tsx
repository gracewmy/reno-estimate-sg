/**
 * RenoEstimate SG shared layout.
 * Design note: quiet editorial utility with terracotta actions, compact rules, and generous whitespace.
 */
import { CONTACT_EMAIL } from "@/const";
import { Button } from "@/components/ui/button";
import { Menu, Ruler, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

const navItems = [
  { href: "/", label: "Calculator" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="RenoEstimate SG home">
      <span className="relative grid size-11 place-items-center overflow-hidden rounded-[13px] bg-[#f6e7df]">
        <img
          src="/manus-storage/renoestimate-logo_dd3e8c6c.png"
          alt=""
          className="size-9 object-contain"
        />
        <span aria-hidden="true" className="absolute bottom-2 right-2 h-3 w-px bg-[#b95e40]" />
      </span>
      <span className="leading-none">
        <span className="block font-display text-[1.28rem] font-semibold tracking-[-0.04em] text-[#282522]">
          RenoEstimate
        </span>
        <span className="mt-1 block text-[0.6rem] font-bold uppercase tracking-[0.22em] text-[#9b5e49]">
          Singapore
        </span>
      </span>
    </Link>
  );
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#282522]">
      <header className="border-b border-[#e8e1da] bg-[#fbfaf7]/95 backdrop-blur-sm">
        <div className="container flex h-[76px] items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  location === item.href
                    ? "bg-[#f2e5dd] text-[#7f3f2d]"
                    : "text-[#625b55] hover:bg-[#f2ede8] hover:text-[#282522]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen((open) => !open)}
            className="text-[#625b55] hover:bg-[#f2ede8] md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={21} /> : <Menu size={22} />}
          </Button>
        </div>

        {menuOpen && (
          <nav className="border-t border-[#e8e1da] bg-[#fbfaf7] px-4 py-3 md:hidden" aria-label="Mobile navigation">
            <div className="mx-auto grid max-w-md gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium ${
                    location === item.href ? "bg-[#f2e5dd] text-[#7f3f2d]" : "text-[#625b55]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="relative">{children}</main>

      <footer className="border-t border-[#e8e1da] bg-[#f7f3ee]">
        <div className="container grid gap-8 py-10 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[#9b5e49]">
              <Ruler size={16} strokeWidth={2.4} />
              <span className="text-xs font-bold uppercase tracking-[0.16em]">Plan with perspective</span>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#625b55]">
              A simple starting point for homeowners planning an HDB or BTO renovation in Singapore.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#625b55] sm:justify-end">
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-[#9b4c34]">{CONTACT_EMAIL}</a>
            <Link href="/privacy" className="hover:text-[#9b4c34]">Privacy Policy</Link>
            <span>© {new Date().getFullYear()} RenoEstimate SG</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
