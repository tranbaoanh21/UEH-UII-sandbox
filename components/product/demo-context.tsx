'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { ACTIVE_PROJECT_ID, initialDemoState } from '@/lib/demo-data';
import type { DemoState, Expense, ExpenseStatus, ToastState, View } from '@/lib/demo-types';

type DemoContextValue = {
  state: DemoState;
  view: View;
  activeProject: DemoState['projects'][number];
  activeExpense: Expense;
  selectedProjectId: string;
  selectedExpenseId: string;
  toast: ToastState;
  chatOpen: boolean;
  navigate: (view: View) => void;
  openProject: (projectId: string, destination?: View) => void;
  openExpense: (expenseId: string, destination?: View) => void;
  setChatOpen: (open: boolean) => void;
  showToast: (toast: Exclude<ToastState, null>) => void;
  updateExpenseStatus: (id: string, status: ExpenseStatus, note?: string) => void;
  submitDemoExpense: () => string;
  resubmitEvidence: (id: string) => void;
  setProjectPublic: (enabled: boolean) => void;
  setSubmissionsOpen: (enabled: boolean) => void;
  createDemoProject: (name: string, budget: number) => string;
  resetDemo: () => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);
const STORAGE_KEY = 'uii-mvp-demo-v2';

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoState>(initialDemoState);
  const [view, setView] = useState<View>('launcher');
  const [selectedProjectId, setSelectedProjectId] = useState(ACTIVE_PROJECT_ID);
  const [selectedExpenseId, setSelectedExpenseId] = useState('UII-0249');
  const [toast, setToast] = useState<ToastState>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let nextState = initialDemoState;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) nextState = JSON.parse(saved) as DemoState;
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    const frame = window.requestAnimationFrame(() => {
      setState(nextState);
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const activeProject = state.projects.find((project) => project.id === selectedProjectId) ?? state.projects[0];
  const activeExpense = state.expenses.find((expense) => expense.id === selectedExpenseId) ?? state.expenses[0];

  const navigate = (next: View) => {
    setView(next);
    setChatOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProject = (projectId: string, destination: View = 'project-overview') => {
    setSelectedProjectId(projectId);
    navigate(destination);
  };

  const openExpense = (expenseId: string, destination: View = 'expense-review') => {
    setSelectedExpenseId(expenseId);
    navigate(destination);
  };

  const showToast = (nextToast: Exclude<ToastState, null>) => setToast(nextToast);

  const updateExpenseStatus = (id: string, status: ExpenseStatus, note?: string) => {
    setState((current) => ({
      ...current,
      expenses: current.expenses.map((expense) =>
        expense.id === id ? { ...expense, status, note: note ?? expense.note, isFresh: status === 'recorded' } : expense,
      ),
    }));
  };

  const submitDemoExpense = () => {
    const id = `UII-${String(250 + state.expenses.filter((expense) => expense.id.startsWith('UII-025')).length).padStart(4, '0')}`;
    const expense: Expense = {
      id,
      projectId: ACTIVE_PROJECT_ID,
      title: 'Dụng cụ trang trí sân khấu',
      submitter: 'Nguyễn Minh Anh',
      payer: 'Nguyễn Minh Anh',
      amount: 690_000,
      date: '29/08/2026',
      time: '19:24',
      category: 'Hoạt động & địa điểm',
      fundingSource: 'Quỹ vận hành',
      vendor: 'Nhà sách Phương Nam',
      invoiceNumber: 'PN-290826',
      status: 'pending',
      submittedAt: 'Vừa xong',
      evidence: ['transfer', 'invoice'],
      items: [
        { name: 'Dây cờ trang trí', quantity: 10, unitPrice: 29_000 },
        { name: 'Đèn led dây', quantity: 4, unitPrice: 100_000 },
      ],
      risk: 'none',
      isFresh: true,
    };
    setState((current) => ({ ...current, expenses: [expense, ...current.expenses] }));
    setSelectedExpenseId(id);
    return id;
  };

  const resubmitEvidence = (id: string) => {
    setState((current) => ({
      ...current,
      expenses: current.expenses.map((expense) =>
        expense.id === id
          ? { ...expense, status: 'pending', evidence: Array.from(new Set([...expense.evidence, 'invoice'])) as Expense['evidence'], note: 'Đã bổ sung ảnh rõ hơn · Vừa xong', isFresh: true }
          : expense,
      ),
    }));
  };

  const setProjectPublic = (enabled: boolean) => {
    setState((current) => ({
      ...current,
      projects: current.projects.map((project) => (project.id === selectedProjectId ? { ...project, publicEnabled: enabled } : project)),
    }));
  };

  const setSubmissionsOpen = (enabled: boolean) => {
    setState((current) => ({
      ...current,
      projects: current.projects.map((project) => (project.id === selectedProjectId ? { ...project, submissionsOpen: enabled } : project)),
    }));
  };

  const createDemoProject = (name: string, budget: number) => {
    const id = `du-an-${Date.now()}`;
    setState((current) => ({
      ...current,
      projects: [
        {
          id,
          name,
          organization: 'Nhóm Nắng Ấm',
          startDate: '01/10/2026',
          endDate: '31/12/2026',
          budget,
          baseSpent: 0,
          status: 'preparing',
          publicEnabled: false,
          submissionsOpen: false,
          pendingCount: 0,
          recordedCount: 0,
          categories: [],
        },
        ...current.projects,
      ],
    }));
    setSelectedProjectId(id);
    showToast({ title: 'Đã tạo dự án nháp', detail: 'Bạn có thể thiết lập ngân sách và mở nhận bill khi sẵn sàng.', tone: 'success' });
    return id;
  };

  const resetDemo = () => {
    setState(initialDemoState);
    setSelectedProjectId(ACTIVE_PROJECT_ID);
    setSelectedExpenseId('UII-0249');
    window.localStorage.removeItem(STORAGE_KEY);
    showToast({ title: 'Đã khôi phục dữ liệu', detail: 'Mọi thay đổi đã được đưa về trạng thái ban đầu.', tone: 'neutral' });
  };

  const value: DemoContextValue = {
    state,
    view,
    activeProject,
    activeExpense,
    selectedProjectId,
    selectedExpenseId,
    toast,
    chatOpen,
    navigate,
    openProject,
    openExpense,
    setChatOpen,
    showToast,
    updateExpenseStatus,
    submitDemoExpense,
    resubmitEvidence,
    setProjectPublic,
    setSubmissionsOpen,
    createDemoProject,
    resetDemo,
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error('useDemo must be used inside DemoProvider');
  return context;
}
