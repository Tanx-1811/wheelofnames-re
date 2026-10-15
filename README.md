# Dịch ngược wheelofnames.com

Phân tích cách trang [wheelofnames.com](https://wheelofnames.com/) hoạt động, thực hiện bằng [REA – Reverse Engineer Anything](https://github.com/morluto/rea) (bản 6.5.0, ngày 15/10/2026, site bản v436).

> Đây là phân tích độc lập, không liên kết với Wheel of Names. Repo không chứa mã nguồn, âm thanh hay hình ảnh gốc của trang, ngoài vài ảnh chụp màn hình minh hoạ.

👉 **Báo cáo đầy đủ: [BAO-CAO.md](BAO-CAO.md)**

![Sau khi quay](anh/3-sau-khi-quay.png)

## Kết quả chính

- **Công nghệ:** SPA Vue 3 + Quasar + Pinia, build bằng Vite/Rolldown. Bánh xe là một canvas 700×700; vật lý chạy cố định 60 tick/giây.
- **Chọn người thắng:** mỗi lượt quay gọi `crypto.getRandomValues` đúng 1 lần, ở giây thứ 1. Lúc đó bánh xe đang quay khoảng 5,8 vòng/giây và được gán thẳng tới một góc ngẫu nhiên. 9 giây giảm tốc sau đó đã tính sẵn.
- **Xác suất công bằng:** 1/n cho mỗi tên, hoặc theo trọng số ở chế độ Advanced. Đã kiểm chứng bằng cách đo số lần chạy từng hàm khi quay thật, và bằng mô phỏng 200.000 lượt.
- **Không có server quyết định kết quả:** lúc quay chỉ có tải âm thanh và một sự kiện Google Analytics.
- **Backend:** REST `/api/v3` để lưu, chia sẻ, gallery và cấp API key; đăng nhập bằng Firebase Authentication; nhập danh sách từ Google Sheets.
- **Quảng cáo:** 1 lần tải trang + 1 lượt quay sinh ra 1.653 request tới 260 domain; chỉ 75 request là của chính trang.

## Nội dung repo

| Đường dẫn | Nội dung |
|---|---|
| [`BAO-CAO.md`](BAO-CAO.md) | Báo cáo: phương pháp, kiến trúc, thuật toán quay, kỹ thuật vẽ, mô hình dữ liệu, API, quảng cáo, giới hạn |
| [`anh/`](anh) | Ảnh chụp do REA ghi lại: trước, trong, sau khi quay và chế độ tối |
| [`cong-cu/kich-ban-quay*.json`](cong-cu) | Kịch bản `capture-browser-scenario` của REA: mở trang, bấm quay, ghi mạng và ảnh |
| [`cong-cu/click-spin.mjs`](cong-cu/click-spin.mjs) | Bấm quay qua CDP trong lúc REA đo thực thi |
| [`cong-cu/spin-model.mjs`](cong-cu/spin-model.mjs) | Mô hình tự viết lại để tính thời gian, số vòng và mô phỏng độ công bằng |

Evidence gốc của REA và mã đã tải về không có trong repo vì chứa mã của trang. Cách tạo lại nằm ở [mục 10 của báo cáo](BAO-CAO.md#10-chạy-lại-phân-tích).

## Chạy thử nhanh

```bash
node cong-cu/spin-model.mjs   # không cần mạng; in thời gian các pha và tỉ lệ trúng của 8 tên
```
