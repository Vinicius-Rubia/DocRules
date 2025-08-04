export interface Rule {
  id: string;
  name: string;
  module: string;
  scenario: string;
  contexts: Context[];
}

export interface BehaviorByCustomer {
  customer: string;
  conditions: Condition[];
}

export interface Condition {
  title: string;
  behavior: string;
}

export interface Context {
  name: string;
  defaultBehavior: string;
  behaviorByCustomer?: BehaviorByCustomer[];
}
