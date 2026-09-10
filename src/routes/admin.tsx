import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Plus, Trash2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStock } from "@/lib/stock-store";
import { eur, km as fmtKm, heroImage, type Vehicle, type VehicleStatus } from "@/lib/vehicles";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Gestão de Stock | Apex Motors" },
      {
        name: "description",
        content:
          "Painel de demonstração para gerir o stock Apex Motors: adicionar, editar estado e remover viaturas.",
      },
      { property: "og:title", content: "Gestão de Stock | Apex Motors" },
      { property: "og:description", content: "Painel administrativo demonstrativo do stand." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const statuses: VehicleStatus[] = ["Disponível", "Reservado", "Vendido"];

const vehicleSchema = z.object({
  brand: z.string().trim().min(2, "Indique a marca.").max(40),
  model: z.string().trim().min(2, "Indique o modelo.").max(60),
  price: z.coerce.number().min(1000, "Preço mínimo de 1.000 €.").max(5000000),
  year: z.coerce.number().min(1990).max(2030),
  km: z.coerce.number().min(0).max(500000),
  power: z.coerce.number().min(50).max(2000),
  engine: z.string().trim().min(2, "Indique o motor.").max(60),
  transmission: z.string().trim().min(2).max(40),
  traction: z.string().trim().min(2).max(30),
  fuel: z.string().trim().min(2).max(30),
  exteriorColor: z.string().trim().min(2).max(40),
  interiorColor: z.string().trim().min(2).max(40),
  image: z.string().trim().max(500).optional(),
  equipment: z.string().trim().max(600).optional(),
  description: z.string().trim().min(10, "Escreva uma descrição.").max(1200),
});

function AdminPage() {
  const { vehicles, addVehicle, updateStatus, removeVehicle, resetStock } = useStock();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<VehicleStatus>("Disponível");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form));
    const parsed = vehicleSchema.safeParse(raw);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      toast.error("Verifique os campos assinalados.");
      return;
    }
    const d = parsed.data;
    const image = d.image && /^https?:\/\//.test(d.image) ? d.image : heroImage;
    const vehicle: Vehicle = {
      id: `${d.brand}-${d.model}-${Date.now()}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      brand: d.brand,
      model: d.model,
      price: d.price,
      year: d.year,
      km: d.km,
      power: d.power,
      engine: d.engine,
      transmission: d.transmission,
      traction: d.traction,
      fuel: d.fuel,
      exteriorColor: d.exteriorColor,
      interiorColor: d.interiorColor,
      equipment: (d.equipment ?? "").split(",").map((s) => s.trim()).filter(Boolean),
      description: d.description,
      images: [image, image],
      status,
      featured: false,
      addedAt: Date.now(),
    };
    addVehicle(vehicle);
    setErrors({});
    form.reset();
    toast.success("Viatura adicionada ao stock", { description: `${d.brand} ${d.model}` });
  }

  const err = (k: string) =>
    errors[k] ? <p className="text-xs text-primary">{errors[k]}</p> : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Área reservada</p>
          <h1 className="mt-2 truncate text-3xl font-bold sm:text-4xl">Gestão de Stock</h1>
        </div>
        <Button variant="outline" className="shrink-0 border-border" onClick={() => { resetStock(); toast.success("Stock reposto para a demonstração."); }}>
          <RotateCcw className="mr-2 h-4 w-4" /> Repor
        </Button>
      </header>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Painel demonstrativo. As alterações ficam guardadas apenas neste navegador.
      </p>

      <section className="mt-10 overflow-hidden rounded-xl border border-border/70 bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="bg-surface-2/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="p-4">Viatura</th>
                <th className="p-4">Preço</th>
                <th className="p-4">Ano</th>
                <th className="p-4">Km</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr key={v.id} className="border-t border-border/60">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={v.images[0]} alt="" loading="lazy" className="h-11 w-16 rounded object-cover" />
                      <div className="min-w-0">
                        <p className="truncate font-medium">{v.model}</p>
                        <p className="text-xs text-muted-foreground">{v.brand} · {v.power} cv</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{eur(v.price)}</td>
                  <td className="p-4">{v.year}</td>
                  <td className="p-4">{fmtKm(v.km)}</td>
                  <td className="p-4">
                    <Select value={v.status} onValueChange={(s) => updateStatus(v.id, s as VehicleStatus)}>
                      <SelectTrigger className="h-9 w-40"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-primary"
                      onClick={() => { removeVehicle(v.id); toast.success("Viatura removida do stock."); }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-border/70 bg-card p-6 sm:p-8">
        <h2 className="text-xl font-bold">Adicionar viatura</h2>
        <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2"><Label htmlFor="brand">Marca</Label><Input id="brand" name="brand" placeholder="Porsche" />{err("brand")}</div>
          <div className="space-y-2"><Label htmlFor="model">Modelo</Label><Input id="model" name="model" placeholder="718 Cayman GT4" />{err("model")}</div>
          <div className="space-y-2"><Label htmlFor="price">Preço (€)</Label><Input id="price" name="price" type="number" placeholder="129900" />{err("price")}</div>
          <div className="space-y-2"><Label htmlFor="year">Ano</Label><Input id="year" name="year" type="number" placeholder="2024" />{err("year")}</div>
          <div className="space-y-2"><Label htmlFor="km">Quilómetros</Label><Input id="km" name="km" type="number" placeholder="12000" />{err("km")}</div>
          <div className="space-y-2"><Label htmlFor="power">Potência (cv)</Label><Input id="power" name="power" type="number" placeholder="420" />{err("power")}</div>
          <div className="space-y-2"><Label htmlFor="engine">Motor</Label><Input id="engine" name="engine" placeholder="4.0L Boxer" />{err("engine")}</div>
          <div className="space-y-2"><Label htmlFor="transmission">Caixa</Label><Input id="transmission" name="transmission" placeholder="Manual" />{err("transmission")}</div>
          <div className="space-y-2"><Label htmlFor="traction">Tração</Label><Input id="traction" name="traction" placeholder="Traseira" />{err("traction")}</div>
          <div className="space-y-2"><Label htmlFor="fuel">Combustível</Label><Input id="fuel" name="fuel" placeholder="Gasolina" />{err("fuel")}</div>
          <div className="space-y-2"><Label htmlFor="exteriorColor">Cor exterior</Label><Input id="exteriorColor" name="exteriorColor" placeholder="Branco Carrara" />{err("exteriorColor")}</div>
          <div className="space-y-2"><Label htmlFor="interiorColor">Cor interior</Label><Input id="interiorColor" name="interiorColor" placeholder="Pele preta" />{err("interiorColor")}</div>
          <div className="space-y-2">
            <Label>Estado</Label>
            <Select value={status} onValueChange={(s) => setStatus(s as VehicleStatus)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="image">URL da imagem (opcional)</Label>
            <Input id="image" name="image" placeholder="https://..." />
            {err("image")}
          </div>
          <div className="space-y-2 sm:col-span-2 lg:col-span-3">
            <Label htmlFor="equipment">Equipamento (separado por vírgulas)</Label>
            <Input id="equipment" name="equipment" placeholder="Bancos desportivos, Escape desportivo, Pack Carbono" />
          </div>
          <div className="space-y-2 sm:col-span-2 lg:col-span-3">
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" name="description" rows={4} placeholder="Descreva o estado, histórico e pontos fortes da viatura." />
            {err("description")}
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <Button type="submit" size="lg"><Plus className="mr-2 h-4 w-4" /> Adicionar ao stock</Button>
          </div>
        </form>
      </section>
    </div>
  );
}
