/* ===== GIỎ HÀNG =====
   Giỏ là mảng { id, sl }, lưu trong localStorage để giữ giỏ khi chuyển trang. */
const KHOA_GIO = "techworld_gio";
const SL_TOI_DA = 10;          // khớp với ô số lượng ở trang chi tiết
let boNhoTam = [];             // dùng khi trình duyệt chặn localStorage

/* Đọc giỏ, bỏ các mục có id không còn trong SAN_PHAM */
function docGio() {
  let gio;
  try {
    gio = JSON.parse(localStorage.getItem(KHOA_GIO)) || [];
  } catch (e) {
    gio = boNhoTam;
  }
  return gio.filter(function (c) { return timSanPham(c.id); });
}

function luuGio(gio) {
  boNhoTam = gio;
  try {
    localStorage.setItem(KHOA_GIO, JSON.stringify(gio));
  } catch (e) { /* vẫn dùng bộ nhớ tạm */ }
  capNhatHuyHieu();
}

/* Thêm sản phẩm: đã có thì cộng dồn, không vượt quá SL_TOI_DA */
function themVaoGio(id, sl) {
  const gio = docGio();
  const them = sl || 1;
  const c = gio.find(function (x) { return x.id === Number(id); });
  if (c) {
    c.sl = Math.min(SL_TOI_DA, c.sl + them);
  } else {
    gio.push({ id: Number(id), sl: Math.min(SL_TOI_DA, them) });
  }
  luuGio(gio);
  const p = timSanPham(id);
  if (typeof hienThongBao === "function" && p) hienThongBao("Đã thêm " + p.ten + " vào giỏ hàng");
}

/* Đổi số lượng (d = +1 hoặc -1), kẹp trong khoảng 1 đến SL_TOI_DA */
function doiSoLuong(id, d) {
  let gio = docGio();
  const c = gio.find(function (x) { return x.id === Number(id); });
  if (!c) return;
  c.sl = Math.min(SL_TOI_DA, Math.max(1, c.sl + d));
  luuGio(gio);
}

function xoaKhoiGio(id) {
  luuGio(docGio().filter(function (x) { return x.id !== Number(id); }));
}

function xoaHetGio() {
  luuGio([]);
}

function tongSoLuong() {
  return docGio().reduce(function (t, c) { return t + c.sl; }, 0);
}

function tongTien() {
  return docGio().reduce(function (t, c) {
    const p = timSanPham(c.id);
    return t + (p ? p.gia * c.sl : 0);
  }, 0);
}

/* Cập nhật số trên nút giỏ hàng ở đầu trang */
function capNhatHuyHieu() {
  const el = document.getElementById("huyHieuGio");
  if (el) el.textContent = tongSoLuong();
}