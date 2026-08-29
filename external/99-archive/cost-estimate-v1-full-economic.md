# PHỤ LỤC PHASE 2 — MÔ HÌNH CHI PHÍ CHI TIẾT

> Đây là tài liệu tra cứu công thức và nguồn giá. Bản ngắn gọn để trình bày nằm tại [`cost-estimate.md`](cost-estimate.md).

> Sản phẩm: Nền tảng AI quản lý khoản chi, chứng từ và minh bạch tài chính cho dự án cộng đồng
> Phiên bản: 1.0 — 29/08/2026
> Đơn vị trình bày: VNĐ, chưa bao gồm VAT và thuế
> Mục đích: làm đầu vào cho Phase 3 — thiết kế gói và giá bán

## 1. Kết luận điều hành

### Con số cần nhớ

| Hạng mục | Ước tính |
|---|---:|
| Chi phí tiền mặt để đưa MVP lên mức pilot-ready | **11,3 triệu** |
| Giá trị kinh tế đầy đủ của MVP, gồm 720 giờ công | **135,5 triệu** |
| Vận hành giai đoạn thử nghiệm | **0,29 triệu/tháng** |
| Vận hành giai đoạn ra mắt | **3,32 triệu/tháng** |
| Vận hành giai đoạn mở rộng | **10,37 triệu/tháng** |
| Chi phí đầy đủ trên một dự án | **khoảng 98.000–166.000/dự án** |
| Chi phí AI dự phòng trên một khoản chi | **khoảng 111 đồng** |

Hai kết luận quan trọng:

1. **AI không phải chi phí lớn nhất.** Ở quy mô MVP, phần tốn nhiều hơn là hạ tầng tối thiểu để chạy production, hỗ trợ người dùng và công sức phát triển.
2. **Không nên thuê GPU riêng.** Giai đoạn đầu nên gọi Vision-Language Model qua Hugging Face Inference Providers theo cơ chế pay-as-you-go. Dedicated GPU chỉ hợp lý khi lưu lượng đã lớn và ổn định.

Chi phí 98.000–166.000 đồng/dự án trong tài liệu này **chưa phải giá bán**. Giá bán còn phải bù chi phí bán hàng, phát triển sản phẩm, rủi ro, thuế và lợi nhuận; phần đó được xử lý ở Phase 3.

---

## 2. Phạm vi sản phẩm được estimate

Estimate này dành cho một **MVP web có thể pilot với người dùng thật**, gồm:

- Admin/Finance Lead đăng nhập và tạo dự án.
- Khởi tạo nguồn tài trợ, hạng mục ngân sách và hoạt động.
- Sinh QR/link riêng cho người nộp khoản chi.
- Thành viên không cần tài khoản, có thể tải ảnh chuyển khoản, bill hoặc hóa đơn.
- AI trích xuất dữ liệu thành cấu trúc.
- AI đối chiếu số tiền, thời gian, người nhận giữa các chứng từ.
- Budget Guard cảnh báo trùng, gần vượt ngân sách, sai hạng mục hoặc thiếu dữ liệu.
- Lead phê duyệt, yêu cầu bổ sung hoặc từ chối.
- Dashboard ngân sách, sổ khoản chi và Cổng minh bạch cho Sponsor.
- Che dữ liệu nhạy cảm trên bằng chứng công khai.
- Xuất báo cáo tài chính và tác động dạng PDF.

### Chưa nằm trong estimate MVP

- React Native mobile app.
- Kết nối webhook với ngân hàng hoặc ví điện tử.
- Xác minh giao dịch trực tiếp từ ngân hàng/Open Banking.
- Zalo OA và webhook nhận bill tự động.
- Chatbot RAG hỏi đáp tài liệu tự do.
- Sponsor Dashboard tổng hợp nhiều tổ chức.
- Hạ tầng AWS multi-region, SLA 24/7 hoặc Kubernetes.
- Marketing trả phí, đội sales, văn phòng và nhân sự full-time.

Những mục này phải được estimate riêng khi được đưa vào roadmap.

---

## 3. Giả định chung

