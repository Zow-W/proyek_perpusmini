let produk = [];

function buatBintang(rating, ukuran = "text-[15px]") {
  let hasil = "";

  const nilai = Math.round(Number(rating) || 0);

  for (let i = 1; i <= 5; i++) {
    if (i <= nilai) {
      hasil += `
        <span class="${ukuran} text-yellow-400">★</span>
      `;
    } else {
      hasil += `
        <span class="${ukuran} text-gray-300">★</span>
      `;
    }
  }

  return hasil;
}

async function lihatDetail() {

  try {

    // Ambil ID dari URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
      console.log("ID buku tidak ditemukan di URL");
      return;
    }


    // Ambil JSON
    const response = await fetch("../data_perpus/data_buku.json");

    if (!response.ok) {
      throw new Error("Gagal mengambil data_buku.json");
    }

    produk = await response.json();


    // Cari buku
    const item = produk.find(
      (p) => String(p.Id) === String(id)
    );


    if (!item) {
      console.log("Buku tidak ditemukan");
      return;
    }


    // Ambil container
    const container =
      document.getElementById("detailBuku");

    const rekomen =
      document.getElementById("rekomenBuku");

    if (!container || !rekomen) {
      console.log(
        "detailBuku atau rekomenBuku tidak ditemukan"
      );
      return;
    }


    // =========================
    // DETAIL UTAMA
    // =========================

    container.innerHTML = `

      <!-- DETAIL ATAS -->
      <div
        class="
          w-full
          min-h-[600px]
          bg-white
          flex
          overflow-hidden
        "
      >

        <!-- KIRI -->
        <section
          class="
            w-[350px]
            bg-[#F3F4F6]
            relative
            flex
            flex-col
          "
        >

          <!-- BACK -->
          <div class="px-8 pt-8">

            <a
              href="../dist/landing.html"
              class="
                flex
                items-center
                text-gray-300
                text-xs
                hover:text-black
                transition
              "
            >

              <iconify-icon
                icon="solar:alt-arrow-left-linear"
                width="20"
                class="text-black"
              ></iconify-icon>

            </a>

          </div>


          <!-- COVER -->
          <div
            class="
              flex-1
              flex
              items-center
              justify-center
            "
          >

            <div class="relative">

              <!-- SHADOW -->
              <div
                class="
                  absolute
                  inset-0
                  -top-[70px]
                  bg-black/30
                  blur-xl
                  translate-y-5
                "
              ></div>


              <!-- COVER -->
              <img
                src="${item.image}"
                alt="${item.Judul}"
                class="
                  relative
                  w-[270px]
                  h-[400px]
                  left-[150px]
                  -top-[50px]
                  object-cover
                  shadow-2xl
                "
              >

            </div>

          </div>
        </section>


        <!-- KANAN -->
        <section
          class="
            w-[62%]
            bg-white
            ml-44
            mt-20
          "
        >

          <!-- TAHUN -->
          <p
            class="
              text-sm
              text-gray-400
              mb-1
            "
          >
            ${item.TahunTerbit || "-"}
          </p>


          <!-- JUDUL -->
          <h1
            class="
              text-4xl
              font-bold
              text-[#26344f]
            "
          >
            ${item.Judul}
          </h1>


          <!-- AUTHOR -->
          <h2
            class="
              text-[18px]
              text-gray-400
            "
          >
            ${item.Author || ""}
          </h2>


          <!-- RATING -->
          <div
            class="
              flex
              items-center
              gap-[2px]
              mt-1
            "
          >

            ${buatBintang(
              item.rating?.rate,
              "text-[15px]"
            )}

            <p
              class="
                text-[11px]
                text-slate-900
                ml-1
              "
            >
              (${item.rating?.rate || 0})
            </p>
          </div>


          <!-- DESKRIPSI SINGKAT -->
          <div class="mt-6 max-w-xl">

            <p
              class="
                text-sm
                leading-6
                text-gray-500
              "
            >
              ${item.Deskripsi || "Tidak ada deskripsi."}
            </p>
          </div>


          <!-- BUTTON -->
          <div
            class="
              flex
              gap-3
              mt-20
            "
          >

            <!-- BACA -->
            <button
              class="
                h-11
                px-5
                border
                border-gray-200
                text-[#26344f]
                text-xs
                flex
                items-center
                gap-2
                hover:bg-gray-50
                transition
              "
            >

              <iconify-icon
                icon="akar-icons:book"
                width="19"
              ></iconify-icon>

              Baca Buku

            </button>


            <!-- FAVORIT -->
            <button
              onclick="tambahFavorit(${item.Id})"
              class="
                h-11
                px-5
                border
                border-gray-200
                text-[#26344f]
                text-xs
                flex
                items-center
                gap-2
                hover:bg-gray-50
                transition
              "
            >

              <iconify-icon
                icon="lucide:bookmark"
                width="19"
              ></iconify-icon>

              Favorit

            </button>


            <!-- KERANJANG -->
            <button
              onclick="tambahKeranjang(${item.Id})"
              class="
                h-11
                px-6
                bg-[#26325a]
                text-white
                text-xs
                flex
                items-center
                gap-2
                hover:bg-[#2448c7]
                transition
              "
            >

              <iconify-icon
                icon="solar:cart-large-2-linear"
                width="19"
              ></iconify-icon>

              Tambah ke Keranjang

            </button>

          </div>

</div>
        </section>

      </div>


      <!-- ========================= -->
      <!-- INFORMASI BUKU -->
      <!-- ========================= -->

      <section>

        <div class="w-full">

          <div
            class="
              grid
              grid-cols-2
              px-10
              mt-10
              gap-14
            "
          >

            <!-- DESKRIPSI -->
            <div>

              <h2
                class="
                  text-base
                  font-bold
                  text-gray-800
                  mb-4
                "
              >
                Deskripsi
              </h2>


              <p
                class="
                  text-sm
                  leading-6
                  text-gray-500
                "
              >
                ${item.Deskripsi || "Tidak ada deskripsi."}
              </p>


              <!-- REVIEW -->
              <div
                class="
                  flex
                  border
                  border-gray-300
                  px-4
                  py-2
                  shadow-sm
                  items-start
                  gap-3
                  mt-6
                "
              >

                <img
                  src="./assets/alie.jpg"
                  alt="Foto profil"
                  class="
                    w-17
                    h-9
                    rounded-full
                    object-cover
                  "
                >


                <div>

                  <p
                    class="
                      text-sm
                      font-semibold
                      text-gray-800
                    "
                  >
                    Ghina
                  </p>


                  <p
                    class="
                      text-xs
                      text-gray-400
                      mt-1
                      leading-5
                    "
                  >
                    Buku yang menarik dan penuh cerita.
                    Sangat cocok untuk kamu yang suka membaca novel.
                  </p>

                </div>

              </div>

            </div>


            <!-- DETAIL BUKU -->
            <div>

              <h2
                class="
                  text-base
                  font-bold
                  text-gray-800
                  mb-4
                "
              >
                Detail Buku
              </h2>


              <!-- KATEGORI -->
              <div
                class="
                  flex
                  justify-between
                  border-b
                  border-gray-100
                  py-3
                "
              >

                <span class="text-sm text-gray-400">
                  Kategori
                </span>

                <span
                  class="
                    text-sm
                    text-gray-700
                    font-medium
                  "
                >
                  ${item.Category || "-"}
                </span>

              </div>


              <!-- TAHUN -->
              <div
                class="
                  flex
                  justify-between
                  border-b
                  border-gray-100
                  py-3
                "
              >

                <span class="text-sm text-gray-400">
                  Tahun Terbit
                </span>

                <span
                  class="
                    text-sm
                    text-gray-700
                    font-medium
                  "
                >
                  ${item.Tahun || "-"}
                </span>

              </div>


              <!-- PENULIS -->
              <div
                class="
                  flex
                  justify-between
                  border-b
                  border-gray-100
                  py-3
                "
              >

                <span class="text-sm text-gray-400">
                  Penulis
                </span>

                <span
                  class="
                    text-sm
                    text-gray-700
                    font-medium
                  "
                >
                  ${item.Author || "-"}
                </span>

              </div>


              <!-- HALAMAN -->
              <div
                class="
                  flex
                  justify-between
                  border-b
                  border-gray-100
                  py-3
                "
              >

                <span class="text-sm text-gray-400">
                  Jumlah Halaman
                </span>

                <span
                  class="
                    text-sm
                    text-gray-700
                    font-medium
                  "
                >
                  ${item.Halaman || "-"} halaman
                </span>

              </div>


              <!-- RATING -->
              <div
                class="
                  flex
                  justify-between
                  py-3
                "
              >

                <span class="text-sm text-gray-400">
                  Rating
                </span>

                <span
                  class="
                    text-sm
                    text-yellow-500
                    font-medium
                  "
                >
                  ★ ${item.rating?.rate || 0} / 5
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

    `;

   // =========================
// REKOMENDASI
// =========================

const rekomendasi = produk.filter(
  (buku) =>
    buku.Category === item.Category &&
    String(buku.Id) !== String(item.Id)
);

rekomen.innerHTML = rekomendasi
  .map(
    (buku) => `

      <div
        class="
          w-[150px]
          h-[400px]
          bg-white
          border
          border-gray-200
          overflow-hidden
          flex
          flex-col
          transition-all
          duration-300
          hover:-translate-y-2
          hover:shadow-xl
          mb-12
        "
      >

        <!-- COVER -->
        <a href="./detail.html?id=${buku.Id}">

          <img
            src="${buku.image}"
            alt="${buku.Judul}"
            class="
              w-full
              h-[210px]
              object-cover
              flex-shrink-0
            "
          >

        </a>


        <!-- CONTENT -->
        <div
          class="
            px-3
            py-3
            flex
            flex-col
            flex-1
          "
        >

          <!-- JUDUL -->
          <h3
            class="
              text-[13px]
              font-bold
              line-clamp-2
              min-h-[38px]
            "
          >
            ${buku.Judul}
          </h3>


          <!-- AUTHOR -->
          <p
            class="
              text-[11px]
              italic
              text-slate-900
              line-clamp-1
              mt-1
              min-h-[16px]
            "
          >
            ${buku.Author || "Unknown Author"}
          </p>


          <!-- RATING -->
          <div
            class="
              flex
              items-center
              gap-[2px]
              mt-2
            "
          >

            ${buatBintang(
              buku.rating?.rate,
              "text-[15px]"
            )}

            <p
              class="
                text-[11px]
                text-slate-900
                ml-1
              "
            >
              (${buku.rating?.rate || 0})
            </p>

          </div>


          <!-- BUTTON -->
          <div class="mt-auto pt-4">

            <a
              href="./detail.html?id=${buku.Id}"
              class="
                block
                w-full
                py-2
                bg-slate-900
                rounded-2xl
                text-white
                text-[10px]
                font-semibold
                text-center
                hover:bg-[#184e67]
                transition
                duration-300
              "
            >
              Read Now
            </a>

          </div>

        </div>

      </div>

    `
  )
  .join("");

  } catch (error) {

    console.error(
      "Terjadi error:",
      error
    );

  }
};
lihatDetail();
