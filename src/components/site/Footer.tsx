import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <span className="h-6 w-1 rounded-full bg-primary" />
            <span className="font-display text-lg font-bold tracking-[0.18em]">
              APEX <span className="text-primary">MOTORS</span>
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Uma seleção criteriosa de automóveis desportivos e de luxo, no Funchal. Cada viatura é
            inspecionada, documentada e preparada ao detalhe antes de chegar ao nosso showroom.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Rede social Apex Motors"
                className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Navegação</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Início</Link></li>
            <li><Link to="/stock" className="hover:text-foreground">Stock</Link></li>
            <li><Link to="/sobre" className="hover:text-foreground">Sobre Nós</Link></li>
            <li><Link to="/servicos" className="hover:text-foreground">Serviços</Link></li>
            <li><Link to="/contactos" className="hover:text-foreground">Contactos</Link></li>
            <li><Link to="/admin" className="hover:text-foreground">Área Admin</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Contactos</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Rua da Performance, 100, Funchal, Madeira</li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> +351 291 000 000</li>
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> geral@apexmotors.pt</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Apex Motors. Todos os direitos reservados.</p>
          <p>
            Projeto demonstrativo desenvolvido no âmbito de uma PAP. Marcas, viaturas, preços e
            contactos são fictícios e não constituem oferta comercial.
          </p>
        </div>
      </div>
    </footer>
  );
}
