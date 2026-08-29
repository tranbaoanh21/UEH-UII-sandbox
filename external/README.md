# Tài liệu cuộc thi — Navigation map

Thư mục này tách khỏi source React và được đánh số theo thứ tự nên đọc.

## Đường đi nhanh

### Teammate muốn hiểu sản phẩm

```text
01-product/latest-requirements.md
    ↓
01-product/product-brief.md
    ↓
03-design/diagrams/rendered/
```

### Người phụ trách technical product

```text
01-product/latest-requirements.md
    ↓
root/app/mvp-demo.tsx
    ↓
04-costing/cost-estimate.md
    ↓
Phase 3: pricing (chưa tạo)
```

### Người chuẩn bị file trình bày

```text
06-deliverables/
    ↑
99-archive/latex-product-brief/
```

## Bản đồ thư mục

```text
external/
├── 01-product/          # Ý tưởng chốt và requirement hiện tại
├── 02-research/         # Khảo sát và dữ liệu thử nghiệm form
├── 03-design/           # Mermaid diagram và ảnh UI MVP
├── 04-costing/          # Phase 2: estimate chi phí
├── 05-pricing/          # Phase 3: giá bán và gói sản phẩm
├── 06-deliverables/     # PDF/file hoàn chỉnh để chia sẻ
└── 99-archive/          # Source LaTeX, assets và build cache cũ
```

## Quy tắc lưu file mới

- Requirement hoặc thay đổi ý tưởng → `01-product/`.
- Khảo sát, interview, dữ liệu nghiên cứu → `02-research/`.
- Diagram, wireframe, screenshot UI → `03-design/`.
- Cost model và pricing → `04-costing/` hoặc thư mục Phase tiếp theo.
- Giá bán, package và unit economics → `05-pricing/`.
- PDF/DOCX cuối cùng dùng để nộp hoặc trình bày → `06-deliverables/`.
- File trung gian hoặc source tài liệu cũ → `99-archive/`.

Không đặt source React trong `external/`; source sản phẩm luôn nằm ở `app/` tại root.
