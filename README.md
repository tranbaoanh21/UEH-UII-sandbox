# UII — UI MVP

Prototype frontend cho nền tảng minh bạch tài chính cộng đồng: thành viên nộp bill không cần tài khoản, AI hỗ trợ chuẩn hóa dữ liệu, Finance Lead kiểm duyệt và Sponsor theo dõi các khoản đã được ghi nhận.

> Đây là demo tương tác bằng dữ liệu giả. Chưa có backend, database, upload cloud, OCR/AI thật hoặc xác minh ngân hàng.

## Chạy dự án

Yêu cầu Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

Nếu máy đang dùng NVM:

```bash
nvm use 24
npm run dev
```

## Luồng demo

Màn đầu tiên là Demo Launcher với ba vai trò:

- **Admin / Finance Lead:** đăng nhập demo, quản lý cấp tổ chức và dự án, kiểm tra khoản chi, ngân sách, báo cáo, link chia sẻ và chatbot.
- **Thành viên:** nộp bill, kiểm tra dữ liệu AI, nhận private tracking link, xem “Bill của tôi” và bổ sung ảnh.
- **Sponsor:** xem ngân sách, sổ khoản chi được duyệt và bằng chứng đã che dữ liệu nhạy cảm.

Các vai trò dùng chung state. Khi Lead phê duyệt một khoản, số liệu ngân sách, báo cáo, tracking của thành viên, chatbot và Cổng minh bạch cùng cập nhật.

## Cấu trúc source

```text
.
├── app/
│   ├── globals.css             # Design tokens và theme UII
│   ├── layout.tsx              # Font, metadata và providers
│   └── mvp-demo.tsx            # Điều phối các surface của demo
├── components/
│   ├── product/
│   │   ├── admin-shell.tsx     # Navigation và chatbot Admin
│   │   ├── admin-views.tsx     # Tổ chức, dự án, review, budget, report, share
│   │   ├── member-flow.tsx     # Nộp bill, AI review, tracking, bổ sung ảnh
│   │   ├── public-portal.tsx   # Cổng Sponsor và bằng chứng công khai
│   │   ├── demo-context.tsx    # State và interaction liên kết
│   │   └── shared.tsx          # Brand và component sản phẩm dùng chung
│   └── ui/                     # shadcn/Base UI primitives
├── lib/
│   ├── demo-data.ts            # Seed data
│   ├── demo-selectors.ts       # Số liệu dẫn xuất
│   └── demo-types.ts           # TypeScript types
├── public/brand/               # Logo UII đã tối ưu cho web
├── assets/UII/                 # File logo nguồn do team cung cấp
└── external/                   # Tài liệu cuộc thi, khảo sát, costing và diagram
```

## Design system

- Nhận diện UII: tím tin cậy làm primary, cam/vàng làm accent tiết chế.
- Font: Be Vietnam Pro.
- Component foundation: shadcn với Base UI.
- Icon: Lucide.
- Admin dùng table và divider để ưu tiên mật độ dữ liệu.
- Thành viên mobile-first, một hành động chính mỗi bước.
- Sponsor chỉ xem dữ liệu đã duyệt và đã che thông tin nhạy cảm.

## Kiểm tra source

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Phạm vi mô phỏng

- Ảnh được chọn chỉ dùng để hiển thị tên file trong trình duyệt, không tải lên server.
- AI/OCR được mô phỏng bằng độ trễ và seed data cố định.
- Chatbot trả lời từ dữ liệu demo và liên kết tới khoản chi nguồn.
- State được lưu trong `localStorage` để các thay đổi không mất khi tải lại trang.
- QR chứa URL minh họa đúng theo dự án nhưng domain chưa được triển khai.
- Chia sẻ Zalo dùng native share sheet hoặc clipboard, không dùng OA/webhook.
- Xuất CSV hoạt động phía client; nút PDF dùng chế độ in của trình duyệt.

## Tài liệu ý tưởng

Đọc theo thứ tự:

1. [`external/01-product/latest-requirements.md`](external/01-product/latest-requirements.md)
2. [`external/01-product/product-brief.md`](external/01-product/product-brief.md)
3. [`external/04-costing/cost-estimate.md`](external/04-costing/cost-estimate.md)
