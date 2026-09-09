let produk = [];

function buatBintang(rating, ukuran = "text-[15px]") {
  let hasil = "";

  const nilai = Math.round(Number(rating) || 0);

  for (let i = 1; i <= 5; i++) {
    if (i <= nilai) {
      hasil += `
        <span class="${ukuran} text-yellow-400">
          ★
        </span>
      `;
    } else {
      hasil += `
        <span class="${ukuran} text-gray-300">
          ★
        </span>
      `;
    }
  }

  return hasil;
}


async function lihatDetail() {
  try {

    const params = new URLSearchParams(window.location.search);

    // AMBIL ID DARI URL
    const id = params.get("id");

    console.log("ID dari URL:", id);

    if (!id) {
      console.log("ID buku tidak ditemukan di URL");
      return;
    }


    // AMBIL DATA JSON
    const response = await fetch("../js/data_buku.json");

    if (!response.ok) {
      throw new Error("Gagal mengambil data_buku.json");
    }

    produk = await response.json();

    console.log("Data buku:", produk);


    // CARI BUKU
    const item = produk.find(
      (p) => String(p.Id) === String(id)
    );


    if (!item) {
      console.log("Buku tidak ditemukan");
      return;
    }

    console.log("Buku ditemukan:", item);


    const container = document.getElementById("detailBuku");
    const rekomen = document.getElementById("rekomenBuku");


    if (!container || !rekomen) {
      console.log(
        "Container detailBuku atau rekomenBuku tidak ditemukan"
      );
      return;
    }


    container.innerHTML = `
      <div class="w-full min-h-[600px] bg-white flex overflow-hidden">

        <!-- KIRI -->
        <section class="w-[350px] bg-gray-200 relative flex flex-col">

          <div class="px-8 pt-8">
            <a
              href="../dist/landing.html"
              class="flex items-center gap-3 text-gray-500 text-xs hover:text-gray-900 transition">
              <iconify-icon
                icon="solar:alt-arrow-left-linear"
                width="20" class="text-black">
              </iconify-icon>
            </a>
          </div>


          <div class="flex-1 flex items-center justify-center">

            <div class="relative">

              <div
                class="absolute inset-0 -top-[70px]
                       bg-black/30 blur-xl translate-y-5">
              </div>


              <img
                src="${item.image}"
                alt="${item.Judul}"
                class="relative w-[270px] h-[400px]
                       left-[150px] -top-[50px]
                       object-cover shadow-2xl"
              />

            </div>
          </div>

        </section>


        <!-- KANAN -->
        <section class="w-[62%] bg-white ml-40 mt-20">

          <p class="text-sm text-gray-400 mb-1">
            ${item.terbit || ""}
          </p>


          <h1 class="text-4xl font-bold text-[#26344f]">
            ${item.Judul}
          </h1>


          <h2 class="text-[18px] text-gray-400">
            ${item.Author || ""}
          </h2>


          <!-- RATING -->
          <div class="flex items-center gap-[2px] mt-1">

            ${buatBintang(
              item.rating?.rate,
              "text-[15px]"
            )}

            <p class="text-[11px] text-slate-900 ml-1">
              (${item.rating?.rate || 0})
            </p>

          </div>


          <!-- DESKRIPSI -->
          <div class="mt-6 max-w-xl">

            <p class="text-sm leading-6 text-gray-500">
              ${item.Deskripsi || "Tidak ada deskripsi."}
            </p>

          </div>


          <!-- BUTTON -->
          <div class="flex gap-3 mt-20">

            <button
              class="h-11 px-5 border border-gray-200
                     text-[#26344f] text-xs
                     flex items-center gap-2
                     hover:bg-gray-50 transition"
            >
              <iconify-icon
                icon="akar-icons:book"
                width="19">
              </iconify-icon>

              Baca Buku
            </button>


            <button
              onclick="tambahFavorit(${item.Id})"
              class="h-11 px-5 border border-gray-200
                     text-[#26344f] text-xs
                     flex items-center gap-2
                     hover:bg-gray-50 transition"
            >
              <iconify-icon
                icon="lucide:bookmark"
                width="19">
              </iconify-icon>

              Favorit
            </button>


            <button
              onclick="tambahKeranjang(${item.Id})"
              class="h-11 px-6 bg-[#26325a]
                     text-white text-xs
                     flex items-center gap-2
                     hover:bg-[#2448c7] transition"
            >
              <iconify-icon
                icon="solar:cart-large-2-linear"
                width="19">
              </iconify-icon>

              Tambah ke Keranjang
            </button>

          </div>

        </section>

      </div>
    `;


    // REKOMENDASI
    const rekomendasi = produk.filter(
      (buku) =>
        buku.Category === item.Category &&
        String(buku.Id) !== String(item.Id)
    );


    rekomen.innerHTML = rekomendasi
      .map(
        (buku) => `

        <div
         class="flex flex-col w-[200px] border px-5 rounded-2xl py-4 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg mb-10 ml-2"
>

  <a href="./detail.html?id=${buku.Id}" class="flex flex-col h-full">

    <img
      src="${buku.image}"
      alt="${buku.Judul}"
      class="w-full h-[250px] object-cover flex-shrink-0"
    />

    <div class="px-4 py-3 flex flex-col flex-1">

      <h3 class="text-[13px] font-bold line-clamp-2">
        ${buku.Judul}
      </h3>

      <p
        class="text-[11px] italic text-slate-900 line-clamp-1"
      >
        ${buku.Author || "Unknown Author"}
      </p>

      <div class="flex items-center gap-[2px] mt-1 mb-4">
        ${buatBintang(
          buku.rating?.rate,
          "text-[15px]"
        )}

        <p class="text-[11px] text-slate-900 ml-1">
          (${buku.rating?.rate || 0})
        </p>
      </div>
      </a>

      <div
        class="w-full mt-auto py-2
               bg-slate-900 rounded-2xl
               text-white text-[10px]
               font-semibold text-center
               hover:bg-[#184e67]
               transition duration-300"
      >
      <a href="../dist/login.html">
        Read Now
      </div>
        </a>
    </div>


</div>
`)
      .join("");

  } catch (error) {
    console.error("Terjadi error:", error);
  }
}


lihatDetail();