import { createFileRoute, Link } from "@tanstack/react-router";
import { Car, Calculator, Repeat, Ship, KeyRound, SprayCan } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços | Apex Motors — Financiamento, Retoma e Importação" },
      {
        name: "description",
        content:
          "Venda de automóveis, financiamento, retoma, importação, test drive e detailing. Serviço completo no Funchal.",
      },
      { property: "og:title", content: "Serviços | Apex Motors" },
      {
        property: "og:description",
        content: "Do financiamento à importação e detailing, acompanhamos todo o processo.",
      },
    ],
  }),
  component: ServicosPage,
});

const services = [
  {
    icon: Car,
    title: "Venda de Automóveis",
    text: "Stock próprio de viaturas desportivas e de luxo, todas verificadas e com garantia. Acompanhamento personalizado até à entrega.",
  },
  {
    icon: Calculator,
    title: "Financiamento",
    text: "Soluções de crédito à medida com várias entidades financeiras. Simulação imediata e aprovação rápida.",
  },
  {
    icon: Repeat,
    title: "Retoma",
    text: "Avaliamos a sua viatura atual no próprio dia e abatemos o valor diretamente no automóvel que escolher.",
  },
  {
    icon: Ship,
    title: "Importação",
    text: "Procuramos a configuração exata que pretende em toda a Europa e tratamos de transporte, legalização e ISV.",
  },
  {
    icon: KeyRound,
    title: "Test Drive",
    text: "Conduza antes de decidir. Agendamento flexível no showroom ou entrega da viatura no local combinado.",
  },
  {
    icon: SprayCan,
    title: "Detailing",
    text: "Correção de pintura, proteção cerâmica, película PPF e higienização integral do interior.",
  },
];

function ServicosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Serviços</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Tudo o que precisa, num só lugar</h1>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Da primeira simulação de financiamento à proteção cerâmica antes da entrega, tratamos de
          cada etapa para que só tenha de se preocupar em conduzir.
        </p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.title}
            className="group rounded-xl border border-border/70 bg-card p-7 transition-colors hover:border-primary/40"
          >
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
              <s.icon className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-lg font-semibold">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/15 to-transparent p-10 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">Precisa de aconselhamento?</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Diga-nos o que procura e apresentamos-lhe opções dentro do seu orçamento.
        </p>
        <Button asChild size="lg" className="mt-7"><Link to="/contactos">Falar Connosco</Link></Button>
      </div>
    </div>
  );
}
