'use client';

import { QRCodeSVG } from 'qrcode.react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Banknote,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Copy,
  Download,
  ExternalLink,
  Eye,
  FileCheck2,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Link2,
  LockKeyhole,
  Menu,
  MoreHorizontal,
  Plus,
  ReceiptText,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  UserRound,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

type View = 'dashboard' | 'projects' | 'submit' | 'extract' | 'review' | 'transparency' | 'report';
type Toast = { title: string; detail: string } | null;
type ProofMode = 'transfer' | 'invoice' | 'both';

const formatMoney = (value: number) => `${new Intl.NumberFormat('vi-VN').format(value)} ₫`;

const queue = [
  { id: 'KC-0249', title: 'Tập vẽ & bút màu', person: 'Nguyễn Minh Anh', amount: 1_250_000, flag: 'Cần đối chiếu', tone: 'amber', time: '4 phút' },
  { id: 'KC-0248', title: 'Thuê xe vận chuyển', person: 'Trần Gia Huy', amount: 2_800_000, flag: 'Có thể trùng', tone: 'red', time: '18 phút' },
  { id: 'KC-0247', title: 'Bánh trung thu', person: 'Lê Thảo Vy', amount: 860_000, flag: 'Đủ dữ liệu', tone: 'green', time: '32 phút' },
];

const categories = [
  { name: 'Quà tặng trẻ em', spent: 14_200_000, total: 18_000_000, color: '#1e6652' },
  { name: 'Vận chuyển & hậu cần', spent: 8_300_000, total: 10_000_000, color: '#d8783f' },
  { name: 'Truyền thông', spent: 3_650_000, total: 7_000_000, color: '#6884a6' },
];

const transactions = [
  { date: '28.08', title: 'Bộ màu & tập vẽ', category: 'Quà tặng trẻ em', amount: 2_480_000 },
  { date: '27.08', title: 'Thuê xe vận chuyển', category: 'Vận chuyển & hậu cần', amount: 3_200_000 },
  { date: '25.08', title: 'In backdrop sự kiện', category: 'Truyền thông', amount: 1_750_000 },
  { date: '23.08', title: 'Bánh trung thu', category: 'Quà tặng trẻ em', amount: 4_680_000 },
];

