import { Input } from "@/components/ui/input";
import { KEYS } from "@/constants/local-storage-keys";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { Module } from "@/types/modules";
import { Search } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { CreateModuleDialog } from "./create-module-dialog";
import { ModuleList } from "./module-list";

export function Modules() {
  const [modules, setModules] = useLocalStorage<Module[]>(KEYS.MODULES, []);
  const [searchModule, setSearchModule] = useState<string>("");

  const handleSearchModule = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchModule(event.target.value);
  };

  const filteredModules = modules.filter((module) =>
    module.name.toLowerCase().includes(searchModule.toLowerCase())
  );

  return (
    <main>
      <div className="sticky top-16 h-28 pt-4 bg-background space-y-4">
        <h1 className="md:text-lg">Módulos ({filteredModules.length})</h1>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Nome do módulo"
              className="pl-8"
              value={searchModule}
              onChange={handleSearchModule}
            />
          </div>
          <CreateModuleDialog setModules={setModules} />
        </div>
      </div>
      <ModuleList modules={filteredModules} />
    </main>
  );
}
