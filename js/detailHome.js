let produk = [];

function buatBintang(rating, ukuran = "text-[15px]") {
  let hasil = "";
  const nilai = Math.round(Number(rating) || 0);

  for (let i = 1; i <= 5; i++) {
    if (i <= nilai) {
      hasil += `<span class="${ukuran} text-yellow-400">★</span>`;
    } else {
      hasil += `<span class="${ukuran} text-gray-300">★</span>`;
    }
  }

  return hasil;
}

function tambahFavorit(Id) {
  const username = sessionStorage.getItem("username");

  if (!username) {
    alert("Silakan login terlebih dahulu!");
    window.location.href = "../dist/login.html";
    return;
  }

  let favorit = JSON.parse(
    localStorage.getItem("favorit_" + username)
  ) || [];

  const sudahAda = favorit.some(
    function(buku) {
      return String(buku.Id) === String(Id);
    }
  );

  if (sudahAda) {
    alert("Buku sudah ada di favorit ❤️");
    return;
  }

  const buku = produk.find(
    function(item) {
      return String(item.Id) === String(Id);
    }
  );

  if (!buku) {
    alert("Buku tidak ditemukan!");
    return;
  }

  favorit.push(buku);

  localStorage.setItem(
    "favorit_" + username,
    JSON.stringify(favorit)
  );

  alert("Buku berhasil ditambahkan ke favorit ❤️");
}

function tambahKeranjang(Id) {
  const username = sessionStorage.getItem("username");

  if (!username) {
    alert("Silakan login terlebih dahulu!");
    window.location.href = "../dist/login.html";
    return;
  }

  let keranjang = JSON.parse(
    localStorage.getItem("keranjang_" + username)
  ) || [];

  const buku = produk.find(
    function(item) {
      return String(item.Id) === String(Id);
    }
  );

  if (!buku) {
    alert("Buku tidak ditemukan!");
    return;
  }

  const sudahAda = keranjang.some(
    function(item) {
      return String(item.Id) === String(Id);
    }
  );

  if (sudahAda) {
    alert("Buku ini sudah ada di keranjang 🛒");
    return;
  }

  keranjang.push(buku);

  localStorage.setItem(
    "keranjang_" + username,
    JSON.stringify(keranjang)
  );

  alert("Buku berhasil ditambahkan ke keranjang 🛒");
}

