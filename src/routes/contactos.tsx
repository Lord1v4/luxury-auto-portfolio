import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
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

export const Route = createFileRoute("/contactos")({
  head: () => ({
    meta: [
      { title: "Contactos | Apex Motors — Funchal, Madeira" },
      {
        name: "description",
        content:
          "Visite-nos na Rua da Performance, 100, Funchal. Telefone +351 291 000 000 ou envie-nos uma mensagem.",
      },
      { property: "og:title", content: "Contactos | Apex Motors" },
      {
        property: "og:description",
        content: "Showroom no Funchal, Madeira. Marque a sua visita ou peça informações.",
      },
    ],
  }),
  component: ContactosPage,
});

const schema = z.object({
  nome: z.string().trim().min(3, "Indique o seu nome completo.").max(100),
  email: z.string().trim().email("Introduza um email válido.").max(255),
  telefone: z
    .string()
    .trim()
    .min(9, "Introduza um número de telefone válido.")
    .max(20)
    .regex(/^[+0-9 ()-]+$/, "Utilize apenas números e os símbolos + ( ) -"),
  viatura: z.string().trim().min(1, "Selecione uma viatura de interesse."),
  mensagem: z.string().trim().min(10, "Escreva pelo menos 10 caracteres.").max(1000),
});

function ContactosPage() {
  const { vehicles } = useStock();
  const [viatura, setViatura] = useState("Aconselhamento geral");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = { ...Object.fromEntries(new FormData(form)), viatura };
    const result = schema.safeParse(data);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    form.reset();
    toast.success("Mensagem enviada", {
      description: "Obrigado pelo contacto. Respondemos habitualmente em menos de 24 horas.",
    });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Contactos</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Vamos falar sobre o seu próximo carro</h1>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Estamos no coração do Funchal. Passe pelo showroom, ligue-nos ou deixe uma mensagem — a
          nossa equipa responde a todos os pedidos.
        </p>
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: MapPin, title: "Morada", lines: ["Rua da Performance, 100", "9000-000 Funchal, Madeira"] },
              { icon: Phone, title: "Telefone", lines: ["+351 291 000 000", "Chamada para a rede fixa nacional"] },
              { icon: Mail, title: "Email", lines: ["geral@apexmotors.pt"] },
              {
                icon: Clock,
                title: "Horário",
                lines: ["Seg — Sex: 09h00 às 19h00", "Sábado: 10h00 às 14h00", "Domingo: encerrado"],
              },
            ].map((c) => (
              <div key={c.title} className="rounded-xl border border-border/70 bg-card p-5">
                <c.icon className="h-5 w-5 text-primary" />
                <h2 className="mt-3 text-sm font-semibold uppercase tracking-wider">{c.title}</h2>
                {c.lines.map((l) => (
                  <p key={l} className="mt-1 text-sm text-muted-foreground">{l}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-xl border border-border/70 bg-card">
            <div className="relative h-64 bg-[radial-gradient(circle_at_30%_30%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_60%)]">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(color-mix(in oklab, white 8%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, white 8%, transparent) 1px, transparent 1px)",
                  backgroundSize: "38px 38px",
                }}
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground glow-red">
                  <MapPin className="h-5 w-5" />
                </span>
                <p className="mt-3 text-sm font-semibold">Apex Motors Funchal</p>
                <p className="text-xs text-muted-foreground">Rua da Performance, 100</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-border/70 p-4">
              <p className="min-w-0 text-xs text-muted-foreground">
                Mapa ilustrativo — projeto demonstrativo.
              </p>
              <Button variant="outline" size="sm" className="shrink-0 border-border">
                <Navigation className="mr-2 h-3.5 w-3.5" /> Como chegar
              </Button>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate className="rounded-xl border border-border/70 bg-card p-6 sm:p-8">
          <h2 className="text-xl font-bold">Envie-nos uma mensagem</h2>
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="viatura">Viatura de interesse</Label>
              <Select value={viatura} onValueChange={setViatura}>
                <SelectTrigger id="viatura"><SelectValue>{viatura}</SelectValue></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Aconselhamento geral">Aconselhamento geral</SelectItem>
                  {vehicles.map((v) => (
                    <SelectItem key={v.id} value={`${v.brand} ${v.model}`}>
                      {v.brand} {v.model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors["viatura"] && <p className="text-xs text-primary">{errors["viatura"]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="nome">Nome completo</Label>
              <Input id="nome" name="nome" maxLength={100} placeholder="Ex.: Maria Fernandes" />
              {errors["nome"] && <p className="text-xs text-primary">{errors["nome"]}</p>}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" maxLength={255} placeholder="maria@email.pt" />
                {errors["email"] && <p className="text-xs text-primary">{errors["email"]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" name="telefone" maxLength={20} placeholder="+351 291 000 000" />
                {errors["telefone"] && <p className="text-xs text-primary">{errors["telefone"]}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mensagem">Mensagem</Label>
              <Textarea id="mensagem" name="mensagem" rows={5} maxLength={1000} placeholder="Como podemos ajudar?" />
              {errors["mensagem"] && <p className="text-xs text-primary">{errors["mensagem"]}</p>}
            </div>
            <Button type="submit" size="lg" className="w-full">Enviar mensagem</Button>
            <p className="text-center text-[11px] text-muted-foreground">
              Formulário demonstrativo — os dados não são enviados nem armazenados.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