| Giả định | Giá trị | Loại |
|---|---:|---|
| Tỷ giá lập kế hoạch | 26.000 VNĐ/USD | Giả định làm tròn |
| Đơn giá giờ công nội bộ | 150.000 VNĐ/giờ | Giả định |
| Số bằng chứng trung bình/khoản chi | 2 file | Ảnh chuyển khoản + hóa đơn |
| Kích thước trung bình/file | 1,5 MB | Giả định có nén ảnh |
| Thời gian lưu bản gốc | 12 tháng | Chính sách MVP |
| Email hệ thống/khoản chi | 2 email | Gửi thành công + kết quả duyệt |
| Chi phí hỗ trợ người dùng | 100.000 VNĐ/giờ | Giả định |
| Dự phòng biến động chi phí | 15% | Giả định |

Tỷ giá 26.000 VNĐ/USD là tỷ giá kế hoạch, không phải báo giá ngoại hối thời gian thực. Phase 3 nên giữ tỷ giá này như một input có thể thay đổi.

---

## 4. Chi phí xây dựng MVP một lần

### 4.1. Khối lượng công việc

| Nhóm công việc | Giờ ước tính | Giá trị giờ công |
|---|---:|---:|
| Product discovery, requirement và data flow | 50 | 7.500.000 |
| UX/UI và design system | 70 | 10.500.000 |
| Frontend web | 160 | 24.000.000 |
| Backend, API và PostgreSQL | 200 | 30.000.000 |
| AI/OCR, chuẩn hóa JSON và đối chiếu | 120 | 18.000.000 |
| QA, bảo mật và quyền riêng tư | 80 | 12.000.000 |
| CI/CD, monitoring, tài liệu kỹ thuật | 40 | 6.000.000 |
| **Tổng** | **720 giờ** | **108.000.000** |

720 giờ tương đương khoảng 4,5 người-tháng nếu quy đổi 160 giờ/người-tháng. Đây là estimate cho một MVP dùng pilot, không phải chỉ riêng UI demo cho cuộc thi.

### 4.2. Chi phí tiền mặt ban đầu

| Khoản tiền mặt | Dự toán |
|---|---:|
| Credit AI/API cho phát triển và kiểm thử | 1.500.000 |
| Domain năm đầu | 360.000 |
| Khuyến khích người dùng pilot/nghiên cứu | 2.000.000 |
| Rà soát bảo mật và quyền riêng tư bên ngoài | 5.000.000 |
| Thiết bị, dữ liệu test và chi phí phát sinh nhỏ | 1.000.000 |
| **Tổng tiền mặt trước dự phòng** | **9.860.000** |
| Dự phòng 15% | 1.479.000 |
| **Ngân sách tiền mặt nên chuẩn bị** | **11.339.000** |

Nếu nhóm tự code, 108 triệu đồng giờ công không phải số tiền phải trả ngay. Tuy nhiên, nó vẫn là chi phí kinh tế thật và cần được ghi nhận khi đánh giá khả năng hoàn vốn.

### 4.3. Tổng giá trị kinh tế của MVP

```text
Giá trị kinh tế trước dự phòng
= 108.000.000 giờ công + 9.860.000 tiền mặt
= 117.860.000 VNĐ

Ngân sách đầy đủ sau dự phòng 15%
= 117.860.000 × 1,15
= 135.539.000 VNĐ
```

---

## 5. Kiến trúc chi phí vận hành

### 5.1. Frontend — Vercel

- Giai đoạn demo/phi thương mại: Hobby, 0 USD/tháng.
- Khi bắt đầu bán sản phẩm: Pro, 20 USD/tháng, tương đương khoảng 520.000 VNĐ/tháng.
- Vercel Hobby được mô tả cho mục đích cá nhân, phi thương mại; không nên lấy Hobby làm giả định khi đã thu phí khách hàng.

Nguồn: https://vercel.com/pricing

### 5.2. Backend — Render

- Pilot nhỏ: Free, chấp nhận cold start và giới hạn tài nguyên.
- Production nhỏ: Starter 0,5 CPU/512 MB, 7 USD/tháng ≈ 182.000 VNĐ.
- Khi tải tăng: Standard 1 CPU/2 GB, 25 USD/tháng ≈ 650.000 VNĐ.

Nguồn: https://render.com/docs/compute-plans
Tham chiếu giá: https://render.com/articles/render-vs-railway

