'use client';

import Image from 'next/image';
import { AlertTriangle, Check, FileImage, FileText, LoaderCircle, RotateCcw, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { money, statusLabel } from '@/lib/demo-data';
import type { Expense, ExpenseStatus, ToastState } from '@/lib/demo-types';

export function Brand({ inverse = false, compact = false, onClick }: { inverse?: boolean; compact?: boolean; onClick?: () => void }) {
  const content = (
    <>
      <span className={cn('grid shrink-0 place-items-center overflow-hidden rounded-lg', compact ? 'h-8 w-9' : 'h-10 w-11', inverse ? 'bg-white/95' : 'bg-brand-cream')}>
        <Image src="/brand/uii-mark.png" width={72} height={42} alt="Biểu tượng UII" className="h-auto w-[92%]" priority />
      </span>
      <span className="min-w-0 text-left">
        <strong className={cn('block tracking-[-0.03em]', compact ? 'text-sm' : 'text-[15px]', inverse ? 'text-white' : 'text-brand-ink')}>UII</strong>
        {!compact ? <span className={cn('block text-[10px]', inverse ? 'text-white/55' : 'text-muted-foreground')}>Minh bạch tài chính cộng đồng</span> : null}
      </span>
    </>
  );

  return onClick ? (
    <button type="button" onClick={onClick} className="flex items-center gap-2.5 rounded-lg text-left focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2 focus-visible:outline-none">
      {content}
    </button>
  ) : (
    <div className="flex items-center gap-2.5">{content}</div>
  );
}

const statusStyles: Record<ExpenseStatus, string> = {
  pending: 'border-[#ddd8cf] bg-[#f3f1ed] text-[#625c53]',
  needs_more: 'border-[#efcf8f] bg-warning-soft text-warning',
  recorded: 'border-[#bbdfd1] bg-success-soft text-success',
  rejected: 'border-[#eabfc3] bg-danger-soft text-destructive',
};

export function ExpenseStatusBadge({ status }: { status: ExpenseStatus }) {
  return <Badge variant="outline" className={cn('h-6 rounded-md px-2 text-[11px] font-semibold', statusStyles[status])}>{statusLabel[status]}</Badge>;
}

export function ProjectStatusBadge({ status }: { status: 'active' | 'preparing' | 'closed' }) {
  const map = {
    active: ['Đang chạy', 'border-[#bbdfd1] bg-success-soft text-success'],
    preparing: ['Chuẩn bị', 'border-[#c9d7e7] bg-info-soft text-info'],
    closed: ['Đã đóng sổ', 'border-[#ddd8cf] bg-[#f3f1ed] text-[#625c53]'],
  } as const;
  return <Badge variant="outline" className={cn('h-6 rounded-md px-2 text-[11px] font-semibold', map[status][1])}>{map[status][0]}</Badge>;
}

export function PageHeading({ eyebrow, title, description, actions }: { eyebrow?: string; title: string; description?: string; actions?: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between gap-5 border-b pb-6 lg:flex-row lg:items-end">
      <div className="max-w-3xl">
        {eyebrow ? <p className="mb-2 text-[11px] font-semibold tracking-[0.08em] text-primary uppercase">{eyebrow}</p> : null}
        <h1 className="text-balance text-[28px] leading-tight font-semibold tracking-[-0.04em] text-brand-ink sm:text-[32px]">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function Metric({ label, value, note, accent }: { label: string; value: string; note: string; accent?: 'purple' | 'orange' | 'green' }) {
  const accentClass = accent === 'orange' ? 'border-t-brand-orange' : accent === 'green' ? 'border-t-success' : 'border-t-brand-purple';
  return (
    <article className={cn('border-t-2 bg-card px-5 py-4', accentClass)}>
      <p className="text-[11px] font-semibold tracking-[0.04em] text-muted-foreground uppercase">{label}</p>
      <p className="money mt-2 text-2xl font-semibold tracking-[-0.04em] text-brand-ink">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{note}</p>
    </article>
  );
}

export function SectionHeading({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold tracking-[-0.02em] text-brand-ink">{title}</h2>
        {description ? <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function EvidenceCard({ type, fileName, muted = false }: { type: 'transfer' | 'invoice'; fileName?: string; muted?: boolean }) {
  const Icon = type === 'transfer' ? FileImage : FileText;
  return (
    <div className={cn('relative min-h-52 overflow-hidden rounded-xl border bg-card p-4', muted && 'opacity-70')}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-ink">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-secondary text-primary"><Icon size={16} /></span>
          {type === 'transfer' ? 'Ảnh chuyển khoản' : 'Hóa đơn / biên nhận'}
        </div>
        <Badge variant="outline" className="rounded-md text-[10px]">Đã tải lên</Badge>
      </div>
      <div className="subtle-grid mt-4 grid min-h-32 place-items-center rounded-lg border border-dashed bg-[#fbfaf8] px-5 text-center">
        <div>
          <Icon className="mx-auto text-primary/55" size={28} strokeWidth={1.5} />
          <p className="mt-2 text-xs font-medium text-brand-ink">{fileName ?? (type === 'transfer' ? 'chuyen-khoan-1250000.jpg' : 'hoa-don-fahasa.jpg')}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Ảnh gốc được bảo vệ · 1,8 MB</p>
        </div>
      </div>
    </div>
  );
}

export function ExpenseSummary({ expense }: { expense: Expense }) {
  return (
    <div className="grid gap-4 rounded-xl border bg-card p-4 sm:grid-cols-2">
      <SummaryLine label="Người gửi" value={expense.submitter} />
      <SummaryLine label="Đơn vị bán hàng" value={expense.vendor} />
      <SummaryLine label="Thời gian giao dịch" value={`${expense.date} · ${expense.time}`} />
      <SummaryLine label="Số hóa đơn" value={expense.invoiceNumber} />
      <SummaryLine label="Hạng mục" value={expense.category} />
      <SummaryLine label="Nguồn tài trợ" value={expense.fundingSource} />
      <div className="sm:col-span-2 border-t pt-4">
        <p className="text-[11px] font-medium text-muted-foreground">Tổng tiền</p>
        <p className="money mt-1 text-2xl font-semibold text-brand-ink">{money(expense.amount)}</p>
      </div>
    </div>
  );
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return <div><p className="text-[11px] font-medium text-muted-foreground">{label}</p><p className="mt-1 text-sm font-semibold text-brand-ink">{value}</p></div>;
}

export function Toast({ toast }: { toast: ToastState }) {
  if (!toast) return null;
  const Icon = toast.tone === 'warning' ? AlertTriangle : toast.tone === 'neutral' ? RotateCcw : Check;
  return (
    <div role="status" className="fixed top-4 right-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm items-start gap-3 rounded-xl border bg-card p-4 shadow-[0_18px_60px_rgb(40_26_61/16%)]">
      <span className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-lg', toast.tone === 'warning' ? 'bg-warning-soft text-warning' : toast.tone === 'neutral' ? 'bg-muted text-muted-foreground' : 'bg-success-soft text-success')}><Icon size={17} /></span>
      <div className="min-w-0"><p className="text-sm font-semibold text-brand-ink">{toast.title}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{toast.detail}</p></div>
    </div>
  );
}

export function ProcessingOverlay({ label }: { label: string }) {
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-brand-ink/40 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-card px-5 py-4 shadow-2xl">
        <LoaderCircle className="animate-spin text-primary" size={20} />
        <div><p className="text-sm font-semibold text-brand-ink">{label}</p><p className="mt-0.5 text-xs text-muted-foreground">UII đang chuẩn hóa dữ liệu, bạn chờ một chút.</p></div>
      </div>
    </div>
  );
}

export function CloseButton({ onClick, label = 'Đóng' }: { onClick: () => void; label?: string }) {
  return <Button type="button" variant="ghost" size="icon" onClick={onClick} aria-label={label}><X /></Button>;
}