export default function MvpDemo() {
  const [view, setView] = useState<View>('dashboard');
  const [approved, setApproved] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [createProject, setCreateProject] = useState(false);
  const [proofOpen, setProofOpen] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const navigate = (next: View) => {
    setView(next);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const extract = () => {
    setProcessing(true);
    window.setTimeout(() => {
      setProcessing(false);
      navigate('extract');
    }, 1100);
  };

  const sendForReview = () => {
    setToast({ title: 'Khoản chi KC-0249 đã được gửi', detail: 'Lead dự án sẽ đối chiếu và ra quyết định cuối cùng.' });
    navigate('review');
  };

  const approve = () => {
    setApproved(true);
    setToast({ title: 'Đã phê duyệt KC-0249', detail: 'Ngân sách và Cổng minh bạch đã cập nhật.' });
    navigate('dashboard');
  };

  const notify = (title: string, detail: string) => setToast({ title, detail });

  if (view === 'submit' || view === 'extract') {
    return (
      <>
        {view === 'submit' ? (
          <SubmitExpense processing={processing} onBack={() => navigate('dashboard')} onContinue={extract} />
        ) : (
          <ExtractionReview onBack={() => navigate('submit')} onSubmit={sendForReview} />
        )}
        <RoleSwitcher view={view} onNavigate={navigate} />
        <ToastMessage toast={toast} />
      </>
    );
  }

  if (view === 'transparency') {
    return (
      <>
        <TransparencyPortal approved={approved} onBack={() => navigate('dashboard')} onProof={() => setProofOpen(true)} onNotify={notify} />
        <RoleSwitcher view={view} onNavigate={navigate} />
        {proofOpen ? <ProofModal onClose={() => setProofOpen(false)} /> : null}
        <ToastMessage toast={toast} />
      </>
    );
  }

  return (
    <>
      <AdminShell view={view} onNavigate={navigate} mobileMenu={mobileMenu} setMobileMenu={setMobileMenu}>
        {view === 'dashboard' ? <Dashboard approved={approved} onNavigate={navigate} /> : null}
        {view === 'projects' ? <Projects onNavigate={navigate} onCreate={() => setCreateProject(true)} /> : null}
        {view === 'review' ? <ExpenseReview onApprove={approve} onBack={() => navigate('dashboard')} onNotify={notify} /> : null}
        {view === 'report' ? <Report approved={approved} onNavigate={navigate} onExport={() => notify('Đang tạo báo cáo', 'Bản PDF demo sẽ gồm số liệu, tác động và phụ lục chứng từ đã duyệt.')} /> : null}
      </AdminShell>
      <RoleSwitcher view={view} onNavigate={navigate} />
      {createProject ? <CreateProjectModal onClose={() => setCreateProject(false)} onCreate={() => { setCreateProject(false); notify('Đã tạo bản nháp dự án', 'Hai đường dẫn riêng cho người nộp và Sponsor đã sẵn sàng.'); }} /> : null}
      <ToastMessage toast={toast} />
    </>
  );
}

function AdminShell({ view, onNavigate, mobileMenu, setMobileMenu, children }: {
  view: View;
  onNavigate: (view: View) => void;
  mobileMenu: boolean;
  setMobileMenu: (value: boolean) => void;
  children: React.ReactNode;
}) {
  const nav = [
    { label: 'Tổng quan', icon: LayoutDashboard, view: 'dashboard' as View },
    { label: 'Khoản chi', icon: ReceiptText, view: 'review' as View, count: 7 },
    { label: 'Báo cáo', icon: BarChart3, view: 'report' as View },
  ];

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className={`${mobileMenu ? 'fixed inset-y-0 left-0 z-50 flex w-[280px]' : 'hidden'} border-r border-white/10 bg-forest px-5 py-6 text-white lg:static lg:flex lg:w-auto lg:flex-col`}>
          <Brand />
          <button onClick={() => onNavigate('projects')} className="mt-8 flex w-full items-center gap-3 border-y border-white/10 py-4 text-left">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-coral text-xs font-black text-white">TT</span>
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] font-bold uppercase tracking-[.16em] text-white/45">Dự án hiện tại</span>
              <span className="mt-1 block truncate text-sm font-semibold">Trung thu cho em</span>
            </span>
            <ChevronDown size={15} className="text-white/50" />
          </button>

          <nav className="mt-7 space-y-1">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = view === item.view;
              return (
                <button key={item.label} onClick={() => onNavigate(item.view)} className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${active ? 'bg-white text-forest' : 'text-white/65 hover:bg-white/[.06] hover:text-white'}`}>
                  <Icon size={17} strokeWidth={active ? 2.2 : 1.7} />
                  <span className="font-medium">{item.label}</span>
                  {item.count ? <span className="ml-auto rounded-full bg-coral px-2 py-0.5 text-[10px] font-bold text-white">{item.count}</span> : null}
                </button>
              );
            })}
          </nav>

          <div className="mt-7">
            <p className="px-3 text-[10px] font-bold uppercase tracking-[.16em] text-white/35">Chia sẻ dự án</p>
            <button onClick={() => onNavigate('submit')} className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/65 transition hover:bg-white/[.06] hover:text-white"><Link2 size={17} /><span>Link nộp khoản chi</span></button>
            <button onClick={() => onNavigate('transparency')} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/65 transition hover:bg-white/[.06] hover:text-white"><Eye size={17} /><span>Cổng minh bạch</span></button>
          </div>

          <div className="mt-auto pt-8">
            <div className="border-t border-white/10 pt-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-white/80"><span className="status-dot" /> Đang công khai</div>
              <p className="mt-2 text-[11px] leading-5 text-white/42">34 khoản chi đã duyệt đang được Sponsor theo dõi.</p>
            </div>
          </div>
        </aside>

        {mobileMenu ? <button aria-label="Đóng menu" onClick={() => setMobileMenu(false)} className="fixed inset-0 z-40 bg-black/35 lg:hidden" /> : null}

        <section className="min-w-0">
          <header className="flex h-16 items-center justify-between border-b border-line bg-paper px-5 sm:px-8 lg:px-10">
            <button aria-label="Mở menu" onClick={() => setMobileMenu(true)} className="grid h-9 w-9 place-items-center rounded-lg border border-line lg:hidden"><Menu size={18} /></button>
            <div className="hidden items-center gap-2 text-xs text-muted lg:flex"><span>Dự án</span><span>/</span><strong className="text-ink">Trung thu cho em 2026</strong></div>
            <div className="flex items-center gap-2">
              <button onClick={() => onNavigate('transparency')} className="hidden rounded-lg border border-line bg-white px-3.5 py-2 text-xs font-semibold transition hover:border-forest/40 sm:block">Xem bản công khai</button>
              <button onClick={() => onNavigate('submit')} className="rounded-lg bg-forest px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#245346]">+ Nộp khoản chi</button>
              <span className="ml-1 grid h-9 w-9 place-items-center rounded-full bg-sage text-xs font-bold text-forest">BA</span>
            </div>
          </header>
          {children}
        </section>
      </div>
    </main>
  );
}

function Dashboard({ approved, onNavigate }: { approved: boolean; onNavigate: (view: View) => void }) {
  const spent = approved ? 33_100_000 : 31_850_000;
  const remaining = 50_000_000 - spent;
  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <section className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div>
          <div className="mb-3 flex items-center gap-3 text-xs font-semibold text-muted"><span className="border-l-2 border-coral pl-2 text-forest">ĐANG TRIỂN KHAI</span><span>12.08 — 30.09.2026</span></div>
          <h1 className="display-title">Một nơi cho mọi khoản chi.</h1>
          <p className="mt-2 text-sm text-muted">Từ ảnh chuyển khoản đến con số trong báo cáo — không thất lạc, không đoán mò.</p>
        </div>
        <p className="flex items-center gap-2 text-xs text-muted"><span className="status-dot" /> Dữ liệu vừa cập nhật lúc 09:42</p>
      </section>

      {approved ? <div className="mt-6 flex items-start gap-3 border-l-2 border-forest bg-sage/60 px-4 py-3 text-sm text-forest"><CheckCircle2 size={18} className="mt-0.5 shrink-0" /><span><strong>KC-0249 đã được ghi nhận.</strong> Cổng minh bạch vừa cập nhật khoản chi 1.250.000 ₫.</span></div> : null}

      <section className="mt-8 grid border-y border-line sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Tổng tài trợ" value={formatMoney(50_000_000)} note="2 nguồn tài trợ" />
        <Metric label="Đã chi được duyệt" value={formatMoney(spent)} note={`${approved ? 35 : 34} khoản chi`} highlighted />
        <Metric label="Ngân sách còn lại" value={formatMoney(remaining)} note={`${Math.round((remaining / 50_000_000) * 100)}% tổng quỹ`} />
        <Metric label="Chờ quyết định" value={formatMoney(approved ? 3_660_000 : 4_910_000)} note={`${approved ? 6 : 7} khoản chi`} alert />
      </section>

      <section className="mt-10 grid gap-10 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,.55fr)]">
        <div>
          <SectionHeading eyebrow="Ngân sách" title="Mức sử dụng theo cam kết" action="Xem chi tiết" />
          <div className="mt-5 space-y-6">
            {categories.map((category) => {
              const categorySpent = approved && category.name === 'Quà tặng trẻ em' ? category.spent + 1_250_000 : category.spent;
              const percent = Math.round((categorySpent / category.total) * 100);
              return (
                <div key={category.name}>
                  <div className="mb-2 flex items-end justify-between gap-4">
                    <div><p className="text-sm font-semibold">{category.name}</p><p className="mt-1 text-[11px] text-muted">{formatMoney(categorySpent)} / {formatMoney(category.total)}</p></div>
                    <p className="font-serif text-2xl font-semibold tabular-nums">{percent}%</p>
                  </div>
                  <div className="h-1.5 bg-line"><div className="h-full transition-all duration-700" style={{ width: `${percent}%`, background: category.color }} /></div>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="border-l border-line pl-0 xl:pl-8">
          <div className="flex items-center justify-between"><div><p className="eyebrow">BUDGET GUARD</p><h2 className="mt-2 text-lg font-bold">3 việc cần chú ý</h2></div><span className="grid h-10 w-10 place-items-center rounded-full bg-[#f8e4d7] text-coral"><ShieldCheck size={19} /></span></div>
          <div className="mt-5 divide-y divide-line border-y border-line">
            <GuardLine number="02" label="Có khả năng trùng" tone="red" />
            <GuardLine number={approved ? '02' : '03'} label="Gần chạm ngân sách" tone="amber" />
            <GuardLine number="01" label="Sai hạng mục cam kết" tone="blue" />
          </div>
          <button onClick={() => onNavigate('review')} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-forest hover:gap-3">Mở hàng chờ quyết định <ArrowRight size={16} /></button>
        </aside>
      </section>

      <section className="mt-12">
        <SectionHeading eyebrow="Hàng chờ" title="Khoản chi cần quyết định" action="Xem tất cả" onAction={() => onNavigate('review')} />
        <div className="mt-4 overflow-hidden border-y border-line">
          <div className="hidden grid-cols-[92px_1.4fr_1fr_150px_32px] gap-4 border-b border-line py-2 text-[10px] font-bold uppercase tracking-[.12em] text-muted md:grid"><span>Mã</span><span>Khoản chi</span><span>Giá trị</span><span>Trạng thái</span><span /></div>
          {queue.filter((_, index) => !(approved && index === 0)).map((item) => (
            <button key={item.id} onClick={() => onNavigate('review')} className="grid w-full gap-3 border-b border-line py-4 text-left transition last:border-0 hover:bg-white/55 md:grid-cols-[92px_1.4fr_1fr_150px_32px] md:items-center md:gap-4">
              <span className="text-xs font-semibold text-muted">{item.id}</span>
              <span><strong className="block text-sm">{item.title}</strong><span className="mt-1 block text-[11px] text-muted">{item.person} · {item.time} trước</span></span>
              <strong className="text-sm tabular-nums">{formatMoney(item.amount)}</strong>
              <StatusBadge tone={item.tone}>{item.flag}</StatusBadge>
              <ArrowRight size={16} className="hidden text-muted md:block" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function SubmitExpense({ processing, onBack, onContinue }: { processing: boolean; onBack: () => void; onContinue: () => void }) {
  const [mode, setMode] = useState<ProofMode>('both');
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <PublicHeader onBack={onBack} label="Thoát trang nộp" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-9 lg:grid-cols-[.72fr_1.28fr] lg:px-8 lg:py-14">
        <section className="lg:sticky lg:top-8 lg:self-start">
          <p className="eyebrow flex items-center gap-2"><ShieldCheck size={14} /> KHÔNG CẦN TÀI KHOẢN</p>
          <h1 className="mt-4 font-serif text-[42px] font-semibold leading-[1.03] tracking-[-.045em] text-forest sm:text-[54px]">Chi xong,<br />nộp ngay.</h1>
          <p className="mt-5 max-w-sm text-sm leading-6 text-muted">Bạn gửi bằng chứng. AI hỗ trợ nhập liệu. Lead vẫn là người kiểm tra và quyết định cuối cùng.</p>
          <div className="mt-8 border-y border-line py-5">
            <p className="text-[10px] font-bold uppercase tracking-[.13em] text-muted">Đang nộp cho dự án</p>
            <div className="mt-3 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-forest text-xs font-black text-white">TT</span><div><p className="font-bold">Trung thu cho em 2026</p><p className="mt-0.5 text-xs text-muted">Nhóm Nắng Ấm · TTCE-2026</p></div></div>
          </div>
          <div className="mt-5 flex items-start gap-3 text-xs leading-5 text-muted"><LockKeyhole size={16} className="mt-0.5 shrink-0 text-forest" /><p>Ảnh gốc chỉ Lead xem. Bản công khai sẽ tự che số tài khoản, mã giao dịch và dữ liệu cá nhân.</p></div>
        </section>

        <section className="border border-line bg-paper p-5 shadow-[0_22px_70px_rgb(21_51_43/7%)] sm:p-8">
          <div className="flex items-start justify-between gap-4 border-b border-line pb-5"><div><p className="eyebrow">BƯỚC 1 / 2</p><h2 className="mt-2 text-2xl font-bold tracking-[-.03em]">Thông tin khoản chi</h2></div><span className="text-xs text-muted">≈ 1 phút</span></div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <InputField label="Người gửi" value="Nguyễn Minh Anh" icon={<UserRound size={15} />} />
            <InputField label="Người thanh toán" value="Nguyễn Minh Anh" icon={<UserRound size={15} />} />
            <InputField label="Khoản chi dùng cho hoạt động" value="Đêm hội Trung thu 30/09" icon={<FolderKanban size={15} />} wide />
            <InputField label="Mục đích khoản chi" value="Mua tập vẽ và bút màu cho 40 em" icon={<FileText size={15} />} wide />
            <SelectField label="Hạng mục dự kiến" value="Quà tặng trẻ em" />
            <SelectField label="Nguồn tài trợ dự kiến" value="Quỹ Vì Trẻ Em" />
          </div>

          <div className="mt-7">
            <p className="text-xs font-bold">Bạn đang có loại bằng chứng nào?</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <ProofChoice active={mode === 'transfer'} onClick={() => setMode('transfer')} label="Chuyển khoản" />
              <ProofChoice active={mode === 'invoice'} onClick={() => setMode('invoice')} label="Hóa đơn" />
              <ProofChoice active={mode === 'both'} onClick={() => setMode('both')} label="Cả hai" recommended />
            </div>
          </div>

          <div className={`mt-4 grid gap-3 ${mode === 'both' ? 'md:grid-cols-2' : ''}`}>
            {mode !== 'invoice' ? <UploadSlot icon={<Banknote size={20} />} title="Ảnh chuyển khoản" detail="MB Bank · 1.250.000 ₫" ready /> : null}
            {mode !== 'transfer' ? <UploadSlot icon={<ReceiptText size={20} />} title="Bill / hóa đơn" detail="FAHASA · JPG" ready /> : null}
          </div>

          {mode !== 'both' ? <div className="mt-3 flex items-start gap-2 bg-[#fff1e8] px-3 py-2.5 text-[11px] leading-5 text-[#8c4c2e]"><AlertCircle size={15} className="mt-0.5 shrink-0" /> Vẫn có thể gửi một loại bằng chứng. Lead sẽ yêu cầu bổ sung nếu chưa đủ để đối chiếu.</div> : null}

          <label className="mt-5 flex items-start gap-3 border-t border-line pt-4"><input defaultChecked type="checkbox" className="mt-0.5 h-4 w-4 accent-[#1a4a3d]" /><span className="text-xs leading-5 text-muted">Tôi xác nhận thông tin thuộc dự án này và đồng ý để Lead sử dụng cho đối soát, báo cáo.</span></label>
          <button disabled={processing} onClick={onContinue} className="mt-6 flex w-full items-center justify-center gap-2 bg-forest py-3.5 text-sm font-bold text-white transition hover:bg-[#245346] disabled:cursor-wait disabled:opacity-75">
            {processing ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/25 border-t-white" /> Đang đọc và đối chiếu...</> : <>Đọc & đối chiếu bằng AI <Sparkles size={16} /></>}
          </button>
        </section>
      </div>
    </main>
  );
}

function ExtractionReview({ onBack, onSubmit }: { onBack: () => void; onSubmit: () => void }) {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <PublicHeader onBack={onBack} label="Chỉnh lại ảnh" />
      <div className="mx-auto max-w-7xl px-5 py-9 lg:px-8 lg:py-12">
        <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-end">
          <div><p className="eyebrow flex items-center gap-2"><CheckCircle2 size={14} /> HOÀN TẤT TRONG 1,3 GIÂY</p><h1 className="mt-3 display-title">AI đã đọc. Bạn xác nhận.</h1><p className="mt-2 text-sm text-muted">Không có dữ liệu nào được ghi nhận trước khi bạn và Lead kiểm tra.</p></div>
          <Confidence score="94%" />
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <section>
            <p className="eyebrow">01 — BẰNG CHỨNG GỐC</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <TransferProof compact />
              <InvoiceProof compact />
            </div>
          </section>

          <section className="border border-line bg-paper p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4"><div><p className="eyebrow">02 — DỮ LIỆU CHUẨN HÓA</p><h2 className="mt-2 text-xl font-bold">Một khoản chi, hai bằng chứng</h2></div><span className="rounded-full bg-sage px-3 py-1.5 text-[10px] font-bold text-forest">ĐÃ ĐỐI CHIẾU</span></div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <DataField label="Đơn vị nhận" value="Nhà sách FAHASA" score="98%" />
              <DataField label="Ngày giao dịch" value="28/08/2026 · 18:42" score="96%" />
              <DataField label="Tổng tiền" value="1.250.000 ₫" score="99%" strong />
              <DataField label="Mã hóa đơn" value="HD-028491" score="87%" caution />
              <DataField label="Hạng mục gợi ý" value="Quà tặng trẻ em" score="91%" />
              <DataField label="Nguồn tài trợ" value="Quỹ Vì Trẻ Em" score="88%" caution />
            </div>

            <div className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-3">
              <MatchDatum label="Số tiền" left="1.250.000" right="1.250.000" />
              <MatchDatum label="Thời gian" left="18:41" right="18:42" note="Lệch 1 phút" />
              <MatchDatum label="Người nhận" left="FAHASA" right="FAHASA" />
            </div>

            <div className="mt-5 flex items-start gap-3 border-l-2 border-coral bg-[#fff3eb] px-4 py-3"><AlertCircle size={18} className="mt-0.5 shrink-0 text-coral" /><div><p className="text-sm font-bold">Cần Lead kiểm tra hạng mục</p><p className="mt-1 text-xs leading-5 text-[#765b4e]">Sau khoản chi này, “Quà tặng trẻ em” sẽ dùng 86% ngân sách cam kết.</p></div></div>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><button onClick={onBack} className="border border-line bg-white px-5 py-3 text-sm font-semibold">Chỉnh lại</button><button onClick={onSubmit} className="flex items-center justify-center gap-2 bg-forest px-5 py-3 text-sm font-bold text-white">Xác nhận & gửi Lead <ArrowRight size={16} /></button></div>
          </section>
        </div>
      </div>
    </main>
  );
}

function ExpenseReview({ onApprove, onBack, onNotify }: { onApprove: () => void; onBack: () => void; onNotify: (title: string, detail: string) => void }) {
  const [decision, setDecision] = useState<'approve' | 'more' | 'reject'>('approve');
  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <button onClick={onBack} className="flex items-center gap-2 text-xs font-semibold text-muted"><ArrowLeft size={14} /> Hàng chờ quyết định</button>
      <div className="mt-6 flex flex-col justify-between gap-5 border-b border-line pb-6 xl:flex-row xl:items-end">
        <div><div className="flex items-center gap-3"><StatusBadge tone="amber">Cần đối chiếu</StatusBadge><span className="text-xs text-muted">KC-0249 · chờ 4 phút</span></div><h1 className="mt-3 display-title">Tập vẽ & bút màu</h1><p className="mt-2 text-sm text-muted">Kiểm tra bằng chứng, dữ liệu AI và tác động ngân sách trước khi quyết định.</p></div>
        <div className="flex gap-2"><button className="border border-line bg-white px-3 py-2 text-xs font-semibold"><MoreHorizontal size={16} /></button><button className="border border-line bg-white px-3.5 py-2 text-xs font-semibold">Lịch sử chỉnh sửa</button></div>
      </div>

      <div className="mt-7 grid gap-7 2xl:grid-cols-[minmax(0,.95fr)_minmax(500px,1.05fr)]">
        <section>
          <div className="flex items-center justify-between"><p className="eyebrow">BẰNG CHỨNG GỐC · CHỈ ADMIN</p><button className="flex items-center gap-1.5 text-xs font-semibold text-forest"><Eye size={14} /> Xem toàn màn hình</button></div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2"><TransferProof /><InvoiceProof /></div>
          <div className="mt-4 flex items-start gap-3 bg-sage/55 px-4 py-3 text-xs leading-5 text-forest"><BadgeCheck size={17} className="mt-0.5 shrink-0" /><p><strong>AI đối chiếu:</strong> số tiền và người nhận trùng khớp; thời gian lệch 1 phút trong ngưỡng chấp nhận.</p></div>
        </section>

        <section className="space-y-6">
          <div>
            <div className="flex items-center justify-between"><div><p className="eyebrow">KHOẢN CHI ĐÃ CHUẨN HÓA</p><h2 className="mt-2 text-xl font-bold">KC-0249</h2></div><Confidence score="94%" /></div>
            <div className="mt-4 grid gap-px border border-line bg-line sm:grid-cols-2">
              <ReviewDatum label="Người gửi" value="Nguyễn Minh Anh" />
              <ReviewDatum label="Ngày giao dịch" value="28/08/2026" />
              <ReviewDatum label="Tổng tiền" value="1.250.000 ₫" strong />
              <ReviewDatum label="Hạng mục" value="Quà tặng trẻ em" />
              <ReviewDatum label="Nguồn tài trợ" value="Quỹ Vì Trẻ Em" />
              <ReviewDatum label="Hoạt động" value="Đêm hội Trung thu 30/09" />
            </div>
          </div>

          <div className="border-l-2 border-coral bg-[#fff3eb] p-4">
            <p className="eyebrow text-coral">TÁC ĐỘNG NẾU PHÊ DUYỆT</p>
            <div className="mt-4 grid grid-cols-3 gap-3"><ImpactStat label="Trước duyệt" value="3,80 tr" /><ImpactStat label="Khoản này" value="−1,25 tr" emphasis /><ImpactStat label="Còn lại" value="2,55 tr" /></div>
            <p className="mt-4 text-xs text-[#765b4e]">Hạng mục đạt <strong>86%</strong> ngân sách. Chưa vượt giới hạn nhưng cần theo dõi.</p>
          </div>

          <div className="border-t border-line pt-5">
            <p className="text-xs font-bold">Quyết định của Lead</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <Decision active={decision === 'approve'} onClick={() => setDecision('approve')} label="Phê duyệt" icon={<Check size={15} />} />
              <Decision active={decision === 'more'} onClick={() => setDecision('more')} label="Bổ sung" icon={<Clock3 size={15} />} />
              <Decision active={decision === 'reject'} onClick={() => setDecision('reject')} label="Từ chối" icon={<X size={15} />} danger />
            </div>
            <textarea aria-label="Ghi chú cho người gửi" className="mt-3 min-h-20 w-full resize-none border border-line bg-white p-3 text-sm outline-none focus:border-forest" placeholder="Ghi chú cho người gửi (không bắt buộc)" />
            <button onClick={decision === 'approve' ? onApprove : () => onNotify(decision === 'more' ? 'Đã yêu cầu bổ sung' : 'Đã từ chối khoản chi', decision === 'more' ? 'Người gửi sẽ nhận được đường dẫn cập nhật chứng từ.' : 'Khoản chi không được ghi nhận vào ngân sách.')} className={`mt-3 w-full py-3.5 text-sm font-bold text-white ${decision === 'reject' ? 'bg-[#9c4539]' : 'bg-forest'}`}>{decision === 'approve' ? 'Phê duyệt & cập nhật ngân sách' : decision === 'more' ? 'Gửi yêu cầu bổ sung' : 'Xác nhận từ chối'}</button>
          </div>
        </section>
      </div>
    </div>
  );
}

function TransparencyPortal({ approved, onBack, onProof, onNotify }: { approved: boolean; onBack: () => void; onProof: () => void; onNotify: (title: string, detail: string) => void }) {
  const spent = approved ? 33_100_000 : 31_850_000;
  return (
    <main className="min-h-screen bg-[#f7f4ec] text-ink">
      <header className="border-b border-line bg-paper"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8"><Brand dark /><div className="flex items-center gap-4"><span className="hidden items-center gap-2 text-xs text-muted sm:flex"><span className="status-dot" /> Dữ liệu được cập nhật trực tiếp</span><button onClick={onBack} className="border border-line px-3 py-2 text-xs font-semibold">Về trang quản trị</button></div></div></header>
      <section className="bg-forest text-white"><div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16"><p className="flex items-center gap-2 text-xs font-semibold text-white/65"><BadgeCheck size={15} /> ĐÃ XÁC NHẬN BỞI NHÓM NẮNG ẤM</p><div className="mt-5 flex flex-col justify-between gap-7 lg:flex-row lg:items-end"><div><h1 className="font-serif text-[42px] font-semibold tracking-[-.045em] sm:text-[58px]">Trung thu cho em 2026</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">Theo dõi tiền tài trợ đã được sử dụng thế nào — mọi con số đều truy ngược về khoản chi được Lead phê duyệt.</p></div><div className="flex gap-2"><button onClick={() => onNotify('Đã sao chép đường dẫn', 'Bạn có thể gửi đường dẫn công khai này cho Sponsor.')} className="flex items-center gap-2 border border-white/20 px-4 py-2.5 text-xs font-semibold"><Copy size={15} /> Sao chép link</button><button className="flex items-center gap-2 bg-coral px-4 py-2.5 text-xs font-bold text-white"><Download size={15} /> Báo cáo công khai</button></div></div></div></section>

      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-12">
        <section className="grid border-y border-line sm:grid-cols-3">
          <PublicMetric label="Đã nhận" value="50.000.000 ₫" note="Từ 2 nguồn tài trợ" />
          <PublicMetric label="Đã sử dụng" value={formatMoney(spent)} note={`${approved ? 35 : 34} khoản chi được duyệt`} accent />
          <PublicMetric label="Còn lại" value={formatMoney(50_000_000 - spent)} note="Sẵn sàng cho hoạt động tiếp theo" />
        </section>

        <section className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
          <div><SectionHeading eyebrow="PHÂN BỔ" title="Tiền đã đi đâu?" /><div className="mt-6 space-y-6">{categories.map((category) => <div key={category.name}><div className="mb-2 flex justify-between gap-4 text-sm"><span className="font-semibold">{category.name}</span><strong>{formatMoney(category.spent)} · {Math.round(category.spent / spent * 100)}%</strong></div><div className="h-1.5 bg-line"><div className="h-full" style={{ width: `${Math.round(category.spent / spent * 100)}%`, background: category.color }} /></div></div>)}</div></div>
          <div className="border-l border-line pl-0 lg:pl-8"><p className="eyebrow">DẤU VẾT MINH BẠCH</p><h2 className="mt-2 text-xl font-bold">Từ nguồn tiền đến bằng chứng</h2><div className="mt-6"><Trail label="Nguồn tài trợ" value="Quỹ Vì Trẻ Em" /><Trail label="Hạng mục" value="Quà tặng trẻ em" /><Trail label="Hoạt động" value="Đêm hội 30/09" /><Trail label="Bằng chứng" value={`${approved ? 24 : 23} bộ chứng từ đã duyệt`} last /></div></div>
        </section>

        <section className="mt-14">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><SectionHeading eyebrow="SỔ CÔNG KHAI" title="Các khoản chi đã xác minh" /><div className="flex items-center gap-2 border-b border-line px-1 py-2"><Search size={14} className="text-muted" /><span className="text-xs text-muted">Tìm theo nội dung</span></div></div>
          <div className="mt-4 border-y border-line">{approved ? <TransactionRow date="29.08" title="Tập vẽ & bút màu" category="Quà tặng trẻ em" amount={1_250_000} onClick={onProof} fresh /> : null}{transactions.map((item) => <TransactionRow key={item.title} {...item} onClick={onProof} />)}</div>
        </section>
      </div>
      <footer className="border-t border-line py-7"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-5 text-xs text-muted sm:flex-row lg:px-8"><span>Dữ liệu do Nhóm Nắng Ấm chịu trách nhiệm phê duyệt.</span><span>Bằng chứng công khai đã được che thông tin nhạy cảm.</span></div></footer>
    </main>
  );
}

function Projects({ onNavigate, onCreate }: { onNavigate: (view: View) => void; onCreate: () => void }) {
  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <div className="flex flex-col justify-between gap-5 border-b border-line pb-6 sm:flex-row sm:items-end"><div><p className="eyebrow">KHÔNG GIAN CỦA BẢO ANH</p><h1 className="mt-3 display-title">Các dự án</h1><p className="mt-2 text-sm text-muted">Mỗi dự án có ngân sách, hàng chờ và hai đường dẫn chia sẻ riêng.</p></div><button onClick={onCreate} className="flex items-center justify-center gap-2 bg-forest px-4 py-3 text-sm font-bold text-white"><Plus size={16} /> Tạo dự án</button></div>
      <div className="mt-8 grid gap-4 xl:grid-cols-2"><ProjectCard title="Trung thu cho em 2026" status="Đang triển khai" amount="50.000.000 ₫" expenses="41 khoản chi" onClick={() => onNavigate('dashboard')} /><ProjectCard title="Áo ấm vùng cao" status="Đã hoàn thành" amount="28.400.000 ₫" expenses="32 khoản chi" muted /></div>
      <section className="mt-10 border-t border-line pt-7"><SectionHeading eyebrow="CHIA SẺ" title="Hai đường dẫn, hai mục đích" /><p className="mt-2 text-sm text-muted">Không dùng chung QR nộp khoản chi với đường dẫn minh bạch cho Sponsor.</p><div className="mt-5 grid gap-3 lg:grid-cols-2"><LinkCard title="Nộp khoản chi" href="minhbach.app/nop/TTCE-2026" description="Gửi vào nhóm nội bộ. Thành viên không cần tài khoản." /><LinkCard title="Cổng minh bạch" href="minhbach.app/p/TTCE-2026" description="Gửi Sponsor. Chỉ hiển thị dữ liệu đã duyệt và được che nhạy cảm." publicLink /></div></section>
    </div>
  );
}

function Report({ approved, onNavigate, onExport }: { approved: boolean; onNavigate: (view: View) => void; onExport: () => void }) {
  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <div className="flex flex-col justify-between gap-5 border-b border-line pb-6 sm:flex-row sm:items-end"><div><p className="eyebrow">BÁO CÁO MỘT CHẠM</p><h1 className="mt-3 display-title">Từ khoản chi tới tác động.</h1><p className="mt-2 text-sm text-muted">Chỉ sử dụng dữ liệu đã được Lead phê duyệt.</p></div><button onClick={onExport} className="flex items-center justify-center gap-2 bg-forest px-4 py-3 text-sm font-bold text-white"><Download size={16} /> Xuất bản PDF</button></div>
      <div className="mt-8 grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
        <section className="border border-line bg-paper p-6 sm:p-8"><div className="flex items-center justify-between border-b border-line pb-5"><Brand dark /><span className="text-[10px] font-bold uppercase tracking-[.12em] text-forest">Bản nháp tự động</span></div><p className="mt-8 eyebrow">TRUNG THU CHO EM 2026</p><h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-.035em] text-forest">Báo cáo tài chính & tác động</h2><p className="mt-2 text-xs text-muted">Cập nhật ngày 29/08/2026 · Số liệu đã đối soát</p><div className="mt-8 grid border-y border-line sm:grid-cols-3"><ReportStat label="Tài trợ" value="50 triệu" /><ReportStat label="Đã sử dụng" value={approved ? '33,1 triệu' : '31,85 triệu'} /><ReportStat label="Người hưởng lợi" value="120 em" /></div><div className="mt-9 border-l-2 border-coral pl-5"><p className="eyebrow">DÒNG TIỀN TẠO RA ĐIỀU GÌ?</p><p className="mt-3 max-w-2xl font-serif text-2xl font-semibold leading-snug text-forest">120 phần quà học tập, một đêm hội và một hành trình có thể chứng minh bằng từng khoản chi.</p></div></section>
        <section><p className="eyebrow">MỨC ĐỘ SẴN SÀNG</p><div className="mt-3 divide-y divide-line border-y border-line"><ReadyLine label="Khoản chi đã duyệt" value={approved ? '35 / 41' : '34 / 41'} done /><ReadyLine label="Cần bổ sung bằng chứng" value="2" /><ReadyLine label="Hạng mục đã đối soát" value="3 / 3" done /><ReadyLine label="Thông tin tác động" value="Đã nhập" done /></div><button onClick={() => onNavigate('transparency')} className="mt-6 flex w-full items-center justify-between border border-forest/20 bg-sage/55 p-4 text-left"><span><strong className="block text-sm text-forest">Xem trước bản công khai</strong><span className="mt-1 block text-xs text-muted">Kiểm tra trải nghiệm Sponsor.</span></span><ExternalLink size={17} className="text-forest" /></button></section>
      </div>
    </div>
  );
}

function Brand({ dark = false }: { dark?: boolean }) {
  return <div className="flex items-center gap-3"><div className={`grid h-9 w-9 place-items-center rounded-full border text-sm font-black ${dark ? 'border-forest bg-forest text-white' : 'border-white/25 bg-white text-forest'}`}>MB</div><div><p className={`text-[15px] font-bold tracking-[-.02em] ${dark ? 'text-forest' : 'text-white'}`}>Minh Bạch</p><p className={`text-[10px] ${dark ? 'text-muted' : 'text-white/45'}`}>Tài chính cộng đồng</p></div></div>;
}

function PublicHeader({ onBack, label }: { onBack: () => void; label: string }) {
  return <header className="border-b border-line bg-paper"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8"><Brand dark /><button onClick={onBack} className="flex items-center gap-2 border-b border-transparent py-2 text-xs font-semibold text-muted hover:border-ink hover:text-ink"><ArrowLeft size={14} /> {label}</button></div></header>;
}

function RoleSwitcher({ view, onNavigate }: { view: View; onNavigate: (view: View) => void }) {
  const roles = [
    { label: 'Lead', view: 'dashboard' as View, icon: ShieldCheck },
    { label: 'Người nộp', view: 'submit' as View, icon: UploadCloud },
    { label: 'Sponsor', view: 'transparency' as View, icon: Eye },
  ];
  return <div className="fixed bottom-4 left-1/2 z-[70] -translate-x-1/2 border border-line bg-paper/95 p-1 shadow-[0_16px_50px_rgb(21_51_43/18%)] backdrop-blur"><div className="flex items-center">{roles.map((role) => { const Icon = role.icon; const active = role.view === view || (role.view === 'dashboard' && ['projects', 'review', 'report'].includes(view)); return <button key={role.label} onClick={() => onNavigate(role.view)} className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-bold transition ${active ? 'bg-forest text-white' : 'text-muted hover:text-ink'}`}><Icon size={13} /> {role.label}</button>; })}</div></div>;
}

