import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Module } from "@/types/modules";
import { MoreHorizontal } from "lucide-react";
import { DeleteModuleDialog } from "./delete-module-dialog";
import { UpdateModuleDialog } from "./update-module-dialog";

interface DropdownModuleActionsProps {
  module: Module;
}

export function DropdownModuleActions({ module }: DropdownModuleActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <UpdateModuleDialog module={module} />
        <DropdownMenuSeparator />
        <DeleteModuleDialog module={module} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
