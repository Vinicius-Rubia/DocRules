import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { KEYS } from "@/constants/local-storage-keys";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { cn } from "@/lib/utils";
import type { Rule } from "@/types/rules";
import { Check, ChevronsUpDown, Plus, Search } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { RuleList } from "./rule-list";

export function Rules() {
  const [rules] = useLocalStorage<Rule[]>(KEYS.RULES, []);

  const [searchRule, setSearchRule] = useState<string>("");
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [openPopover, setOpenPopover] = useState(false);

  const handleSearchRule = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchRule(event.target.value);
  };

  const availableModules = [...new Set(rules.map((rule) => rule.module))];

  const filteredRules = rules
    .filter((rule) => {
      if (selectedModule) {
        return rule.module === selectedModule;
      }
      return true;
    })
    .filter((rule) =>
      rule.name.toLowerCase().includes(searchRule.toLowerCase())
    );

  return (
    <main>
      <div className="sticky top-16 h-28 pt-4 bg-background space-y-4 z-30">
        <h1 className="md:text-lg">Regras ({filteredRules.length})</h1>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Nome da regra"
              className="pl-8"
              value={searchRule}
              onChange={handleSearchRule}
            />
          </div>

          <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openPopover}
                className="w-[300px] justify-between"
              >
                <span className="truncate">
                  {selectedModule ?? "Todos os módulos"}
                </span>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Procurar módulo..." />
                <CommandList>
                  <CommandEmpty>Nenhum módulo encontrado.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        setSelectedModule(null);
                        setOpenPopover(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedModule === null ? "opacity-100" : "opacity-0"
                        )}
                      />
                      Todos os módulos
                    </CommandItem>

                    {availableModules.map((moduleName) => (
                      <CommandItem
                        key={moduleName}
                        value={moduleName}
                        onSelect={(currentValue) => {
                          setSelectedModule(currentValue);
                          setOpenPopover(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedModule === moduleName
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {moduleName}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Button asChild>
            <Link to="/rules/create" className="flex items-center">
              <Plus />
              Novo
            </Link>
          </Button>
        </div>
      </div>
      <RuleList rules={filteredRules} />
    </main>
  );
}
