# PHASE 2 — ESTIMATE COST THEO GIAI ĐOẠN SẢN PHẨM

> Phạm vi: cuộc thi quy mô vừa, một developer chính
> Đơn vị: VNĐ/tháng · Chưa bao gồm VAT/thuế
> Mục tiêu: biết ở mỗi giai đoạn cần trả bao nhiêu tiền service để sản phẩm chạy được

## 1. Kết quả cần nhớ

| Giai đoạn | Quy mô giả định | Tiền service/tháng |
|---|---:|---:|
| **MVP Product** | Demo cuộc thi | **0–200.000** |
| **Pilot** | 5 dự án, 300 khoản chi | **Khoảng 282.000** |
| **Launch** | 20 dự án, 2.000 khoản chi | **Khoảng 2.171.000** |
| **Scale** | 100 dự án, 15.000 khoản chi | **Khoảng 5.772.000** |

Để lập giá bán ở Phase 3, có thể lấy kịch bản Launch làm mốc:

```text
Service cost Launch ≈ 2.171.000 đồng/tháng
Service cost/dự án ≈ 108.550 đồng
```

> Bảng này chỉ tính tiền service kỹ thuật. Không cộng lương developer, marketing, sales hoặc nhân sự hỗ trợ vận hành.

---

## 2. Bốn giai đoạn có ý nghĩa gì?

### Giai đoạn 1 — MVP Product

Mục tiêu: chứng minh ý tưởng tại cuộc thi.

- UI web chạy được luồng Lead → Người nộp → Sponsor.
- Dữ liệu giả lập trong frontend.
- AI/OCR có thể mô phỏng.
- Chưa cần backend và database production.
- Không cần mobile app, RAG hoặc tích hợp ngân hàng.

### Giai đoạn 2 — Pilot

Mục tiêu: kiểm tra sản phẩm với 3–5 dự án thật.

- Có backend Node/Express và PostgreSQL.
- Upload chứng từ thật.
- Gọi Vision AI thật qua Hugging Face.
- Một tài khoản Lead/Admin cho mỗi tổ chức thử nghiệm.
- Thành viên nộp khoản chi không cần tài khoản.
- Dùng free tier ở những nơi vẫn đáp ứng được pilot.

### Giai đoạn 3 — Launch

Mục tiêu: bắt đầu cung cấp sản phẩm cho người dùng bên ngoài.

- Khoảng 20 dự án hoạt động mỗi tháng.
- Hạ tầng trả phí đủ ổn định cho production nhỏ.
- Email thông báo, backup, lưu file và Cổng minh bạch.
- Có giới hạn chi tiêu AI và theo dõi lỗi.
- Đây là giai đoạn phù hợp nhất để tính giá bán ban đầu.

### Giai đoạn 4 — Scale

Mục tiêu: phục vụ khoảng 100 dự án mỗi tháng.

- Backend và database được nâng tài nguyên.
- AI xử lý khoảng 15.000 khoản chi/tháng.
- Bổ sung monitoring, queue và background jobs.
- Có thể bắt đầu dùng Redis/BullMQ nếu xử lý đồng thời tăng.
- Vẫn chưa cần Kubernetes hoặc dedicated GPU.

---

## 3. Chi phí từng giai đoạn

### 3.1. MVP Product — Demo cuộc thi

### Service cần dùng

| Service | Cách dùng | Chi phí/tháng |
|---|---|---:|
| Frontend | Chạy local hoặc Vercel Hobby | 0 |
| Backend | Chưa cần hoặc mock API | 0 |
| Database | Dữ liệu giả trong frontend | 0 |
| AI/OCR | Mô phỏng kết quả | 0 |
| File storage | Dùng ảnh demo có sẵn | 0 |
| Email | Chưa cần | 0 |
| Domain | Dùng URL miễn phí | 0 |
| **Tổng cơ sở** |  | **0** |

Ngân sách đề xuất: **0–200.000 đồng/tháng**, trong trường hợp muốn mua một ít AI credits hoặc domain để demo đẹp hơn.

### Công sức phát triển

