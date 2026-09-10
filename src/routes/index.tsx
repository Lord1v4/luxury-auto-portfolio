import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Sparkles, Handshake, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VehicleCard } from "@/components/site/VehicleCard";
import { useStock } from "@/lib/stock-store";
import { heroImage } from "@/lib/vehicles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apex Motors — Performance, Exclusividade, Paixão" },
      {
        name: "description",
        content:
          "Seleção exclusiva de automóveis desportivos e de luxo no Funchal. Porsche, BMW M, Lamborghini e Ferrari em stock.",
      },
      { property: "og:title", content: "Apex Motors — Performance, Exclusividade, Paixão" },
      {
        property: "og:description",
        content: "Descubra automóveis desportivos e de luxo escolhidos ao detalhe. Funchal, Madeira.",
      },
    ],
  }),
  component: Index,
});

const stats = [
  { value: "+50", label: "carros vendidos" },
  { value: "+10", label: "marcas premium" },
  { value: "100%", label: "veículos selecionados" },
  { value: "1:1", label: "atendimento personalizado" },
];

const values = [
  { icon: ShieldCheck, title: "Qualidade", text: "Cada viatura passa por inspeção mecânica e estética antes de entrar em stock." },
  { icon: Handshake, title: "Transparência", text: "Histórico, quilometragem e documentação sempre à vista, sem surpresas." },
  { icon: Sparkles, title: "Exclusividade", text: "Modelos raros e configurações que dificilmente encontra noutro stand." },
];

function Index() {
  const { vehicles } = useStock();
  const featured = vehicles.filter((v) => v.featured).slice(0, 4);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="Porsche 911 Turbo S em showroom escuro com iluminação vermelha"
          width={1920}
          height={1088}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-40">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary">
            <Star className="h-3 w-3" /> Funchal · Madeira
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl">
            Performance. <span className="text-primary">Exclusividade.</span> Paixão.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Descubra uma seleção exclusiva de automóveis desportivos e de luxo escolhidos para quem
            procura uma experiência de condução única.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="glow-red">
              <Link to="/stock">
                Explorar Stock <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border">
              <Link to="/contactos">Falar Connosco</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-surface/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl font-bold text-primary sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Stock em destaque</p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Viaturas selecionadas</h2>
          </div>
          <Link to="/stock" className="shrink-0 text-sm text-muted-foreground hover:text-primary">
            Ver todo o stock →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-surface/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">Porquê a Apex Motors</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border border-border/70 bg-card p-6">
                <v.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/15 to-transparent p-10 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Pronto para conduzir o próximo?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Marque uma visita ao nosso showroom no Funchal ou peça um test drive sem compromisso.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg"><Link to="/contactos">Falar Connosco</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-border">
              <Link to="/servicos">Ver Serviços</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
