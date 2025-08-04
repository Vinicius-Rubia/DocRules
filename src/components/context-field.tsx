import type { AllRulesType } from "@/validators/schema-types";
import { PlusCircle, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { BehaviorField } from "./behavior-field";
import { Button } from "./ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface ContextFieldProps {
  contextIndex: number;
  onRemove: () => void;
}

export function ContextField({ contextIndex, onRemove }: ContextFieldProps) {
  const { control } = useFormContext<AllRulesType>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `contexts.${contextIndex}.behaviorByCustomer`,
  });

  return (
    <div className="p-6 border-2 border-dashed rounded-xl space-y-6 relative">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Contexto #{contextIndex + 1}</h3>
        <Button variant="ghost" size="icon" type="button" onClick={onRemove}>
          <Trash2 className="size-4 text-destructive" />
        </Button>
      </div>

      <FormField
        control={control}
        name={`contexts.${contextIndex}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome do Contexto</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Pagamento à vista" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`contexts.${contextIndex}.defaultBehavior`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Comportamento Padrão (deste contexto)</FormLabel>
            <FormControl>
              <Input placeholder="Ex: O campo de data é bloqueado" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        {fields.map((field, index) => (
          <BehaviorField
            key={field.id}
            contextIndex={contextIndex}
            behaviorIndex={index}
            onRemove={() => remove(index)}
          />
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          append({ customer: "", conditions: [{ title: "", behavior: "" }] })
        }
      >
        <PlusCircle className="mr-2 size-4" />
        Adicionar Comportamento por Cliente
      </Button>
    </div>
  );
}