- Khoảng 40–80 giờ cho UI, interaction và dữ liệu demo.
- Không quy đổi giờ làm thành tiền service.

---

### 3.2. Pilot — 5 dự án thật

### Giả định

```text
5 dự án/tháng
60 khoản chi/dự án
= 300 khoản chi/tháng
```

### Service cần dùng

| Service | Gói giả định | Chi phí/tháng |
|---|---|---:|
| Vercel | Hobby, pilot phi thương mại | 0 |
| Render | Starter backend | 182.000 |
| Neon | Free | 0 |
| Cloudflare R2 | Trong free tier | 0 |
| Resend | Free, dưới 3.000 email | 0 |
| Hugging Face AI | 300 × 111 đồng | 33.345 |
| Domain | Phân bổ theo tháng | 30.000 |
| **Subtotal** |  | **245.345** |
| Dự phòng 15% |  | 36.802 |
| **Tổng Pilot** |  | **282.147** |

Làm tròn để trình bày: **khoảng 280.000 đồng/tháng**.

```text
Service cost/dự án ≈ 282.147 / 5
≈ 56.400 đồng/dự án
```

### Chức năng cần phát triển thêm

- Backend API và PostgreSQL.
- Admin authentication.
- Upload file vào object storage.
- Vision AI trả về JSON.
- Hàng chờ duyệt và Budget Guard cơ bản.

Effort bổ sung ước tính: **200–300 giờ**.

---

### 3.3. Launch — 20 dự án/tháng

### Giả định

```text
20 dự án/tháng
100 khoản chi/dự án
= 2.000 khoản chi/tháng
```

### Service cần dùng

| Service | Gói giả định | Chi phí/tháng |
|---|---|---:|
| Vercel | Pro | 520.000 |
| Render | Starter backend | 182.000 |
| Neon | Launch, mức dùng điển hình 15 USD | 390.000 |
| Cloudflare R2 | Khoảng 70 GB steady-state | 23.522 |
| Resend | Pro, 50.000 email | 520.000 |
| Hugging Face AI | 2.000 × 111 đồng | 222.300 |
| Domain | Phân bổ theo tháng | 30.000 |
| Monitoring | Free tier | 0 |
| **Subtotal** |  | **1.887.822** |
| Dự phòng 15% |  | 283.173 |
| **Tổng Launch** |  | **2.170.995** |

Làm tròn để trình bày: **khoảng 2,17 triệu đồng/tháng**.

```text
Service cost/dự án ≈ 2.170.995 / 20
≈ 108.550 đồng/dự án
```

### Chức năng cần hoàn thiện thêm

- Production security và phân quyền ổn định.
- Email thông báo trạng thái.
- Backup và chính sách lưu chứng từ.
- Che dữ liệu nhạy cảm trên Cổng minh bạch.
- Xuất báo cáo PDF.
- Logging, rate limit và spending cap.

Effort bổ sung từ Pilot: **120–200 giờ**.

---

### 3.4. Scale — 100 dự án/tháng

### Giả định

```text
100 dự án/tháng
150 khoản chi/dự án
= 15.000 khoản chi/tháng
```

### Service cần dùng

| Service | Gói giả định | Chi phí/tháng |
|---|---|---:|
| Vercel | Pro | 520.000 |
| Render | Standard backend | 650.000 |
| Neon | Ngân sách usage 35 USD | 910.000 |
| Cloudflare R2 | Khoảng 527 GB steady-state | 201.764 |
| Resend | Pro, dưới 50.000 email | 520.000 |
| Hugging Face AI | 15.000 × 111 đồng | 1.667.250 |
| Monitoring/logging | Ngân sách 20 USD | 520.000 |
| Domain | Phân bổ theo tháng | 30.000 |
| **Subtotal** |  | **5.019.014** |
| Dự phòng 15% |  | 752.852 |
| **Tổng Scale** |  | **5.771.866** |

Làm tròn để trình bày: **khoảng 5,77 triệu đồng/tháng**.

```text
Service cost/dự án ≈ 5.771.866 / 100
≈ 57.700 đồng/dự án
```

