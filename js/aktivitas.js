function tampilkanAkun() {

  const namaUser =
    document.getElementById("namaUser");

  const emailUser =
    document.getElementById("emailUser");

  const fotoUser =
    document.getElementById("fotoUser");


  // Tampilkan nama
  if (namaUser) {
    namaUser.innerHTML =
      namaLogin || "User";
  }


  // Tampilkan email
  if (emailUser) {
    emailUser.innerHTML =
      emailLogin || "";
  }


  // Tampilkan foto
  if (fotoUser && imageLogin) {
    fotoUser.src = imageLogin;
  }

}


// Jalankan
tampilkanAkun();

function tampilkanRiwayat(filter = "Semua") {

  const container =
    document.getElementById("riwayatPeminjaman");


  if (!container) return;


  // =================================================
  // AMBIL DATA RIWAYAT
  // =================================================

  const semuaRiwayat =
    JSON.parse(
      localStorage.getItem("riwayatPeminjaman")
    ) || [];


  // =================================================
  // URUTKAN DATA
  // TERBARU → PALING ATAS
  // =================================================

  let riwayat = [...semuaRiwayat].reverse();


  // =================================================
  // FILTER DATA
  // =================================================

  if (filter !== "Semua") {

    riwayat =
      riwayat.filter(
        (data) => {

          let status =
            data.status || "";


          // Menunggu Persetujuan
          // dianggap sebagai Dipinjam

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

        }
      );

  }


  // =================================================
  // KOSONG
  // =================================================

  if (riwayat.length === 0) {

    container.innerHTML = `

      <div
        class="
          flex
          flex-col
          items-center
          justify-center
          text-center
          py-20
        "
      >

        <iconify-icon
          icon="solar:history-linear"
          width="50"
          class="text-gray-300"
        ></iconify-icon>


        <h3
          class="
            text-lg
            font-bold
            text-gray-700
            mt-4
          "
        >
          Belum Ada Riwayat Peminjaman
        </h3>


        <p
          class="
            text-sm
            text-gray-400
            mt-2
          "
        >
          Tidak ada aktivitas dengan status ${filter}.
        </p>

      </div>

    `;

    return;

  }


  // =================================================
  // TAMPILKAN DATA
  // =================================================

  container.innerHTML =
    riwayat
      .map(
        (data) => {


          // =================================================
          // STATUS
          // =================================================

          let status =
            data.status || "Dipinjam";


          // Menunggu Persetujuan
          // → Dipinjam

          if (
            status.toLowerCase() ===
            "menunggu persetujuan"
          ) {

            status = "Dipinjam";

          }


          // =================================================
          // WARNA STATUS
          // =================================================

          let warnaStatus = "";


          if (
            status.toLowerCase() ===
            "dipinjam"
          ) {

            warnaStatus =
              "bg-green-100 text-green-600";

          }

          else if (
            status.toLowerCase() ===
            "dikembalikan"
          ) {

            warnaStatus =
              "bg-blue-100 text-blue-600";

          }

          else if (
            status.toLowerCase() ===
            "terlambat"
          ) {

            warnaStatus =
              "bg-red-100 text-red-600";

          }

          else {

            warnaStatus =
              "bg-gray-100 text-gray-600";

          }


          // =================================================
          // RETURN CARD
          // =================================================

          return `

            <div
              class="
                bg-white
                border
                border-gray-200
                rounded-2xl
                p-6
                shadow-sm
                mb-5
              "
            >


              <!-- HEADER -->

              <div
                class="
                  flex
                  items-center
                  justify-between
                  mb-5
                "
              >

                <h3
                  class="
                    text-sm
                    font-bold
                    text-[#13315C]
                  "
                >
                  Detail Peminjaman
                </h3>


                <!-- STATUS -->

                <span
                  class="
                    ${warnaStatus}
                    px-4
                    py-2
                    rounded-full
                    text-[10px]
                    font-medium
                  "
                >
                  ${status}
                </span>

              </div>



              <!-- ================================================= -->
              <!-- DATA PEMINJAM -->
              <!-- ================================================= -->

              <div
                class="
                  grid
                  grid-cols-2
                  gap-4
                  text-[11px]
                  mb-6
                "
              >


                <!-- NAMA -->

                <div>

                  <p class="text-gray-400">
                    Peminjam
                  </p>

                  <p
                    class="
                      font-semibold
                      text-gray-800
                      mt-1
                    "
                  >
                    ${data.nama || "-"}
                  </p>

                </div>



                <!-- EMAIL -->

                <div>

                  <p class="text-gray-400">
                    Email
                  </p>

                  <p
                    class="
                      font-semibold
                      text-gray-800
                      mt-1
                    "
                  >
                    ${data.email || "-"}
                  </p>

                </div>



                <!-- SEKOLAH -->

                <div>

                  <p class="text-gray-400">
                    Asal Sekolah
                  </p>

                  <p
                    class="
                      font-semibold
                      text-gray-800
                      mt-1
                    "
                  >
                    ${data.sekolah || "-"}
                  </p>

                </div>



                <!-- WHATSAPP -->

                <div>

                  <p class="text-gray-400">
                    WhatsApp
                  </p>

                  <p
                    class="
                      font-semibold
                      text-gray-800
                      mt-1
                    "
                  >
                    ${data.whatsapp || "-"}
                  </p>

                </div>



                <!-- TANGGAL PINJAM -->

                <div>

                  <p class="text-gray-400">
                    Tanggal Pinjam
                  </p>

                  <p
                    class="
                      font-semibold
                      text-[#174b82]
                      mt-1
                    "
                  >
                    ${data.tanggalPinjam || "-"}
                  </p>

                </div>



                <!-- TANGGAL KEMBALI -->

                <div>

                  <p class="text-gray-400">
                    Tanggal Pengembalian
                  </p>

                  <p
                    class="
                      font-semibold
                      text-[#174b82]
                      mt-1
                    "
                  >
                    ${data.tanggalKembali || "-"}
                  </p>

                </div>

              </div>



              <!-- ================================================= -->
              <!-- BUKU -->
              <!-- ================================================= -->

              <div>

                <h3
                  class="
                    text-[12px]
                    font-bold
                    text-[#13315C]
                    mb-3
                  "
                >
                  Buku yang Dipinjam
                </h3>



                <div
                  class="
                    flex
                    flex-wrap
                    gap-3
                  "
                >

                  ${
                    (data.buku || [])
                      .map(
                        (buku) => `

                          <div
                            class="
                              flex
                              items-center
                              gap-3
                              border
                              border-gray-200
                              rounded-lg
                              p-2
                              w-[250px]
                            "
                          >


                            <!-- COVER -->

                            <img
                              src="${buku.image}"
                              class="
                                w-[45px]
                                h-[60px]
                                object-cover
                                rounded
                              "
                              alt="${buku.Judul || "Buku"}"
                            >



                            <!-- INFO -->

                            <div>

                              <h4
                                class="
                                  text-[10px]
                                  font-bold
                                  text-[#13315C]
                                "
                              >
                                ${buku.Judul || "Tanpa Judul"}
                              </h4>


                              <p
                                class="
                                  text-[9px]
                                  text-gray-400
                                  mt-1
                                "
                              >
                                ${buku.Author || "Unknown Author"}
                              </p>


                              <p
                                class="
                                  text-[9px]
                                  text-gray-400
                                  mt-1
                                "
                              >
                                ${buku.Category || ""}
                              </p>

                            </div>

                          </div>

                        `
                      )
                      .join("")
                  }

                </div>

              </div>


            </div>

          `;

        }
      )
      .join("");

}



// =================================================
// FILTER AKTIVITAS
// =================================================

function buatFilterAktivitas() {

  const filterContainer =
    document.getElementById(
      "filterAktivitas"
    );


  if (!filterContainer) return;


  filterContainer.innerHTML = `

    <div
      class="
        flex
        items-center
        gap-2
        mb-5
      "
    >

      <!-- SEMUA -->

      <button
        onclick="pilihFilter(this, 'Semua')"
        class="
          filter-btn
          bg-[#13315C]
          text-white
          px-5
          py-2
          rounded-full
          text-[11px]
          font-medium
        "
      >
        Semua
      </button>


      <!-- DIPINJAM -->

      <button
        onclick="pilihFilter(this, 'Dipinjam')"
        class="
          filter-btn
          bg-gray-100
          text-gray-600
          px-5
          py-2
          rounded-full
          text-[11px]
          font-medium
          hover:bg-green-100
          hover:text-green-600
          transition
        "
      >
        Dipinjam
      </button>


      <!-- DIKEMBALIKAN -->

      <button
        onclick="pilihFilter(this, 'Dikembalikan')"
        class="
          filter-btn
          bg-gray-100
          text-gray-600
          px-5
          py-2
          rounded-full
          text-[11px]
          font-medium
          hover:bg-blue-100
          hover:text-blue-600
          transition
        "
      >
        Dikembalikan
      </button>


      <!-- TERLAMBAT -->

      <button
        onclick="pilihFilter(this, 'Terlambat')"
        class="
          filter-btn
          bg-gray-100
          text-gray-600
          px-5
          py-2
          rounded-full
          text-[11px]
          font-medium
          hover:bg-red-100
          hover:text-red-600
          transition
        "
      >
        Terlambat
      </button>

    </div>

  `;

}



// =================================================
// PILIH FILTER
// =================================================

function pilihFilter(
  tombol,
  filter
) {

  // =================================================
  // RESET BUTTON
  // =================================================

  const semuaButton =
    document.querySelectorAll(
      ".filter-btn"
    );


  semuaButton.forEach(
    (button) => {

      button.classList.remove(
        "bg-[#13315C]",
        "text-white"
      );

      button.classList.add(
        "bg-gray-100",
        "text-gray-600"
      );

    }
  );


  // =================================================
  // BUTTON AKTIF
  // =================================================

  tombol.classList.remove(
    "bg-gray-100",
    "text-gray-600"
  );

  tombol.classList.add(
    "bg-[#13315C]",
    "text-white"
  );


  // =================================================
  // TAMPILKAN FILTER
  // =================================================

  tampilkanRiwayat(filter);

}



// =================================================
// JALANKAN
// =================================================

buatFilterAktivitas();

tampilkanRiwayat("Semua");