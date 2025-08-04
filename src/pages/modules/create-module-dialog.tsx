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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type SetValue } from "@/hooks/use-local-storage";
import type { Module } from "@/types/modules";
import { ModulesSchemas } from "@/validators/module-schemas";
import type { CreateModuleType } from "@/validators/schema-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

interface CreateModuleProps {
  setModules: SetValue<Module[]>;
}

export function CreateModuleDialog({ setModules }: CreateModuleProps) {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<CreateModuleType>({
    resolver: zodResolver(ModulesSchemas.create),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: CreateModuleType) {
    const payload: Module = { name: data.name, id: uuidv4() };
    setModules((prev) => [...prev, payload]);
    handleOpenChange(false);
  }

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Novo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Criar módulo</DialogTitle>
              <DialogDescription>
                Crie um módulo para atrelas suas regras a ele
              </DialogDescription>
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
              <Button type="submit">Criar módulo</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
