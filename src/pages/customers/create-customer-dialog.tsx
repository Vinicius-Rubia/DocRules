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
import type { SetValue } from "@/hooks/use-local-storage";
import type { Customer } from "@/types/customers";
import { CustomerSchemas } from "@/validators/customer-schemas";
import type { CreateCustomerType } from "@/validators/schema-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

interface CreateCustomerProps {
  setCustomers: SetValue<Customer[]>;
}

export function CreateCustomerDialog({ setCustomers }: CreateCustomerProps) {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<CreateCustomerType>({
    resolver: zodResolver(CustomerSchemas.create),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: CreateCustomerType) {
    const payload: Customer = { name: data.name, id: uuidv4() };
    setCustomers((prev) => [...prev, payload]);
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
              <DialogTitle>Criar cliente</DialogTitle>
              <DialogDescription>
                Crie um cliente para ter comportamentos diferentes para ele.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do cliente</FormLabel>
                  <FormControl>
                    <Input placeholder="cliente" {...field} />
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
              <Button type="submit">Criar cliente</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
