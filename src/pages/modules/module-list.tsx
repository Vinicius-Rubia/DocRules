import type { Module } from "@/types/modules";
import { Info } from "lucide-react";
import { DropdownModuleActions } from "./dropdown-module-actions";

interface ModuleListProps {
  modules: Module[];
}

export function ModuleList({ modules }: ModuleListProps) {
  if (!modules || modules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border border-dashed rounded-lg">
        <Info className="size-8 mb-4" />
        <h2 className="text-lg font-semibold">Nenhum módulo encontrado</h2>
        <p className="text-sm">
          Você pode adicionar um novo módulo ou ajustar sua busca.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {modules.map((module, index) => (
        <div
          key={index}
          className="p-4 bg-muted/30 rounded-md flex items-center justify-between gap-4"
        >
          <h2 className="truncate">{module.name}</h2>
          <DropdownModuleActions module={module} />
        </div>
      ))}
    </div>
  );
}
