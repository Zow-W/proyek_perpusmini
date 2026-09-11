function tampilkanUser() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!user) return;

  const namaUser = document.getElementById("namaUser");
  const emailUser = document.getElementById("emailUser");
  const fotoUser = document.getElementById("fotoUser");

  if (namaUser) {
    namaUser.textContent = user.nama || user.username || "User";
  }

  if (emailUser) {
    emailUser.textContent = user.email || "";
  }

  if (fotoUser) {
    fotoUser.src = user.image || "../assets/academy.jpg";
  }
}

tampilkanUser();

let semuaBuku = [];

function buatBintang(rating) {
  let hasil = "";
  const nilai = Math.round(Number(rating) || 0);

  for (let i = 1; i <= 5; i++) {
    hasil += `
      <span class="text-[15px] ${
        i <= nilai ? "text-yellow-400" : "text-gray-300"
      }">
        ★
      </span>
    `;
  }

  return hasil;
}

async function ambilData() {
  try {
    const response = await fetch("../data_perpus/data_buku.json");

    if (!response.ok) {
      throw new Error("data_buku.json tidak ditemukan");
    }

    semuaBuku = await response.json();

    tampilkanBuku();

    const totalKoleksi = document.getElementById("totalKoleksi");

    if (totalKoleksi) {
      totalKoleksi.textContent = semuaBuku.length;
    }
  } catch (error) {
    console.error("Gagal mengambil data:", error);

    const container = document.getElementById("output");

    if (container) {
      container.innerHTML = `
        <div class="col-span-full text-center py-20">
          <iconify-icon
            icon="lucide:circle-alert"
            width="50"
            class="text-red-300"
          ></iconify-icon>

          <h3 class="text-lg font-bold text-gray-700 mt-4">
            Data Buku Gagal Dimuat
          </h3>

          <p class="text-sm text-gray-400 mt-2">
            Pastikan file data_buku.json berada di folder yang benar.
          </p>
        </div>
      `;
    }
  }
}

function tampilkanBuku() {
  const container = document.getElementById("output");
  const judul = document.getElementById("judulKoleksi");

  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const kategori = params.get("kategori");

  let bukuDitampilkan = semuaBuku;

  if (kategori) {
    bukuDitampilkan = semuaBuku.filter((buku) => {
      if (!buku.Category) return false;

      return (
        buku.Category.trim().toLowerCase() ===
        kategori.trim().toLowerCase()
      );
    });
  }

  if (judul) {
    judul.textContent = kategori
      ? `Koleksi Buku ${kategori}`
      : "Koleksi Buku";
  }

  if (bukuDitampilkan.length === 0) {
    container.innerHTML = `
      <div class="col-span-full flex flex-col items-center justify-center text-center py-20">
        <iconify-icon
          icon="lucide:book-open"
          width="50"
          class="text-gray-300"
        ></iconify-icon>

        <h3 class="text-lg font-bold text-gray-700 mt-4">
          Buku Tidak Ditemukan
        </h3>

        <p class="text-sm text-gray-400 mt-2">
          Belum ada buku dalam kategori ${kategori || ""}.
        </p>
      </div>
    `;

    return;
  }

  container.innerHTML = bukuDitampilkan
    .map((buku) => {
      return `
        <div class="w-[180px] h-[370px] border border-gray-200 rounded-xl p-3 bg-white flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
          <a
            href="./detail.html?id=${buku.Id}"
            class="flex flex-col h-full w-full"
          >
            <img
              src="${buku.image}"
              alt="${buku.Judul}"
              class="w-full h-[220px] object-cover rounded-lg shadow-md flex-shrink-0"
            >

            <h5 class="font-bold text-gray-800 text-[13px] mt-3 leading-5 line-clamp-2">
              ${buku.Judul}
            </h5>

            <p class="italic text-gray-500 text-[10px] mt-1 truncate">
              ${buku.Author || "Unknown Author"}
            </p>

            <div class="flex items-center gap-1 mt-2">
              ${buatBintang(buku.rating?.rate)}

              <span class="text-gray-400 text-[10px]">
                (${buku.rating?.rate || 0})
              </span>
            </div>

            <div class="mt-auto bg-[#0f1e3d] text-white rounded-full py-2 text-[10px] text-center w-full hover:bg-[#184e67] transition">
              Read Now
            </div>
          </a>
        </div>
      `;
    })
    .join("");
}

ambilData();
