import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { eur } from "@/lib/vehicles";

const TAN = 0.0589;
const TAEG = 0.0692;

export function FinancingSimulator({ price }: { price: number }) {
  const [down, setDown] = useState(Math.round(price * 0.2));
  const [months, setMonths] = useState(60);

  const financed = Math.max(price - down, 0);
  const monthly = useMemo(() => {
    if (financed <= 0) return 0;
    const i = TAN / 12;
    return (financed * i) / (1 - Math.pow(1 + i, -months));
  }, [financed, months]);

  const total = monthly * months + down;

  return (
    <div className="rounded-xl border border-border/70 bg-card p-6">
      <h3 className="font-display text-xl font-bold">Simule o seu financiamento</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Estimativa indicativa com TAN de {(TAN * 100).toFixed(2).replace(".", ",")}% e TAEG de{" "}
        {(TAEG * 100).toFixed(2).replace(".", ",")}%.
      </p>

      <div className="mt-6 space-y-7">
        <div>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="entrada">Entrada inicial</Label>
            <Input
              id="entrada"
              type="number"
              min={0}
              max={price}
              step={500}
              value={down}
              onChange={(e) => setDown(Math.min(Math.max(Number(e.target.value) || 0, 0), price))}
              className="h-9 w-36 text-right"
            />
          </div>
          <Slider
            className="mt-4"
            value={[down]}
            min={0}
            max={price}
            step={500}
            onValueChange={([v]) => setDown(v)}
          />
        </div>

        <div>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="prazo">Prazo (meses)</Label>
            <Input
              id="prazo"
              type="number"
              min={12}
              max={120}
              step={6}
              value={months}
              onChange={(e) => setMonths(Math.min(Math.max(Number(e.target.value) || 12, 12), 120))}
              className="h-9 w-36 text-right"
            />
          </div>
          <Slider
            className="mt-4"
            value={[months]}
            min={12}
            max={120}
            step={6}
            onValueChange={([v]) => setMonths(v)}
          />
        </div>

        <div className="rounded-lg border border-border/70 bg-surface-2/60 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Valor financiado</span>
            <span className="font-medium">{eur(financed)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Custo total estimado</span>
            <span className="font-medium">{eur(Math.round(total))}</span>
          </div>
        </div>

        <div className="rounded-lg border border-primary/30 bg-primary/10 p-5 text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Mensalidade estimada</p>
          <p className="mt-1 font-display text-4xl font-bold text-primary">
            {eur(Math.round(monthly))}
            <span className="text-base font-normal text-muted-foreground">/mês</span>
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            {months} meses · sujeito a aprovação da entidade financeira
          </p>
        </div>
      </div>
    </div>
  );
}
