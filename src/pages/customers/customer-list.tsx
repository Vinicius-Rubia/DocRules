import type { Customer } from "@/types/customers";
import { Info } from "lucide-react";
import { DropdownCustomerActions } from "./dropdown-customer-actions";

interface CustomerListProps {
  customers: Customer[];
}

export function CustomerList({ customers }: CustomerListProps) {
  if (!customers || customers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border border-dashed rounded-lg">
        <Info className="size-8 mb-4" />
        <h2 className="text-lg font-semibold">Nenhum cliente encontrado</h2>
        <p className="text-sm">
          Você pode adicionar um novo cliente ou ajustar sua busca.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {customers.map((customer, index) => (
        <div
          key={index}
          className="p-4 bg-muted/30 rounded-md flex items-center justify-between gap-4"
        >
          <h2 className="truncate">{customer.name}</h2>
          <DropdownCustomerActions customer={customer} />
        </div>
      ))}
    </div>
  );
}
