import { z } from "zod";

const conditionSchema = z.object({
  title: z.string().min(1, "O título da condição é obrigatório."),
  behavior: z.string().min(1, "O comportamento da condição é obrigatório."),
});

const behaviorByCustomerSchema = z.object({
  customer: z.string().min(1, "Escolha um cliente."),
  conditions: z.array(conditionSchema).nonempty({
    message: "Deve haver pelo menos uma condição para o credor.",
  }),
});

const contextSchema = z.object({
  name: z.string().min(1, "O nome do contexto é obrigatório."), 
  defaultBehavior: z.string().min(1, "O comportamento padrão do contexto é obrigatório."),
  behaviorByCustomer: z.array(behaviorByCustomerSchema).optional(),
});

export const AllRulesSchema = z.object({
  name: z.string().min(1, "O nome da regra é obrigatório."),
  module: z.string().min(1, "Escolha um módulo."),
  scenario: z.string().min(1, "A descrição do cenário é obrigatória."),
  contexts: z.array(contextSchema).nonempty({
    message: "Uma regra deve ter pelo menos um contexto de comportamento.",
  }),
});
