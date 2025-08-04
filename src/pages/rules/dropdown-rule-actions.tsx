import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Rule } from "@/types/rules";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { NavLink } from "react-router-dom";

interface DropdownRuleActionsProps {
  rule: Rule;
}

export function DropdownRuleActions({ rule }: DropdownRuleActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild className="cursor-pointer">
          <NavLink to={`/rules/${rule.id}`}>
            <Pencil className="mr-2 size-4" />
            <span>Editar</span>
          </NavLink>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <AlertDialogTrigger asChild>
          <DropdownMenuItem
            className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
            onSelect={(e) => e.preventDefault()}
          >
            <Trash2 className="mr-2 size-4 text-destructive" />
            <span>Excluir</span>
          </DropdownMenuItem>
        </AlertDialogTrigger>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
