import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { KEYS } from "@/constants/local-storage-keys";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { Module } from "@/types/modules";
import type { Rule } from "@/types/rules";
import { ModulesSchemas } from "@/validators/module-schemas";
import type { CreateModuleType } from "@/validators/schema-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface UpdateModuleProps {
  module: Module;
}

export function UpdateModuleDialog({ module }: UpdateModuleProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [_, setModules] = useLocalStorage<Module[]>(KEYS.MODULES, []);
  const [__, setRules] = useLocalStorage<Rule[]>(KEYS.RULES, []);

  const form = useForm<CreateModuleType>({
    resolver: zodResolver(ModulesSchemas.create),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: CreateModuleType) {
    const payload: Module = { name: data.name, id: module.id };
    setModules((prev) => prev.map((m) => (m.id === module.id ? payload : m)));

    setRules((prevRules) =>
      prevRules.map((rule) => {
        if (rule.module === module.name) {
          return { ...rule, module: data.name };
        }
        return rule;
      })
    );

    setOpen(false);
  }

  useEffect(() => {
    if (module) {
      form.reset({
        name: module.name,
      });
    }
  }, [module, form.reset, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="cursor-pointer"
        >
          <Pencil className="mr-2 size-4" />
          <span>Editar</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Editar módulo</DialogTitle>
              <DialogDescription>Edite seu módulo.</DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do módulo</FormLabel>
                  <FormControl>
                    <Input placeholder="módulo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Salvar mudanças</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
