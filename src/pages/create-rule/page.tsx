import { ContextField } from "@/components/context-field";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { KEYS } from "@/constants/local-storage-keys";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { cn } from "@/lib/utils";
import type { Module } from "@/types/modules";
import type { Rule } from "@/types/rules";
import { AllRulesSchema } from "@/validators/rule-schemas";
import type { AllRulesType } from "@/validators/schema-types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  ChevronsUpDown,
  Info,
  PlusCircle,
  Save
} from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

export function CreateRule() {
  const [modules] = useLocalStorage<Module[]>(KEYS.MODULES, []);
  const [_, setRules] = useLocalStorage<Rule[]>(KEYS.RULES, []);
  const navigate = useNavigate();

  const form = useForm<AllRulesType>({
    resolver: zodResolver(AllRulesSchema),
    defaultValues: {
      name: "",
      module: "",
      scenario: "",
      contexts: [
        {
          name: "",
          defaultBehavior: "",
          behaviorByCustomer: [],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "contexts",
  });

  const handleAddBehavior = () => {
    append({
      defaultBehavior: "",
      name: "",
      behaviorByCustomer: [],
    });
  };

  function onSubmit(data: AllRulesType) {
    setRules((prev) => [...prev, { ...data, id: uuidv4() }]);
    toast.success("Sucesso!", {
      description: "Sua regra foi adicionada com sucesso.",
    });
    navigate("/rules");
  }

  return (
    <main>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
          <div className="p-6 border rounded-lg space-y-4">
            <h2 className="text-xl font-bold">Informações da Regra</h2>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da regra</FormLabel>
                  <FormControl>
                    <Input placeholder="regra" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="module"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Módulo</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? modules.find(
                                (module) => module.name === field.value
                              )?.name
                            : "selecione um módulo"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="p-0">
                      <Command>
                        <CommandInput
                          placeholder="Procure um módulo..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>Nenhum módulo encontrado.</CommandEmpty>
                          <CommandGroup>
                            {modules.map((module) => (
                              <CommandItem
                                value={module.name}
                                key={module.id}
                                onSelect={() => {
                                  form.setValue("module", module.name, {
                                    shouldValidate: true,
                                  });
                                }}
                              >
                                {module.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    module.name === field.value
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

            <FormField
              control={form.control}
              name="scenario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cenário</FormLabel>
                  <FormControl>
                    <Input placeholder="cenário" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold">Contextos da Regra</h2>
            {fields.length === 0 && (
               <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border border-dashed rounded-lg">
                <Info className="size-8 mb-4" />
                <h2 className="text-lg font-semibold">Nenhum contexto adicionado</h2>
                <p className="text-sm mb-4">
                  Você pode adicionar um novo contexto para sua regra.
                </p>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddBehavior}
                >
                  <PlusCircle className="mr-2 size-4" />
                  Adicionar Novo Contexto
                </Button>
              </div>
            )}

            {fields.map((field, index) => (
              <ContextField
                key={field.id}
                contextIndex={index}
                onRemove={() => remove(index)}
              />
            ))}

            {form.formState.errors.contexts?.root && (
              <p className="text-destructive text-sm">{form.formState.errors.contexts.root.message}</p>
            )}
          </div>
          
          {fields.length > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleAddBehavior}
            >
              <PlusCircle className="mr-2 size-4" />
              Adicionar Novo Contexto
            </Button>
          )}
          <Button className="flex ml-auto">
            <Save />
            Salvar
          </Button>
        </form>
      </Form>
    </main>
  );
}
