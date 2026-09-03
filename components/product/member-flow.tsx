'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Copy,
  Eye,
  FileImage,
  ImagePlus,
  Link2,
  LockKeyhole,
  Plus,
  ReceiptText,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Upload,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Brand, EvidenceCard, ExpenseStatusBadge, ProcessingOverlay } from '@/components/product/shared';
import { useDemo } from '@/components/product/demo-context';
import { money, TRACKING_TOKEN } from '@/lib/demo-data';
import { projectExpenses } from '@/lib/demo-selectors';
import { cn } from '@/lib/utils';

function MemberHeader({ step, onBack }: { step?: string; onBack?: () => void }) {
  const { navigate } = useDemo();
  return (
    <header className="border-b bg-card">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
        <div className="flex items-center gap-3">{onBack ? <Button variant="ghost" size="icon" onClick={onBack} aria-label="Quay lại"><ArrowLeft /></Button> : null}<Brand compact onClick={() => navigate('launcher')} /></div>
        <div className="flex items-center gap-3">{step ? <span className="text-[11px] font-semibold text-muted-foreground">{step}</span> : null}<Button variant="ghost" size="sm" onClick={() => navigate('member-bills')}><ReceiptText /> Bill của tôi</Button></div>
      </div>
    </header>
  );
}

export function MemberSubmit() {
  const { activeProject, navigate } = useDemo();
  const [transfer, setTransfer] = useState<File | null>(null);
  const [invoice, setInvoice] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  const continueToReview = () => {
    setProcessing(true);
    window.setTimeout(() => { setProcessing(false); navigate('member-review'); }, 1000);
  };

  if (!activeProject.submissionsOpen) {
    return <main className="min-h-screen bg-[#f6f4f8]"><MemberHeader /><div className="mx-auto grid max-w-lg place-items-center px-5 py-24 text-center"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-warning-soft text-warning"><Clock3 /></span><h1 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-brand-ink">Dự án đã tạm dừng nhận bill</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">Người phụ trách đã tạm dừng nhận khoản chi mới. Hãy liên hệ người phụ trách nếu bạn cần bổ sung chứng từ cũ.</p><Button className="mt-6" variant="outline" onClick={() => navigate('launcher')}>Về trang chủ</Button></div></main>;
  }

  return (
    <main className="min-h-screen bg-[#f6f4f8]">
      <MemberHeader step="Bước 1 / 2" />
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-[340px_minmax(0,1fr)] lg:px-8 lg:py-12">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <Badge variant="outline" className="rounded-md border-[#bbdfd1] bg-success-soft text-success"><ShieldCheck /> Không cần tài khoản</Badge>
          <h1 className="mt-5 text-3xl leading-tight font-semibold tracking-[-0.05em] text-brand-ink">Nộp ngay khi khoản chi vừa phát sinh.</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">UII đọc thông tin trên ảnh, sau đó người phụ trách sẽ kiểm tra trước khi ghi nhận.</p>
          <div className="mt-7 rounded-xl border bg-card p-4"><p className="text-[10px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">Bạn đang nộp cho</p><div className="mt-3 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-xs font-bold text-primary">TT</span><div><p className="text-sm font-semibold text-brand-ink">{activeProject.name}</p><p className="mt-0.5 text-xs text-muted-foreground">{activeProject.organization}</p></div></div></div>
          <div className="mt-4 flex items-start gap-3 rounded-xl bg-brand-cream p-4 text-xs leading-5 text-[#6b3a08]"><LockKeyhole className="mt-0.5 shrink-0" size={16} /><p>Ảnh gốc chỉ người phụ trách tài chính xem. Bản công khai luôn che số tài khoản, mã giao dịch và dữ liệu cá nhân.</p></div>
        </aside>

        <section className="rounded-2xl border bg-card p-5 shadow-[0_18px_60px_rgb(40_26_61/7%)] sm:p-7">
          <div className="border-b pb-5"><h2 className="text-xl font-semibold tracking-[-0.03em] text-brand-ink">Thông tin khoản chi</h2><p className="mt-1 text-xs text-muted-foreground">Thông tin này giúp người phụ trách đối chiếu khoản chi nhanh hơn.</p></div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <FormField label="Tên người gửi" id="submitter"><Input id="submitter" defaultValue="Nguyễn Minh Anh" /></FormField>
            <FormField label="Người thanh toán" id="payer"><Input id="payer" defaultValue="Nguyễn Minh Anh" /></FormField>
            <FormField label="Hoạt động sử dụng khoản chi" id="activity" wide><Input id="activity" defaultValue="Đêm hội Trung thu 30/09" /></FormField>
            <FormField label="Mục đích khoản chi" id="purpose" wide><Textarea id="purpose" defaultValue="Mua dụng cụ trang trí sân khấu cho đêm hội" className="min-h-20" /></FormField>
          </div>

          <div className="mt-7 border-t pt-6"><div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end"><div><h3 className="text-sm font-semibold text-brand-ink">Tải chứng từ</h3><p className="mt-1 text-xs text-muted-foreground">Có cả ảnh chuyển khoản và hóa đơn sẽ giúp đối chiếu tốt hơn.</p></div><Badge variant="outline" className="w-fit rounded-md bg-brand-cream text-[#8c520b]">Khuyến nghị 2 ảnh</Badge></div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <UploadField label="Ảnh chuyển khoản" detail="JPG, PNG hoặc HEIC" file={transfer} onChange={setTransfer} icon={<Camera />} />
              <UploadField label="Hóa đơn / biên nhận" detail="Ảnh rõ tổng tiền và thời gian" file={invoice} onChange={setInvoice} icon={<FileImage />} />
            </div>
            {!transfer && !invoice ? <div className="mt-3 flex items-start gap-2 rounded-lg bg-warning-soft p-3 text-[11px] leading-5 text-warning"><AlertTriangle size={15} className="mt-0.5 shrink-0" />Bạn cần tải ít nhất một ảnh chuyển khoản hoặc hóa đơn để tiếp tục.</div> : null}
          </div>

          <Button size="lg" className="mt-7 w-full" onClick={continueToReview} disabled={!transfer && !invoice}><Sparkles /> Đọc thông tin trên ảnh <ArrowRight /></Button>
          <p className="mt-3 text-center text-[10px] text-muted-foreground">UII sẽ điền giúp; bạn vẫn có thể sửa trước khi gửi.</p>
        </section>
      </div>
      {processing ? <ProcessingOverlay label="Đang đọc và đối chiếu chứng từ" /> : null}
    </main>
  );
}

function FormField({ label, id, wide, children }: { label: string; id: string; wide?: boolean; children: React.ReactNode }) { return <div className={cn('space-y-2', wide && 'sm:col-span-2')}><Label htmlFor={id}>{label}</Label>{children}</div>; }

function UploadField({ label, detail, file, onChange, icon }: { label: string; detail: string; file: File | null; onChange: (file: File | null) => void; icon: React.ReactNode }) {
  const id = label === 'Ảnh chuyển khoản' ? 'transfer-upload' : 'invoice-upload';
  return (
    <label htmlFor={id} className={cn('group grid min-h-40 place-items-center rounded-xl border border-dashed p-4 text-center transition hover:border-primary/50 hover:bg-secondary/20', file ? 'border-primary/35 bg-secondary/35' : 'bg-[#fbfaf8]')}>
      <input id={id} type="file" accept="image/*" className="sr-only" onChange={(event) => onChange(event.target.files?.[0] ?? null)} />
      <span><span className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary [&_svg]:h-5 [&_svg]:w-5">{file ? <CheckCircle2 /> : icon}</span><strong className="mt-3 block text-sm text-brand-ink">{file?.name ?? label}</strong><span className="mt-1 block text-[11px] text-muted-foreground">{file ? 'Đã sẵn sàng · Bấm để đổi ảnh' : detail}</span></span>
    </label>
  );
}

export function MemberReview() {
  const { navigate, submitDemoExpense, showToast } = useDemo();
  const [vendor, setVendor] = useState('Nhà sách Phương Nam');
  const [invoiceNumber, setInvoiceNumber] = useState('PN-290826');
  const [category, setCategory] = useState('Hoạt động & địa điểm');

  const submit = () => {
    const id = submitDemoExpense();
    showToast({ title: `${id} đã được gửi`, detail: 'Đường dẫn theo dõi riêng đã sẵn sàng.', tone: 'success' });
    navigate('member-success');
  };

  return (
    <main className="min-h-screen bg-[#f6f4f8]">
      <MemberHeader step="Bước 2 / 2" onBack={() => navigate('member-submit')} />
      <div className="mx-auto max-w-6xl px-5 py-8 lg:px-8 lg:py-12">
        <div className="flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-end"><div><Badge variant="outline" className="rounded-md border-[#bbdfd1] bg-success-soft text-success"><Sparkles /> Đã đọc xong chứng từ</Badge><h1 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-brand-ink">Kiểm tra trước khi gửi</h1><p className="mt-2 text-sm leading-6 text-muted-foreground">UII đã điền sẵn; bạn kiểm tra và sửa lại nếu cần.</p></div><div className="rounded-lg border border-[#edcf91] bg-warning-soft px-4 py-2 text-xs font-semibold text-warning">Cần kiểm tra 2 mục</div></div>

        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
          <section><div className="flex items-center justify-between"><h2 className="text-sm font-semibold text-brand-ink">Chứng từ đã tải</h2><Button variant="ghost" size="sm" onClick={() => navigate('member-submit')}><RotateCcw /> Đổi ảnh</Button></div><div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"><EvidenceCard type="transfer" /><EvidenceCard type="invoice" /></div><div className="mt-4 flex gap-3 rounded-xl border border-[#d7c7ea] bg-secondary/55 p-4"><BadgeCheck className="mt-0.5 shrink-0 text-primary" size={18} /><div><p className="text-xs font-semibold text-brand-ink">Hai chứng từ khớp nhau</p><p className="mt-1 text-[11px] leading-5 text-muted-foreground">Tổng tiền và ngày giao dịch trùng khớp. Thời gian lệch 1 phút nằm trong ngưỡng chấp nhận.</p></div></div></section>

          <section className="rounded-2xl border bg-card p-5 sm:p-6"><div className="flex items-center justify-between border-b pb-4"><div><p className="text-[10px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">Thông tin UII đọc được</p><h2 className="mt-1 text-lg font-semibold text-brand-ink">Kiểm tra lại thông tin</h2></div><span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary"><Sparkles /></span></div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <ConfidenceField label="Đơn vị bán hàng" confidence="Tin cậy cao"><Input value={vendor} onChange={(event) => setVendor(event.target.value)} /></ConfidenceField>
              <ConfidenceField label="Ngày giao dịch" confidence="Tin cậy cao"><Input defaultValue="29/08/2026" /></ConfidenceField>
              <ConfidenceField label="Giờ giao dịch" confidence="Tin cậy cao"><Input defaultValue="19:24" /></ConfidenceField>
              <ConfidenceField label="Tổng tiền" confidence="Tin cậy cao"><Input defaultValue="690.000₫" className="font-semibold" /></ConfidenceField>
              <ConfidenceField label="Số hóa đơn" confidence="Cần kiểm tra" caution><Input value={invoiceNumber} onChange={(event) => setInvoiceNumber(event.target.value)} className="border-[#dcb55f]" /></ConfidenceField>
              <ConfidenceField label="Hạng mục gợi ý" confidence="Cần kiểm tra" caution><Input value={category} onChange={(event) => setCategory(event.target.value)} className="border-[#dcb55f]" /></ConfidenceField>
              <ConfidenceField label="Nguồn tài trợ" confidence="Tin cậy cao" wide><Input defaultValue="Quỹ vận hành" /></ConfidenceField>
            </div>

            <div className="mt-6"><div className="flex items-end justify-between"><div><Label>Chi tiết sản phẩm</Label><p className="mt-1 text-[11px] text-muted-foreground">Bạn có thể sửa tên hoặc số lượng nếu chưa chính xác.</p></div><Button variant="ghost" size="sm"><Plus /> Thêm dòng</Button></div><div className="mt-3 overflow-hidden rounded-xl border"><Table><TableHeader className="bg-[#faf9f7]"><TableRow><TableHead className="px-4">Sản phẩm</TableHead><TableHead className="text-right">SL</TableHead><TableHead className="px-4 text-right">Thành tiền</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell className="px-4 text-xs font-medium">Dây cờ trang trí</TableCell><TableCell className="text-right text-xs">10</TableCell><TableCell className="money px-4 text-right text-xs font-semibold">290.000₫</TableCell></TableRow><TableRow><TableCell className="px-4 text-xs font-medium">Đèn led dây</TableCell><TableCell className="text-right text-xs">4</TableCell><TableCell className="money px-4 text-right text-xs font-semibold">400.000₫</TableCell></TableRow></TableBody></Table></div></div>

            <div className="mt-5 flex gap-3 rounded-xl border border-[#edcf91] bg-warning-soft p-4"><AlertTriangle className="mt-0.5 shrink-0 text-warning" size={18} /><div><p className="text-xs font-semibold text-[#69470c]">Kiểm tra ngân sách</p><p className="mt-1 text-[11px] leading-5 text-warning">Khoản này đưa “Hoạt động & địa điểm” lên khoảng 43% ngân sách và chưa vượt hạn mức.</p></div></div>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><Button variant="outline" size="lg" onClick={() => navigate('member-submit')}>Quay lại chỉnh ảnh</Button><Button size="lg" onClick={submit}><Check /> Xác nhận & gửi</Button></div>
          </section>
        </div>
      </div>
    </main>
  );
}

function ConfidenceField({ label, confidence, caution, wide, children }: { label: string; confidence: string; caution?: boolean; wide?: boolean; children: React.ReactNode }) { return <div className={cn('space-y-2', wide && 'sm:col-span-2')}><div className="flex items-center justify-between gap-3"><Label>{label}</Label><span className={cn('text-[10px] font-semibold', caution ? 'text-warning' : 'text-success')}>{confidence}</span></div>{children}</div>; }

export function MemberSuccess() {
  const { activeExpense, activeProject, navigate, showToast } = useDemo();
  const trackingUrl = `https://uii.vn/track/${TRACKING_TOKEN}`;
  const copy = async () => { try { await navigator.clipboard.writeText(trackingUrl); } catch { /* clipboard may be unavailable */ } showToast({ title: 'Đã sao chép đường dẫn theo dõi', detail: 'Chỉ người có đường dẫn này mới xem được danh sách bill của bạn.', tone: 'success' }); };
  return (
    <main className="min-h-screen bg-[#f6f4f8]"><MemberHeader /><div className="mx-auto max-w-xl px-5 py-12 sm:py-20"><section className="rounded-2xl border bg-card p-6 text-center shadow-[0_20px_65px_rgb(40_26_61/9%)] sm:p-8"><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-success-soft text-success"><CheckCircle2 size={28} /></span><p className="mt-5 text-xs font-semibold tracking-[0.08em] text-success uppercase">Đã gửi thành công</p><h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-brand-ink">Khoản chi đã được gửi.</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">Người phụ trách sẽ kiểm tra và cập nhật trạng thái tại đây.</p><div className="mt-7 rounded-xl border bg-[#faf9f7] p-5 text-left"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-semibold text-muted-foreground uppercase">Mã khoản chi</p><p className="mt-1 text-lg font-semibold text-primary">{activeExpense.id}</p></div><ExpenseStatusBadge status="pending" /></div><div className="mt-4 border-t pt-4"><p className="text-sm font-semibold text-brand-ink">{activeExpense.title}</p><p className="money mt-1 text-xl font-semibold text-brand-ink">{money(activeExpense.amount)}</p><p className="mt-1 text-xs text-muted-foreground">{activeProject.name}</p></div></div><div className="mt-5 rounded-xl border border-[#d7c7ea] bg-secondary/55 p-4 text-left"><div className="flex gap-3"><Link2 className="mt-0.5 shrink-0 text-primary" size={18} /><div><p className="text-sm font-semibold text-brand-ink">Lưu đường dẫn theo dõi</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Bạn không cần đăng nhập. Hãy lưu đường dẫn này để xem trạng thái và bổ sung ảnh khi cần.</p></div></div><div className="mt-3 flex"><Input value={trackingUrl} readOnly className="rounded-r-none font-mono text-xs" /><Button variant="outline" className="rounded-l-none border-l-0" onClick={copy}><Copy /> Sao chép</Button></div></div><div className="mt-6 grid gap-2 sm:grid-cols-2"><Button variant="outline" size="lg" onClick={() => navigate('member-submit')}><Plus /> Nộp bill khác</Button><Button size="lg" onClick={() => navigate('member-bills')}>Xem Bill của tôi <ArrowRight /></Button></div></section></div></main>
  );
}

export function MemberBills() {
  const { state, activeProject, navigate, openExpense } = useDemo();
  const [expanded, setExpanded] = useState<string | null>(null);
  const expenses = projectExpenses(state, activeProject.id).filter((expense) => expense.submitter === 'Nguyễn Minh Anh');
  const counts = { recorded: expenses.filter((expense) => expense.status === 'recorded').length, pending: expenses.filter((expense) => expense.status === 'pending').length, needs: expenses.filter((expense) => expense.status === 'needs_more').length };
  return (
    <main className="min-h-screen bg-[#eeece7]"><MemberHeader /><div className="mx-auto max-w-xl px-4 py-6 sm:py-10"><section className="rounded-[22px] border bg-card p-5 shadow-[0_16px_50px_rgb(40_26_61/6%)] sm:p-7"><div><p className="text-xs font-semibold tracking-[0.06em] text-primary uppercase">Theo dõi khoản chi</p><h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-brand-ink">Bill của tôi</h1><p className="mt-2 text-sm leading-6 text-muted-foreground">Nguyễn Minh Anh · không cần đăng nhập<br />Dự án <strong className="text-brand-ink">{activeProject.name}</strong></p></div><div className="mt-6 rounded-xl bg-secondary/60 p-4 text-sm leading-6 text-secondary-foreground">Bạn đã nộp <strong>{expenses.length} khoản</strong> · {counts.recorded} đã ghi nhận · {counts.pending} chờ duyệt · {counts.needs} cần bổ sung</div>
          <div className="mt-5 space-y-3">{expenses.map((expense) => <article key={expense.id} className={cn('rounded-xl border bg-card p-4', expense.status === 'needs_more' && 'border-[#edcf91]')}><button onClick={() => setExpanded(expanded === expense.id ? null : expense.id)} className="w-full text-left"><div className="flex items-start justify-between gap-4"><div><h2 className="text-sm font-semibold text-brand-ink">{expense.title}</h2><p className="mt-1 text-[11px] text-muted-foreground">{expense.date.slice(0, 5)} · {expense.id} · {expense.category}</p></div><strong className="money shrink-0 text-sm text-brand-ink">{money(expense.amount)}</strong></div><div className="mt-3 flex items-center justify-between"><ExpenseStatusBadge status={expense.status} /><ChevronRight className={cn('text-muted-foreground transition', expanded === expense.id && 'rotate-90')} size={16} /></div></button>{expense.note ? <div className={cn('mt-4 rounded-lg p-3 text-xs leading-5', expense.status === 'needs_more' ? 'bg-warning-soft text-warning' : 'bg-muted text-muted-foreground')}>{expense.note}</div> : null}{expanded === expense.id ? <div className="mt-4 border-t pt-4"><div className="grid grid-cols-2 gap-3 text-xs"><div><p className="text-muted-foreground">Đơn vị bán hàng</p><p className="mt-1 font-semibold">{expense.vendor}</p></div><div><p className="text-muted-foreground">Chứng từ</p><p className="mt-1 font-semibold">{expense.evidence.length} ảnh</p></div></div>{expense.status === 'needs_more' ? <Button className="mt-4 w-full" onClick={() => openExpense(expense.id, 'member-resubmit')}><ImagePlus /> Gửi lại ảnh</Button> : null}</div> : null}</article>)}</div>
          <Button size="lg" className="mt-6 w-full" onClick={() => navigate('member-submit')}><Plus /> Nộp bill mới</Button>
          {activeProject.publicEnabled ? <button onClick={() => navigate('public-portal')} className="mt-4 flex w-full items-center justify-between rounded-xl bg-brand-cream p-4 text-left"><span><strong className="block text-sm text-brand-ink">Xem toàn bộ dòng tiền của dự án</strong><span className="mt-1 block text-xs text-muted-foreground">Mở trang minh bạch của dự án</span></span><ExternalLinkIcon /></button> : null}
          <p className="mt-6 text-center text-[11px] leading-5 text-muted-foreground">Chỉ người có đường dẫn theo dõi này mới xem được các khoản chi của bạn.</p>
        </section></div></main>
  );
}

function ExternalLinkIcon() { return <Eye className="shrink-0 text-primary" size={18} />; }

export function MemberResubmit() {
  const { activeExpense, navigate, resubmitEvidence, showToast } = useDemo();
  const [file, setFile] = useState<File | null>(null);
  const submit = () => { resubmitEvidence(activeExpense.id); showToast({ title: 'Đã bổ sung ảnh mới', detail: 'Ảnh cũ vẫn được giữ trong lịch sử để người phụ trách đối chiếu.', tone: 'success' }); navigate('member-bills'); };
  return (
    <main className="min-h-screen bg-[#f6f4f8]"><MemberHeader step="Bổ sung chứng từ" onBack={() => navigate('member-bills')} /><div className="mx-auto max-w-xl px-5 py-10"><section className="rounded-2xl border bg-card p-6 sm:p-7"><Badge variant="outline" className="rounded-md border-[#edcf91] bg-warning-soft text-warning">{activeExpense.id} · Cần bổ sung</Badge><h1 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-brand-ink">Gửi lại ảnh cho “{activeExpense.title}”</h1><p className="mt-2 text-sm leading-6 text-muted-foreground">Người phụ trách cần một ảnh rõ hơn. Ảnh mới sẽ được thêm vào lịch sử và không ghi đè chứng từ ban đầu.</p>{activeExpense.note ? <div className="mt-5 rounded-xl bg-warning-soft p-4 text-xs leading-5 text-warning"><strong className="block text-[#69470c]">Ghi chú từ người phụ trách</strong><p className="mt-1">{activeExpense.note}</p></div> : null}<div className="mt-6"><UploadField label="Ảnh bổ sung" detail="Chụp rõ tổng tiền, ngày và tên đơn vị" file={file} onChange={setFile} icon={<ImagePlus />} /></div><div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><Button variant="outline" size="lg" onClick={() => navigate('member-bills')}>Hủy</Button><Button size="lg" onClick={submit} disabled={!file}><Upload /> Gửi ảnh bổ sung</Button></div></section></div></main>
  );
}
