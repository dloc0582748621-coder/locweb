/* ===== TÀI KHOẢN (ĐĂNG NHẬP GIẢ LẬP) =====
   Lưu ý: website không có máy chủ, nên tài khoản chỉ được lưu trong
   localStorage của trình duyệt này. Cách làm này chỉ để minh hoạ giao diện
   trong đồ án, KHÔNG bảo mật như một website thật. */
const KHOA_TAI_KHOAN = "techworld_taikhoan"; // danh sách tài khoản đã đăng ký
const KHOA_DANG_NHAP = "techworld_dangnhap"; // email của người đang đăng nhập
let boNhoTaiKhoan = [];
let boNhoDangNhap = "";

function docTaiKhoan() {
  try {
    return JSON.parse(localStorage.getItem(KHOA_TAI_KHOAN)) || [];
  } catch (e) {
    return boNhoTaiKhoan;
  }
}

function luuTaiKhoan(ds) {
  boNhoTaiKhoan = ds;
  try { localStorage.setItem(KHOA_TAI_KHOAN, JSON.stringify(ds)); } catch (e) { /* dùng bộ nhớ tạm */ }
}

/* Trả về tài khoản đang đăng nhập, hoặc undefined nếu chưa đăng nhập */
function nguoiDangNhap() {
  let email = boNhoDangNhap;
  try { email = localStorage.getItem(KHOA_DANG_NHAP) || ""; } catch (e) { /* dùng bộ nhớ tạm */ }
  return docTaiKhoan().find(function (t) { return t.email === email; });
}

/* Đăng ký: trả về { ok: true } hoặc { ok: false, loi: "..." } */
function dangKy(ten, email, matKhau) {
  email = email.trim().toLowerCase();
  const ds = docTaiKhoan();
  if (ds.some(function (t) { return t.email === email; })) {
    return { ok: false, loi: "Email này đã được đăng ký. Hãy đăng nhập." };
  }
  ds.push({ ten: ten.trim(), email: email, matKhau: matKhau });
  luuTaiKhoan(ds);
  return { ok: true };
}

/* Đăng nhập: kiểm tra email và mật khẩu */
function dangNhap(email, matKhau) {
  email = email.trim().toLowerCase();
  const tk = docTaiKhoan().find(function (t) { return t.email === email && t.matKhau === matKhau; });
  if (!tk) return { ok: false, loi: "Email hoặc mật khẩu chưa đúng." };
  boNhoDangNhap = email;
  try { localStorage.setItem(KHOA_DANG_NHAP, email); } catch (e) { /* dùng bộ nhớ tạm */ }
  return { ok: true, ten: tk.ten };
}

function dangXuat() {
  boNhoDangNhap = "";
  try { localStorage.removeItem(KHOA_DANG_NHAP); } catch (e) { /* bỏ qua */ }
}
