import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal, Heart, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VehicleCard } from "@/components/site/VehicleCard";
import { useStock } from "@/lib/stock-store";
import { eur, FUELS, TRACTIONS, TRANSMISSIONS } from "@/lib/vehicles";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/stock/")({
  validateSearch: (search: Record<string, unknown>): { favoritos?: boolean } =>
    search["favoritos"] === true || search["favoritos"] === "true" ? { favoritos: true } : {},
  head: () => ({
    meta: [
      { title: "Stock de Automóveis Desportivos e de Luxo | Apex Motors" },
      {
        name: "description",
        content:
          "Pesquise o nosso stock de viaturas premium por marca, preço, ano, potência, combustível e tração.",
      },
      { property: "og:title", content: "Stock | Apex Motors" },
      {
        property: "og:description",
        content: "Porsche, BMW M, Lamborghini, Ferrari e mais. Filtre e encontre a sua próxima viatura.",
      },
    ],
  }),
  component: StockPage,
});

const ALL = "todos";
const MAX_PRICE = 600000;

function StockPage() {
  const { favoritos } = Route.useSearch();
  const { vehicles, favorites } = useStock();

  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState(ALL);
  const [model, setModel] = useState("");
  const [fuel, setFuel] = useState(ALL);
  const [transmission, setTransmission] = useState(ALL);
  const [traction, setTraction] = useState(ALL);
  const [price, setPrice] = useState<[number, number]>([0, MAX_PRICE]);
  const [year, setYear] = useState<[number, number]>([2015, 2026]);
  const [maxKm, setMaxKm] = useState(120000);
  const [minPower, setMinPower] = useState(0);
  const [sort, setSort] = useState("recentes");
  const [onlyFavorites, setOnlyFavorites] = useState(Boolean(favoritos));
  const [showFilters, setShowFilters] = useState(false);

  const brands = useMemo(
    () => Array.from(new Set(vehicles.map((v) => v.brand))).sort(),
    [vehicles],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = vehicles.filter((v) => {
      if (q && !`${v.brand} ${v.model} ${v.engine}`.toLowerCase().includes(q)) return false;
      if (brand !== ALL && v.brand !== brand) return false;
      if (model.trim() && !v.model.toLowerCase().includes(model.trim().toLowerCase())) return false;
      if (fuel !== ALL && v.fuel !== fuel) return false;
      if (transmission !== ALL && v.transmission !== transmission) return false;
      if (traction !== ALL && v.traction !== traction) return false;
      if (v.price < price[0] || v.price > price[1]) return false;
      if (v.year < year[0] || v.year > year[1]) return false;
      if (v.km > maxKm) return false;
      if (v.power < minPower) return false;
      if (onlyFavorites && !favorites.includes(v.id)) return false;
      return true;
    });

    return list.sort((a, b) => {
      if (sort === "preco-asc") return a.price - b.price;
      if (sort === "preco-desc") return b.price - a.price;
      return b.addedAt - a.addedAt;
    });
  }, [vehicles, query, brand, model, fuel, transmission, traction, price, year, maxKm, minPower, onlyFavorites, favorites, sort]);

  function reset() {
    setQuery("");
    setBrand(ALL);
    setModel("");
    setFuel(ALL);
    setTransmission(ALL);
    setTraction(ALL);
    setPrice([0, MAX_PRICE]);
    setYear([2015, 2026]);
    setMaxKm(120000);
    setMinPower(0);
    setOnlyFavorites(false);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <header>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Catálogo</p>
        <h1 className="mt-2 text-4xl font-bold">Stock disponível</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          {results.length} viatura{results.length === 1 ? "" : "s"} correspondem aos filtros
          selecionados.
        </p>
      </header>

      <div className="mt-8 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar por marca, modelo ou motor..."
            className="pl-9"
            maxLength={80}
          />
        </div>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-full lg:w-56"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="recentes">Mais recentes</SelectItem>
            <SelectItem value="preco-asc">Preço mais baixo</SelectItem>
            <SelectItem value="preco-desc">Preço mais alto</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="border-border lg:hidden" onClick={() => setShowFilters((s) => !s)}>
          <SlidersHorizontal className="mr-2 h-4 w-4" /> Filtros
        </Button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className={cn("space-y-6 rounded-xl border border-border/70 bg-card p-5 lg:block", showFilters ? "block" : "hidden")}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider">Filtros</h2>
            <button onClick={reset} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
              <RotateCcw className="h-3 w-3" /> Limpar
            </button>
          </div>

          <button
            onClick={() => setOnlyFavorites((f) => !f)}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors",
              onlyFavorites ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            <Heart className={cn("h-4 w-4", onlyFavorites && "fill-primary")} /> Apenas favoritos ({favorites.length})
          </button>

          <div className="space-y-2">
            <Label>Marca</Label>
            <Select value={brand} onValueChange={setBrand}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>Todas as marcas</SelectItem>
                {brands.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="modelo">Modelo</Label>
            <Input id="modelo" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Ex.: 911" maxLength={40} />
          </div>

          <div className="space-y-3">
            <Label>Preço</Label>
            <Slider
              value={price}
              min={0}
              max={MAX_PRICE}
              step={5000}
              onValueChange={(v) => setPrice([v[0] ?? 0, v[1] ?? MAX_PRICE])}
            />
            <p className="text-xs text-muted-foreground">{eur(price[0])} — {eur(price[1])}</p>
          </div>

          <div className="space-y-3">
            <Label>Ano</Label>
            <Slider
              value={year}
              min={2015}
              max={2026}
              step={1}
              onValueChange={(v) => setYear([v[0] ?? 2015, v[1] ?? 2026])}
            />
            <p className="text-xs text-muted-foreground">{year[0]} — {year[1]}</p>
          </div>

          <div className="space-y-3">
            <Label>Quilómetros (máx.)</Label>
            <Slider value={[maxKm]} min={0} max={120000} step={2500} onValueChange={([v]) => setMaxKm(v ?? 120000)} />
            <p className="text-xs text-muted-foreground">até {new Intl.NumberFormat("pt-PT").format(maxKm)} km</p>
          </div>

          <div className="space-y-3">
            <Label>Potência (mín.)</Label>
            <Slider value={[minPower]} min={0} max={1000} step={10} onValueChange={([v]) => setMinPower(v ?? 0)} />
            <p className="text-xs text-muted-foreground">a partir de {minPower} cv</p>
          </div>

          <div className="space-y-2">
            <Label>Combustível</Label>
            <Select value={fuel} onValueChange={setFuel}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>Todos</SelectItem>
                {FUELS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Caixa</Label>
            <Select value={transmission} onValueChange={setTransmission}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>Todas</SelectItem>
                {TRANSMISSIONS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tração</Label>
            <Select value={traction} onValueChange={setTraction}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>Todas</SelectItem>
                {TRACTIONS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </aside>

        <section>
          {results.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-16 text-center">
              <p className="font-semibold">Nenhuma viatura encontrada</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Ajuste os filtros ou limpe a pesquisa para ver todo o stock.
              </p>
              <Button variant="outline" className="mt-6 border-border" onClick={reset}>Limpar filtros</Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-3">
              {results.map((v) => <VehicleCard key={v.id} vehicle={v} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