### 5.3. PostgreSQL — Neon

- Free: 0 USD, 0,5 GB storage/project và 100 CU-hours/project/tháng.
- Launch: usage-based, Neon công bố mức chi tiêu điển hình khoảng 15 USD/tháng.
- Scale trong model này dùng ngân sách 35 USD/tháng; đây là giả định thận trọng, không phải gói cố định.

Nguồn: https://neon.com/pricing

### 5.4. Lưu chứng từ — Cloudflare R2

- Miễn phí 10 GB-month, 1 triệu Class A operations và 10 triệu Class B operations mỗi tháng.
- Phần vượt free tier: 0,015 USD/GB-month.
- Egress trực tiếp từ R2 miễn phí.

Nguồn: https://developers.cloudflare.com/r2/pricing/

R2 phù hợp hơn việc nhét ảnh bill vào PostgreSQL. Database chỉ nên lưu metadata và object key; file gốc lưu trong object storage.

### 5.5. Email — Resend

- Free: 3.000 email/tháng, giới hạn 100 email/ngày.
- Pro: 20 USD/tháng cho 50.000 email.

Nguồn: https://resend.com/docs/knowledge-base/what-is-resend-pricing

### 5.6. AI — Hugging Face Inference Providers

Hugging Face cho phép route request tới nhiều inference provider bằng một HF token. Nếu dùng HF-routed request:

- Thanh toán pay-as-you-go qua tài khoản Hugging Face.
- Không cần tự tạo tài khoản riêng với từng provider.
- Hugging Face công bố không cộng thêm markup; giá bằng giá provider.
- Có thể dùng hậu tố `:cheapest` để ưu tiên provider có giá output token thấp nhất.

Nguồn: https://huggingface.co/docs/inference-providers/pricing
Nguồn kỹ thuật: https://huggingface.co/docs/inference-providers/index

Kiến trúc đề xuất:

```text
Backend nhận file
    ↓
Lưu file gốc vào R2
    ↓
Gọi VLM qua Hugging Face Inference Providers
    ↓
Nhận JSON có cấu trúc
    ↓
Backend chạy rule Budget Guard
    ↓
Lead xác nhận
```

Không cần RAG cho luồng này. Đây là structured extraction + rule engine.

---

## 6. Tính chi phí AI trên một khoản chi

Model dùng để lập ngân sách: một VLM cỡ nhỏ/trung bình như Qwen VL, gọi qua HF-routed provider. Giá tham chiếu cho Qwen3 VL 30B trên Fireworks:

- Input: 0,15 USD/1 triệu token.
- Output: 0,60 USD/1 triệu token.
- Một ảnh phổ biến thường tiêu thụ khoảng 1.000–2.500 image token; model dùng 1.750 token/ảnh làm giả định giữa.

Nguồn giá: https://docs.fireworks.ai/serverless/pricing
Nguồn image token: https://docs.fireworks.ai/faq-new/billing-pricing/how-many-tokens-per-image

### Công thức

```text
Input token/khoản chi
= 2 ảnh × 1.750 + 600 token prompt
= 4.100 token

Output token/khoản chi
= 400 token JSON

Chi phí model cơ sở
= [(4.100 × 0,15) + (400 × 0,60)] / 1.000.000
= 0,000855 USD

Sau retry factor 1,25 và safety multiplier 4 lần
= 0,000855 × 1,25 × 4
= 0,004275 USD

Quy đổi
= 0,004275 × 26.000
= 111,15 VNĐ/khoản chi
```

Safety multiplier 4 lần được thêm để dự phòng retry, ảnh khó đọc, bước che dữ liệu và việc phải chuyển sang model/provider đắt hơn. Vì vậy 111 đồng là ngân sách thận trọng, không phải chỉ là giá của một inference call thành công.

### Vì sao không thuê GPU riêng?

Hugging Face Dedicated Inference Endpoint có thể bắt đầu khoảng 0,5 USD/GPU-hour tùy cấu hình. Một GPU chạy liên tục 730 giờ/tháng sẽ khoảng:

```text
0,5 × 730 × 26.000 = 9.490.000 VNĐ/tháng
```

