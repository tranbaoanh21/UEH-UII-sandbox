'use client';

import { useMemo, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Copy,
  Download,
  ExternalLink,
  Eye,
  FileSpreadsheet,
  Link2,
  ListFilter,
  LockKeyhole,
  MoreHorizontal,
  Plus,
  ReceiptText,
  Search,
  Send,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Upload,
  WalletCards,
  X,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { EvidenceCard, ExpenseStatusBadge, ExpenseSummary, Metric, PageHeading, ProjectStatusBadge, SectionHeading } from '@/components/product/shared';
import { useDemo } from '@/components/product/demo-context';
import { money, shortMoney } from '@/lib/demo-data';
import { categorySpent, organizationTotals, projectExpenses, projectPendingCount, projectRecordedCount, projectSpent, unresolvedExpenses } from '@/lib/demo-selectors';
import type { ExpenseStatus } from '@/lib/demo-types';
import { cn } from '@/lib/utils';

export function OrganizationDashboard() {
  const { state, openProject, openExpense } = useDemo();
  const [createOpen, setCreateOpen] = useState(false);
  const totals = organizationTotals(state);
  const unresolved = unresolvedExpenses(state.expenses);

  return (
    <>
      <PageHeading
        eyebrow="Không gian tổ chức"
        title="Dự án của Nhóm Nắng Ấm"
        description={`${state.projects.filter((project) => project.status === 'active').length} dự án đang chạy · ${state.projects.filter((project) => project.status === 'closed').length} dự án đã đóng sổ trong năm 2026`}
        actions={<Button size="lg" onClick={() => setCreateOpen(true)}><Plus /> Tạo dự án mới</Button>}
      />

      <section className="mt-6 grid overflow-hidden rounded-xl border bg-border gap-px sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Tài trợ đã nhận (2026)" value={money(totals.budget)} note="Từ 6 nguồn tài trợ" />
        <Metric label="Đã chi được duyệt" value={money(totals.spent)} note={`${totals.recorded} khoản đã ghi nhận`} accent="green" />
        <Metric label="Dự án đang chạy" value={`${state.projects.filter((project) => project.status === 'active').length} dự án`} note={`${shortMoney(state.projects.filter((project) => project.status === 'active').reduce((sum, project) => sum + project.budget - projectSpent(state, project), 0))} chưa dùng`} />
        <Metric label="Tỷ lệ đủ chứng từ" value="98%" note="6 khoản cần bổ sung" accent="orange" />
      </section>

      <button onClick={() => unresolved[0] && openExpense(unresolved[0].id)} className="mt-5 flex w-full flex-col justify-between gap-3 rounded-xl border border-[#edcf91] bg-warning-soft px-5 py-4 text-left transition hover:border-[#dcae4d] sm:flex-row sm:items-center">
        <div className="flex items-start gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/70 text-warning"><Clock3 size={17} /></span><div><p className="text-sm font-semibold text-[#69470c]">{totals.pending} khoản đang chờ bạn kiểm tra</p><p className="mt-1 text-xs text-warning">Từ 2 dự án · khoản chờ lâu nhất đã 3 ngày</p></div></div>
        <span className="flex items-center gap-2 text-xs font-semibold text-warning">Mở hàng chờ <ArrowRight size={15} /></span>
      </button>

      <section className="mt-9">
        <SectionHeading title="Tất cả dự án" description="Số đã chi chỉ tính các khoản đã được phê duyệt." action={<Button variant="outline" size="sm"><ListFilter /> Bộ lọc</Button>} />
        <div className="mt-4 hidden overflow-hidden rounded-xl border bg-card md:block">
          <Table>
            <TableHeader className="bg-[#faf9f7]"><TableRow className="hover:bg-[#faf9f7]"><TableHead className="w-[30%] px-5 text-[11px] text-muted-foreground uppercase">Dự án</TableHead><TableHead className="text-[11px] text-muted-foreground uppercase">Trạng thái</TableHead><TableHead className="text-right text-[11px] text-muted-foreground uppercase">Ngân sách</TableHead><TableHead className="text-right text-[11px] text-muted-foreground uppercase">Đã chi</TableHead><TableHead className="text-center text-[11px] text-muted-foreground uppercase">Chờ duyệt</TableHead><TableHead className="text-[11px] text-muted-foreground uppercase">Công khai</TableHead><TableHead /></TableRow></TableHeader>
            <TableBody>
              {state.projects.map((project) => {
                const spent = projectSpent(state, project);
                const pending = projectPendingCount(state, project);
                return (
                  <TableRow key={project.id} className="h-[74px]">
                    <TableCell className="px-5"><button className="text-left" onClick={() => openProject(project.id)}><strong className="block text-sm text-brand-ink hover:text-primary">{project.name}</strong><span className="mt-1 block text-[11px] text-muted-foreground">{project.startDate} — {project.endDate}</span></button></TableCell>
                    <TableCell><ProjectStatusBadge status={project.status} /></TableCell>
                    <TableCell className="text-right"><p className="money text-sm font-semibold">{money(project.budget)}</p><Progress value={project.budget ? (spent / project.budget) * 100 : 0} className="mt-2 ml-auto w-28" /></TableCell>
                    <TableCell className="money text-right text-sm font-medium">{money(spent)}</TableCell>
                    <TableCell className={cn('money text-center text-sm font-semibold', pending ? 'text-warning' : 'text-muted-foreground')}>{pending || '—'}</TableCell>
                    <TableCell><span className={cn('flex items-center gap-1.5 text-xs', project.publicEnabled ? 'text-success' : 'text-muted-foreground')}><span className={cn('h-1.5 w-1.5 rounded-full', project.publicEnabled ? 'bg-success' : 'border border-current')} />{project.publicEnabled ? 'Đang bật' : 'Chưa bật'}</span></TableCell>
                    <TableCell><Button variant="ghost" size="icon-sm" onClick={() => openProject(project.id)} aria-label={`Mở ${project.name}`}><ChevronRight /></Button></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 space-y-3 md:hidden">
          {state.projects.map((project) => <button key={project.id} onClick={() => openProject(project.id)} className="w-full rounded-xl border bg-card p-4 text-left"><div className="flex items-start justify-between gap-3"><div><strong className="text-sm text-brand-ink">{project.name}</strong><p className="mt-1 text-[11px] text-muted-foreground">{project.startDate} — {project.endDate}</p></div><ProjectStatusBadge status={project.status} /></div><div className="mt-4 flex items-end justify-between border-t pt-3"><div><p className="text-[10px] text-muted-foreground uppercase">Đã chi / Ngân sách</p><p className="money mt-1 text-sm font-semibold">{money(projectSpent(state, project))} / {money(project.budget)}</p></div><ChevronRight size={17} className="text-muted-foreground" /></div></button>)}
        </div>
      </section>

      <CreateProjectDialog open={createOpen} onOpenChange={setCreateOpen} />
    </>
  );
}

function CreateProjectDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { createDemoProject, openProject } = useDemo();
  const [name, setName] = useState('Tết sẻ chia 2027');
  const [budget, setBudget] = useState('30000000');
  const create = () => {
    const id = createDemoProject(name || 'Dự án chưa đặt tên', Number(budget) || 0);
    onOpenChange(false);
    openProject(id);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader><DialogTitle className="text-xl font-semibold tracking-[-0.03em]">Tạo dự án mới</DialogTitle><DialogDescription>Bắt đầu với thông tin cơ bản. Ngân sách chi tiết và link chia sẻ có thể thiết lập sau.</DialogDescription></DialogHeader>
        <div className="grid gap-5 py-2 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2"><Label htmlFor="project-name">Tên dự án</Label><Input id="project-name" value={name} onChange={(event) => setName(event.target.value)} /></div>
          <div className="space-y-2"><Label htmlFor="project-budget">Tổng ngân sách</Label><Input id="project-budget" type="number" value={budget} onChange={(event) => setBudget(event.target.value)} /></div>
          <div className="space-y-2"><Label htmlFor="project-end">Ngày kết thúc</Label><Input id="project-end" type="date" defaultValue="2027-02-15" /></div>
          <div className="space-y-2 sm:col-span-2"><Label htmlFor="project-org">Đơn vị tổ chức</Label><Input id="project-org" defaultValue="Nhóm Nắng Ấm" disabled /></div>
        </div>
        <DialogFooter><Button variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button><Button onClick={create}><Plus /> Tạo dự án nháp</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ProjectOverview() {
  const { state, activeProject, navigate, openExpense } = useDemo();
  const spent = projectSpent(state, activeProject);
  const pending = projectPendingCount(state, activeProject);
  const recorded = projectRecordedCount(state, activeProject);
  const expenses = projectExpenses(state, activeProject.id);

  if (!activeProject.categories.length) {
    return <EmptyProject />;
  }

  return (
    <>
      <PageHeading eyebrow="Dự án đang triển khai" title={activeProject.name} description={`${activeProject.organization} · ${activeProject.startDate} — ${activeProject.endDate}`} actions={<><Button variant="outline" onClick={() => navigate('share')}><Share2 /> Chia sẻ</Button><Button onClick={() => navigate('expenses')}><ReceiptText /> Xem hàng chờ</Button></>} />
      <section className="mt-6 grid overflow-hidden rounded-xl border bg-border gap-px sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Tổng ngân sách" value={money(activeProject.budget)} note="2 nguồn tài trợ" />
        <Metric label="Đã chi được duyệt" value={money(spent)} note={`${recorded} khoản đã ghi nhận`} accent="green" />
        <Metric label="Ngân sách còn lại" value={money(activeProject.budget - spent)} note={`${Math.round(((activeProject.budget - spent) / activeProject.budget) * 100)}% tổng quỹ`} />
        <Metric label="Chờ quyết định" value={`${pending} khoản`} note="Cần bạn kiểm tra" accent="orange" />
      </section>

      <div className="mt-9 grid gap-8 xl:grid-cols-[minmax(0,1.5fr)_minmax(310px,.5fr)]">
        <section>
          <SectionHeading title="Sử dụng theo hạng mục cam kết" description="Chỉ cập nhật sau khi khoản chi được phê duyệt." action={<Button variant="ghost" size="sm" onClick={() => navigate('budget')}>Chi tiết <ArrowRight /></Button>} />
          <div className="mt-4 overflow-hidden rounded-xl border bg-card">
            {activeProject.categories.map((category, index) => {
              const currentSpent = categorySpent(state, activeProject, category.name, category.spent);
              const percent = Math.round((currentSpent / category.total) * 100);
              return <div key={category.name} className={cn('px-5 py-4', index !== activeProject.categories.length - 1 && 'border-b')}><div className="flex items-end justify-between gap-4"><div><p className="text-sm font-semibold text-brand-ink">{category.name}</p><p className="money mt-1 text-[11px] text-muted-foreground">{money(currentSpent)} / {money(category.total)}</p></div><p className={cn('money text-sm font-semibold', percent >= 85 ? 'text-warning' : 'text-brand-ink')}>{percent}%</p></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(percent, 100)}%`, background: category.color }} /></div></div>;
            })}
          </div>
        </section>

        <aside>
          <SectionHeading title="Cảnh báo ngân sách" description="Giúp bạn ưu tiên những khoản cần xem trước." />
          <div className="mt-4 overflow-hidden rounded-xl border bg-card">
            <GuardItem count="02" title="Có khả năng trùng" detail="So sánh số tiền, ngày và người bán" tone="danger" />
            <GuardItem count="03" title="Gần chạm ngân sách" detail="Hai hạng mục đã sử dụng trên 80%" tone="warning" />
            <GuardItem count="01" title="Thiếu chứng từ" detail="Cần thành viên bổ sung ảnh rõ hơn" tone="info" last />
          </div>
          <Button variant="outline" className="mt-3 w-full justify-between" onClick={() => navigate('expenses')}>Mở hàng chờ kiểm tra <ArrowRight /></Button>
        </aside>
      </div>

      <section className="mt-10">
        <SectionHeading title="Khoản chi cần quyết định" description="Mở từng khoản để xem chứng từ và ra quyết định." action={<Button variant="ghost" size="sm" onClick={() => navigate('expenses')}>Xem tất cả <ArrowRight /></Button>} />
        <div className="mt-4 overflow-hidden rounded-xl border bg-card">
          {expenses.filter((expense) => expense.status === 'pending' || expense.status === 'needs_more').slice(0, 4).map((expense, index, array) => <button key={expense.id} onClick={() => openExpense(expense.id)} className={cn('grid w-full gap-3 px-5 py-4 text-left transition hover:bg-[#faf8fc] sm:grid-cols-[100px_minmax(0,1fr)_150px_120px_20px] sm:items-center', index !== array.length - 1 && 'border-b')}><span className="text-xs font-semibold text-muted-foreground">{expense.id}</span><span><strong className="block text-sm text-brand-ink">{expense.title}</strong><span className="mt-1 block text-[11px] text-muted-foreground">{expense.submitter} · {expense.submittedAt}</span></span><strong className="money text-sm">{money(expense.amount)}</strong><ExpenseStatusBadge status={expense.status} /><ChevronRight size={16} className="hidden text-muted-foreground sm:block" /></button>)}
        </div>
      </section>
    </>
  );
}

function EmptyProject() {
  const { activeProject, navigate } = useDemo();
  return <div><PageHeading eyebrow="Dự án nháp" title={activeProject.name} description="Hoàn tất ngân sách và cài đặt chia sẻ trước khi bắt đầu nhận khoản chi." /><div className="mt-8 grid place-items-center rounded-2xl border border-dashed bg-card py-20 text-center"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-primary"><WalletCards /></span><h2 className="mt-5 text-lg font-semibold text-brand-ink">Thiết lập hạng mục ngân sách</h2><p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">Mỗi khoản chi sẽ được gắn với một hạng mục và nguồn tài trợ để UII có thể cảnh báo trước khi vượt cam kết.</p><div className="mt-6 flex gap-2"><Button variant="outline" onClick={() => navigate('organization')}>Để sau</Button><Button onClick={() => navigate('budget')}>Thiết lập ngân sách <ArrowRight /></Button></div></div></div>;
}

function GuardItem({ count, title, detail, tone, last }: { count: string; title: string; detail: string; tone: 'danger' | 'warning' | 'info'; last?: boolean }) {
  const style = tone === 'danger' ? 'bg-danger-soft text-destructive' : tone === 'warning' ? 'bg-warning-soft text-warning' : 'bg-info-soft text-info';
  return <div className={cn('flex gap-3 p-4', !last && 'border-b')}><span className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-lg text-xs font-bold', style)}>{count}</span><div><p className="text-sm font-semibold text-brand-ink">{title}</p><p className="mt-1 text-[11px] leading-4 text-muted-foreground">{detail}</p></div></div>;
}

export function ExpensesList() {
  const { state, activeProject, openExpense } = useDemo();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | ExpenseStatus>('all');
  const expenses = useMemo(() => projectExpenses(state, activeProject.id).filter((expense) => {
    const matchQuery = `${expense.id} ${expense.title} ${expense.submitter} ${expense.vendor}`.toLowerCase().includes(query.toLowerCase());
    return matchQuery && (filter === 'all' || expense.status === filter);
  }), [state, activeProject.id, query, filter]);

  return (
    <>
      <PageHeading eyebrow="Kiểm soát khoản chi" title="Khoản chi và chứng từ" description="Mỗi khoản có thể gồm ảnh chuyển khoản, hóa đơn hoặc cả hai. Mở từng khoản để kiểm tra trước khi ghi nhận." actions={<Button variant="outline"><Download /> Xuất danh sách</Button>} />
      <div className="mt-6 flex flex-col gap-3 rounded-xl border bg-card p-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1 lg:max-w-md"><Search className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" size={16} /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm mã, nội dung, người gửi..." className="pl-9" /></div>
        <div className="flex gap-1 overflow-x-auto">{([['all', 'Tất cả'], ['pending', 'Chờ duyệt'], ['needs_more', 'Cần bổ sung'], ['recorded', 'Đã ghi nhận'], ['rejected', 'Từ chối']] as const).map(([value, label]) => <button key={value} onClick={() => setFilter(value)} className={cn('shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition', filter === value ? 'bg-secondary text-primary' : 'text-muted-foreground hover:bg-muted')}>{label}</button>)}</div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border bg-card">
        <Table>
          <TableHeader className="bg-[#faf9f7]"><TableRow className="hover:bg-[#faf9f7]"><TableHead className="px-5 text-[11px] text-muted-foreground uppercase">Mã / Ngày</TableHead><TableHead className="text-[11px] text-muted-foreground uppercase">Khoản chi</TableHead><TableHead className="text-[11px] text-muted-foreground uppercase">Người gửi</TableHead><TableHead className="text-right text-[11px] text-muted-foreground uppercase">Số tiền</TableHead><TableHead className="text-[11px] text-muted-foreground uppercase">Chứng từ</TableHead><TableHead className="text-[11px] text-muted-foreground uppercase">Trạng thái</TableHead><TableHead /></TableRow></TableHeader>
          <TableBody>
            {expenses.map((expense) => <TableRow key={expense.id} className={cn('h-[72px]', expense.isFresh && 'bg-secondary/25')}><TableCell className="px-5"><button onClick={() => openExpense(expense.id)} className="text-left"><strong className="block text-xs text-primary">{expense.id}</strong><span className="mt-1 block text-[11px] text-muted-foreground">{expense.date.slice(0, 5)}</span></button></TableCell><TableCell><button onClick={() => openExpense(expense.id)} className="text-left"><strong className="block text-sm text-brand-ink hover:text-primary">{expense.title}</strong><span className="mt-1 block text-[11px] text-muted-foreground">{expense.category}</span></button></TableCell><TableCell><p className="text-sm">{expense.submitter}</p><p className="mt-1 text-[11px] text-muted-foreground">{expense.vendor}</p></TableCell><TableCell className="money text-right text-sm font-semibold">{money(expense.amount)}</TableCell><TableCell><div className="flex gap-1">{expense.evidence.map((item) => <Badge key={item} variant="outline" className="rounded-md text-[10px]">{item === 'transfer' ? 'CK' : 'HĐ'}</Badge>)}</div></TableCell><TableCell><ExpenseStatusBadge status={expense.status} /></TableCell><TableCell><Button variant="ghost" size="icon-sm" onClick={() => openExpense(expense.id)} aria-label={`Mở ${expense.id}`}><MoreHorizontal /></Button></TableCell></TableRow>)}
          </TableBody>
        </Table>
        {!expenses.length ? <div className="grid place-items-center py-16 text-center"><Search className="text-muted-foreground" /><p className="mt-3 text-sm font-semibold text-brand-ink">Không tìm thấy khoản chi</p><p className="mt-1 text-xs text-muted-foreground">Thử đổi từ khóa hoặc bộ lọc.</p></div> : null}
      </div>
    </>
  );
}

export function ExpenseReview() {
  const { activeExpense: expense, updateExpenseStatus, navigate, showToast } = useDemo();
  const [decision, setDecision] = useState<'approve' | 'more' | 'reject'>('approve');
  const [note, setNote] = useState(expense.note ?? '');
  const resolved = expense.status === 'recorded' || expense.status === 'rejected';

  const submitDecision = () => {
    if (decision === 'approve') {
      updateExpenseStatus(expense.id, 'recorded', note || 'Người phụ trách đã kiểm tra và chấp nhận khoản chi.');
      showToast({ title: `${expense.id} đã được ghi nhận`, detail: 'Ngân sách, báo cáo và Cổng minh bạch đã cập nhật.', tone: 'success' });
      navigate('project-overview');
    } else if (decision === 'more') {
      updateExpenseStatus(expense.id, 'needs_more', note || 'Vui lòng bổ sung ảnh rõ hơn để người phụ trách kiểm tra.');
      showToast({ title: 'Đã yêu cầu bổ sung', detail: 'Người gửi sẽ thấy ghi chú trong trang theo dõi khoản chi.', tone: 'warning' });
      navigate('expenses');
    } else {
      updateExpenseStatus(expense.id, 'rejected', note || 'Khoản chi không thuộc phạm vi dự án.');
      showToast({ title: 'Đã từ chối khoản chi', detail: 'Khoản này không được tính vào ngân sách và báo cáo.', tone: 'neutral' });
      navigate('expenses');
    }
  };

  return (
    <>
      <PageHeading eyebrow={`${expense.id} · ${expense.submittedAt}`} title={expense.title} description={`Người gửi: ${expense.submitter} · ${expense.category}`} actions={<ExpenseStatusBadge status={expense.status} />} />
      <div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_380px]">
        <div className="space-y-6">
          <section><SectionHeading title="Chứng từ gốc" description="Chỉ người phụ trách tài chính có quyền xem ảnh đầy đủ." /><div className="mt-4 grid gap-4 md:grid-cols-2">{expense.evidence.map((type) => <EvidenceCard key={type} type={type} />)}</div></section>

          <section>
            <SectionHeading title="Thông tin đã đọc" description="UII đã đọc và đối chiếu; bạn kiểm tra lại với ảnh gốc." action={<Badge variant="outline" className="rounded-md border-[#bbdfd1] bg-success-soft text-success"><Sparkles /> Đã đối chiếu 2 nguồn</Badge>} />
            <div className="mt-4"><ExpenseSummary expense={expense} /></div>
          </section>

          <section>
            <SectionHeading title="Chi tiết sản phẩm" description={expense.items.length ? 'Tổng thành tiền được đối chiếu với tổng hóa đơn.' : 'Chứng từ hiện tại không có chi tiết sản phẩm.'} />
            {expense.items.length ? <div className="mt-4 overflow-hidden rounded-xl border bg-card"><Table><TableHeader className="bg-[#faf9f7]"><TableRow><TableHead className="px-5">Sản phẩm</TableHead><TableHead className="text-right">SL</TableHead><TableHead className="text-right">Đơn giá</TableHead><TableHead className="px-5 text-right">Thành tiền</TableHead></TableRow></TableHeader><TableBody>{expense.items.map((item) => <TableRow key={item.name}><TableCell className="px-5 font-medium">{item.name}</TableCell><TableCell className="text-right">{item.quantity}</TableCell><TableCell className="money text-right">{money(item.unitPrice)}</TableCell><TableCell className="money px-5 text-right font-semibold">{money(item.quantity * item.unitPrice)}</TableCell></TableRow>)}</TableBody></Table></div> : <div className="mt-4 flex items-start gap-3 rounded-xl border border-dashed bg-card p-5"><AlertTriangle className="mt-0.5 text-warning" size={18} /><div><p className="text-sm font-semibold">Chưa đọc được sản phẩm</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Khoản chi chỉ có ảnh chuyển khoản. Bạn có thể yêu cầu hóa đơn hoặc mô tả bổ sung.</p></div></div>}
          </section>
        </div>

        <aside className="xl:sticky xl:top-36 xl:self-start">
          <div className="rounded-xl border bg-card p-5 shadow-[0_14px_40px_rgb(40_26_61/7%)]">
            <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold tracking-[0.06em] text-muted-foreground uppercase">Quyết định của bạn</p><h2 className="mt-2 text-lg font-semibold text-brand-ink">{resolved ? 'Khoản chi đã xử lý' : 'Kiểm tra trước khi ghi nhận'}</h2></div><span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary"><ClipboardCheck /></span></div>

            <div className="mt-5 rounded-lg border border-[#edcf91] bg-warning-soft p-4"><div className="flex gap-2"><ShieldAlert className="mt-0.5 shrink-0 text-warning" size={17} /><div><p className="text-xs font-semibold text-[#69470c]">Cần lưu ý trước khi ghi nhận</p><p className="mt-1 text-[11px] leading-5 text-warning">Nếu ghi nhận, hạng mục “{expense.category}” sẽ tiến gần ngưỡng ngân sách. Hãy kiểm tra lại trước khi quyết định.</p></div></div></div>

            {resolved ? <div className="mt-5"><div className={cn('flex items-center gap-3 rounded-lg p-4', expense.status === 'recorded' ? 'bg-success-soft text-success' : 'bg-danger-soft text-destructive')}>{expense.status === 'recorded' ? <CheckCircle2 /> : <X />}<div><p className="text-sm font-semibold">{expense.status === 'recorded' ? 'Đã ghi vào sổ thu–chi' : 'Không được ghi nhận'}</p><p className="mt-1 text-[11px] opacity-80">Lịch sử quyết định được giữ lại để truy vết.</p></div></div><Button variant="outline" className="mt-4 w-full" onClick={() => navigate('expenses')}>Quay lại danh sách</Button></div> : <>
              <div className="mt-5 grid grid-cols-3 gap-2">
                <DecisionButton label="Duyệt" active={decision === 'approve'} onClick={() => setDecision('approve')} icon={<Check />} />
                <DecisionButton label="Bổ sung" active={decision === 'more'} onClick={() => setDecision('more')} icon={<Upload />} />
                <DecisionButton label="Từ chối" active={decision === 'reject'} danger onClick={() => setDecision('reject')} icon={<X />} />
              </div>
              <div className="mt-5 space-y-2"><Label htmlFor="lead-note">Ghi chú cho người gửi</Label><Textarea id="lead-note" value={note} onChange={(event) => setNote(event.target.value)} placeholder={decision === 'more' ? 'Nêu rõ ảnh hoặc thông tin cần bổ sung...' : 'Không bắt buộc'} /></div>
              <Button size="lg" className="mt-4 w-full" variant={decision === 'reject' ? 'destructive' : 'default'} onClick={submitDecision}>{decision === 'approve' ? <><CheckCircle2 /> Phê duyệt & ghi nhận</> : decision === 'more' ? <><Upload /> Gửi yêu cầu bổ sung</> : <><X /> Xác nhận từ chối</>}</Button>
              <p className="mt-3 text-center text-[10px] leading-4 text-muted-foreground">Quyết định này sẽ được lưu vào lịch sử khoản chi.</p>
            </>}
          </div>
        </aside>
      </div>
    </>
  );
}

function DecisionButton({ label, active, danger, onClick, icon }: { label: string; active: boolean; danger?: boolean; onClick: () => void; icon: React.ReactNode }) {
  return <button onClick={onClick} className={cn('flex flex-col items-center gap-1.5 rounded-lg border px-2 py-3 text-[11px] font-semibold transition [&_svg]:h-4 [&_svg]:w-4', active ? danger ? 'border-destructive/40 bg-danger-soft text-destructive' : 'border-primary/35 bg-secondary text-primary' : 'bg-background text-muted-foreground hover:border-primary/25')}>{icon}{label}</button>;
}

export function BudgetView() {
  const { state, activeProject } = useDemo();
  const spent = projectSpent(state, activeProject);
  return (
    <>
      <PageHeading eyebrow="Kiểm soát cam kết" title="Ngân sách dự án" description="Theo dõi số đã ghi nhận theo hạng mục và nguồn tài trợ. Khoản chờ duyệt chưa bị trừ." actions={<Button><Plus /> Thêm hạng mục</Button>} />
      {!activeProject.categories.length ? <div className="mt-8 grid place-items-center rounded-2xl border border-dashed bg-card py-20 text-center"><WalletCards className="text-primary" /><h2 className="mt-4 font-semibold">Dự án chưa có hạng mục</h2><Button className="mt-5"><Plus /> Tạo hạng mục đầu tiên</Button></div> : <>
        <section className="mt-6 grid overflow-hidden rounded-xl border bg-border gap-px sm:grid-cols-3"><Metric label="Tổng ngân sách" value={money(activeProject.budget)} note="Đã phân bổ 100%" /><Metric label="Đã ghi nhận" value={money(spent)} note={`${Math.round((spent / activeProject.budget) * 100)}% tổng ngân sách`} accent="green" /><Metric label="Còn có thể sử dụng" value={money(activeProject.budget - spent)} note="Không gồm khoản đang chờ" accent="orange" /></section>
        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,.65fr)]">
          <section className="overflow-hidden rounded-xl border bg-card"><div className="border-b px-5 py-4"><SectionHeading title="Hạng mục cam kết" description="Hạng mục sử dụng từ 80% ngân sách sẽ được đánh dấu." /></div>{activeProject.categories.map((category, index) => { const currentSpent = categorySpent(state, activeProject, category.name, category.spent); const percent = Math.round((currentSpent / category.total) * 100); return <div key={category.name} className={cn('px-5 py-5', index !== activeProject.categories.length - 1 && 'border-b')}><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: category.color }} /><p className="text-sm font-semibold text-brand-ink">{category.name}</p>{percent >= 80 ? <Badge variant="outline" className="rounded-md border-[#edcf91] bg-warning-soft text-[10px] text-warning">Cần theo dõi</Badge> : null}</div><p className="money mt-2 text-xs text-muted-foreground">{money(currentSpent)} đã dùng · {money(category.total - currentSpent)} còn lại</p></div><p className="money text-xl font-semibold text-brand-ink">{percent}%</p></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full" style={{ width: `${Math.min(percent, 100)}%`, background: category.color }} /></div></div>; })}</section>
          <aside className="space-y-5"><section className="rounded-xl border bg-card p-5"><SectionHeading title="Nguồn tài trợ" /><div className="mt-4 space-y-4"><FundingLine name="Quỹ Vì Trẻ Em" total={30_000_000} spent={20_450_000} /><FundingLine name="Quỹ vận hành" total={20_000_000} spent={spent - 20_450_000} /></div></section><section className="rounded-xl border border-[#edcf91] bg-warning-soft p-5"><ShieldAlert className="text-warning" /><h3 className="mt-3 text-sm font-semibold text-[#69470c]">3 tín hiệu cần theo dõi</h3><ul className="mt-3 space-y-2 text-xs leading-5 text-warning"><li>• Quà tặng trẻ em đã dùng trên 80%.</li><li>• Vận chuyển còn 1,7 triệu đồng.</li><li>• 4,91 triệu đồng đang chờ quyết định.</li></ul></section></aside>
        </div>
      </>}
    </>
  );
}

function FundingLine({ name, total, spent }: { name: string; total: number; spent: number }) {
  const percent = Math.max(0, Math.round((spent / total) * 100));
  return <div><div className="flex justify-between gap-3"><div><p className="text-xs font-semibold text-brand-ink">{name}</p><p className="money mt-1 text-[11px] text-muted-foreground">{money(Math.max(0, spent))} / {money(total)}</p></div><span className="money text-xs font-semibold">{percent}%</span></div><Progress value={percent} className="mt-2" /></div>;
}

export function ReportView() {
  const { state, activeProject, navigate, showToast } = useDemo();
  const spent = projectSpent(state, activeProject);
  const recorded = projectRecordedCount(state, activeProject);
  const pending = projectPendingCount(state, activeProject);
  const expenses = projectExpenses(state, activeProject.id).filter((expense) => expense.status === 'recorded');

  const downloadCsv = () => {
    const header = 'Ma khoan chi,Noi dung,Ngay,Hang muc,So tien\n';
    const rows = expenses.map((expense) => `${expense.id},"${expense.title}",${expense.date},"${expense.category}",${expense.amount}`).join('\n');
    const blob = new Blob([`\uFEFF${header}${rows}`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'UII-bao-cao-trung-thu-2026.csv';
    anchor.click();
    URL.revokeObjectURL(url);
    showToast({ title: 'Đã tải xuống báo cáo', detail: 'File dữ liệu đã được lưu trên thiết bị.', tone: 'success' });
  };

  return (
    <>
      <PageHeading eyebrow="Báo cáo một chạm" title="Báo cáo tài chính & tác động" description="Báo cáo chỉ sử dụng các khoản đã được phê duyệt. Mỗi con số đều có thể truy về chứng từ gốc." />
      <div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_360px]">
        <section className="rounded-xl border bg-card p-4 sm:p-6">
          <div className="flex items-center justify-between border-b pb-4"><p className="text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">Bản xem trước</p><Badge variant="outline" className="rounded-md border-[#bbdfd1] bg-success-soft text-success">Đang cập nhật</Badge></div>
          <article className="mx-auto mt-5 max-w-3xl rounded-lg border bg-[#fffefa] p-6 shadow-[0_10px_35px_rgb(40_26_61/5%)] sm:p-9">
            <div className="text-center"><h2 className="text-xl font-semibold tracking-[-0.03em] text-brand-ink">Báo cáo tài chính & tác động</h2><p className="mt-1 text-xs text-muted-foreground">{activeProject.name} · {activeProject.organization}</p></div>
            <div className="mt-6 border-y py-5"><p className="text-[11px] font-semibold text-muted-foreground uppercase">1. Tổng quan nguồn tiền</p><ReportLine label="Đã nhận (2 nguồn tài trợ)" value={money(activeProject.budget)} /><ReportLine label={`Đã chi (${recorded} khoản đã duyệt)`} value={money(spent)} /><ReportLine label="Còn lại" value={money(activeProject.budget - spent)} strong /></div>
            <div className="mt-6"><p className="text-[11px] font-semibold text-muted-foreground uppercase">2. Chi theo hạng mục cam kết</p><div className="mt-3 overflow-hidden rounded-lg border"><Table><TableHeader><TableRow><TableHead className="px-4">Hạng mục</TableHead><TableHead className="text-right">Ngân sách</TableHead><TableHead className="px-4 text-right">Đã chi</TableHead></TableRow></TableHeader><TableBody>{activeProject.categories.map((category) => <TableRow key={category.name}><TableCell className="px-4 text-xs">{category.name}</TableCell><TableCell className="money text-right text-xs">{money(category.total)}</TableCell><TableCell className="money px-4 text-right text-xs font-semibold">{money(categorySpent(state, activeProject, category.name, category.spent))}</TableCell></TableRow>)}</TableBody></Table></div></div>
            <div className="mt-6 rounded-lg bg-brand-cream p-4"><p className="text-[11px] font-semibold text-[#6b3a08] uppercase">3. Tác động do ban tổ chức nhập</p><p className="mt-2 text-sm font-semibold text-brand-ink">120 phần quà học tập · 1 đêm hội trung thu · 3 điểm trường thụ hưởng</p></div>
            <p className="mt-6 text-[10px] leading-5 text-muted-foreground">Toàn bộ số liệu lấy từ {recorded} khoản đã được phê duyệt. Mỗi khoản đều có thể truy ngược về chứng từ đã lưu trong UII.</p>
          </article>
          <div className="mt-5 grid gap-2 sm:grid-cols-3"><Button onClick={() => window.print()}><Download /> In / Xuất PDF</Button><Button variant="outline" onClick={downloadCsv}><FileSpreadsheet /> Xuất Excel</Button><Button variant="outline" onClick={() => { showToast({ title: 'Đã sao chép đường dẫn công khai', detail: 'Bạn có thể gửi đường dẫn luôn cập nhật này cho nhà tài trợ.', tone: 'success' }); }}><Send /> Gửi nhà tài trợ</Button></div>
        </section>
        <aside className="space-y-5">
          <section className="rounded-xl border bg-card p-5"><SectionHeading title="Mức độ sẵn sàng" /><div className="mt-4 divide-y"><ReadyLine label="Khoản chi đã duyệt" value={`${recorded} / ${recorded + pending}`} done /><ReadyLine label="Khoản cần bổ sung" value="2" warning /><ReadyLine label="Đang chờ duyệt" value={String(pending)} /><ReadyLine label="Hạng mục đã đối soát" value={`${activeProject.categories.length}/${activeProject.categories.length}`} done /></div><p className="mt-4 text-xs leading-5 text-muted-foreground">Báo cáo hiện chỉ tính {recorded} khoản đã duyệt. Xử lý {pending} khoản còn lại để có báo cáo đầy đủ.</p></section>
          <button onClick={() => navigate('public-portal')} className="flex w-full items-center justify-between rounded-xl border bg-secondary/60 p-5 text-left transition hover:border-primary/30"><span><strong className="block text-sm text-brand-ink">Xem bản công khai</strong><span className="mt-1 block text-xs text-muted-foreground">Kiểm tra nội dung nhà tài trợ sẽ nhìn thấy.</span></span><ExternalLink className="text-primary" size={18} /></button>
        </aside>
      </div>
    </>
  );
}

function ReportLine({ label, value, strong }: { label: string; value: string; strong?: boolean }) { return <div className="mt-3 flex justify-between gap-4 text-xs"><span className="text-muted-foreground">{label}</span><span className={cn('money', strong ? 'font-semibold text-brand-ink' : 'font-medium')}>{value}</span></div>; }
function ReadyLine({ label, value, done, warning }: { label: string; value: string; done?: boolean; warning?: boolean }) { return <div className="flex items-center gap-3 py-3.5"><span className={cn('grid h-7 w-7 place-items-center rounded-lg', done ? 'bg-success-soft text-success' : warning ? 'bg-warning-soft text-warning' : 'bg-muted text-muted-foreground')}>{done ? <Check size={14} /> : warning ? <AlertTriangle size={14} /> : <Clock3 size={14} />}</span><span className="text-xs font-medium">{label}</span><strong className={cn('money ml-auto text-xs', warning && 'text-warning')}>{value}</strong></div>; }

export function ShareView() {
  const { activeProject, setProjectPublic, setSubmissionsOpen, showToast, navigate } = useDemo();
  const submitUrl = `https://uii.vn/contribute/${activeProject.id}?token=pj_8fK29xQm`;
  const publicUrl = `https://uii.vn/p/${activeProject.id}`;

  const copy = async (value: string, label: string) => {
    try { await navigator.clipboard.writeText(value); } catch { /* local preview may not grant clipboard permission */ }
    showToast({ title: `Đã sao chép ${label}`, detail: 'Đường dẫn đã sẵn sàng để gửi cho đúng người.', tone: 'success' });
  };

  const share = async (value: string, label: string) => {
    try {
      if (navigator.share) await navigator.share({ title: activeProject.name, text: label, url: value });
      else await copy(value, label);
    } catch { /* user cancelled the native share sheet */ }
  };

  return (
    <>
      <PageHeading eyebrow="Cài đặt chia sẻ" title="Chia sẻ dự án" description="Một đường dẫn để thành viên nộp khoản chi, một đường dẫn để nhà tài trợ theo dõi. Cả hai đều không cần tài khoản." />
      <div className="mt-7 grid gap-5 xl:grid-cols-2">
        <section className="flex min-h-[520px] flex-col rounded-xl border bg-card p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4"><div><span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary"><Link2 /></span><h2 className="mt-4 text-lg font-semibold text-brand-ink">Cho thành viên nộp bill</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">Gửi vào group Zalo. Thành viên bấm link hoặc quét QR, không cần đăng nhập.</p></div><Badge variant="outline" className={cn('rounded-md', activeProject.submissionsOpen ? 'border-[#bbdfd1] bg-success-soft text-success' : 'bg-muted text-muted-foreground')}>{activeProject.submissionsOpen ? 'Đang nhận' : 'Đã đóng'}</Badge></div>
          <div className="mt-6 grid gap-5 sm:grid-cols-[148px_minmax(0,1fr)]"><div className="grid place-items-center rounded-xl border bg-white p-3"><QRCodeSVG value={submitUrl} size={122} fgColor="#452968" bgColor="#ffffff" /></div><div className="min-w-0"><Label>Đường dẫn nộp bill</Label><div className="mt-2 flex"><Input value={submitUrl} readOnly className="rounded-r-none font-mono text-xs" /><Button variant="outline" className="rounded-l-none border-l-0" onClick={() => copy(submitUrl, 'đường dẫn nộp bill')}><Copy /> Sao chép</Button></div><div className="mt-3 grid gap-2 sm:grid-cols-2"><Button variant="outline" onClick={() => showToast({ title: 'Mã QR đã sẵn sàng', detail: 'Bạn có thể gửi mã này vào nhóm dự án.', tone: 'neutral' })}><Download /> Tải ảnh QR</Button><Button onClick={() => share(submitUrl, 'Đường dẫn nộp bill UII')}><Share2 /> Gửi qua Zalo</Button></div></div></div>
          <div className="mt-6 flex items-center justify-between gap-4 rounded-xl bg-[#faf8fc] p-4"><div><p className="text-sm font-semibold text-brand-ink">Nhận khoản chi mới</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Tắt khi dự án kết thúc để QR cũ không tiếp tục nhận dữ liệu.</p></div><Switch checked={activeProject.submissionsOpen} onCheckedChange={(checked) => { setSubmissionsOpen(checked); showToast({ title: checked ? 'Đã mở nhận bill' : 'Đã tạm dừng nhận bill', detail: checked ? 'Link và QR hoạt động trở lại.' : 'Người mở link sẽ thấy thông báo dự án đã đóng.', tone: checked ? 'success' : 'warning' }); }} aria-label="Bật hoặc tắt nhận bill" /></div>
          <div className="mt-auto flex items-start gap-3 rounded-xl bg-brand-cream p-4 text-xs leading-5 text-[#6b3a08]"><LockKeyhole size={16} className="mt-0.5 shrink-0" /><p>Ghim link hoặc ảnh QR lên đầu group Zalo để thành viên nộp ngay sau khi chi, thay vì gửi ảnh trôi trong tin nhắn.</p></div>
        </section>

        <section className="flex min-h-[520px] flex-col rounded-xl border bg-card p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4"><div><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-cream text-[#a85f0a]"><Eye /></span><h2 className="mt-4 text-lg font-semibold text-brand-ink">Cho nhà tài trợ theo dõi</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">Cổng công khai chỉ hiển thị khoản đã duyệt và chứng từ đã che dữ liệu nhạy cảm.</p></div><Badge variant="outline" className={cn('rounded-md', activeProject.publicEnabled ? 'border-[#bbdfd1] bg-success-soft text-success' : 'bg-muted text-muted-foreground')}>{activeProject.publicEnabled ? 'Đang bật' : 'Đang tắt'}</Badge></div>
          <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-[#d7c7ea] bg-secondary/65 p-4"><div className="flex gap-3"><ShieldCheck className="mt-0.5 shrink-0 text-primary" size={19} /><div><p className="text-sm font-semibold text-brand-ink">Cổng minh bạch công khai</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Tắt bất cứ lúc nào — bạn toàn quyền quyết định.</p></div></div><Switch checked={activeProject.publicEnabled} onCheckedChange={(checked) => { setProjectPublic(checked); showToast({ title: checked ? 'Cổng minh bạch đã bật' : 'Cổng minh bạch đã tắt', detail: checked ? 'Nhà tài trợ có thể truy cập đường dẫn công khai.' : 'Đường dẫn công khai hiện hiển thị trang chưa xuất bản.', tone: checked ? 'success' : 'warning' }); }} aria-label="Bật hoặc tắt Cổng minh bạch" /></div>
          <div className="mt-5"><Label>Link Cổng minh bạch</Label><div className="mt-2 flex"><Input value={publicUrl} readOnly className="rounded-r-none font-mono text-xs" /><Button variant="outline" className="rounded-l-none border-l-0" onClick={() => copy(publicUrl, 'link công khai')}><Copy /> Sao chép</Button></div></div>
          <div className="mt-5 border-t pt-5"><p className="text-[11px] font-semibold tracking-[0.06em] text-muted-foreground uppercase">Phạm vi hiển thị</p><div className="mt-3 space-y-3"><PrivacyLine title="Chỉ hiện khoản chi đã ghi nhận" detail="Khoản chờ duyệt và bị từ chối không xuất hiện." /><PrivacyLine title="Che dữ liệu nhạy cảm trên chứng từ" detail="Số tài khoản, mã giao dịch và dữ liệu cá nhân được làm mờ." /><PrivacyLine title="Ẩn ghi chú nội bộ" detail="Nhà tài trợ chỉ xem thông tin phục vụ minh bạch." /></div></div>
          <div className="mt-auto grid gap-2 pt-6 sm:grid-cols-2"><Button variant="outline" onClick={() => navigate(activeProject.publicEnabled ? 'public-portal' : 'public-offline')}><Eye /> Xem như nhà tài trợ</Button><Button onClick={() => share(publicUrl, 'Cổng minh bạch UII')}><Send /> Gửi nhà tài trợ</Button></div>
        </section>
      </div>
    </>
  );
}

function PrivacyLine({ title, detail }: { title: string; detail: string }) { return <div className="flex gap-3"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-success-soft text-success"><Check size={12} /></span><div><p className="text-xs font-semibold text-brand-ink">{title}</p><p className="mt-1 text-[11px] leading-4 text-muted-foreground">{detail}</p></div></div>; }
