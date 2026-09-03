export type View =
  | 'launcher'
  | 'login'
  | 'organization'
  | 'project-overview'
  | 'expenses'
  | 'expense-review'
  | 'budget'
  | 'report'
  | 'share'
  | 'member-submit'
  | 'member-review'
  | 'member-success'
  | 'member-bills'
  | 'member-resubmit'
  | 'public-portal'
  | 'public-expense'
  | 'public-offline';

export type ExpenseStatus = 'pending' | 'needs_more' | 'recorded' | 'rejected';
export type ProjectStatus = 'active' | 'preparing' | 'closed';

export type ExpenseItem = {
  name: string;
  quantity: number;
  unitPrice: number;
};

export type Expense = {
  id: string;
  projectId: string;
  title: string;
  submitter: string;
  payer: string;
  amount: number;
  date: string;
  time: string;
  category: string;
  fundingSource: string;
  vendor: string;
  invoiceNumber: string;
  status: ExpenseStatus;
  submittedAt: string;
  evidence: Array<'transfer' | 'invoice'>;
  items: ExpenseItem[];
  note?: string;
  risk?: 'duplicate' | 'budget' | 'missing' | 'none';
  isFresh?: boolean;
};

export type BudgetCategory = {
  name: string;
  total: number;
  spent: number;
  color: string;
};

export type Project = {
  id: string;
  name: string;
  organization: string;
  startDate: string;
  endDate: string;
  budget: number;
  baseSpent: number;
  status: ProjectStatus;
  publicEnabled: boolean;
  submissionsOpen: boolean;
  pendingCount: number;
  recordedCount: number;
  categories: BudgetCategory[];
};

export type DemoState = {
  projects: Project[];
  expenses: Expense[];
};

export type ToastState = {
  title: string;
  detail: string;
  tone?: 'success' | 'warning' | 'neutral';
} | null;

export type ChatMessage = {
  role: 'assistant' | 'user';
  content: string;
  sourceIds?: string[];
};
