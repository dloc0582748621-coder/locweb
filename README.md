# locweb
# Quản lý Tiền Điện - Nước Phòng Trọ

Dự án giúp chủ trọ ghi chỉ số điện nước hằng tháng, tính tiền tự động cho từng phòng, lập hóa đơn và theo dõi việc thu tiền. Mục tiêu: nhanh, chính xác, minh bạch với người thuê.

## Mục lục

1. [Tính năng](#tính-năng)
2. [Cấu trúc dữ liệu](#cấu-trúc-dữ-liệu)
3. [Công thức tính](#công-thức-tính)
4. [Hướng dẫn sử dụng](#hướng-dẫn-sử-dụng)
5. [Quy trình hằng tháng](#quy-trình-hằng-tháng)
6. [Câu hỏi thường gặp](#câu-hỏi-thường-gặp)
7. [Đóng góp và liên hệ](#đóng-góp-và-liên-hệ)

## Tính năng

- Quản lý danh sách phòng và người thuê.
- Ghi chỉ số điện, nước đầu kỳ và cuối kỳ cho từng phòng.
- Tự động tính tiêu thụ và thành tiền.
- Hỗ trợ cả hai cách tính nước: theo số đồng hồ hoặc khoán theo đầu người.
- Cộng thêm các khoản phí khác: rác, wifi, gửi xe.
- Xuất hóa đơn từng phòng để gửi qua Zalo hoặc in giấy.
- Theo dõi trạng thái: đã thu, chưa thu, thu thiếu.
- Lưu lịch sử các tháng để đối chiếu.

## Cấu trúc dữ liệu

### Bảng cấu hình (đơn giá)

| Mục | Ví dụ | Ghi chú |
|---|---|---|
| Đơn giá điện (đồng/kWh) | 3.500 | Nên bám theo quy định hiện hành tại địa phương |
| Đơn giá nước (đồng/m³) | 15.000 | Hoặc mức khoán đồng/người |
| Phí rác (đồng/phòng) | 20.000 | Không bắt buộc |
| Phí wifi (đồng/phòng) | 50.000 | Không bắt buộc |

### Bảng phòng

| Cột | Ý nghĩa |
|---|---|
| Mã phòng | Ví dụ: P101, P102 |
| Người thuê | Họ tên, số điện thoại |
| Giá thuê | Tiền phòng mỗi tháng |
| Số người | Dùng khi khoán nước theo đầu người |

### Bảng chỉ số hằng tháng

| Cột | Ý nghĩa |
|---|---|
| Tháng | Ví dụ: 11/2026 |
| Mã phòng | Liên kết với bảng phòng |
| Điện cũ / Điện mới | Chỉ số công tơ |
| Nước cũ / Nước mới | Chỉ số đồng hồ nước |
| Phí khác | Rác, wifi, gửi xe |
| Trạng thái | Chưa thu / Đã thu / Thu thiếu |

## Công thức tính

```
Điện tiêu thụ  = Điện mới − Điện cũ
Tiền điện      = Điện tiêu thụ × Đơn giá điện

Nước tiêu thụ  = Nước mới − Nước cũ
Tiền nước      = Nước tiêu thụ × Đơn giá nước      (tính theo số)
Tiền nước      = Số người × Mức khoán              (tính khoán)

Tổng thu       = Tiền phòng + Tiền điện + Tiền nước + Phí khác
```

**Ví dụ:** Phòng P101, điện 120 → 185 (65 kWh × 3.500 = 227.500), nước 8 → 12 (4 m³ × 15.000 = 60.000), tiền phòng 1.800.000, phí rác 20.000.
Tổng thu = 1.800.000 + 227.500 + 60.000 + 20.000 = **2.107.500 đồng**.

## Hướng dẫn sử dụng

### Bước 1: Thiết lập ban đầu (làm một lần)

1. Nhập đơn giá điện, nước và các khoản phí vào bảng cấu hình.
2. Nhập danh sách phòng: mã phòng, người thuê, giá thuê, số người.
3. Khi khách mới vào ở, ghi chỉ số điện nước ban đầu và chụp ảnh đồng hồ làm bằng chứng.
4. Ghi rõ đơn giá và cách tính vào hợp đồng thuê.

### Bước 2: Ghi chỉ số hằng tháng

1. Chọn một ngày cố định mỗi tháng (ví dụ ngày 1 hoặc ngày 5).
2. Đi từng phòng, ghi chỉ số điện và nước mới.
3. Chụp ảnh đồng hồ từng phòng, đặt tên theo dạng `P101_2026-11_dien.jpg`.
4. Nhập chỉ số mới vào bảng chỉ số của tháng. Chỉ số cũ lấy từ tháng trước.

### Bước 3: Kiểm tra số liệu

- Chỉ số mới phải lớn hơn hoặc bằng chỉ số cũ. Nếu nhỏ hơn, kiểm tra lại: có thể ghi nhầm hoặc đồng hồ đã được thay.
- So sánh mức tiêu thụ với tháng trước. Nếu tăng đột biến, hỏi lại người thuê hoặc kiểm tra rò rỉ.
- Cộng tổng các phòng và so với đồng hồ tổng. Chênh lệch lớn có thể do hao hụt hoặc thất thoát.

### Bước 4: Lập và gửi hóa đơn

1. Xuất hóa đơn cho từng phòng, gồm: chỉ số cũ, chỉ số mới, tiêu thụ, đơn giá, thành tiền và tổng cần thu.
2. Gửi cho người thuê qua Zalo hoặc phát phiếu giấy.
3. Ghi rõ hạn thanh toán (ví dụ trước ngày 10) và thông tin chuyển khoản.

### Bước 5: Thu tiền và đối chiếu

1. Khi nhận tiền, cập nhật trạng thái phòng: **Đã thu**, **Chưa thu** hoặc **Thu thiếu**.
2. Lưu biên nhận hoặc ảnh chuyển khoản.
3. Cuối tháng, đối chiếu tổng tiền đã thu với tổng phải thu.

### Bước 6: Khi khách trả phòng

1. Hai bên cùng chốt chỉ số điện nước cuối cùng và chụp ảnh.
2. Tính tiền phần còn lại đến ngày trả phòng.
3. Trừ vào tiền cọc nếu còn thiếu và lập biên bản bàn giao.

## Quy trình hằng tháng

| Ngày | Việc cần làm |
|---|---|
| Ngày 1 | Chốt chỉ số, chụp ảnh đồng hồ |
| Ngày 2 | Nhập số liệu, kiểm tra bất thường |
| Ngày 3 | Gửi hóa đơn cho người thuê |
| Ngày 10 | Hạn thanh toán |
| Ngày 11 | Nhắc phòng chưa thu, cập nhật trạng thái |
| Cuối tháng | Lưu trữ và đối chiếu số liệu |

## Câu hỏi thường gặp

**Đồng hồ bị hỏng hoặc thay mới thì tính thế nào?**
Chốt chỉ số cuối của đồng hồ cũ và chỉ số đầu của đồng hồ mới, có xác nhận hai bên. Tiêu thụ của tháng đó bằng tổng hai đoạn.

**Người thuê không đồng ý với số tiền?**
Gửi lại ảnh đồng hồ đã chụp và bảng tính chi tiết. Nên mời người thuê cùng ghi số từ đầu để tránh tranh cãi.

**Nên tính nước theo số hay khoán đầu người?**
Tính theo số công bằng hơn nếu mỗi phòng có đồng hồ riêng. Khoán đầu người đơn giản hơn khi không có đồng hồ riêng hoặc mức dùng đều nhau.

**Đơn giá điện nên đặt bao nhiêu?**
Nên bám theo biểu giá nhà nước hiện hành. Hãy kiểm tra quy định tại địa phương trước khi áp dụng và ghi rõ trong hợp đồng.

## Đóng góp và liên hệ

- Góp ý hoặc báo lỗi: mở một issue trong dự án, hoặc liên hệ trực tiếp với người quản lý.
- Mọi thay đổi về đơn giá cần được thông báo cho người thuê trước khi áp dụng.

---

*Tài liệu này là bản mẫu. Hãy cập nhật đơn giá, ngày chốt số và thông tin liên hệ cho phù hợp với nhà trọ của bạn.*
