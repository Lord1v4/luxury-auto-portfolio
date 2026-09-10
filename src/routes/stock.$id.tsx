import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadDialog } from "@/components/site/LeadDialog";
import { FinancingSimulator } from "@/components/site/FinancingSimulator";
import { useStock } from "@/lib/stock-store";
import { eur, km as fmtKm } from "@/lib/vehicles";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/stock/$id")({
  head: () => ({
    meta: [
      { title: "Detalhes da viatura | Apex Motors" },
      {
        name: "description",
        content:
          "Ficha completa da viatura: motor, potência, equipamento, galeria e simulador de financiamento.",
      },
      { property: "og:title", content: "Detalhes da viatura | Apex Motors" },
      {
        property: "og:description",
        content: "Especificações, galeria e simulação de financiamento desta viatura Apex Motors.",
      },
    ],
  }),
  component: VehicleDetail,
});

function VehicleDetail() {
  const { id } = Route.useParams();
  const { vehicles, isFavorite, toggleFavorite } = useStock();
  const vehicle = vehicles.find((v) => v.id === id);
  const [active, setActive] = useState(0);

  if (!vehicle) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-28 text-center">
        <h1 className="text-3xl font-bold">Viatura não encontrada</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Esta viatura pode ter sido vendida ou removida do stock.
        </p>
        <Button asChild className="mt-8"><Link to="/stock">Voltar ao stock</Link></Button>
      </div>
    );
  }

  const fav = isFavorite(vehicle.id);
  const specs = [
    ["Motor", vehicle.engine],
    ["Potência", `${vehicle.power} cv`],
    ["Caixa", vehicle.transmission],
    ["Tração", vehicle.traction],
    ["Combustível", vehicle.fuel],
    ["Ano", String(vehicle.year)],
    ["Quilómetros", fmtKm(vehicle.km)],
    ["Cor exterior", vehicle.exteriorColor],
    ["Cor interior", vehicle.interiorColor],
    ["Estado", vehicle.status],
  ] as const;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/stock" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Voltar ao stock
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div>
          <div className="overflow-hidden rounded-xl border border-border/70 bg-surface-2">
            <img
              src={vehicle.images[active] ?? vehicle.images[0]}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="aspect-16/10 w-full object-cover"
            />
          </div>
          <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
            {vehicle.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  "h-20 w-28 shrink-0 overflow-hidden rounded-md border transition-colors",
                  i === active ? "border-primary" : "border-border/70 opacity-70 hover:opacity-100",
                )}
              >
                <img src={img} alt={`Vista ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary">{vehicle.brand}</p>
          <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
            <h1 className="min-w-0 text-3xl font-bold sm:text-4xl">{vehicle.model}</h1>
            <button
              onClick={() => toggleFavorite(vehicle.id)}
              aria-label="Guardar nos favoritos"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border hover:border-primary"
            >
              <Heart className={cn("h-4 w-4", fav ? "fill-primary text-primary" : "text-muted-foreground")} />
            </button>
          </div>
          <p className="mt-3 font-display text-4xl font-bold text-primary">{eur(vehicle.price)}</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {specs.map(([k, v]) => (
              <div key={k} className="rounded-lg border border-border/70 bg-card p-3">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{k}</p>
                <p className="mt-1 text-sm font-medium">{v}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <LeadDialog
              title="Tenho interesse"
              description={`${vehicle.brand} ${vehicle.model} · ${eur(vehicle.price)}`}
              submitLabel="Enviar pedido de informação"
              trigger={<Button size="lg" className="w-full sm:w-auto">Tenho Interesse</Button>}
            />
            <LeadDialog
              title="Solicitar test drive"
              description={`Agende uma condução de experiência do ${vehicle.brand} ${vehicle.model}.`}
              submitLabel="Pedir test drive"
              trigger={
                <Button size="lg" variant="outline" className="w-full border-border sm:w-auto">
                  Solicitar Test Drive
                </Button>
              }
            />
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div className="space-y-8">
          <section className="rounded-xl border border-border/70 bg-card p-6">
            <h2 className="text-xl font-bold">Descrição</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{vehicle.description}</p>
          </section>
          <section className="rounded-xl border border-border/70 bg-card p-6">
            <h2 className="text-xl font-bold">Equipamento</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {vehicle.equipment.map((e) => (
                <li key={e} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {e}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <FinancingSimulator price={vehicle.price} />
      </div>
    </div>
  );
}
