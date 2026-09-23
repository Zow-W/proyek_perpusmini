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

tampilkanAkun();

function tampilkanRiwayat(filter = "Semua") {
  const container =
    document.getElementById("riwayatPeminjaman");

  if (!container) return;

  const semuaRiwayat =
    JSON.parse(
      localStorage.getItem("riwayatPeminjaman")
    ) || [];

  let riwayat = [...semuaRiwayat].reverse();

  if (filter !== "Semua") {
    riwayat = riwayat.filter(function (data) {
      let status = data.status || "";

      if (
        status.toLowerCase() ===
        "menunggu persetujuan"
      ) {
        status = "Dipinjam";
      }

      return (
        status.toLowerCase() ===
        filter.toLowerCase()
      );
    });
  }

  if (riwayat.length === 0) {
    container.innerHTML = `
      <div class="flex flex-col items-center justify-center text-center py-20">

        <iconify-icon
          icon="solar:history-linear"
          width="50"
          class="text-gray-300"
        ></iconify-icon>

        <h3 class="text-lg font-bold text-gray-700 mt-4">
          Belum Ada Riwayat Peminjaman
        </h3>

        <p class="text-sm text-gray-400 mt-2">
          Tidak ada aktivitas dengan status ${filter}.
        </p>

      </div>
    `;

    return;
  }

  container.innerHTML =
    riwayat.map(function (data) {

      let status =
        data.status || "Dipinjam";

      if (
        status.toLowerCase() ===
        "menunggu persetujuan"
      ) {
        status = "Dipinjam";
      }

      let warnaStatus = "";

      if (
        status.toLowerCase() ===
        "dipinjam"
      ) {
        warnaStatus =
          "bg-green-100 text-green-600";
      } else if (
        status.toLowerCase() ===
        "dikembalikan"
      ) {
        warnaStatus =
          "bg-blue-100 text-blue-600";
      } else if (
        status.toLowerCase() ===
        "terlambat"
      ) {
        warnaStatus =
          "bg-red-100 text-red-600";
      } else {
        warnaStatus =
          "bg-gray-100 text-gray-600";
      }

      return `
        <div
          class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-5"
        >

          <div
            class="flex items-center justify-between mb-5"
          >

            <h3
              class="text-sm font-bold text-[#13315C]"
            >
              Detail Peminjaman
            </h3>

            <span
              class="${warnaStatus} px-4 py-2 rounded-full text-[10px] font-medium"
            >
              ${status}
            </span>

          </div>

          <div
            class="grid grid-cols-2 gap-4 text-[11px] mb-6"
          >

            <div>
              <p class="text-gray-400">
                Peminjam
              </p>

              <p
                class="font-semibold text-gray-800 mt-1"
              >
                ${data.nama || "-"}
              </p>
            </div>

            <div>
              <p class="text-gray-400">
                Email
              </p>

              <p
                class="font-semibold text-gray-800 mt-1"
              >
                ${data.email || "-"}
              </p>
            </div>

            <div>
              <p class="text-gray-400">
                Asal Sekolah
              </p>

              <p
                class="font-semibold text-gray-800 mt-1"
              >
                ${data.sekolah || "-"}
              </p>
            </div>

            <div>
              <p class="text-gray-400">
                WhatsApp
              </p>

              <p
                class="font-semibold text-gray-800 mt-1"
              >
                ${data.whatsapp || "-"}
              </p>
            </div>

            <div>
              <p class="text-gray-400">
                Tanggal Pinjam
              </p>

              <p
                class="font-semibold text-[#174b82] mt-1"
              >
                ${data.tanggalPinjam || "-"}
              </p>
            </div>

            <div>
              <p class="text-gray-400">
                Tanggal Pengembalian
              </p>

              <p
                class="font-semibold text-[#174b82] mt-1"
              >
                ${data.tanggalKembali || "-"}
              </p>
            </div>

          </div>

          <div>

            <h3
              class="text-[12px] font-bold text-[#13315C] mb-3"
            >
              Buku yang Dipinjam
            </h3>

            <div
              class="flex flex-wrap gap-3"
            >

              ${
                (data.buku || [])
                  .map(function (buku) {
                    return `
                      <div
                        class="flex items-center gap-3 border border-gray-200 rounded-lg p-2 w-[250px]"
                      >

                        <img
                          src="${buku.image || "../assets/kucing.jpg"}"
                          class="w-[45px] h-[60px] object-cover rounded"
                          alt="${buku.Judul || "Buku"}"
                        >

                        <div>

                          <h4
                            class="text-[10px] font-bold text-[#13315C]"
                          >
                            ${buku.Judul || "Tanpa Judul"}
                          </h4>

                          <p
                            class="text-[9px] text-gray-400 mt-1"
                          >
                            ${buku.Author || "Unknown Author"}
                          </p>

                          <p
                            class="text-[9px] text-gray-400 mt-1"
                          >
                            ${buku.Category || ""}
                          </p>

                        </div>

                      </div>
                    `;
                  })
                  .join("")
              }

            </div>

          </div>

        </div>
      `;
    }).join("");
}

function buatFilterAktivitas() {
  const filterContainer =
    document.getElementById(
      "filterAktivitas"
    );

  if (!filterContainer) return;

  filterContainer.innerHTML = `
    <div
      class="flex items-center gap-2 mb-5"
    >

      <button
        onclick="pilihFilter(this, 'Semua')"
        class="filter-btn bg-[#13315C] text-white px-5 py-2 rounded-full text-[11px] font-medium"
      >
        Semua
      </button>

      <button
        onclick="pilihFilter(this, 'Dipinjam')"
        class="filter-btn bg-gray-100 text-gray-600 px-5 py-2 rounded-full text-[11px] font-medium hover:bg-green-100 hover:text-green-600 transition"
      >
        Dipinjam
      </button>

      <button
        onclick="pilihFilter(this, 'Dikembalikan')"
        class="filter-btn bg-gray-100 text-gray-600 px-5 py-2 rounded-full text-[11px] font-medium hover:bg-blue-100 hover:text-blue-600 transition"
      >
        Dikembalikan
      </button>

      <button
        onclick="pilihFilter(this, 'Terlambat')"
        class="filter-btn bg-gray-100 text-gray-600 px-5 py-2 rounded-full text-[11px] font-medium hover:bg-red-100 hover:text-red-600 transition"
      >
        Terlambat
      </button>

    </div>
  `;
}

function pilihFilter(tombol, filter) {
  const semuaButton =
    document.querySelectorAll(
      ".filter-btn"
    );

  semuaButton.forEach(function (button) {
    button.classList.remove(
      "bg-[#13315C]",
      "text-white"
    );

    button.classList.add(
      "bg-gray-100",
      "text-gray-600"
    );
  });

  tombol.classList.remove(
    "bg-gray-100",
    "text-gray-600"
  );

  tombol.classList.add(
    "bg-[#13315C]",
    "text-white"
  );

  tampilkanRiwayat(filter);
}

buatFilterAktivitas();
tampilkanRiwayat("Semua");