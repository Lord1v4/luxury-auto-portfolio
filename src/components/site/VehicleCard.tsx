import { Link } from "@tanstack/react-router";
import { Heart, Gauge, Calendar, Fuel, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { eur, km as fmtKm, type Vehicle } from "@/lib/vehicles";
import { useStock } from "@/lib/stock-store";

const statusStyles: Record<string, string> = {
  "Disponível": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Reservado: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Vendido: "bg-primary/15 text-primary border-primary/30",
};

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const { isFavorite, toggleFavorite } = useStock();
  const fav = isFavorite(vehicle.id);

  return (
    <article className="group overflow-hidden rounded-xl border border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:glow-red">
      <div className="relative aspect-16/10 overflow-hidden bg-surface-2">
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.brand} ${vehicle.model}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span
          className={cn(
            "absolute left-3 top-3 rounded-full border px-2.5 py-1 text-[11px] font-medium",
            statusStyles[vehicle.status],
          )}
        >
          {vehicle.status}
        </span>
        <button
          onClick={() => toggleFavorite(vehicle.id)}
          aria-label={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full glass transition-colors hover:border-primary/50"
        >
          <Heart className={cn("h-4 w-4", fav ? "fill-primary text-primary" : "text-foreground")} />
        </button>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{vehicle.brand}</p>
            <h3 className="truncate text-lg font-semibold">{vehicle.model}</h3>
          </div>
          <p className="shrink-0 font-display text-lg font-bold text-primary">{eur(vehicle.price)}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-primary" />{vehicle.year}</span>
          <span className="flex items-center gap-1.5"><Gauge className="h-3.5 w-3.5 text-primary" />{fmtKm(vehicle.km)}</span>
          <span className="flex items-center gap-1.5"><Cog className="h-3.5 w-3.5 text-primary" />{vehicle.power} cv</span>
          <span className="flex items-center gap-1.5"><Fuel className="h-3.5 w-3.5 text-primary" />{vehicle.fuel}</span>
        </div>

        <Button asChild variant="outline" className="w-full border-border hover:border-primary hover:text-primary">
          <Link to="/stock/$id" params={{ id: vehicle.id }}>Ver Detalhes</Link>
        </Button>
      </div>
    </article>
  );
}
