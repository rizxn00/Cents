export interface Expense {
    id: number;
    user_id: string;
    amount: number;
    category: string;
    description: string;
    date: Date;
  }