import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStock } from "@/lib/stock-store";

const links = [
  { to: "/", label: "Início" },
  { to: "/stock", label: "Stock" },
  { to: "/sobre", label: "Sobre Nós" },
  { to: "/servicos", label: "Serviços" },
  { to: "/contactos", label: "Contactos" },
  { to: "/admin", label: "Admin" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { favorites } = useStock();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2" onClick={() => setOpen(false)}>
          <span className="h-6 w-1 shrink-0 rounded-full bg-primary" />
          <span className="truncate font-display text-lg font-bold tracking-[0.18em] text-foreground">
            APEX <span className="text-primary">MOTORS</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/stock"
            search={{ favoritos: true }}
            className="relative hidden h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground sm:grid"
            aria-label="Favoritos"
          >
            <Heart className="h-4 w-4" />
            {favorites.length > 0 && (
              <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {favorites.length}
              </span>
            )}
          </Link>
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/stock">Ver Stock</Link>
          </Button>
          <button
            className="grid h-9 w-9 place-items-center rounded-md border border-border lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Abrir menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background/95 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <Link to="/stock" onClick={() => setOpen(false)}>
                Ver Stock
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
