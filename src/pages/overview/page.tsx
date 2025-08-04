import { KEYS } from "@/constants/local-storage-keys";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { Customer } from "@/types/customers";
import type { Module } from "@/types/modules";
import type { Rule } from "@/types/rules";
import { Info } from "lucide-react";

export function Overview() {
  const [modules] = useLocalStorage<Module[]>(KEYS.MODULES, []);
  const [customers] = useLocalStorage<Customer[]>(KEYS.CUSTOMERS, []);
  const [rules] = useLocalStorage<Rule[]>(KEYS.RULES, []);

  return (
    <main className="space-y-4 pt-4">
      <div className="flex flex-wrap gap-4">
        <div className="bg-muted/50 rounded-xl p-4 flex gap-4 items-center justify-between flex-1 min-w-70">
          <div className="space-y-2 w-3/4">
            <h2 className="text-sm">Módulos</h2>
            <p className="text-xs">Total de módulos criados.</p>
          </div>
          <span className="text-5xl">{modules.length}</span>
        </div>
        <div className="bg-muted/50 rounded-xl p-4 flex gap-4 items-center justify-between flex-1 min-w-70">
          <div className="space-y-2 w-3/4">
            <h2 className="text-sm">Clientes</h2>
            <p className="text-xs">Total de variação de clientes.</p>
          </div>
          <span className="text-5xl">{customers.length}</span>
        </div>
        <div className="bg-muted/50 rounded-xl p-4 flex gap-4 items-center justify-between flex-1 min-w-70">
          <div className="space-y-2 w-3/4">
            <h2 className="text-sm">Regras Cadastradas</h2>
            <p className="text-xs">Total de regras de negócio documentadas.</p>
          </div>
          <span className="text-5xl">{rules.length}</span>
        </div>
      </div>
      <div className="bg-muted/50 flex-1 rounded-xl p-4 text-sm text-center text-muted-foreground flex flex-col justify-center items-center">
        <Info className="size-8 mb-4" />
        <h2 className="text-lg font-semibold">Em breve</h2>
        <p className="text-sm">existirá mais conteúdo nesta página.</p>
      </div>
    </main>
  );
}
