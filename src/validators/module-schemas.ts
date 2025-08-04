import { z } from "zod";

const create = z.object({
  name: z.string().min(1, "Nome do módulo é obrigatório."),
});

export const ModulesSchemas = {
  create,
};
