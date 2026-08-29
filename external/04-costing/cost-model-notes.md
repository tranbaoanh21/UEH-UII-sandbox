# PHỤ LỤC — CÁCH TÍNH TIỀN SERVICE

> Tài liệu này giải thích các con số trong [`cost-estimate.md`](cost-estimate.md). Khi trình bày cuộc thi, ưu tiên dùng file chính.

## 1. Quy ước

| Input | Giá trị |
|---|---:|
| Tỷ giá kế hoạch | 26.000 VNĐ/USD |
| File/khoản chi | 2 |
| Dung lượng/file sau nén | 1,5 MB |
| Email/khoản chi | 2 |
| Dự phòng biến động | 15% |

## 2. AI cost

Giá tham chiếu VLM:

- Input: 0,15 USD/1 triệu token.
- Output: 0,60 USD/1 triệu token.
- 4.100 input token và 400 output token/khoản chi.
- Retry factor: 1,25 lần.
- Safety multiplier: 4 lần.

```text
AI cost/khoản chi
= {[(4.100 × 0,15) + (400 × 0,60)] / 1.000.000}
  × 1,25 × 4 × 26.000
= 111,15 đồng
```

## 3. Storage cost

Cloudflare R2 miễn phí 10 GB-month. Phần vượt miễn phí có giá 0,015 USD/GB-month:

```text
Giá R2/GB-month
= 0,015 × 26.000
= 390 đồng
```

### Launch

```text
2.000 khoản chi × 2 file × 1,5 MB × 12 tháng / 1.024
= 70,31 GB steady-state

Phần tính phí
= 70,31 − 10
= 60,31 GB

60,31 × 390
≈ 23.522 đồng/tháng
```

### Scale

```text
15.000 khoản chi × 2 file × 1,5 MB × 12 tháng / 1.024
= 527,34 GB steady-state

Phần tính phí
= 527,34 − 10
= 517,34 GB

517,34 × 390
≈ 201.764 đồng/tháng
```

Pilot chỉ chạy trong thời gian ngắn và nằm trong 10 GB free tier.

## 4. Email

Resend Free hỗ trợ 3.000 email/tháng. Với hai email/khoản chi:

| Giai đoạn | Email/tháng | Gói |
|---|---:|---|
| Pilot | 600 | Free |
| Launch | 4.000 | Pro — 20 USD |
| Scale | 30.000 | Pro — 20 USD |

## 5. Tổng service trước dự phòng

### Pilot

```text
182.000 Render
+ 33.345 AI
+ 30.000 domain
= 245.345
```

### Launch

```text
520.000 Vercel
+ 182.000 Render
+ 390.000 Neon
+ 23.522 R2
+ 520.000 Resend
+ 222.300 AI
+ 30.000 domain
= 1.887.822
```

### Scale

```text
520.000 Vercel
+ 650.000 Render
+ 910.000 Neon
+ 201.764 R2
+ 520.000 Resend
+ 1.667.250 AI
+ 520.000 monitoring
+ 30.000 domain
= 5.019.014
```

Tổng cuối cùng bằng subtotal nhân 1,15 để dự phòng tỷ giá, retry và biến động vendor.

## 6. Vì sao không cộng support?

Mục tiêu của Phase 2 hiện tại là estimate **tiền service kỹ thuật**. Support phụ thuộc mô hình vận hành và số lượng nhân sự, nên để sang Phase 3 khi tính COGS kinh doanh đầy đủ.

## 7. Bản estimate cũ

Bản V1 có tính cả 720 giờ công và support được giữ tại `external/99-archive/cost-estimate-v1-full-economic.md`. Không sử dụng số liệu đó để trình bày Phase 2 hiện tại.