### Chức năng/hạ tầng cần bổ sung

- Background job cho AI processing.
- Queue, retry và dead-letter handling.
- Monitoring và cảnh báo lỗi.
- Database indexing và tối ưu query.
- Rate limiting, audit log và backup tốt hơn.
- Redis/BullMQ chỉ khi đã có nhu cầu thực tế.

Effort bổ sung từ Launch: **200–400 giờ**.

---

## 4. Bảng so sánh cuối cùng

| Chỉ số | MVP Product | Pilot | Launch | Scale |
|---|---:|---:|---:|---:|
| Dự án/tháng | Demo | 5 | 20 | 100 |
| Khoản chi/tháng | Mock | 300 | 2.000 | 15.000 |
| Tiền service/tháng | 0–200.000 | 282.147 | 2.170.995 | 5.771.866 |
| Service cost/dự án | Không áp dụng | 56.400 | 108.550 | 57.700 |
| AI/tháng | 0 | 33.345 | 222.300 | 1.667.250 |
| Dedicated GPU | Không | Không | Không | Chưa cần |

### Vì sao Launch có cost/dự án cao nhất?

Launch là thời điểm vừa phải trả các gói production như Vercel Pro, Neon Launch và Resend Pro, nhưng mới có 20 dự án để phân bổ chi phí. Khi lên Scale, số dự án tăng nhanh hơn chi phí cố định nên cost/dự án giảm.

---

## 5. Chi phí AI có đáng lo không?

Chưa đáng lo trong bốn giai đoạn này.

Giả định AI đã bao gồm:

- Hai ảnh cho mỗi khoản chi.
- JSON output có cấu trúc.
- Retry khi ảnh khó đọc.
- Dự phòng đổi model/provider.
- Một phần xử lý che dữ liệu.

Ngân sách bảo thủ:

```text
Khoảng 111 đồng/khoản chi
```

Nên gọi model bằng Hugging Face Inference Providers theo pay-as-you-go. Không cần thuê GPU riêng vì GPU chạy liên tục có thể tốn khoảng 9,5 triệu đồng/tháng — cao hơn toàn bộ service cost của kịch bản Scale hiện tại.

---

## 6. Những khoản không nằm trong “tiền service”

Để tránh hiểu sai, bảng trên không bao gồm:

- Lương hoặc giờ công của developer.
- Thời gian Lead duyệt chứng từ.
- Nhân sự chăm sóc khách hàng.
- Marketing, sales và quảng cáo.
- Phí pháp lý, thành lập doanh nghiệp hoặc kế toán.
- Payment gateway và thuế khi bắt đầu bán.
- Mobile app, Open Banking, Zalo OA và chatbot RAG.

Các khoản này chỉ được bổ sung khi Phase 3 tính business model đầy đủ.

---

## 7. Kết luận cho cuộc thi

Thông điệp nên trình bày:

> Nhóm có thể hoàn thiện MVP Product gần như không tốn tiền service. Khi pilot với năm dự án thật, chi phí chỉ khoảng 280.000 đồng mỗi tháng. Khi launch cho 20 dự án, nền tảng cần khoảng 2,17 triệu đồng mỗi tháng; và khi scale lên 100 dự án, chi phí service khoảng 5,77 triệu đồng mỗi tháng.

Điều này chứng minh sản phẩm có thể bắt đầu nhỏ, tận dụng free tier và chỉ nâng cấp hạ tầng khi đã có người dùng.

---

## 8. Nguồn giá service

- Vercel: https://vercel.com/pricing
- Render: https://render.com/docs/compute-plans
- Neon: https://neon.com/pricing
- Cloudflare R2: https://developers.cloudflare.com/r2/pricing/
- Resend: https://resend.com/docs/knowledge-base/what-is-resend-pricing
- Hugging Face: https://huggingface.co/docs/inference-providers/pricing
- Fireworks VLM reference: https://docs.fireworks.ai/serverless/pricing

Chi tiết công thức và giả định được lưu tại [`cost-model-notes.md`](cost-model-notes.md).
