import { initialExpenses } from '@/lib/demo-data';
import type { DemoState, Expense, Project } from '@/lib/demo-types';

const initialById = new Map(initialExpenses.map((expense) => [expense.id, expense]));

export function projectExpenses(state: DemoState, projectId: string) {
  return state.expenses.filter((expense) => expense.projectId === projectId);
}

export function newlyRecordedExpenses(state: DemoState, projectId: string) {
  return projectExpenses(state, projectId).filter((expense) => expense.status === 'recorded' && expense.isFresh);
}

export function projectSpent(state: DemoState, project: Project) {
  return project.baseSpent + newlyRecordedExpenses(state, project.id).reduce((sum, expense) => sum + expense.amount, 0);
}

export function projectRecordedCount(state: DemoState, project: Project) {
  return project.recordedCount + newlyRecordedExpenses(state, project.id).length;
}

export function projectPendingCount(state: DemoState, project: Project) {
  const current = projectExpenses(state, project.id);
  const resolvedInitial = current.filter((expense) => {
    const initial = initialById.get(expense.id);
    return initial?.status === 'pending' && expense.status !== 'pending';
  }).length;
  const newPending = current.filter((expense) => !initialById.has(expense.id) && expense.status === 'pending').length;
  return Math.max(0, project.pendingCount - resolvedInitial + newPending);
}

export function categorySpent(state: DemoState, project: Project, categoryName: string, baseSpent: number) {
  const extra = newlyRecordedExpenses(state, project.id)
    .filter((expense) => expense.category === categoryName)
    .reduce((sum, expense) => sum + expense.amount, 0);
  return baseSpent + extra;
}

export function organizationTotals(state: DemoState) {
  const budget = state.projects.reduce((sum, project) => sum + project.budget, 0);
  const spent = state.projects.reduce((sum, project) => sum + projectSpent(state, project), 0);
  const pending = state.projects.reduce((sum, project) => sum + projectPendingCount(state, project), 0);
  const recorded = state.projects.reduce((sum, project) => sum + projectRecordedCount(state, project), 0);
  return { budget, spent, pending, recorded };
}

export function unresolvedExpenses(expenses: Expense[]) {
  return expenses.filter((expense) => expense.status === 'pending' || expense.status === 'needs_more');
}
