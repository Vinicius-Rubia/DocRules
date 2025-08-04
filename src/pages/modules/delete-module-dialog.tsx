import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { KEYS } from "@/constants/local-storage-keys";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { Module } from "@/types/modules";
import type { Rule } from "@/types/rules";
import { Trash2 } from "lucide-react";

interface DeleteModuleProps {
  module: Module;
}

export function DeleteModuleDialog({ module }: DeleteModuleProps) {
  const [_, setModules] = useLocalStorage<Module[]>(KEYS.MODULES, []);
  const [__, setRules] = useLocalStorage<Rule[]>(KEYS.RULES, []);

  const handleDelete = () => {
    setModules((prev) => prev.filter((m) => m.id !== module.id));
    setRules((prev) => prev.filter((r) => r.module !== module.name));
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
          onSelect={(e) => e.preventDefault()}
        >
          <Trash2 className="mr-2 size-4 text-destructive" />
          <span>Excluir</span>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente o
            módulo
            <strong className="mx-1">"{module.name}"</strong> e juntamente as
            regras atreladas a ele.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              className="text-white hover:!bg-destructive/70"
              onClick={handleDelete}
            >
              Sim, excluir
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
