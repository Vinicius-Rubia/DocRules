import type z from "zod";
import type { AuthSchemas } from "./auth-schemas";
import type { CustomerSchemas } from "./customer-schemas";
import type { ModulesSchemas } from "./module-schemas";
import type { AllRulesSchema } from "./rule-schemas";

export type CreateModuleType = z.infer<typeof ModulesSchemas.create>;
export type CreateCustomerType = z.infer<typeof CustomerSchemas.create>;
export type AllRulesType = z.infer<typeof AllRulesSchema>;
export type LoginSchemaType = z.infer<typeof AuthSchemas.login>;
