/* ===== main.js: header, footer dùng chung và mã riêng từng trang =====
   Mỗi trang có <body data-trang="..."> để biết cần chạy phần nào. */

/* ---------- 1. DÙNG CHUNG: ĐẦU TRANG, CHÂN TRANG, THÔNG BÁO ---------- */
const MENU = [
  { href: "index.html", ten: "Trang chủ", trang: "index" },
  { href: "san-pham.html", ten: "Sản phẩm", trang: "san-pham" },
  { href: "lien-he.html", ten: "Liên hệ", trang: "lien-he" }
];

function dungDauTrang() {
  const hienTai = document.body.dataset.trang;
  const trangSang = hienTai === "chi-tiet" ? "san-pham" : hienTai; // chi tiết thuộc mục Sản phẩm
  const items = MENU.map(function (m) {
    const active = m.trang === trangSang ? " active" : "";
    const aria = m.trang === trangSang ? ' aria-current="page"' : "";
    return '<li class="nav-item"><a class="nav-link' + active + '"' + aria + ' href="' + m.href + '">' + m.ten + "</a></li>";
  }).join("");

  return (
    '<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">' +
      '<div class="container">' +
        '<a class="navbar-brand fw-bold fs-4" href="index.html">Tech<span class="text-warning">World</span></a>' +
        '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuChinh" aria-controls="menuChinh" aria-expanded="false" aria-label="Mở menu">' +
          '<span class="navbar-toggler-icon"></span></button>' +
        '<div class="collapse navbar-collapse" id="menuChinh">' +
          '<ul class="navbar-nav me-auto mb-2 mb-lg-0">' + items + "</ul>" +
          '<form class="d-flex me-lg-3 mb-2 mb-lg-0" action="san-pham.html" role="search">' +
            '<input class="form-control form-control-sm" type="search" name="q" placeholder="Tìm điện thoại, laptop..." aria-label="Tìm kiếm">' +
            '<button class="btn btn-sm btn-warning ms-2" type="submit" aria-label="Tìm"><i class="fa-solid fa-magnifying-glass"></i></button>' +
          "</form>" +
          '<span class="btn btn-primary disabled" aria-disabled="true"><i class="fa-solid fa-cart-shopping me-1"></i>Giỏ hàng</span>' +
          dungMucTaiKhoan() +
        "</div>" +
      "</div>" +
    "</nav>"
  );
}

/* Chưa đăng nhập: nút Đăng nhập. Đã đăng nhập: tên người dùng và menu đăng xuất */
function dungMucTaiKhoan() {
  const u = nguoiDangNhap();
  if (!u) {
    return '<a class="btn btn-outline-light ms-lg-2 mt-2 mt-lg-0" href="dang-nhap.html">' +
      '<i class="fa-solid fa-user me-1"></i>Đăng nhập</a>';
  }
  return '<div class="dropdown ms-lg-2 mt-2 mt-lg-0">' +
    '<button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">' +
      '<i class="fa-solid fa-user me-1"></i>Xin chào, ' + u.ten.split(" ").pop() + "</button>" +
    '<ul class="dropdown-menu dropdown-menu-end"><li><span class="dropdown-item-text small text-muted">' + u.email + "</span></li>" +
      '<li><button class="dropdown-item" type="button" onclick="dangXuat(); location.href=\'index.html\'">Đăng xuất</button></li></ul>' +
  "</div>";
}

