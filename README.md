# Minh Bạch — UI MVP

Prototype frontend cho nền tảng AI quản lý khoản chi, chứng từ và minh bạch tài chính của dự án cộng đồng.

> Đây là UI demo sử dụng dữ liệu giả. Chưa có backend, database, upload thật hoặc AI thật.

## Bắt đầu ở đâu?

### Nếu bạn muốn chạy sản phẩm

```bash
npm install
npm run dev
```

Mở http://localhost:3000.

### Nếu bạn muốn sửa UI

Đi theo thứ tự:

1. `app/page.tsx` — entry page.
2. `app/mvp-demo.tsx` — toàn bộ màn hình và interaction của MVP.
3. `app/globals.css` — màu, typography và style dùng chung.
4. `app/layout.tsx` — metadata và font.

### Nếu bạn muốn hiểu ý tưởng cuộc thi

Bắt đầu tại [`external/README.md`](external/README.md), sau đó đọc:

1. [`external/01-product/latest-requirements.md`](external/01-product/latest-requirements.md)
2. [`external/01-product/product-brief.md`](external/01-product/product-brief.md)
3. [`external/04-costing/cost-estimate.md`](external/04-costing/cost-estimate.md)

## Luồng demo chính

1. Lead xem dashboard dự án.
2. Người nộp mở link/QR mà không cần tài khoản.
3. Người nộp khai khoản chi và tải ảnh chuyển khoản, hóa đơn hoặc cả hai.
4. AI giả lập đọc, chuẩn hóa và đối chiếu hai bằng chứng.
5. Lead phê duyệt, yêu cầu bổ sung hoặc từ chối.
6. Khoản được duyệt cập nhật ngân sách và Cổng minh bạch.
7. Sponsor xem sổ công khai và bằng chứng đã che dữ liệu nhạy cảm.

Thanh chuyển vai trò cuối màn hình cho phép đi nhanh giữa **Lead**, **Người nộp** và **Sponsor**.

## Cấu trúc root

```text
.
├── app/                 # Source UI MVP
├── public/              # Static assets của web
├── external/            # Tài liệu cuộc thi, nghiên cứu và deliverables
├── package.json         # Scripts và dependencies
├── vite.config.ts       # Cấu hình Vinext/Vite
└── README.md            # Điểm bắt đầu của repository
```

Các thư mục `node_modules`, `.next`, `.vinext` và `.wrangler` là file sinh tự động, không cần đọc hoặc commit.

## Kiểm tra source

```bash
npm run build
npm run lint
```

## Phạm vi mô phỏng

- AI/OCR được mô phỏng bằng độ trễ và dữ liệu cố định.
- Trạng thái phê duyệt chỉ tồn tại trong memory của trình duyệt.
- QR và đường dẫn chỉ minh họa hai luồng chia sẻ riêng.
- Không xác minh giao dịch trực tiếp với ngân hàng hoặc ví điện tử.

