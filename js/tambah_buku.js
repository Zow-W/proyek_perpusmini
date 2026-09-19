function tampilkanAkun() {
  const usernameLogin = sessionStorage.getItem("username");

  if (!usernameLogin) {
    window.location.href = "../dist/login.html";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const userTerbaru = users.find(function (user) {
    return user.username === usernameLogin;
  });

  const namaLogin =
    (userTerbaru && userTerbaru.nama) ||
    sessionStorage.getItem("nama");

  const emailLogin =
    (userTerbaru && userTerbaru.email) ||
    sessionStorage.getItem("email");

  const imageLogin =
    (userTerbaru && userTerbaru.image) ||
    sessionStorage.getItem("image");

  if (userTerbaru) {
    if (userTerbaru.nama) {
      sessionStorage.setItem("nama", userTerbaru.nama);
    }

    if (userTerbaru.email) {
      sessionStorage.setItem("email", userTerbaru.email);
    }

    if (userTerbaru.telphone) {
      sessionStorage.setItem("telphone", userTerbaru.telphone);
    }

    if (userTerbaru.image) {
      sessionStorage.setItem("image", userTerbaru.image);
    }
  }

  const namaUser = document.getElementById("namaUser");
  const emailUser = document.getElementById("emailUser");
  const fotoUser = document.getElementById("fotoUser");

  if (namaUser) {
    namaUser.textContent = namaLogin || "User";
  }

  if (emailUser) {
    emailUser.textContent = emailLogin || "";
  }

  if (fotoUser) {
    fotoUser.src = imageLogin || "../assets/kucing.jpg";
  }
}

function tambah() {
  const namaBuku =
    document.getElementById("namaBuku").value.trim();

  const kategori =
    document.getElementById("kategori").value;

  const penulis =
    document.getElementById("penulis").value.trim();

  const tahun =
    document.getElementById("tahun").value;

  const rating =
    document.getElementById("rating").value;

  const jumlahHalaman =
    document.getElementById("jumlahHalaman").value.trim();

  const deskripsi =
    document.getElementById("deskripsi").value.trim();

  const gambar =
    document.getElementById("gambarBuku").files[0];

  if (
    namaBuku === "" ||
    kategori === "" ||
    penulis === "" ||
    tahun === "" ||
    rating === "" ||
    jumlahHalaman === "" ||
    deskripsi === "" ||
    !gambar
  ) {
    alert("Semua data buku harus diisi terlebih dahulu!");
    return;
  }

  alert("Buku berhasil ditambahkan !!");
}

tampilkanAkun();