Trong khi 15.000 khoản chi/tháng theo model pay-as-you-go chỉ cần khoảng 1,67 triệu đồng AI, đã gồm safety multiplier. Vì vậy dedicated GPU chưa hợp lý trong MVP.

Nguồn endpoint: https://huggingface.co/docs/inference-endpoints/guides/access

---

## 7. Ba kịch bản vận hành

### 7.1. Định nghĩa kịch bản

| Driver | Pilot | Launch | Scale |
|---|---:|---:|---:|
| Dự án mới/tháng | 3 | 20 | 100 |
| Khoản chi/dự án | 75 | 100 | 150 |
| Khoản chi/tháng | 225 | 2.000 | 15.000 |
| File/khoản chi | 2 | 2 | 2 |
| Dung lượng mới/tháng | 0,66 GB | 5,86 GB | 43,95 GB |
| Dung lượng steady-state sau 12 tháng | 7,91 GB | 70,31 GB | 527,34 GB |
| Giờ hỗ trợ sản phẩm/tháng | 2 | 10 | 40 |

### 7.2. Chi phí cố định hàng tháng

| Hạng mục | Pilot | Launch | Scale |
|---|---:|---:|---:|
| Vercel | 0 | 520.000 | 520.000 |
| Render | 0 | 182.000 | 650.000 |
| Neon | 0 | 390.000 | 910.000 |
| Resend | 0 | 520.000 | 520.000 |
| Monitoring/logging | 0 | 0 | 520.000 |
| Domain phân bổ theo tháng | 30.000 | 30.000 | 30.000 |
| **Tổng cố định** | **30.000** | **1.642.000** | **3.150.000** |

Monitoring/logging 520.000 đồng ở kịch bản Scale là ngân sách giả định 20 USD/tháng, chưa gắn với một vendor bắt buộc.

### 7.3. Tổng chi phí vận hành

| Hạng mục | Pilot | Launch | Scale |
|---|---:|---:|---:|
| Chi phí cố định | 30.000 | 1.642.000 | 3.150.000 |
| AI pay-as-you-go | 25.009 | 222.300 | 1.667.250 |
| R2 storage sau free tier | 0 | 23.522 | 201.764 |
| Hỗ trợ người dùng | 200.000 | 1.000.000 | 4.000.000 |
| **Subtotal** | **255.009** | **2.887.822** | **9.019.014** |
| Dự phòng 15% | 38.251 | 433.173 | 1.352.852 |
| **Tổng/tháng** | **293.260** | **3.320.995** | **10.371.866** |
| **Chi phí/dự án** | **97.753** | **166.050** | **103.719** |
| **Chi phí/khoản chi** | **1.303** | **1.660** | **691** |

### Vì sao Launch đắt hơn trên mỗi dự án?

Launch vừa vượt các free tier nên phải bắt đầu trả Vercel, database và email, nhưng số dự án chưa đủ lớn để phân bổ chi phí cố định. Khi đạt Scale, chi phí trên một dự án giảm nhờ hiệu ứng quy mô.

---

## 8. Chi phí nào thực sự quyết định giá bán?

Ở kịch bản Launch:

| Thành phần | Tỷ trọng xấp xỉ |
|---|---:|
| Hạ tầng và dịch vụ cố định | 49% |
| Hỗ trợ người dùng | 30% |
| Dự phòng | 13% |
| AI | 7% |
| Storage | <1% |

Thông điệp cần dùng khi thuyết trình:

> Sản phẩm không đắt vì “gọi AI”. Chi phí chủ yếu đến từ việc duy trì một dịch vụ ổn định, bảo vệ chứng từ, hỗ trợ người dùng và tiếp tục phát triển sản phẩm.

---

## 9. Chi phí của Lead không được cộng vào COGS

Lead vẫn phải duyệt khoản chi. Đây là thời gian của tổ chức khách hàng, không phải chi phí trực tiếp của SaaS nên không cộng vào bảng vận hành phía trên.

Tuy nhiên, đây là input quan trọng cho Phase 3 vì sản phẩm tạo ra giá trị bằng cách giảm thời gian:

- Đi đòi và gom chứng từ.
- Nhập dữ liệu từ ảnh vào Sheet.
- Tìm lại bill bị trôi trong Zalo/Drive.
- Đối chiếu thủ công số tiền và thời gian.
- Tổng hợp báo cáo cuối dự án.