function dungChanTrang() {
  return (
    '<footer class="chan-trang text-light pt-5 pb-3 mt-5">' +
      '<div class="container">' +
        '<div class="row g-4">' +
          '<div class="col-md-4"><h2 class="h5 fw-bold">Tech<span class="text-warning">World</span></h2>' +
            '<p class="small text-secondary">Cửa hàng điện thoại và laptop chính hãng. Giá tốt, bảo hành rõ ràng, giao hàng nhanh.</p></div>' +
          '<div class="col-6 col-md-4"><h3 class="h6">Liên kết</h3><ul class="list-unstyled small">' +
            '<li><a href="index.html">Trang chủ</a></li><li><a href="san-pham.html">Sản phẩm</a></li>' +
            '<li><a href="dang-nhap.html">Đăng nhập</a></li><li><a href="lien-he.html">Liên hệ</a></li></ul></div>' +
          '<div class="col-6 col-md-4"><h3 class="h6">Liên hệ</h3><ul class="list-unstyled small text-secondary">' +
            '<li><i class="fa-solid fa-location-dot me-2"></i>TP. Vinh, Nghệ An</li>' +
            '<li><i class="fa-solid fa-phone me-2"></i>0900 000 000</li>' +
            '<li><i class="fa-solid fa-envelope me-2"></i>techworld@example.com</li></ul></div>' +
        "</div>" +
        '<hr class="border-secondary">' +
        '<p class="small text-center text-secondary mb-0">© 2026 TechWorld – Website đồ án – Trường Đại học Nghệ An. Giá và thông số sản phẩm là dữ liệu mẫu.</p>' +
      "</div>" +
    "</footer>"
  );
}

/* Thông báo nhỏ góc phải dùng Toast của Bootstrap */
function hienThongBao(noiDung) {
  let vung = document.getElementById("vungThongBao");
  if (!vung) {
    vung = document.createElement("div");
    vung.id = "vungThongBao";
    vung.className = "toast-container position-fixed bottom-0 end-0 p-3";
    document.body.appendChild(vung);
  }
  const el = document.createElement("div");
  el.className = "toast align-items-center text-bg-success border-0";
  el.setAttribute("role", "status");
  el.innerHTML = '<div class="d-flex"><div class="toast-body">' + noiDung +
    '</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Đóng"></button></div>';
  vung.appendChild(el);
  const t = new bootstrap.Toast(el, { delay: 2200 });
  el.addEventListener("hidden.bs.toast", function () { el.remove(); });
  t.show();
}

/* ---------- 2. TRANG CHỦ: chỉ hiện sản phẩm nổi bật, tối đa 4 ---------- */
function khoiTaoTrangChu() {
  const noi = document.getElementById("spNoiBat");
  noi.innerHTML = SAN_PHAM.filter(function (p) { return p.noiBat; }).slice(0, 4).map(taoThe).join("");
}

/* ---------- 3. TRANG SẢN PHẨM: lọc, tìm kiếm không dấu, sắp xếp ---------- */
function khoiTaoTrangSanPham() {
  const tham = new URLSearchParams(location.search);
  let loai = tham.get("loai") || "all";
  const oTim = document.getElementById("oTim");
  const oSapXep = document.getElementById("oSapXep");
  oTim.value = tham.get("q") || "";

  function ve() {
    const tuKhoa = boDau(oTim.value.trim());
    let ds = SAN_PHAM.filter(function (p) {
      const dungLoai = loai === "all" || p.loai === loai;
      const dungTen = boDau(p.ten + " " + p.hang).indexOf(tuKhoa) !== -1;
      return dungLoai && dungTen;
    });
    if (oSapXep.value === "tang") ds = ds.slice().sort(function (a, b) { return a.gia - b.gia; });
    if (oSapXep.value === "giam") ds = ds.slice().sort(function (a, b) { return b.gia - a.gia; });
    document.getElementById("luoiSP").innerHTML = ds.map(taoThe).join("");
    document.getElementById("khongCo").classList.toggle("d-none", ds.length > 0);
    document.getElementById("demSP").textContent = ds.length;
  }

  document.querySelectorAll("[data-loai]").forEach(function (nut) {
    nut.classList.toggle("active", nut.dataset.loai === loai);
    nut.addEventListener("click", function () {
      loai = nut.dataset.loai;
      document.querySelectorAll("[data-loai]").forEach(function (n) { n.classList.toggle("active", n === nut); });
      ve();
    });
  });
  oTim.addEventListener("input", ve);
  oSapXep.addEventListener("change", ve);
  ve();
}

