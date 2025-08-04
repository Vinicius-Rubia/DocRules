import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Rule } from "@/types/rules";
import {
  Cog,
  FileBox,
  GitMerge,
  Info,
  UserRound,
  UsersRound
} from "lucide-react";
import { DeleteRuleDialogContent } from "./delete-rule-dialog-content";
import { DropdownRuleActions } from "./dropdown-rule-actions";

interface RuleListProps {
  rules: Rule[];
}

export function RuleList({ rules }: RuleListProps) {
  if (!rules || rules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border border-dashed rounded-lg">
        <Info className="size-8 mb-4" />
        <h2 className="text-lg font-semibold">Nenhuma regra encontrada</h2>
        <p className="text-sm">
          Você pode adicionar uma nova regra ou ajustar sua busca.
        </p>
      </div>
    );
  }

  return (
    <Accordion type="multiple" className="w-full space-y-4">
      {rules.map((rule, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border rounded-lg bg-card"
        >
          <div className="flex items-center gap-4 [&>h3]:flex-1 px-4">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex flex-col md:flex-row md:items-center gap-2 w-full">
                <span className="font-semibold text-base text-card-foreground flex-1 truncate">
                  {rule.name}
                </span>
                <Badge variant="outline" className="w-fit">
                  {rule.module}
                </Badge>
              </div>
            </AccordionTrigger>
            <AlertDialog>
              <DropdownRuleActions rule={rule} />
              <DeleteRuleDialogContent rule={rule} />
            </AlertDialog>
          </div>
          <AccordionContent className="p-4 pt-0">
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Info className="size-4 mt-1 text-muted-foreground shrink-0" />
                <p>
                  <strong className="font-medium text-card-foreground">
                    Cenário:{" "}
                  </strong>
                  <span className="text-muted-foreground">{rule.scenario}</span>
                </p>
              </div>
            </div>

            <Separator className="my-6" />
            <div className="space-y-6">
              {rule.contexts?.map((context, contextIndex) => (
                <div key={contextIndex} className="p-4 border rounded-lg bg-background space-y-6">
                  <h3 className="flex items-center gap-2 font-semibold text-card-foreground">
                    <FileBox className="size-5 text-primary" />
                    Contexto: {context.name}
                  </h3>

                  <div className="flex items-start gap-3 text-sm">
                    <Cog className="size-4 mt-1 text-muted-foreground shrink-0" />
                    <p>
                      <strong className="font-medium text-card-foreground">
                        Comportamento Padrão (deste contexto):{" "}
                      </strong>
                      <span className="text-muted-foreground">
                        {context.defaultBehavior}
                      </span>
                    </p>
                  </div>

                  {context.behaviorByCustomer && context.behaviorByCustomer.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="flex items-center gap-2 font-medium text-sm text-card-foreground">
                        <UsersRound className="size-4" />
                        Comportamentos condicionais
                      </h4>
                      {context.behaviorByCustomer.map((behavior, bIndex) => (
                        <div
                          key={bIndex}
                          className="p-4 border rounded-md bg-muted/50"
                        >
                          <h5 className="flex items-center gap-2 font-medium mb-4 text-primary text-sm">
                            <UserRound className="size-4" />
                            Cliente: <strong>{behavior.customer}</strong>
                          </h5>
                          <div className="space-y-4">
                            {behavior.conditions.map((condition, cIndex) => (
                              <div key={cIndex} className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                  <span className="font-mono text-xs py-0.5 px-1.5 bg-muted rounded">
                                    SE
                                  </span>
                                  <span className="text-muted-foreground">
                                    {condition.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 pl-4">
                                  <GitMerge className="size-4 text-muted-foreground rotate-90" />
                                  <div className="flex items-center gap-2 text-sm">
                                    <span className="font-mono text-xs py-0.5 px-1.5 bg-primary/10 text-primary rounded">
                                      ENTÃO
                                    </span>
                                    <span className="text-muted-foreground">
                                      {condition.behavior}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
