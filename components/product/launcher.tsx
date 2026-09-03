'use client';

import { ArrowRight, Building2, Eye, FileUp, ShieldCheck, UserRound } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Brand } from '@/components/product/shared';
import { useDemo } from '@/components/product/demo-context';
import { ACTIVE_PROJECT_ID } from '@/lib/demo-data';

export function DemoLauncher() {
  const { navigate, openProject } = useDemo();
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b bg-card/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-5 lg:px-8">
          <Brand />
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.08em] text-primary uppercase">UII · Minh bạch tài chính cộng đồng</p>
          <h1 className="mt-3 text-balance text-4xl leading-[1.08] font-semibold tracking-[-0.05em] text-brand-ink sm:text-5xl">Bắt đầu từ vai trò của bạn.</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">Mỗi người có một không gian riêng, đúng với thông tin họ cần xem và công việc họ cần làm.</p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <RoleCard
            icon={<ShieldCheck />}
            index="01"
            title="Người phụ trách tài chính"
            description="Quản lý dự án, kiểm tra khoản chi, theo dõi ngân sách và lập báo cáo."
            bullets={['Quản lý nhiều dự án', 'Duyệt từng khoản chi', 'Chia sẻ báo cáo minh bạch']}
            action="Đăng nhập quản lý"
            onClick={() => navigate('login')}
            featured
          />
          <RoleCard
            icon={<FileUp />}
            index="02"
            title="Thành viên dự án"
            description="Tải chứng từ, kiểm tra thông tin đã được đọc và theo dõi kết quả xử lý."
            bullets={['Không cần đăng nhập', 'Có đường dẫn theo dõi riêng', 'Bổ sung ảnh khi được yêu cầu']}
            action="Nộp khoản chi"
            secondaryAction="Xem Bill của tôi"
            onClick={() => openProject(ACTIVE_PROJECT_ID, 'member-submit')}
            onSecondary={() => openProject(ACTIVE_PROJECT_ID, 'member-bills')}
          />
          <RoleCard
            icon={<Eye />}
            index="03"
            title="Nhà tài trợ"
            description="Theo dõi tiền tài trợ đã được sử dụng và xem chứng từ đã che thông tin nhạy cảm."
            bullets={['Không cần đăng nhập', 'Chỉ hiện khoản đã duyệt', 'Xem chi tiết từng khoản']}
            action="Xem Cổng minh bạch"
            onClick={() => openProject(ACTIVE_PROJECT_ID, 'public-portal')}
          />
        </div>

      </section>
    </main>
  );
}

function RoleCard({ icon, index, title, description, bullets, action, secondaryAction, onClick, onSecondary, featured = false }: {
  icon: React.ReactNode;
  index: string;
  title: string;
  description: string;
  bullets: string[];
  action: string;
  secondaryAction?: string;
  onClick: () => void;
  onSecondary?: () => void;
  featured?: boolean;
}) {
  return (
    <article className={`flex min-h-[370px] flex-col rounded-2xl border bg-card p-6 ${featured ? 'border-primary/35 shadow-[0_16px_50px_rgb(69_41_104/9%)]' : ''}`}>
      <div className="flex items-center justify-between">
        <span className={`grid h-11 w-11 place-items-center rounded-xl ${featured ? 'bg-primary text-white' : 'bg-secondary text-primary'}`}>{icon}</span>
        <span className="text-xs font-semibold tracking-[0.12em] text-muted-foreground">{index}</span>
      </div>
      <h2 className="mt-7 text-xl font-semibold tracking-[-0.03em] text-brand-ink">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      <ul className="mt-5 space-y-2 border-t pt-5 text-xs text-foreground/75">
        {bullets.map((bullet) => <li key={bullet} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />{bullet}</li>)}
      </ul>
      <div className="mt-auto space-y-2 pt-6">
        <Button size="lg" className="w-full justify-between" variant={featured ? 'default' : 'outline'} onClick={onClick}>{action}<ArrowRight /></Button>
        {secondaryAction && onSecondary ? <Button className="w-full" variant="ghost" onClick={onSecondary}>{secondaryAction}</Button> : null}
      </div>
    </article>
  );
}

export function AdminLogin() {
  const { navigate, showToast } = useDemo();
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    showToast({ title: 'Đăng nhập thành công', detail: 'Chào mừng Bảo Anh quay lại Nhóm Nắng Ấm.', tone: 'success' });
    navigate('organization');
  };
  return (
    <main className="grid min-h-screen bg-[#f4f1f7] lg:grid-cols-[minmax(0,1fr)_minmax(480px,.72fr)]">
      <section className="relative hidden overflow-hidden bg-brand-ink p-12 text-white lg:flex lg:flex-col">
        <div className="absolute -right-24 -bottom-28 h-96 w-96 rounded-full bg-brand-purple/35 blur-3xl" />
        <Brand inverse onClick={() => navigate('launcher')} />
        <div className="relative mt-auto max-w-lg">
          <p className="text-xs font-semibold tracking-[0.08em] text-brand-yellow uppercase">Một nguồn dữ liệu đáng tin</p>
          <h1 className="mt-4 text-4xl leading-tight font-semibold tracking-[-0.05em]">Không còn đợi cuối dự án mới đi tìm từng tấm bill.</h1>
          <p className="mt-4 text-sm leading-6 text-white/60">UII đưa chứng từ, quyết định phê duyệt, ngân sách và báo cáo về cùng một quy trình có thể truy ngược.</p>
        </div>
      </section>
      <section className="flex items-center justify-center p-5 sm:p-10">
        <form onSubmit={submit} className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-[0_22px_70px_rgb(40_26_61/10%)] sm:p-8">
          <div className="lg:hidden"><Brand onClick={() => navigate('launcher')} /></div>
          <div className="mt-8 lg:mt-0">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary"><Building2 /></span>
            <h1 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-brand-ink">Đăng nhập quản lý</h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Dùng tài khoản của Nhóm Nắng Ấm để tiếp tục.</p>
          </div>
          <div className="mt-7 space-y-5">
            <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" defaultValue="baoanh@nhomnangam.vn" /></div>
            <div className="space-y-2"><Label htmlFor="password">Mật khẩu</Label><Input id="password" type="password" defaultValue="UII@2026" /></div>
          </div>
          <Button size="lg" className="mt-7 w-full" type="submit"><UserRound /> Đăng nhập</Button>
          <Button className="mt-2 w-full" type="button" variant="ghost" onClick={() => navigate('launcher')}>Quay lại</Button>
        </form>
      </section>
    </main>
  );
}
