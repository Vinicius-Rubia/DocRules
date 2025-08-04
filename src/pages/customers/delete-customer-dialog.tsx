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
import type { Customer } from "@/types/customers";
import type { Rule } from "@/types/rules";
import { Trash2 } from "lucide-react";

interface DeleteCustomerProps {
  customer: Customer;
}

export function DeleteCustomerDialog({ customer }: DeleteCustomerProps) {
  const [_, setCustomers] = useLocalStorage<Customer[]>(KEYS.CUSTOMERS, []);
  const [__, setRules] = useLocalStorage<Rule[]>(KEYS.RULES, []);

  const handleDelete = () => {
    const customerNameToDelete = customer.name;

    setCustomers((prevCustomers) =>
      prevCustomers.filter((c) => c.id !== customer.id)
    );

    setRules((prevRules) =>
      prevRules.map((rule) => {
        if (!rule.behaviorByCustomer || rule.behaviorByCustomer.length === 0) {
          return rule;
        }

        const updatedBehaviors = rule.behaviorByCustomer.filter(
          (behavior) => behavior.customer !== customerNameToDelete
        );

        if (updatedBehaviors.length === rule.behaviorByCustomer.length) {
          return rule;
        }
        
        return { ...rule, behaviorByCustomer: updatedBehaviors };
      })
    );
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
          <AlertDialogTitle>Tem certeza absoluta disso?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não poderá ser desfeita. Isso excluirá permanentemente seu
            cliente <strong className="mx-1">"{customer.name}"</strong> e
            juntamente os comportamentos atrelados a ele.
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
