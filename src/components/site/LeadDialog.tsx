import { useState, type ReactNode } from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const leadSchema = z.object({
  nome: z.string().trim().min(3, "Indique o seu nome completo.").max(100),
  email: z.string().trim().email("Introduza um email válido.").max(255),
  telefone: z
    .string()
    .trim()
    .min(9, "Introduza um número de telefone válido.")
    .max(20)
    .regex(/^[+0-9 ()-]+$/, "O telefone só pode conter números e os símbolos + ( ) -"),
  mensagem: z.string().trim().max(1000).optional(),
});

export function LeadDialog({
  title,
  description,
  trigger,
  submitLabel,
}: {
  title: string;
  description: string;
  trigger: ReactNode;
  submitLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const result = leadSchema.safeParse(data);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setOpen(false);
    toast.success("Pedido enviado com sucesso", {
      description: "A nossa equipa entrará em contacto consigo nas próximas 24 horas.",
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="nome">Nome completo</Label>
            <Input id="nome" name="nome" placeholder="Ex.: João Silva" maxLength={100} />
            {errors['nome'] && <p className="text-xs text-primary">{errors['nome']}</p>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" placeholder="joao@email.pt" maxLength={255} />
              {errors['email'] && <p className="text-xs text-primary">{errors['email']}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" name="telefone" placeholder="+351 291 000 000" maxLength={20} />
              {errors['telefone'] && <p className="text-xs text-primary">{errors['telefone']}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mensagem">Mensagem (opcional)</Label>
            <Textarea id="mensagem" name="mensagem" rows={4} maxLength={1000} placeholder="Indique disponibilidade ou dúvidas específicas." />
          </div>
          <Button type="submit" className="w-full">{submitLabel}</Button>
          <p className="text-center text-[11px] text-muted-foreground">
            Formulário demonstrativo — os dados não são enviados nem armazenados.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
