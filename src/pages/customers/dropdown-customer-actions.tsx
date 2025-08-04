import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Customer } from "@/types/customers";
import { MoreHorizontal } from "lucide-react";
import { DeleteCustomerDialog } from "./delete-customer-dialog";
import { UpdateCustomerDialog } from "./update-customer-dialog";

interface DropdownCustomersActionsProps {
  customer: Customer;
}

export function DropdownCustomerActions({ customer }: DropdownCustomersActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <UpdateCustomerDialog customer={customer} />
        <DropdownMenuSeparator />
        <DeleteCustomerDialog customer={customer} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
