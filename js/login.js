// =========================
// LOGIN
// =========================

const form = document.querySelector("form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  // Ambil input
  const username = document
    .getElementById("Username")
    .value
    .trim();

  const password = document
    .getElementById("password")
    .value
    .trim();


  // =========================
  // CEK INPUT KOSONG
  // =========================

  if (username === "" || password === "") {
    alert("Username dan password wajib diisi!");
    return;
  }


  try {

    // =========================
    // AMBIL DATA USER
    // =========================

    const response = await fetch("../js/data_user.json");

    if (!response.ok) {
      throw new Error("data_user.json tidak ditemukan");
    }

    const users = await response.json();


    // =========================
    // CARI USER
    // =========================

    const user = users.find(
      (item) =>
        item.username === username &&
        String(item.password) === password
    );


    // =========================
    // JIKA USER SALAH
    // =========================

    if (!user) {
      alert("Username atau password salah!");
      return;
    }


    // =========================
    // SIMPAN USER LOGIN
    // =========================

    localStorage.setItem(
      "userLogin",
      JSON.stringify(user)
    );


    // =========================
    // MASUK KE HOME
    // =========================

    window.location.href = "./home.html";


  } catch (error) {

    console.error(error);

    alert(
      "Gagal mengambil data user. Pastikan data_user.json ada dan Live Server aktif."
    );

  }

});