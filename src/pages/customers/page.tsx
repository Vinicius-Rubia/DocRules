import { Input } from "@/components/ui/input";
import { KEYS } from "@/constants/local-storage-keys";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { Customer } from "@/types/customers";
import { Search } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { CreateCustomerDialog } from "./create-customer-dialog";
import { CustomerList } from "./customer-list";

export function Customers() {
  const [customers, setCustomers] = useLocalStorage<Customer[]>(KEYS.CUSTOMERS, []);
  const [searchCustomer, setSearchCustomer] = useState<string>("");

  const handleSearchCustomer = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchCustomer(event.target.value);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchCustomer.toLowerCase())
  );

  return (
    <main>
      <div className="sticky top-16 h-28 pt-4 bg-background space-y-4">
        <h1 className="md:text-lg">Clientes ({filteredCustomers.length})</h1>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Nome do cliente"
              className="pl-8"
              value={searchCustomer}
              onChange={handleSearchCustomer}
            />
          </div>
          <CreateCustomerDialog setCustomers={setCustomers} />
        </div>
      </div>
      <CustomerList customers={filteredCustomers} />
    </main>
  );
}
