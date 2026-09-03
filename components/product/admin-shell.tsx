'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  BarChart3,
  Bot,
  ChevronDown,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  PanelLeft,
  ReceiptText,
  Search,
  Send,
  Share2,
  WalletCards,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Brand } from '@/components/product/shared';
import { useDemo } from '@/components/product/demo-context';
import { money } from '@/lib/demo-data';
import { projectPendingCount, projectRecordedCount, projectSpent } from '@/lib/demo-selectors';
import type { ChatMessage, View } from '@/lib/demo-types';
import { cn } from '@/lib/utils';

const projectViews: View[] = ['project-overview', 'expenses', 'expense-review', 'budget', 'report', 'share'];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { state, view, activeProject, selectedProjectId, navigate, openProject, setChatOpen, chatOpen } = useDemo();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isProject = projectViews.includes(view);
  const title = view === 'organization' ? 'Tất cả dự án' : activeProject.name;

  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[248px_minmax(0,1fr)]">
        <aside className="hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex lg:flex-col">
          <SidebarContent onNavigate={(next) => navigate(next)} onProject={(id) => openProject(id)} onExit={() => navigate('launcher')} currentView={view} selectedProjectId={selectedProjectId} projects={state.projects} />
        </aside>

        <section className="min-w-0">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card/92 px-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Mở menu"><Menu /></Button>
              {isProject ? <Button variant="ghost" size="icon-sm" onClick={() => navigate('organization')} aria-label="Về tất cả dự án"><ArrowLeft /></Button> : null}
              <div className="min-w-0">
                <p className="text-[10px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">{isProject ? 'Nhóm Nắng Ấm / Dự án' : 'Nhóm Nắng Ấm'}</p>
                <h1 className="truncate text-sm font-semibold text-brand-ink">{title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger render={<Button variant="outline" size="icon" className="hidden sm:inline-flex" />}><Search /></TooltipTrigger>
                <TooltipContent>Tìm dự án hoặc khoản chi</TooltipContent>
              </Tooltip>
              <Button variant="outline" onClick={() => setChatOpen(true)}><MessageSquareText /> <span className="hidden sm:inline">Hỏi UII</span></Button>
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-xs font-bold text-primary">BA</span>
            </div>
          </header>

          {isProject ? <ProjectTabs view={view} navigate={navigate} /> : null}
          <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8 lg:py-9">{children}</div>
        </section>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[288px] border-sidebar-border bg-sidebar p-0 text-sidebar-foreground" showCloseButton={false}>
          <SheetHeader className="sr-only"><SheetTitle>Menu quản lý</SheetTitle><SheetDescription>Chọn khu vực quản lý</SheetDescription></SheetHeader>
          <SidebarContent onNavigate={(next) => { navigate(next); setMobileOpen(false); }} onProject={(id) => { openProject(id); setMobileOpen(false); }} onExit={() => navigate('launcher')} currentView={view} selectedProjectId={selectedProjectId} projects={state.projects} />
        </SheetContent>
      </Sheet>

      <AdminChat open={chatOpen} onOpenChange={setChatOpen} />
    </main>
  );
}

