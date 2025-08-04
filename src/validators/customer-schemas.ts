import { z } from "zod";

const create = z.object({
  name: z.string().min(1, "Nome do cliente é obrigatório."),
});

export const CustomerSchemas = {
  create,
};