function ToastMessage({ toast }: { toast: Toast }) {
  if (!toast) return null;
  return <div role="status" className="fixed right-4 top-4 z-[90] flex max-w-sm items-start gap-3 border border-forest/20 bg-paper p-4 shadow-[0_20px_60px_rgb(21_51_43/16%)]"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sage text-forest"><Check size={16} /></span><div><p className="text-sm font-bold">{toast.title}</p><p className="mt-1 text-xs leading-5 text-muted">{toast.detail}</p></div></div>;
}

function SectionHeading({ eyebrow, title, action, onAction }: { eyebrow: string; title: string; action?: string; onAction?: () => void }) {
  return <div className="flex items-end justify-between gap-4"><div><p className="eyebrow">{eyebrow}</p><h2 className="mt-2 text-xl font-bold tracking-[-.025em]">{title}</h2></div>{action ? <button onClick={onAction} className="text-xs font-bold text-forest">{action} →</button> : null}</div>;
}

function Metric({ label, value, note, highlighted, alert }: { label: string; value: string; note: string; highlighted?: boolean; alert?: boolean }) {
  return <article className={`relative border-b border-line px-0 py-5 sm:px-5 xl:border-b-0 xl:border-r first:sm:pl-0 last:border-r-0 ${highlighted ? 'bg-sage/40' : ''}`}><div className="flex items-center gap-2"><p className="eyebrow">{label}</p>{alert ? <span className="h-1.5 w-1.5 rounded-full bg-coral" /> : null}</div><p className="mt-3 text-[24px] font-bold tracking-[-.045em] tabular-nums sm:text-[27px]">{value}</p><p className="mt-1 text-[11px] text-muted">{note}</p></article>;
}

