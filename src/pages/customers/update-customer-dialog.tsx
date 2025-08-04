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
import type { Customer } from "@/types/customers";
import type { Rule } from "@/types/rules";
import { CustomerSchemas } from "@/validators/customer-schemas";
import type { CreateCustomerType } from "@/validators/schema-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface UpdateCustomerProps {
  customer: Customer;
}

export function UpdateCustomerDialog({ customer }: UpdateCustomerProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [_, setCustomers] = useLocalStorage<Customer[]>(KEYS.CUSTOMERS, []);
  const [__, setRules] = useLocalStorage<Rule[]>(KEYS.RULES, []);

  const form = useForm<CreateCustomerType>({
    resolver: zodResolver(CustomerSchemas.create),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: CreateCustomerType) {
    const oldCustomerName = customer.name;
    const newCustomerName = data.name;

    if (oldCustomerName === newCustomerName) {
      setOpen(false);
      return;
    }

    const payload: Customer = { name: newCustomerName, id: customer.id };
    setCustomers((prev) =>
      prev.map((c) => (c.id === customer.id ? payload : c))
    );

    setRules((prevRules) =>
      prevRules.map((rule) => {
        if (!rule.contexts || rule.contexts.length === 0) {
          return rule;
        }

        const updatedContexts = rule.contexts.map((context) => {
          const needsUpdate = context.behaviorByCustomer?.some(
            (behavior) => behavior.customer === oldCustomerName
          );

          if (!needsUpdate || !context.behaviorByCustomer) {
            return context;
          }

          const updatedBehaviors = context.behaviorByCustomer.map(
            (behavior) => {
              if (behavior.customer === oldCustomerName) {
                return { ...behavior, customer: newCustomerName };
              }
              return behavior;
            }
          );

          return { ...context, behaviorByCustomer: updatedBehaviors };
        });

        const hasContextsChanged = updatedContexts.some(
          (ctx, i) => ctx !== rule.contexts[i]
        );
        if (!hasContextsChanged) {
          return rule;
        }

        return { ...rule, contexts: updatedContexts };
      })
    );

    setOpen(false);
  }

  useEffect(() => {
    if (customer) {
      form.reset({
        name: customer.name,
      });
    }
  }, [customer, form.reset, open]);

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
              <DialogTitle>Editar Cliente</DialogTitle>
              <DialogDescription>Edite seu cliente.</DialogDescription>
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
              <Button type="submit">Salvar mudanças</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