/* ---------- 4. TRANG CHI TIẾT ---------- */
function khoiTaoTrangChiTiet() {
  const id = new URLSearchParams(location.search).get("id");
  const p = timSanPham(id);
  const vung = document.getElementById("noiDungChiTiet");
  if (!p) {
    vung.innerHTML = '<div class="alert alert-warning">Không tìm thấy sản phẩm. <a href="san-pham.html">Quay lại danh sách</a></div>';
    return;
  }
  document.title = p.ten + " - TechWorld";
  document.getElementById("tenTrangCT").textContent = p.ten;

  const thongSo = Object.keys(p.thongSo).map(function (k) {
    return '<tr><th scope="row" class="w-40">' + k + "</th><td>" + p.thongSo[k] + "</td></tr>";
  }).join("");
  const giaCu = p.giaCu ? '<span class="text-muted text-decoration-line-through ms-2 fs-6">' + tien(p.giaCu) + "</span>" : "";
  const tinhTrang = p.tonKho > 0
    ? '<span class="text-success"><i class="fa-solid fa-circle-check me-1"></i>Còn hàng (' + p.tonKho + " máy)</span>"
    : '<span class="text-danger"><i class="fa-solid fa-circle-xmark me-1"></i>Hết hàng</span>';

  vung.innerHTML =
    '<div class="col-md-6"><div class="anh-lon"><img src="' + p.anh + '" alt="' + p.ten + '" class="img-fluid" onerror="' + ANH_LOI + '"></div></div>' +
    '<div class="col-md-6">' +
      '<small class="text-muted">' + p.hang + "</small>" +
      '<h1 class="h2 fw-bold">' + p.ten + "</h1>" +
      '<p class="text-secondary">' + p.mota + "</p>" +
      '<div class="gia fs-3 mb-1">' + tien(p.gia) + giaCu + "</div>" +
      '<div class="small mb-3">' + tinhTrang + "</div>" +
      '<div class="mb-4">' +
        '<span class="btn btn-primary disabled" aria-disabled="true"><i class="fa-solid fa-cart-plus me-1"></i>Thêm vào giỏ</span>' +
      "</div>" +
      '<h2 class="h5">Thông số nổi bật</h2>' +
      '<table class="table table-striped"><tbody>' + thongSo + "</tbody></table>" +
      '<ul class="list-unstyled small text-secondary">' +
        '<li><i class="fa-solid fa-shield-halved me-2 text-primary"></i>Bảo hành chính hãng 12 tháng</li>' +
        '<li><i class="fa-solid fa-truck-fast me-2 text-primary"></i>Giao hàng nhanh toàn quốc</li></ul>' +
    "</div>";

  const lienQuan = SAN_PHAM.filter(function (x) { return x.loai === p.loai && x.id !== p.id; }).slice(0, 4);
  document.getElementById("spLienQuan").innerHTML = lienQuan.map(taoThe).join("");
}

/* ---------- 6. TRANG LIÊN HỆ ---------- */
function khoiTaoTrangLienHe() {
  const form = document.getElementById("formLienHe");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.classList.add("was-validated"); return; }
    document.getElementById("loiCamOn").textContent =
      "Cảm ơn " + document.getElementById("hoTen").value.trim() + "! TechWorld sẽ gọi lại cho bạn sớm nhất.";
    document.getElementById("thongBaoLH").classList.remove("d-none");
    form.reset();
    form.classList.remove("was-validated");
  });
}

