import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { KEYS } from "@/constants/local-storage-keys";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { Rule } from "@/types/rules";

interface DeleteRuleProps {
  rule: Rule;
}

export function DeleteRuleDialogContent({ rule }: DeleteRuleProps) {
  const [_, setRules] = useLocalStorage<Rule[]>(KEYS.RULES, []);

  const handleDelete = () => {
    setRules((prev) => prev.filter((c) => c.id !== rule.id));
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
        <AlertDialogDescription>
          Essa ação não pode ser desfeita. Isso excluirá permanentemente a regra
          <strong className="mx-1">"{rule.name}"</strong>.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction asChild>
          <Button
            variant="destructive"
            className="text-white hover:!bg-destructive/70"
            onClick={handleDelete}
          >
            Sim, excluir
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
