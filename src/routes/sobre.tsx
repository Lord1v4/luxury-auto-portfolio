import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Handshake, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroImage } from "@/lib/vehicles";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre Nós | Apex Motors — Stand Premium no Funchal" },
      {
        name: "description",
        content:
          "Conheça a Apex Motors: qualidade, transparência e exclusividade na venda de automóveis desportivos e de luxo na Madeira.",
      },
      { property: "og:title", content: "Sobre Nós | Apex Motors" },
      {
        property: "og:description",
        content: "Os valores por trás do stand: qualidade, transparência e exclusividade.",
      },
    ],
  }),
  component: SobrePage,
});

const values = [
  {
    icon: ShieldCheck,
    title: "Qualidade",
    text: "Só entra em stock o que passaria no nosso próprio crivo. Inspeção mecânica completa, verificação de histórico e preparação estética profissional antes de qualquer viatura ser anunciada.",
  },
  {
    icon: Handshake,
    title: "Transparência",
    text: "Preço claro, documentação disponível e informação honesta sobre o estado de cada automóvel. Sem custos escondidos e sem pressão comercial.",
  },
  {
    icon: Sparkles,
    title: "Exclusividade",
    text: "Procuramos configurações raras, séries limitadas e viaturas com carácter. Se não encontrar o que procura, importamos por si.",
  },
];

function SobrePage() {
  return (
    <>
      <section className="relative isolate border-b border-border/60">
        <img
          src={heroImage}
          alt="Showroom Apex Motors"
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/80 to-background" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Sobre Nós</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold sm:text-5xl">
            Um stand feito por quem vive a automobilidade
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            A Apex Motors nasceu no Funchal da vontade de fazer diferente: menos viaturas, melhor
            seleção e um acompanhamento próximo do primeiro contacto até muito depois da entrega da
            chave. Trabalhamos com clientes que sabem exatamente o que procuram — e com quem ainda
            está a descobrir.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Os nossos valores</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-xl border border-border/70 bg-card p-7">
              <v.icon className="h-7 w-7 text-primary" />
              <h3 className="mt-5 text-xl font-semibold">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-surface/40">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">A nossa história</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Começámos com uma garagem, três viaturas e uma lista de contactos. Hoje, o showroom no
              Funchal recebe clientes de toda a ilha e do continente, com serviço de transporte e
              entrega à porta. Mantemos a mesma regra do primeiro dia: preferimos perder um negócio a
              vender um carro em que não confiamos.
            </p>
            <Button asChild className="mt-8"><Link to="/stock">Conhecer o stock</Link></Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["+50", "carros vendidos"],
              ["+10", "marcas premium"],
              ["100%", "veículos selecionados"],
              ["24h", "resposta a pedidos"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-xl border border-border/70 bg-card p-6">
                <p className="font-display text-3xl font-bold text-primary">{v}</p>
                <p className="mt-1 text-sm text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
