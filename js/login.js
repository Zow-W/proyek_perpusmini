let user = [];

async function login() {

  try {

    const response = await fetch("../js/data_user.json");

    if (!response.ok) {
      throw new Error("data_user.json tidak ditemukan");
    }

    user = await response.json();

    console.log("Data user berhasil diambil");
    console.log(user);

  } catch (error) {

    console.log("ERROR:", error);

  }

}


// Jalankan ambil data
login();


// ========================================
// PROSES LOGIN
// ========================================

function temukan(event) {

  // Biar halaman tidak refresh
  event.preventDefault();


  // Ambil input username
  const username =
    document.getElementById("username").value.trim();


  // Ambil input password
  const password =
    document.getElementById("password").value.trim();


  // Tempat pesan error
  const pesan =
    document.getElementById("pesan");


  // ========================================
  // CEK INPUT KOSONG
  // ========================================

  if (username === "" || password === "") {

    pesan.innerHTML =
      "Username dan password wajib diisi!";

    return;

  }


  // ========================================
  // CARI USER
  // ========================================

  const ditemukan = user.find(
    (u) =>
      u.username === username &&
      String(u.password) === password
  );


  // ========================================
  // KALAU USER DITEMUKAN
  // ========================================

  if (ditemukan) {

    console.log("Login berhasil");
    console.log(ditemukan);


    // ========================================
    // SIMPAN DATA USER YANG LOGIN
    // ========================================

    sessionStorage.setItem(
      "username",
      ditemukan.username
    );

    sessionStorage.setItem(
      "nama",
      ditemukan.nama
    );

    sessionStorage.setItem(
      "email",
      ditemukan.email
    );

    sessionStorage.setItem(
      "telphone",
      ditemukan.telphone || ""
    );

    sessionStorage.setItem(
      "image",
      ditemukan.image || "../assets/kucing.jpg"
    );


    // ========================================
    // BUAT KERANJANG KHUSUS USER
    // ========================================

    const keranjangKey =
      "keranjang_" + ditemukan.username;

    if (!localStorage.getItem(keranjangKey)) {

      localStorage.setItem(
        keranjangKey,
        JSON.stringify([])
      );

    }


    // ========================================
    // BUAT FAVORIT KHUSUS USER
    // ========================================

    const favoritKey =
      "favorit_" + ditemukan.username;

    if (!localStorage.getItem(favoritKey)) {

      localStorage.setItem(
        favoritKey,
        JSON.stringify([])
      );

    }


    // ========================================
    // MASUK HOME
    // ========================================

    window.location.href =
      "./home.html";

  }

}