/* ---------- 7. TRANG ĐĂNG NHẬP / ĐĂNG KÝ ---------- */
function khoiTaoTrangDangNhap() {
  const u = nguoiDangNhap();
  if (u) {
    document.getElementById("khungForm").classList.add("d-none");
    document.getElementById("daDangNhap").classList.remove("d-none");
    document.getElementById("tenNguoiDung").textContent = u.ten;
    document.getElementById("nutDangXuat").addEventListener("click", function () {
      dangXuat();
      location.href = "dang-nhap.html";
    });
    return;
  }
  if (new URLSearchParams(location.search).get("tab") === "dangky") {
    bootstrap.Tab.getOrCreateInstance(document.getElementById("tabDangKy")).show();
  }

  const formDN = document.getElementById("formDangNhap");
  formDN.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!formDN.checkValidity()) { formDN.classList.add("was-validated"); return; }
    const kq = dangNhap(document.getElementById("dnEmail").value, document.getElementById("dnMatKhau").value);
    const hop = document.getElementById("thongBaoDN");
    hop.classList.remove("d-none");
    hop.className = "alert mt-3 " + (kq.ok ? "alert-success" : "alert-danger");
    hop.textContent = kq.ok ? "Đăng nhập thành công! Đang chuyển về trang chủ..." : kq.loi;
    if (kq.ok) setTimeout(function () { location.href = "index.html"; }, 900);
  });

  const formDK = document.getElementById("formDangKy");
  const o1 = document.getElementById("dkMatKhau");
  const o2 = document.getElementById("dkNhapLai");
  function kiemTraTrung() { o2.setCustomValidity(o1.value === o2.value ? "" : "khac"); }
  o1.addEventListener("input", kiemTraTrung);
  o2.addEventListener("input", kiemTraTrung);

  formDK.addEventListener("submit", function (e) {
    e.preventDefault();
    kiemTraTrung();
    if (!formDK.checkValidity()) { formDK.classList.add("was-validated"); return; }
    const kq = dangKy(document.getElementById("dkTen").value, document.getElementById("dkEmail").value, o1.value);
    const hop = document.getElementById("thongBaoDK");
    hop.classList.remove("d-none");
    hop.className = "alert mt-3 " + (kq.ok ? "alert-success" : "alert-danger");
    hop.textContent = kq.ok ? "Đăng ký thành công! Hãy chuyển sang tab Đăng nhập." : kq.loi;
    if (kq.ok) {
      document.getElementById("dnEmail").value = document.getElementById("dkEmail").value;
      formDK.reset();
      formDK.classList.remove("was-validated");
    }
  });
}

/* ---------- 8. CHẠY KHI MỞ TRANG ---------- */
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("dauTrang").innerHTML = dungDauTrang();
  document.getElementById("chanTrang").innerHTML = dungChanTrang();

  const trang = document.body.dataset.trang;
  if (trang === "index") khoiTaoTrangChu();
  if (trang === "san-pham") khoiTaoTrangSanPham();
  if (trang === "chi-tiet") khoiTaoTrangChiTiet();
  if (trang === "lien-he") khoiTaoTrangLienHe();
  if (trang === "dang-nhap") khoiTaoTrangDangNhap();
});

/* ---------- 9. HIỆU ỨNG: HIỆN KHI CUỘN, NÚT LÊN ĐẦU TRANG ---------- */
document.addEventListener("DOMContentLoaded", function () {
  if ("IntersectionObserver" in window) {
    const quanSat = new IntersectionObserver(function (ds) {
      ds.forEach(function (m) {
        if (m.isIntersecting) { m.target.classList.add("da-hien"); quanSat.unobserve(m.target); }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll(".the-danh-muc, .o-uu-diem, .tieu-de-muc").forEach(function (el) {
      const khung = el.classList.contains("the-danh-muc") ? el.parentElement : el;
      khung.classList.add("cho-hien");
      quanSat.observe(khung);
    });
  }

  const nut = document.createElement("button");
  nut.id = "nutLenDau";
  nut.type = "button";
  nut.className = "btn btn-warning p-0";
  nut.setAttribute("aria-label", "Lên đầu trang");
  nut.textContent = "↑";
  document.body.appendChild(nut);
  nut.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  window.addEventListener("scroll", function () { nut.classList.toggle("hien", window.scrollY > 300); }, { passive: true });
});
