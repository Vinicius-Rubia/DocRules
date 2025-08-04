import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { KEYS } from "@/constants/local-storage-keys";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { cn } from "@/lib/utils";
import type { Customer } from "@/types/customers";
import type { AllRulesType } from "@/validators/schema-types";
import { Check, ChevronsUpDown, PlusCircle, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ConditionField } from "./condition-field";

interface BehaviorFieldProps {
  contextIndex: number;
  behaviorIndex: number;
  onRemove: () => void;
}

export function BehaviorField({ contextIndex, behaviorIndex, onRemove }: BehaviorFieldProps) {
  const form = useFormContext<AllRulesType>();

  const [customers] = useLocalStorage<Customer[]>(KEYS.CUSTOMERS, []);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `contexts.${contextIndex}.behaviorByCustomer.${behaviorIndex}.conditions`,
  });

  const handleAddCondition = () => {
    append({ title: "", behavior: "" });
  };

  return (
    <div className="p-4 border rounded-md space-y-6 relative">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">Comportamento por Cliente</h4>
        <Button variant="ghost" size="icon" type="button" onClick={onRemove}>
          <Trash2 className="size-4 text-destructive" />
        </Button>
      </div>

      <FormField
        control={form.control}
        name={`contexts.${contextIndex}.behaviorByCustomer.${behaviorIndex}.customer`}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Cliente</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "max-w-[400px] justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? customers.find(
                          (customer) => customer.name === field.value
                        )?.name ?? "Todos"
                      : "selecione um cliente"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="max-w-[400px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Procure um cliente..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        value="Todos"
                        onSelect={() => {
                          form.setValue(`contexts.${contextIndex}.behaviorByCustomer.${behaviorIndex}.customer`, "Todos", { shouldValidate: true });
                        }}
                      >
                        Todos
                        <Check
                          className={cn(
                            "ml-auto",
                            "Todos" === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                      {customers.map((customer) => (
                        <CommandItem
                          value={customer.name}
                          key={customer.id}
                          onSelect={() => {
                            form.setValue(
                              `contexts.${contextIndex}.behaviorByCustomer.${behaviorIndex}.customer`,
                              customer.name,
                              { shouldValidate: true }
                            );
                          }}
                        >
                          {customer.name}
                          <Check
                            className={cn(
                              "ml-auto",
                              customer.name === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-2">
        {fields.map((field, index) => (
          <ConditionField
            key={field.id}
            contextIndex={contextIndex}
            behaviorIndex={behaviorIndex}
            conditionIndex={index}
            onRemove={() => remove(index)}
          />
        ))}

        <Button type="button" variant="secondary" size="sm" onClick={handleAddCondition}>
          <PlusCircle className="mr-2 size-4" />
          Adicionar Condição
        </Button>

        {form.formState.errors.contexts?.[contextIndex]?.behaviorByCustomer?.[behaviorIndex]?.conditions?.root && (
          <p className="text-destructive text-sm">{form.formState.errors.contexts[contextIndex].behaviorByCustomer[behaviorIndex].conditions.root.message}</p>
        )}
      </div>
    </div>
  );
}
