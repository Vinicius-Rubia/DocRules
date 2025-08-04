import type { AllRulesType } from "@/validators/schema-types";
import { Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "./ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface ConditionFieldProps {
  contextIndex: number;
  behaviorIndex: number;
  conditionIndex: number;
  onRemove: () => void;
}

export function ConditionField({
  contextIndex,
  behaviorIndex,
  conditionIndex,
  onRemove,
}: ConditionFieldProps) {
  const { control } = useFormContext<AllRulesType>();

  return (
    <div className="flex items-start gap-4 p-4 border rounded-md bg-muted/50 relative">
      <div className="flex-grow space-y-4">
        <FormField
          control={control}
          name={`contexts.${contextIndex}.behaviorByCustomer.${behaviorIndex}.conditions.${conditionIndex}.title`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Condição (SE...)</FormLabel>
              <FormControl>
                <Input placeholder="SE o usuário for novo..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`contexts.${contextIndex}.behaviorByCustomer.${behaviorIndex}.conditions.${conditionIndex}.behavior`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comportamento (ENTÃO...)</FormLabel>
              <FormControl>
                <Input placeholder="O campo deve ser habilitado." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={onRemove}
        className="mt-6"
      >
        <Trash2 className="size-4 text-muted-foreground" />
      </Button>
    </div>
  );
}
