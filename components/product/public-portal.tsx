'use client';

import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  Clock3,
  Copy,
  Download,
  Eye,
  FileCheck2,
  Gift,
  GraduationCap,
  LockKeyhole,
  MapPin,
  RefreshCw,
  ShieldCheck,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Brand, EvidenceCard, SectionHeading } from '@/components/product/shared';
import { useDemo } from '@/components/product/demo-context';
import { money } from '@/lib/demo-data';
import { categorySpent, projectExpenses, projectRecordedCount, projectSpent } from '@/lib/demo-selectors';
import { cn } from '@/lib/utils';

function PublicHeader() {
  const { navigate, activeProject } = useDemo();
  return (
    <header className="border-b border-white/10 bg-brand-ink text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Brand inverse compact onClick={() => navigate('launcher')} />
        <div className="flex items-center gap-2"><span className="hidden items-center gap-2 text-[11px] text-white/50 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-[#56b38f]" /> Cập nhật theo dữ liệu đã duyệt</span><Button variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white" size="sm" onClick={() => navigate(activeProject.publicEnabled ? 'public-portal' : 'public-offline')}><Eye /> Bản công khai</Button></div>
      </div>
    </header>
  );
}

export function PublicPortal() {
  const { state, activeProject, openExpense, navigate, showToast } = useDemo();
  if (!activeProject.publicEnabled) return <PublicOffline />;
  const spent = projectSpent(state, activeProject);
  const recorded = projectRecordedCount(state, activeProject);
  const expenses = projectExpenses(state, activeProject.id).filter((expense) => expense.status === 'recorded');

  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <PublicHeader />
      <section className="bg-brand-ink text-white">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <Badge variant="outline" className="rounded-md border-white/15 bg-white/5 text-white"><BadgeCheck /> Đã xác nhận bởi {activeProject.organization}</Badge>
              <h1 className="mt-5 text-balance text-4xl leading-tight font-semibold tracking-[-0.05em] sm:text-5xl">{activeProject.name}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">Theo dõi tiền tài trợ được sử dụng thế nào. Mỗi con số trên trang đều có thể truy ngược về khoản chi đã được ban tổ chức phê duyệt.</p>
            </div>
            <div className="flex flex-wrap gap-2"><Button variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white" onClick={() => showToast({ title: 'Đã sao chép đường dẫn công khai', detail: 'Nhà tài trợ có thể mở đường dẫn mà không cần tài khoản.', tone: 'success' })}><Copy /> Sao chép đường dẫn</Button><Button className="bg-brand-orange text-brand-ink hover:bg-brand-yellow" onClick={() => window.print()}><Download /> Tải báo cáo</Button></div>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-xs text-white/50"><span className="flex items-center gap-2"><CalendarDays size={14} /> {activeProject.startDate} — {activeProject.endDate}</span><span className="flex items-center gap-2"><MapPin size={14} /> TP.HCM và Lâm Đồng</span><span className="flex items-center gap-2"><RefreshCw size={14} /> Cập nhật 29/08/2026 · 10:12</span></div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-12">
        <section className="grid overflow-hidden rounded-xl border bg-border gap-px sm:grid-cols-3"><PublicMetric label="Tài trợ đã nhận" value={money(activeProject.budget)} note="Từ 2 nguồn tài trợ" /><PublicMetric label="Đã sử dụng" value={money(spent)} note={`${recorded} khoản đã được duyệt`} accent /><PublicMetric label="Ngân sách còn lại" value={money(activeProject.budget - spent)} note={`${Math.round(((activeProject.budget - spent) / activeProject.budget) * 100)}% tổng quỹ`} /></section>

        <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1.4fr)_minmax(300px,.6fr)]">
          <section>
            <SectionHeading title="Ngân sách được sử dụng thế nào" description="Khoản đang chờ duyệt không được tính vào số liệu công khai." />
            <div className="mt-4 overflow-hidden rounded-xl border bg-card">{activeProject.categories.map((category, index) => { const currentSpent = categorySpent(state, activeProject, category.name, category.spent); const percent = Math.round((currentSpent / category.total) * 100); return <div key={category.name} className={cn('px-5 py-5', index !== activeProject.categories.length - 1 && 'border-b')}><div className="flex items-end justify-between gap-4"><div><p className="text-sm font-semibold text-brand-ink">{category.name}</p><p className="money mt-1 text-xs text-muted-foreground">{money(currentSpent)} trên {money(category.total)}</p></div><p className="money text-lg font-semibold text-brand-ink">{percent}%</p></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full" style={{ width: `${Math.min(percent, 100)}%`, background: category.color }} /></div></div>; })}</div>
          </section>
          <aside className="rounded-xl border bg-card p-5"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-success-soft text-success"><ShieldCheck /></span><div><h2 className="text-sm font-semibold text-brand-ink">Minh bạch có kiểm soát</h2><p className="mt-1 text-[11px] text-muted-foreground">Dữ liệu công khai theo nguyên tắc an toàn.</p></div></div><div className="mt-5 space-y-4"><TrustLine text="Chỉ hiện khoản chi đã ghi nhận" /><TrustLine text="Chứng từ đã che dữ liệu nhạy cảm" /><TrustLine text="Không hiển thị ghi chú nội bộ" /><TrustLine text="Mọi thay đổi có lịch sử truy vết" /></div><div className="mt-5 rounded-lg bg-secondary/55 p-3 text-[11px] leading-5 text-secondary-foreground"><strong>Lưu ý:</strong> Chứng từ đã được ban tổ chức kiểm tra nội bộ; UII chưa xác nhận giao dịch trực tiếp với ngân hàng.</div></aside>
        </div>

        <section className="mt-12">
          <SectionHeading title="Sổ khoản chi công khai" description="Bấm một khoản để xem chứng từ đã được che thông tin nhạy cảm." />
          <div className="mt-4 overflow-hidden rounded-xl border bg-card"><Table><TableHeader className="bg-[#faf9f7]"><TableRow><TableHead className="px-5 text-[11px] text-muted-foreground uppercase">Ngày</TableHead><TableHead className="text-[11px] text-muted-foreground uppercase">Nội dung</TableHead><TableHead className="text-[11px] text-muted-foreground uppercase">Hạng mục</TableHead><TableHead className="text-right text-[11px] text-muted-foreground uppercase">Số tiền</TableHead><TableHead className="px-5 text-right text-[11px] text-muted-foreground uppercase">Bằng chứng</TableHead></TableRow></TableHeader><TableBody>{expenses.map((expense) => <TableRow key={expense.id} className={cn('h-[68px]', expense.isFresh && 'bg-secondary/25')}><TableCell className="px-5 text-xs text-muted-foreground">{expense.date.slice(0, 5)}</TableCell><TableCell><button className="text-left" onClick={() => openExpense(expense.id, 'public-expense')}><strong className="text-sm text-brand-ink hover:text-primary">{expense.title}</strong><span className="mt-1 block text-[11px] text-muted-foreground">{expense.id}</span></button></TableCell><TableCell className="text-xs">{expense.category}</TableCell><TableCell className="money text-right text-sm font-semibold">{money(expense.amount)}</TableCell><TableCell className="px-5 text-right"><Button variant="ghost" size="sm" onClick={() => openExpense(expense.id, 'public-expense')}><FileCheck2 /> Xem <ArrowRight /></Button></TableCell></TableRow>)}</TableBody></Table>{!expenses.length ? <div className="py-12 text-center text-sm text-muted-foreground">Chưa có khoản chi được công khai.</div> : null}</div>
        </section>

        <section className="mt-12 rounded-2xl bg-brand-cream p-6 sm:p-8"><div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-center"><div className="max-w-xl"><p className="text-xs font-semibold tracking-[0.08em] text-[#99580a] uppercase">Từ dòng tiền đến tác động</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-brand-ink">Mỗi khoản chi được nối với một kết quả cộng đồng có thể giải trình.</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Tác động do ban tổ chức nhập và được trình bày cùng dữ liệu tài chính đã duyệt.</p></div><div className="grid grid-cols-3 gap-3"><Impact icon={<Gift />} value="120" label="Phần quà" /><Impact icon={<Users />} value="1" label="Đêm hội" /><Impact icon={<GraduationCap />} value="3" label="Điểm trường" /></div></div></section>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-center sm:flex-row sm:text-left"><div><p className="text-xs font-semibold text-brand-ink">Đơn vị chịu trách nhiệm: {activeProject.organization}</p><p className="mt-1 text-[11px] text-muted-foreground">Bạn cần thêm thông tin? Hãy liên hệ người phụ trách dự án.</p></div><Button variant="outline" onClick={() => navigate('launcher')}>Về trang chủ</Button></div>
      </div>
    </main>
  );
}

function PublicMetric({ label, value, note, accent }: { label: string; value: string; note: string; accent?: boolean }) { return <article className={cn('bg-card p-5', accent && 'border-t-2 border-t-brand-orange')}><p className="text-[11px] font-semibold tracking-[0.05em] text-muted-foreground uppercase">{label}</p><p className="money mt-2 text-2xl font-semibold tracking-[-0.04em] text-brand-ink">{value}</p><p className="mt-1 text-xs text-muted-foreground">{note}</p></article>; }
function TrustLine({ text }: { text: string }) { return <div className="flex items-center gap-3"><span className="grid h-6 w-6 place-items-center rounded-lg bg-success-soft text-success"><Check size={13} /></span><p className="text-xs font-medium text-brand-ink">{text}</p></div>; }
function Impact({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) { return <div className="min-w-20 rounded-xl bg-white/70 p-3 text-center"><span className="mx-auto grid h-8 w-8 place-items-center rounded-lg bg-secondary text-primary [&_svg]:h-4 [&_svg]:w-4">{icon}</span><p className="money mt-2 text-xl font-semibold text-brand-ink">{value}</p><p className="mt-0.5 text-[10px] text-muted-foreground">{label}</p></div>; }

export function PublicExpense() {
  const { activeExpense: expense, navigate } = useDemo();
  return (
    <main className="min-h-screen bg-[#f8f7f4]"><PublicHeader /><div className="mx-auto max-w-6xl px-5 py-8 lg:px-8 lg:py-12"><Button variant="ghost" onClick={() => navigate('public-portal')}><ArrowLeft /> Về sổ công khai</Button><div className="mt-5 flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-end"><div><Badge variant="outline" className="rounded-md border-[#bbdfd1] bg-success-soft text-success"><BadgeCheck /> Đã được ban tổ chức ghi nhận</Badge><h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-brand-ink">{expense.title}</h1><p className="mt-2 text-sm text-muted-foreground">{expense.id} · {expense.date} · {expense.category}</p></div><p className="money text-3xl font-semibold text-brand-ink">{money(expense.amount)}</p></div><div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_340px]"><section><SectionHeading title="Bằng chứng công khai" description="Bản xem này đã che số tài khoản, mã giao dịch và dữ liệu cá nhân." /><div className="mt-4 grid gap-4 sm:grid-cols-2">{expense.evidence.map((type) => <EvidenceCard key={type} type={type} />)}</div></section><aside className="space-y-4"><section className="rounded-xl border bg-card p-5"><h2 className="text-sm font-semibold text-brand-ink">Thông tin được công khai</h2><div className="mt-4 space-y-4"><PublicLine label="Đơn vị bán hàng" value={expense.vendor} /><PublicLine label="Ngày / giờ" value={`${expense.date} · ${expense.time}`} /><PublicLine label="Hạng mục" value={expense.category} /><PublicLine label="Nguồn tài trợ" value={expense.fundingSource} /></div></section><section className="rounded-xl border border-[#d7c7ea] bg-secondary/55 p-5"><div className="flex gap-3"><LockKeyhole className="mt-0.5 shrink-0 text-primary" size={18} /><div><h3 className="text-xs font-semibold text-brand-ink">Thông tin nhạy cảm đã bị che</h3><p className="mt-2 text-[11px] leading-5 text-muted-foreground">Bản gốc chỉ người phụ trách có quyền xem. Người xem không thể tải ảnh chưa xử lý.</p></div></div></section></aside></div></div></main>
  );
}

function PublicLine({ label, value }: { label: string; value: string }) { return <div><p className="text-[10px] font-semibold tracking-[0.05em] text-muted-foreground uppercase">{label}</p><p className="mt-1 text-sm font-semibold text-brand-ink">{value}</p></div>; }

export function PublicOffline() {
  const { activeProject, navigate } = useDemo();
  return <main className="min-h-screen bg-[#f6f4f8]"><PublicHeader /><div className="mx-auto grid max-w-xl place-items-center px-5 py-24 text-center"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-muted text-muted-foreground"><Clock3 /></span><p className="mt-5 text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">Cổng minh bạch chưa xuất bản</p><h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-brand-ink">{activeProject.name}</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">Ban tổ chức đang hoàn thiện dữ liệu trước khi công khai. Vui lòng quay lại sau hoặc liên hệ người phụ trách dự án.</p><Button className="mt-6" variant="outline" onClick={() => navigate('launcher')}>Về trang chủ</Button></div></main>;
}