function SidebarContent({ onNavigate, onProject, onExit, currentView, selectedProjectId, projects }: {
  onNavigate: (view: View) => void;
  onProject: (id: string) => void;
  onExit: () => void;
  currentView: View;
  selectedProjectId: string;
  projects: ReturnType<typeof useDemo>['state']['projects'];
}) {
  const activeProjectViews = projectViews.includes(currentView);
  return (
    <div className="flex h-full min-h-0 flex-col p-4">
      <div className="px-2 py-1"><Brand inverse onClick={onExit} /></div>
      <div className="mt-7 rounded-xl border border-white/10 bg-white/[.04] p-3">
        <p className="text-[10px] font-semibold tracking-[0.08em] text-white/45 uppercase">Tổ chức</p>
        <div className="mt-2 flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-orange text-xs font-bold text-brand-ink">NA</span><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold">Nhóm Nắng Ấm</p><p className="mt-0.5 text-[10px] text-white/45">Quản lý tài chính</p></div><ChevronDown size={14} className="text-white/40" /></div>
      </div>

      <nav className="mt-6 space-y-1">
        <SidebarButton label="Tất cả dự án" icon={<FolderKanban />} active={currentView === 'organization'} onClick={() => onNavigate('organization')} />
        <SidebarButton label="Hàng chờ kiểm tra" icon={<ReceiptText />} count="7" active={currentView === 'expenses' || currentView === 'expense-review'} onClick={() => onNavigate('expenses')} />
        <SidebarButton label="Báo cáo" icon={<BarChart3 />} active={currentView === 'report'} onClick={() => onNavigate('report')} />
      </nav>

      <div className="mt-7 min-h-0">
        <div className="flex items-center justify-between px-2"><p className="text-[10px] font-semibold tracking-[0.08em] text-white/35 uppercase">Dự án gần đây</p><PanelLeft size={13} className="text-white/30" /></div>
        <div className="mt-2 space-y-1">
          {projects.slice(0, 3).map((project) => (
            <button key={project.id} onClick={() => onProject(project.id)} className={cn('flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left text-xs transition hover:bg-sidebar-accent', activeProjectViews && selectedProjectId === project.id ? 'bg-sidebar-accent text-white' : 'text-white/60')}>
              <span className={cn('h-1.5 w-1.5 rounded-full', project.status === 'active' ? 'bg-[#56b38f]' : project.status === 'preparing' ? 'bg-[#7fa8d6]' : 'bg-white/25')} />
              <span className="min-w-0 flex-1 truncate">{project.name}</span>
              {project.pendingCount ? <span className="text-[10px] font-semibold text-brand-yellow">{project.pendingCount}</span> : null}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto space-y-1 border-t border-white/10 pt-4">
        <SidebarButton label="Đổi vai trò" icon={<PanelLeft />} onClick={() => onNavigate('launcher')} />
        <SidebarButton label="Đăng xuất" icon={<LogOut />} onClick={onExit} />
      </div>
    </div>
  );
}

function SidebarButton({ label, icon, count, active, onClick }: { label: string; icon: React.ReactNode; count?: string; active?: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={cn('flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition', active ? 'bg-white text-brand-ink' : 'text-white/62 hover:bg-sidebar-accent hover:text-white')}>
      <span className="[&_svg]:h-[17px] [&_svg]:w-[17px]">{icon}</span><span className="flex-1 font-medium">{label}</span>{count ? <span className={cn('rounded-md px-1.5 py-0.5 text-[10px] font-bold', active ? 'bg-warning-soft text-warning' : 'bg-white/10 text-brand-yellow')}>{count}</span> : null}
    </button>
  );
}

function ProjectTabs({ view, navigate }: { view: View; navigate: (view: View) => void }) {
  const tabs: Array<{ label: string; icon: React.ReactNode; view: View }> = [
    { label: 'Tổng quan', icon: <LayoutDashboard />, view: 'project-overview' },
    { label: 'Khoản chi', icon: <ReceiptText />, view: 'expenses' },
    { label: 'Ngân sách', icon: <WalletCards />, view: 'budget' },
    { label: 'Báo cáo', icon: <BarChart3 />, view: 'report' },
    { label: 'Chia sẻ', icon: <Share2 />, view: 'share' },
  ];
  return (
    <div className="overflow-x-auto border-b bg-card px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1500px] gap-1">
        {tabs.map((tab) => {
          const active = tab.view === view || (tab.view === 'expenses' && view === 'expense-review');
          return <button key={tab.label} onClick={() => navigate(tab.view)} className={cn('relative flex h-12 shrink-0 items-center gap-2 px-3 text-xs font-semibold text-muted-foreground transition hover:text-brand-ink sm:text-sm', active && 'text-primary after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-primary')}><span className="[&_svg]:h-4 [&_svg]:w-4">{tab.icon}</span>{tab.label}</button>;
        })}
      </div>
    </div>
  );
}

function AdminChat({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { state, activeProject, openExpense } = useDemo();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Chào Bảo Anh, bạn muốn kiểm tra số liệu nào của Nhóm Nắng Ấm?' },
  ]);
  const suggestions = ['Còn bao nhiêu ngân sách?', 'Khoản nào chờ lâu nhất?', 'Có bill nào của Minh Anh?'];

  const answer = (query: string) => {
    const normalized = query.toLowerCase();
    const expenses = state.expenses.filter((expense) => expense.projectId === activeProject.id);
    const spent = projectSpent(state, activeProject);
    let response: ChatMessage;
    if (normalized.includes('minh anh') || normalized.includes('bảo anh')) {
      const mine = expenses.filter((expense) => expense.submitter.includes('Minh Anh'));
      response = { role: 'assistant', content: `Nguyễn Minh Anh có ${mine.length} khoản trong dự án: ${mine.filter((expense) => expense.status === 'recorded').length} đã ghi nhận, ${mine.filter((expense) => expense.status === 'pending').length} chờ duyệt và ${mine.filter((expense) => expense.status === 'needs_more').length} cần bổ sung.`, sourceIds: mine.map((expense) => expense.id) };
    } else if (normalized.includes('chờ') || normalized.includes('lâu')) {
      const pending = expenses.filter((expense) => expense.status === 'pending' || expense.status === 'needs_more');
      response = { role: 'assistant', content: `Có ${projectPendingCount(state, activeProject)} khoản đang chờ xử lý. Trong dữ liệu hiển thị, ${pending[0]?.id ?? 'UII-0248'} là khoản cần được mở kiểm tra trước.`, sourceIds: pending.slice(0, 3).map((expense) => expense.id) };
    } else {
      response = { role: 'assistant', content: `Dự án đã ghi nhận ${money(spent)} từ ${projectRecordedCount(state, activeProject)} khoản đã được phê duyệt. Ngân sách còn lại là ${money(activeProject.budget - spent)}.`, sourceIds: expenses.filter((expense) => expense.status === 'recorded').slice(0, 3).map((expense) => expense.id) };
    }
    setMessages((current) => [...current, { role: 'user', content: query }, response]);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const query = input.trim();
    if (!query) return;
    answer(query);
    setInput('');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b p-5 pr-14">
          <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary"><Bot /></span><div><SheetTitle>Hỏi UII</SheetTitle><SheetDescription>Tra cứu nhanh dữ liệu tài chính của dự án</SheetDescription></div></div>
        </SheetHeader>
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={cn('max-w-[90%] rounded-xl px-4 py-3 text-sm leading-6', message.role === 'user' ? 'ml-auto bg-primary text-white' : 'border bg-[#fbfaf8] text-foreground')}>
                <p>{message.content}</p>
                {message.sourceIds?.length ? <div className="mt-3 flex flex-wrap gap-1.5 border-t pt-3">{message.sourceIds.map((id) => <button key={id} onClick={() => { openExpense(id); onOpenChange(false); }} className="rounded-md bg-secondary px-2 py-1 text-[10px] font-semibold text-primary hover:bg-[#e6dcf3]">{id}</button>)}</div> : null}
              </div>
            ))}
          </div>
          <div className="border-t bg-card p-4">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">{suggestions.map((suggestion) => <button key={suggestion} onClick={() => answer(suggestion)} className="shrink-0 rounded-lg border bg-background px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground hover:border-primary/30 hover:text-primary">{suggestion}</button>)}</div>
            <form onSubmit={submit} className="flex gap-2"><Input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Hỏi về dữ liệu dự án..." aria-label="Câu hỏi cho UII" /><Button type="submit" size="icon" aria-label="Gửi câu hỏi"><Send /></Button></form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
