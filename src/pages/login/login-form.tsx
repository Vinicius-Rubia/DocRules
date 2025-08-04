import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useFlowStore } from "@/stores/flow-store";
import { AuthSchemas } from "@/validators/auth-schemas";
import type { LoginSchemaType } from "@/validators/schema-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const setAccessKey = useFlowStore((state) => state.setAccessKey);

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(AuthSchemas.login),
    defaultValues: {
      access_key: "",
    },
  });

  function onSubmit({ access_key }: LoginSchemaType) {
    if (access_key === ACCESS_KEY) {
      toast.success("Autenticado com sucesso!", {
        description: "Seja muito bem-vindo :)",
      });
      setAccessKey(access_key)
      navigate("/");
    } else {
      toast.error("Acesso negado!", {
        description: "Não foi possível autenticar ao portal.",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Entre na sua conta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Insira a sua chave de acesso abaixo para acessar o portal
          </p>
        </div>
        <FormField
          control={form.control}
          name="access_key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chave de acesso</FormLabel>
              <FormControl>
                <Input type="password" placeholder="*********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </form>
    </Form>
  );
}
