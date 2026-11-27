/* ===== DỮ LIỆU SẢN PHẨM (website tĩnh: không có giỏ hàng thật) =====
   Thêm sản phẩm: copy một khối trong SAN_PHAM, đổi id để không trùng.
   Giá và thông số là DỮ LIỆU MẪU, cần cập nhật theo giá thực tế trước khi nộp. */
const SAN_PHAM = [
  { id: 1, ten: "iPhone 15 Pro", hang: "Apple", loai: "phone", gia: 28990000, giaCu: 30990000,
    anh: "images/iphone_15_pro.webp", moi: true, noiBat: true, tonKho: 12,
    mota: "Chip A17 Pro mạnh mẽ, khung titan nhẹ và bền.",
    thongSo: { "Màn hình": "6.1 inch OLED", "Chip": "A17 Pro", "RAM": "8 GB", "Bộ nhớ": "128 GB", "Pin": "Khoảng 3274 mAh" } },
  { id: 2, ten: "Samsung Galaxy S24", hang: "Samsung", loai: "phone", gia: 22990000, giaCu: 24990000,
    anh: "images/samsung_s24.png", moi: true, noiBat: true, tonKho: 8,
    mota: "Màn hình 120Hz mượt mà, camera tích hợp AI.",
    thongSo: { "Màn hình": "6.2 inch AMOLED 120Hz", "Chip": "Snapdragon 8 Gen 3", "RAM": "8 GB", "Bộ nhớ": "256 GB", "Pin": "4000 mAh" } },
  { id: 3, ten: "Xiaomi 14", hang: "Xiaomi", loai: "phone", gia: 15990000, giaCu: 0,
    anh: "images/xiaomi_14.webp", moi: false, noiBat: false, tonKho: 15,
    mota: "Camera hợp tác Leica, sạc siêu nhanh.",
    thongSo: { "Màn hình": "6.36 inch AMOLED", "Chip": "Snapdragon 8 Gen 3", "RAM": "12 GB", "Bộ nhớ": "256 GB", "Pin": "4610 mAh" } },
  { id: 4, ten: "OPPO Reno 11", hang: "OPPO", loai: "phone", gia: 9990000, giaCu: 10990000,
    anh: "images/oppo_reno_11.png", moi: false, noiBat: false, tonKho: 0,
    mota: "Chụp chân dung đẹp, pin dùng cả ngày dài.",
    thongSo: { "Màn hình": "6.7 inch AMOLED", "Chip": "Dimensity 7050", "RAM": "8 GB", "Bộ nhớ": "256 GB", "Pin": "5000 mAh" } },
  { id: 5, ten: "MacBook Air M2", hang: "Apple", loai: "laptop", gia: 26990000, giaCu: 28990000,
    anh: "images/macbook_air_m2.webp", moi: true, noiBat: true, tonKho: 5,
    mota: "Mỏng nhẹ, không quạt, pin dùng cả ngày.",
    thongSo: { "Màn hình": "13.6 inch Liquid Retina", "Chip": "Apple M2", "RAM": "8 GB", "Ổ cứng": "256 GB SSD", "Trọng lượng": "1.24 kg" } },
  { id: 6, ten: "Dell XPS 13", hang: "Dell", loai: "laptop", gia: 31990000, giaCu: 0,
    anh: "images/dell_xps_13.webp", moi: false, noiBat: true, tonKho: 4,
    mota: "Màn hình viền siêu mỏng, thiết kế cao cấp.",
    thongSo: { "Màn hình": "13.4 inch FHD+", "Chip": "Intel Core i7", "RAM": "16 GB", "Ổ cứng": "512 GB SSD", "Trọng lượng": "1.2 kg" } },
  { id: 7, ten: "ASUS TUF Gaming", hang: "ASUS", loai: "laptop", gia: 19990000, giaCu: 21990000,
    anh: "images/asus_tuf_gaming.webp", moi: false, noiBat: false, tonKho: 6,
    mota: "Chiến game mượt mà, tản nhiệt tốt, bền bỉ.",
    thongSo: { "Màn hình": "15.6 inch 144Hz", "Chip": "Intel Core i5 / Ryzen 5", "RAM": "16 GB", "Ổ cứng": "512 GB SSD", "Card đồ họa": "RTX 3050" } },
  { id: 8, ten: "Lenovo ThinkPad E14", hang: "Lenovo", loai: "laptop", gia: 16990000, giaCu: 0,
    anh: "images/levono_thinkpad_e14.webp", moi: false, noiBat: false, tonKho: 10,
    mota: "Bền bbbbỉ=, bàn phím tốt, hợp làm việc văn phòng.",
    thongSo: { "Màn hình": "14 inch FHD", "Chip": "Intel Core i5", "RAM": "16 GB", "Ổ cứng": "512 GB SSD", "Trọng lượng": "1.4 kg" } }
];

/* Định dạng tiền: 28990000 -> 28.990.000đ */
function tien(n) {
  return n.toLocaleString("vi-VN") + "đ";
}

/* Bỏ dấu tiếng Việt và chuyển về chữ thường, dùng để so sánh khi tìm kiếm */
function boDau(s) {
  return s.normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/đ/g, "d")
          .replace(/Đ/g, "D")
          .toLowerCase();
}

/* Tìm sản phẩm theo mã */
function timSanPham(id) {
  return SAN_PHAM.find(function (p) { return p.id === Number(id); });
}

/* Ảnh dự phòng: nếu thiếu ảnh thật thì hiện placeholder */
const ANH_LOI = "this.onerror=null;this.src='images/placeholder.svg'";

/* Tạo HTML một thẻ sản phẩm (dùng chung cho trang chủ, sản phẩm, chi tiết) */
function taoThe(p) {
  const giaCu = p.giaCu ? '<small class="d-block text-muted text-decoration-line-through fw-normal">' + tien(p.giaCu) + "</small>" : "";
  const nhan = p.moi ? '<span class="badge bg-warning text-dark position-absolute top-0 start-0 m-2">Mới</span>' : "";
  return (
    '<div class="col-6 col-md-4 col-lg-3">' +
      '<div class="card h-100 the-sp position-relative">' +
        nhan +
        '<a href="chi-tiet.html?id=' + p.id + '" class="khung-anh">' +
          '<img src="' + p.anh + '" class="card-img-top" alt="' + p.ten + '" loading="lazy" onerror="' + ANH_LOI + '">' +
        "</a>" +
        '<div class="card-body d-flex flex-column">' +
          '<small class="text-muted">' + p.hang + "</small>" +
          '<h3 class="h6 card-title"><a href="chi-tiet.html?id=' + p.id + '" class="text-decoration-none text-dark">' + p.ten + "</a></h3>" +
          '<p class="card-text small text-secondary mb-2">' + p.mota + "</p>" +
          '<div class="mt-auto">' +
            '<div class="gia mb-2">' + tien(p.gia) + giaCu + "</div>" +
            '<span class="btn btn-primary btn-sm w-100 disabled" aria-disabled="true">' +
              '<i class="fa-solid fa-cart-plus me-1"></i>Thêm vào giỏ</span>' +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>"
  );
}