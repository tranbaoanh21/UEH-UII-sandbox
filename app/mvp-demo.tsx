'use client';

import { AdminShell } from '@/components/product/admin-shell';
import { BudgetView, ExpenseReview, ExpensesList, OrganizationDashboard, ProjectOverview, ReportView, ShareView } from '@/components/product/admin-views';
import { DemoProvider, useDemo } from '@/components/product/demo-context';
import { AdminLogin, DemoLauncher } from '@/components/product/launcher';
import { MemberBills, MemberResubmit, MemberReview, MemberSubmit, MemberSuccess } from '@/components/product/member-flow';
import { PublicExpense, PublicOffline, PublicPortal } from '@/components/product/public-portal';
import { Toast } from '@/components/product/shared';

export default function MvpDemo() {
  return <DemoProvider><DemoRouter /></DemoProvider>;
}

function DemoRouter() {
  const { view, toast } = useDemo();

  let content: React.ReactNode;

  if (view === 'launcher') content = <DemoLauncher />;
  else if (view === 'login') content = <AdminLogin />;
  else if (view === 'member-submit') content = <MemberSubmit />;
  else if (view === 'member-review') content = <MemberReview />;
  else if (view === 'member-success') content = <MemberSuccess />;
  else if (view === 'member-bills') content = <MemberBills />;
  else if (view === 'member-resubmit') content = <MemberResubmit />;
  else if (view === 'public-portal') content = <PublicPortal />;
  else if (view === 'public-expense') content = <PublicExpense />;
  else if (view === 'public-offline') content = <PublicOffline />;
  else {
    content = (
      <AdminShell>
        {view === 'organization' ? <OrganizationDashboard /> : null}
        {view === 'project-overview' ? <ProjectOverview /> : null}
        {view === 'expenses' ? <ExpensesList /> : null}
        {view === 'expense-review' ? <ExpenseReview /> : null}
        {view === 'budget' ? <BudgetView /> : null}
        {view === 'report' ? <ReportView /> : null}
        {view === 'share' ? <ShareView /> : null}
      </AdminShell>
    );
  }

  return <>{content}<Toast toast={toast} /></>;
}