Giá bán không chỉ dựa trên cost-plus; còn phải dựa trên số giờ công và rủi ro mà sản phẩm giúp khách hàng tiết kiệm.

---

## 10. Rủi ro làm estimate thay đổi

| Rủi ro | Ảnh hưởng | Cách kiểm soát |
|---|---|---|
| Chứng từ tiếng Việt khó đọc làm tăng retry | Tăng AI cost | Nén/chuẩn hóa ảnh, confidence threshold, fallback model |
| Người dùng tải file quá lớn | Tăng storage | Resize ảnh phía client, giới hạn 10 MB/file |
| Nhiều email hơn dự kiến | Tăng Resend plan | In-app status trước, email cho sự kiện quan trọng |
| Backend xử lý AI đồng bộ | Tăng timeout/tài nguyên | Queue background jobs khi volume tăng |
| Lưu chứng từ quá lâu | Tăng storage và rủi ro privacy | Retention policy, archive/delete theo dự án |
| Phải hỗ trợ thủ công nhiều | Tăng chi phí lớn nhất | UX rõ, validation trước upload, hướng dẫn trong form |
| Tỷ giá hoặc vendor tăng giá | Tăng COGS | Budget 15%, billing cap và provider abstraction |

---

## 11. Quyết định kỹ thuật được đề xuất cho MVP

1. **Frontend:** Vercel Hobby khi demo, nâng Pro ngay khi thu phí.
2. **Backend:** Render Free cho thử nghiệm, Starter cho pilot production.
3. **Database:** Neon Free trước; dùng một database chung và `project_id`, không tạo một Neon project cho mỗi dự án khách hàng.
4. **File:** Cloudflare R2; không lưu binary trong PostgreSQL.
5. **AI:** Hugging Face Inference Providers, gọi VLM theo pay-as-you-go và đặt spending limit.
6. **Budget Guard:** rule engine trong backend trước; không dùng LLM cho các phép so sánh số học xác định.
7. **Chatbot/RAG:** chưa làm ở MVP.
8. **Dedicated GPU:** chưa thuê.
9. **Bank verification:** ngoài phạm vi MVP; ảnh chuyển khoản chỉ là bằng chứng người dùng cung cấp.

---

## 12. Công thức chuyển sang Phase 3

Phase 3 sẽ bắt đầu từ các công thức:

```text
COGS trên một dự án
= Tổng chi phí vận hành tháng / số dự án trả phí tháng

Gross margin
= (Giá bán − COGS) / Giá bán

Giá sàn theo gross margin mục tiêu
= COGS / (1 − gross margin mục tiêu)
```

Ví dụ, với Launch COGS khoảng 166.000 đồng/dự án:

| Gross margin mục tiêu | Giá sàn toán học |
|---|---:|
| 50% | 332.000 |
| 60% | 415.000 |
| 65% | 474.000 |
| 70% | 553.000 |

Đây chỉ là giá sàn theo cost. Phase 3 phải đối chiếu thêm mức sẵn sàng chi trả, phân khúc CLB/NPO/CSR và giá trị thời gian được tiết kiệm trước khi chốt giá niêm yết.

---

## 13. Nguồn giá chính thức

Truy cập ngày 29/08/2026:

- Vercel: https://vercel.com/pricing
- Render compute: https://render.com/docs/compute-plans
- Render price reference: https://render.com/articles/render-vs-railway
- Neon: https://neon.com/pricing
- Cloudflare R2: https://developers.cloudflare.com/r2/pricing/
- Resend: https://resend.com/docs/knowledge-base/what-is-resend-pricing
- Hugging Face Inference Providers pricing: https://huggingface.co/docs/inference-providers/pricing
- Hugging Face Inference Providers: https://huggingface.co/docs/inference-providers/index
- Hugging Face Inference Endpoints: https://huggingface.co/docs/inference-endpoints/guides/access
- Fireworks VLM pricing: https://docs.fireworks.ai/serverless/pricing
- Fireworks image token estimate: https://docs.fireworks.ai/faq-new/billing-pricing/how-many-tokens-per-image
