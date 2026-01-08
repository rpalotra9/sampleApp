export interface App {
  id: string;
  name: string;
  iconName?: string; // Icon name as string key
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

export interface Subscription {
  id: string;
  app: App | null;
  amount: number;
  category: Category | null;
  startDate: Date;
  frequency: 'Weekly' | 'Monthly' | 'Annually';
  remindMe: string;
  active: boolean;
}

export type Frequency = 'Weekly' | 'Monthly' | 'Annually';
export type RemindMeOption = '1 day before' | '2 days before' | '3 days before' | '1 week before';