function GuardLine({ number, label, tone }: { number: string; label: string; tone: string }) {
  const color = tone === 'red' ? 'text-[#a44a3f]' : tone === 'amber' ? 'text-[#b66b35]' : 'text-[#587695]';
  return <div className="flex items-center gap-4 py-3.5"><strong className={`font-serif text-xl ${color}`}>{number}</strong><span className="text-sm font-medium">{label}</span><ArrowRight size={14} className="ml-auto text-muted" /></div>;
}

function StatusBadge({ tone, children }: { tone: string; children: React.ReactNode }) {
  const style = tone === 'red' ? 'bg-[#f6ded9] text-[#994138]' : tone === 'amber' ? 'bg-[#f9e8d8] text-[#995629]' : 'bg-sage text-forest';
  return <span className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-bold ${style}`}>{children}</span>;
}

function InputField({ label, value, icon, wide }: { label: string; value: string; icon: React.ReactNode; wide?: boolean }) {
  return <label className={wide ? 'sm:col-span-2' : ''}><span className="mb-2 block text-xs font-semibold">{label}</span><div className="flex items-center gap-2 border-b border-line bg-white px-3 py-3 text-sm"><span className="text-muted">{icon}</span><span>{value}</span></div></label>;
}

function SelectField({ label, value }: { label: string; value: string }) {
  return <label><span className="mb-2 block text-xs font-semibold">{label}</span><div className="flex items-center justify-between border-b border-line bg-white px-3 py-3 text-sm"><span>{value}</span><ChevronDown size={14} className="text-muted" /></div></label>;
}

function ProofChoice({ active, onClick, label, recommended }: { active: boolean; onClick: () => void; label: string; recommended?: boolean }) {
  return <button onClick={onClick} className={`relative border px-2 py-3 text-xs font-semibold transition ${active ? 'border-forest bg-forest text-white' : 'border-line bg-white text-muted hover:border-forest/45'}`}>{label}{recommended ? <span className={`absolute -top-2 right-1 text-[8px] font-bold uppercase tracking-wide ${active ? 'text-[#f7c7ac]' : 'text-coral'}`}>Nên có</span> : null}</button>;
}

function UploadSlot({ icon, title, detail, ready }: { icon: React.ReactNode; title: string; detail: string; ready?: boolean }) {
  return <button className="flex min-h-36 flex-col items-center justify-center border border-dashed border-forest/30 bg-[#f4f6f1] px-4 text-center transition hover:border-forest"><span className="text-forest">{icon}</span><strong className="mt-3 text-sm">{title}</strong><span className="mt-1 text-[11px] text-muted">{detail}</span>{ready ? <span className="mt-3 flex items-center gap-1 text-[10px] font-bold text-forest"><CheckCircle2 size={12} /> Đã tải lên</span> : null}</button>;
}

function Confidence({ score }: { score: string }) {
  return <div className="flex items-center gap-2"><span className="text-[10px] font-bold uppercase tracking-[.1em] text-muted">Độ tin cậy</span><strong className="font-serif text-2xl text-forest">{score}</strong></div>;
}

function TransferProof({ compact }: { compact?: boolean }) {
  return <div className={`proof-panel bg-[#e9f1ed] ${compact ? 'min-h-[300px] p-4' : 'min-h-[420px] p-5'}`}><div className="flex items-center justify-between"><span className="eyebrow">ẢNH CHUYỂN KHOẢN</span><RotateCcw size={14} className="text-muted" /></div><div className="mx-auto mt-4 max-w-[280px] overflow-hidden rounded-[22px] bg-white shadow-[0_14px_35px_rgb(25_48_41/12%)]"><div className="bg-[#8b2b53] px-5 py-3 text-[10px] font-bold text-white">MB BANK · GIAO DỊCH THÀNH CÔNG</div><div className="px-5 py-6 text-center"><CheckCircle2 size={34} className="mx-auto text-[#2a8a68]" /><p className="mt-3 text-[10px] uppercase tracking-[.12em] text-muted">Số tiền</p><p className="mt-1 text-2xl font-black">1.250.000 ₫</p><div className="mt-5 space-y-3 border-t border-line pt-4 text-left text-[11px]"><ProofLine label="Đến tài khoản" value="NHÀ SÁCH FAHASA" /><ProofLine label="Nội dung" value="TTCE TAP VE BUT MAU" /><ProofLine label="Thời gian" value="28/08/2026 · 18:41" /><ProofLine label="Mã giao dịch" value="FT26341••••" /></div></div></div></div>;
}

function InvoiceProof({ compact }: { compact?: boolean }) {
  return <div className={`proof-panel bg-[#ecebe5] ${compact ? 'min-h-[300px] p-4' : 'min-h-[420px] p-5'}`}><div className="flex items-center justify-between"><span className="eyebrow">BILL / HÓA ĐƠN</span><RotateCcw size={14} className="text-muted" /></div><div className="mx-auto mt-4 max-w-[280px] rotate-[-.8deg] bg-[#fffdf6] px-5 py-6 font-mono text-[#414542] shadow-[0_14px_35px_rgb(25_48_41/12%)]"><p className="text-center text-base font-black">NHÀ SÁCH FAHASA</p><p className="mt-1 text-center text-[8px]">60–62 Lê Lợi, Quận 1, TP.HCM</p><div className="my-4 border-t border-dashed border-[#9b9d99]" /><p className="text-center text-[11px] font-bold">HÓA ĐƠN BÁN HÀNG</p><div className="mt-4 space-y-2 text-[9px]"><ProofLine label="Ngày" value="28/08/2026 18:42" /><ProofLine label="Số HĐ" value="HD-028491" /></div><div className="my-4 border-t border-dashed border-[#9b9d99]" /><div className="space-y-3 text-[9px]"><ProofLine label="Tập vẽ A4 × 40" value="720.000" /><ProofLine label="Bút màu × 20" value="530.000" /></div><div className="my-4 border-t border-dashed border-[#9b9d99]" /><div className="flex justify-between text-[11px] font-black"><span>TỔNG CỘNG</span><span>1.250.000 ₫</span></div><div className="mt-6 h-7 bg-[repeating-linear-gradient(90deg,#333_0,#333_2px,transparent_2px,transparent_5px)]" /></div></div>;
}

function ProofLine({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between gap-3"><span className="text-muted">{label}</span><strong className="text-right">{value}</strong></div>;
}

function DataField({ label, value, score, strong, caution }: { label: string; value: string; score: string; strong?: boolean; caution?: boolean }) {
  return <label><span className="mb-2 flex justify-between gap-3 text-[11px] font-semibold"><span>{label}</span><span className={caution ? 'text-coral' : 'text-forest'}>{score}</span></span><div className={`border-b bg-white px-3 py-3 text-sm ${caution ? 'border-coral' : 'border-line'} ${strong ? 'font-black text-forest' : ''}`}>{value}</div></label>;
}

function MatchDatum({ label, left, right, note }: { label: string; left: string; right: string; note?: string }) {
  return <div className="bg-white p-3"><div className="flex items-center justify-between"><p className="text-[10px] font-bold uppercase tracking-[.1em] text-muted">{label}</p><Check size={13} className="text-forest" /></div><p className="mt-2 text-xs font-semibold">{left} ↔ {right}</p>{note ? <p className="mt-1 text-[9px] text-coral">{note}</p> : null}</div>;
}

function ReviewDatum({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return <div className="bg-white p-3.5"><p className="text-[9px] font-bold uppercase tracking-[.12em] text-muted">{label}</p><p className={`mt-1.5 text-sm ${strong ? 'font-black text-forest' : 'font-semibold'}`}>{value}</p></div>;
}

function ImpactStat({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) {
  return <div><p className="text-[9px] font-bold uppercase tracking-[.1em] text-muted">{label}</p><p className={`mt-1 text-lg font-black ${emphasis ? 'text-coral' : ''}`}>{value}</p></div>;
}

function Decision({ active, onClick, label, icon, danger }: { active: boolean; onClick: () => void; label: string; icon: React.ReactNode; danger?: boolean }) {
  return <button onClick={onClick} className={`flex items-center justify-center gap-2 border px-2 py-2.5 text-xs font-bold ${active ? danger ? 'border-[#9c4539] bg-[#f8e4df] text-[#8e3e34]' : 'border-forest bg-sage text-forest' : 'border-line bg-white text-muted'}`}>{icon}{label}</button>;
}

function PublicMetric({ label, value, note, accent }: { label: string; value: string; note: string; accent?: boolean }) {
  return <article className={`border-b border-line px-0 py-6 sm:border-b-0 sm:border-r sm:px-6 first:sm:pl-0 last:border-r-0 ${accent ? 'bg-sage/40' : ''}`}><p className="eyebrow">{label}</p><p className="mt-3 text-[26px] font-black tracking-[-.04em]">{value}</p><p className="mt-1 text-xs text-muted">{note}</p></article>;
}

function Trail({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return <div className="relative flex gap-3"><div className="flex flex-col items-center"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-coral ring-4 ring-[#f6e4da]" />{!last ? <span className="mt-1 h-full w-px bg-line" /> : null}</div><div className={last ? '' : 'pb-6'}><p className="eyebrow">{label}</p><p className="mt-1 text-sm font-semibold">{value}</p></div></div>;
}

function TransactionRow({ date, title, category, amount, onClick, fresh }: { date: string; title: string; category: string; amount: number; onClick: () => void; fresh?: boolean }) {
  return <button onClick={onClick} className={`grid w-full gap-3 border-b border-line py-4 text-left transition last:border-b-0 hover:bg-white/60 sm:grid-cols-[72px_1fr_auto_auto] sm:items-center sm:gap-5 ${fresh ? 'bg-sage/35' : ''}`}><span className="text-xs font-semibold text-muted">{date}</span><span><span className="flex items-center gap-2 text-sm font-bold">{title}{fresh ? <span className="text-[8px] font-black uppercase tracking-wider text-coral">Mới</span> : null}</span><span className="mt-1 block text-[11px] text-muted">{category}</span></span><strong className="text-sm tabular-nums">{formatMoney(amount)}</strong><span className="flex items-center gap-1.5 text-[10px] font-bold text-forest"><FileCheck2 size={14} /> Xem bằng chứng</span></button>;
}

function ProjectCard({ title, status, amount, expenses, onClick, muted }: { title: string; status: string; amount: string; expenses: string; onClick?: () => void; muted?: boolean }) {
  return <button onClick={onClick} className={`group border p-6 text-left transition ${muted ? 'border-line bg-[#f1efe8] opacity-65' : 'border-forest/25 bg-paper hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgb(21_51_43/8%)]'}`}><div className="flex items-center justify-between"><FolderKanban size={20} className="text-forest" /><StatusBadge tone={muted ? 'green' : 'amber'}>{status}</StatusBadge></div><h2 className="mt-8 font-serif text-2xl font-semibold text-forest">{title}</h2><p className="mt-1 text-xs text-muted">Nhóm Nắng Ấm</p><div className="mt-6 flex items-end justify-between border-t border-line pt-4"><div><p className="eyebrow">TỔNG TÀI TRỢ</p><p className="mt-1 text-lg font-black">{amount}</p></div><span className="flex items-center gap-2 text-xs font-semibold text-muted">{expenses} <ArrowRight size={14} /></span></div></button>;
}

function LinkCard({ title, href, description, publicLink }: { title: string; href: string; description: string; publicLink?: boolean }) {
  return <div className="border border-line bg-paper p-4"><div className="flex gap-4"><div className="shrink-0 bg-white p-2 ring-1 ring-line"><QRCodeSVG value={`https://${href}`} size={68} bgColor="#ffffff" fgColor={publicLink ? '#d96f3d' : '#173f34'} /></div><div className="min-w-0"><div className="flex items-center gap-2"><p className="text-sm font-bold">{title}</p>{publicLink ? <span className="text-[8px] font-black uppercase tracking-wider text-coral">Công khai</span> : null}</div><p className="mt-1 truncate text-xs font-semibold text-forest">{href}</p><p className="mt-2 text-[11px] leading-4 text-muted">{description}</p></div></div></div>;
}

function ReportStat({ label, value }: { label: string; value: string }) {
  return <div className="border-b border-line px-0 py-5 sm:border-b-0 sm:border-r sm:px-5 first:sm:pl-0 last:border-r-0"><p className="eyebrow">{label}</p><p className="mt-2 text-xl font-black text-forest">{value}</p></div>;
}

function ReadyLine({ label, value, done }: { label: string; value: string; done?: boolean }) {
  return <div className="flex items-center gap-3 py-4"><span className={`grid h-7 w-7 place-items-center rounded-full ${done ? 'bg-sage text-forest' : 'bg-[#f8e4d7] text-coral'}`}>{done ? <Check size={14} /> : <Clock3 size={14} />}</span><span className="text-xs font-semibold">{label}</span><strong className="ml-auto text-xs">{value}</strong></div>;
}

function ProofModal({ onClose }: { onClose: () => void }) {
  return <div className="fixed inset-0 z-[80] grid place-items-center bg-forest/55 p-4 backdrop-blur-sm"><button aria-label="Đóng" onClick={onClose} className="absolute inset-0" /><section className="relative z-10 w-full max-w-3xl border border-line bg-paper p-5 shadow-2xl sm:p-7"><div className="flex items-start justify-between gap-4 border-b border-line pb-4"><div><p className="eyebrow">BẰNG CHỨNG CÔNG KHAI · ĐÃ CHE NHẠY CẢM</p><h2 className="mt-2 text-xl font-bold">Bộ màu & tập vẽ · 2.480.000 ₫</h2></div><button onClick={onClose} className="grid h-9 w-9 place-items-center border border-line"><X size={17} /></button></div><div className="mt-5 grid gap-4 sm:grid-cols-2"><TransferProof compact /><InvoiceProof compact /></div><div className="mt-4 flex items-start gap-3 bg-sage/55 p-4 text-xs leading-5 text-forest"><ShieldCheck size={17} className="shrink-0" /><p>Số tài khoản, mã giao dịch và thông tin cá nhân đã được che. Bản gốc chỉ Lead dự án có quyền xem.</p></div></section></div>;
}

function CreateProjectModal({ onClose, onCreate }: { onClose: () => void; onCreate: () => void }) {
  return <div className="fixed inset-0 z-[80] grid place-items-center bg-forest/55 p-4 backdrop-blur-sm"><button aria-label="Đóng" onClick={onClose} className="absolute inset-0" /><section className="relative z-10 w-full max-w-lg border border-line bg-paper p-6 shadow-2xl"><div className="flex items-start justify-between"><div><p className="eyebrow">DỰ ÁN MỚI</p><h2 className="mt-2 text-2xl font-bold">Bắt đầu từ ngân sách.</h2></div><button onClick={onClose}><X size={19} /></button></div><div className="mt-6 space-y-5"><InputField label="Tên dự án" value="Tết sẻ chia 2027" icon={<FolderKanban size={15} />} /><div className="grid grid-cols-2 gap-4"><InputField label="Tổng ngân sách" value="30.000.000 ₫" icon={<CircleDollarSign size={15} />} /><InputField label="Ngày kết thúc" value="15/02/2027" icon={<Clock3 size={15} />} /></div><SelectField label="Đơn vị tổ chức" value="Nhóm Nắng Ấm" /></div><div className="mt-7 flex justify-end gap-2"><button onClick={onClose} className="border border-line px-4 py-2.5 text-sm font-semibold">Hủy</button><button onClick={onCreate} className="bg-forest px-4 py-2.5 text-sm font-bold text-white">Tạo dự án & sinh QR</button></div></section></div>;
}
