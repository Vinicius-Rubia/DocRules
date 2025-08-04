import z from "zod";

const login = z.object({
  access_key: z.string().min(1, "Chave de acesso é obrigatória."),
});

export const AuthSchemas = {
  login,
};