async function lihatDetail() {
  try {
    const params =
      new URLSearchParams(window.location.search);

    const id = params.get("id");

    if (!id) {
      console.log("ID buku tidak ditemukan di URL");
      return;
    }

    const response =
      await fetch("../data_perpus/data_buku.json");

    if (!response.ok) {
      throw new Error(
        "Gagal mengambil data_buku.json"
      );
    }

    produk = await response.json();

    const item = produk.find(
      function(p) {
        return String(p.Id) === String(id);
      }
    );

    if (!item) {
      console.log("Buku tidak ditemukan");
      return;
    }

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

    container.innerHTML = `
      <div class="w-full min-h-[600px] bg-white flex overflow-hidden">
        <section class="w-[350px] bg-[#F3F4F6] relative flex flex-col">
          <div class="px-8 pt-8">
            <a
              href="../dist/home.html"
              class="flex items-center text-gray-300 text-xs hover:text-black transition"
            >
              <iconify-icon
                icon="solar:alt-arrow-left-linear"
                width="20"
                class="text-black"
              ></iconify-icon>
            </a>
          </div>

          <div class="flex-1 flex items-center justify-center">
            <div class="relative">
              <div class="absolute inset-0 -top-[70px] bg-black/30 blur-xl translate-y-5"></div>

              <img
                src="${item.image}"
                alt="${item.Judul}"
                class="relative w-[270px] h-[400px] left-[150px] -top-[50px] object-cover shadow-2xl"
              >
            </div>
          </div>
        </section>

        <section class="w-[62%] bg-white ml-44 mt-20">
          <p class="text-sm text-gray-400 mb-1">
            ${item.TahunTerbit || "-"}
          </p>

          <h1 class="text-4xl font-bold text-[#26344f]">
            ${item.Judul}
          </h1>

          <h2 class="text-[18px] text-gray-400">
            ${item.Author || ""}
          </h2>

          <div class="flex items-center gap-[2px] mt-1">
            ${buatBintang(
              item.rating?.rate,
              "text-[15px]"
            )}

            <p class="text-[11px] text-slate-900 ml-1">
              (${item.rating?.rate || 0})
            </p>
          </div>

          <div class="mt-6 max-w-xl">
            <p class="text-sm leading-6 text-gray-500">
              ${item.Deskripsi || "Tidak ada deskripsi."}
            </p>
          </div>

          <div class="flex gap-3 mt-20">
            <a
              href="${item.LinkBaca || "#"}"
              target="_blank"
              class="h-11 px-5 border border-gray-200 text-[#26344f] text-xs flex items-center gap-2 hover:bg-gray-50 transition"
            >
              <iconify-icon
                icon="akar-icons:book"
                width="19"
              ></iconify-icon>
              Baca Buku
            </a>

            <button
              onclick="tambahFavorit(${item.Id})"
              class="h-11 px-5 border border-gray-200 text-[#26344f] text-xs flex items-center gap-2 hover:bg-gray-50 transition"
            >
              <iconify-icon
                icon="lucide:bookmark"
                width="19"
              ></iconify-icon>
              Favorit
            </button>

            <button
              onclick="tambahKeranjang(${item.Id})"
              class="h-11 px-6 bg-[#26325a] text-white text-xs flex items-center gap-2 hover:bg-[#2448c7] transition"
            >
              <iconify-icon
                icon="solar:cart-large-2-linear"
                width="19"
              ></iconify-icon>
              Tambah ke Keranjang
            </button>
          </div>
        </section>
      </div>

      <section>
        <div class="w-full">
          <div class="grid grid-cols-2 px-10 mt-10 gap-14">

            <div>
              <h2 class="text-base font-bold text-gray-800 mb-4">
                Deskripsi
              </h2>

              <p class="text-sm leading-6 text-gray-500">
                ${item.Deskripsi || "Tidak ada deskripsi."}
              </p>

              <div class="flex border border-gray-300 px-4 py-2 shadow-sm items-start gap-3 mt-6">
                <img
                  src="${item.gambarPenulis || ""}"
                  alt="Foto Penulis"
                  class="w-9 h-9 rounded-full object-cover"
                >

                <div>
                  <p class="text-sm font-semibold text-gray-800">
                    ${item.Author || ""}
                  </p>

                  <p class="text-xs text-gray-400 mt-1 leading-5">
                    ${item.penjelasanPenulis || ""}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 class="text-base font-bold text-gray-800 mb-4">
                Detail Buku
              </h2>

              <div class="flex justify-between border-b border-gray-100 py-3">
                <span class="text-sm text-gray-400">
                  Kategori
                </span>

                <span class="text-sm text-gray-700 font-medium">
                  ${item.Category || "-"}
                </span>
              </div>

              <div class="flex justify-between border-b border-gray-100 py-3">
                <span class="text-sm text-gray-400">
                  Tahun Terbit
                </span>

                <span class="text-sm text-gray-700 font-medium">
                  ${item.TahunTerbit || "-"}
                </span>
              </div>

              <div class="flex justify-between border-b border-gray-100 py-3">
                <span class="text-sm text-gray-400">
                  Penulis
                </span>

                <span class="text-sm text-gray-700 font-medium">
                  ${item.Author || "-"}
                </span>
              </div>

              <div class="flex justify-between border-b border-gray-100 py-3">
                <span class="text-sm text-gray-400">
                  Jumlah Halaman
                </span>

                <span class="text-sm text-gray-700 font-medium">
                  ${item.Halaman || "-"} halaman
                </span>
              </div>

              <div class="flex justify-between py-3">
                <span class="text-sm text-gray-400">
                  Rating
                </span>

                <span class="text-sm text-yellow-500 font-medium">
                  ★ ${item.rating?.rate || 0} / 5
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>
    `;

    const rekomendasi = produk.filter(
      function(buku) {
        return (
          buku.Category === item.Category &&
          String(buku.Id) !== String(item.Id)
        );
      }
    );

    rekomen.classList.add(
      "flex",
      "flex-wrap",
      "gap-8"
    );

    rekomen.innerHTML =
      rekomendasi.map(
        function(buku) {
          return `
            <div class="group relative w-[200px] h-[450px] mb-20">

              <div class="absolute top-0 left-0 w-[200px] h-[440px] flex flex-col border border-gray-200 px-5 py-4 rounded-2xl bg-white transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:shadow-lg">

                <a
                  href="../dist/detailHome.html?id=${buku.Id}"
                  class="block"
                >

                  <img
                    src="${buku.image}"
                    alt="${buku.Judul}"
                    class="w-full h-[240px] object-cover shadow-md rounded-lg"
                  >

                  <h3 class="font-bold text-gray-800 text-[16px] mt-4 leading-6 line-clamp-2">
                    ${buku.Judul}
                  </h3>

                  <p class="italic text-gray-500 text-[13px] mt-1">
                    ${buku.Author || "Unknown Author"}
                  </p>

                  <div class="flex items-center gap-1 mt-2 h-[20px]">
                    ${buatBintang(
                      buku.rating?.rate,
                      "text-[15px]"
                    )}

                    <span class="text-gray-400 text-[12px]">
                      (${buku.rating?.rate || 0})
                    </span>
                  </div>

                </a>

                <a
                  href="${buku.LinkBaca || "#"}"
                  target="_blank"
                  class="mt-auto bg-[#0f1e3d] text-white rounded-full py-[10px] text-[13px] w-full text-center hover:bg-[#184e67] transition"
                >
                  Read Now
                </a>

              </div>

            </div>
          `;
        }
      ).join("");

  } catch (error) {
    console.error("Terjadi error:", error);
  }
}

lihatDetail();