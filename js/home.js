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

  // Data terbaru dari users (yang di-update saat simpan profile),
  // kalau tidak ada pakai data di sessionStorage
  const namaLogin =
    (userTerbaru && userTerbaru.nama) || sessionStorage.getItem("nama");

  const emailLogin =
    (userTerbaru && userTerbaru.email) || sessionStorage.getItem("email");

  const imageLogin =
    (userTerbaru && userTerbaru.image) || sessionStorage.getItem("image");

  // Samakan sessionStorage dengan data terbaru
  if (userTerbaru) {
    if (userTerbaru.nama) sessionStorage.setItem("nama", userTerbaru.nama);
    if (userTerbaru.email) sessionStorage.setItem("email", userTerbaru.email);
    if (userTerbaru.telphone) sessionStorage.setItem("telphone", userTerbaru.telphone);
    if (userTerbaru.image) sessionStorage.setItem("image", userTerbaru.image);
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

let allPro = [];
let product = [];
let jalan = true;
let slideInterval = null;

function bookSlider() {
  const container = document.getElementById("bookSlider");

  if (!container) {
    console.log("bookSlider tidak ditemukan");
    return;
  }

  container.innerHTML = "";

  let hasil = "";

  const warnaCard = [
    "bg-[#85b4e0]",
    "bg-[#3D577B]",
    "bg-[#F0C9C9]",
    "bg-[#9B8175]",
    "bg-[#72B8CF]"
  ];

  const teksCard = [
    "text-[#85b4e0]",
    "text-[#3D577B]",
    "text-[#F0C9C9]",
    "text-[#9B8175]",
    "text-[#72B8CF]"
  ];

  allPro.slice(0, 5).forEach((item, index) => {
    const rating = item.rating?.rate || 0;

    hasil += `
      <div class="relative flex-shrink-0 w-[300px] h-[180px] ${warnaCard[index % warnaCard.length]} overflow-visible">
        <a href="../dist/detailHome.html?id=${item.Id}" class="block w-full h-full">
          <div class="absolute left-5 top-5 w-[150px] text-white z-20">
            <h3 class="text-[13px] font-bold line-clamp-2">
              ${item.Judul}
            </h3>

            <p class="text-[9px] mt-1">
              ${item.Author || "Unknown Author"}
            </p>

            <div class="flex items-center gap-1 mt-2">
              ${buatBintang(rating, "text-[10px]")}
              <span class="text-[9px]">${rating}</span>
            </div>

            <p class="text-[8px] mt-3 leading-relaxed line-clamp-2">
              ${item.Deskripsi || "Tidak ada deskripsi."}
            </p>

            <div class="inline-block mt-3 bg-white ${teksCard[index % teksCard.length]} text-[9px] font-semibold px-6 py-2 rounded-full shadow-sm hover:scale-105 transition">
              Lihat Buku
            </div>
          </div>

          <img
            src="${item.image}"
            alt="${item.Judul}"
            class="absolute w-[105px] h-[160px] object-cover right-[10px] -bottom-[10px] shadow-lg z-10 rounded-sm"
          />
        </a>
      </div>
    `;
  });

  container.innerHTML = hasil;

  clearInterval(slideInterval);

  jalan = true;

  slideInterval = setInterval(() => {
    if (!jalan) {
      return;
    }

    container.scrollLeft += 1;

    if (
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth
    ) {
      container.scrollLeft = 0;
    }
  }, 20);

  container.onmouseenter = () => {
    jalan = false;
  };

  container.onmouseleave = () => {
    jalan = true;
  };
}

function searchBook(keyword) {
  const result = document.getElementById("searchResult");

  if (!result) {
    return;
  }

  const kata = keyword.trim().toLowerCase();

  if (kata === "") {
    result.innerHTML = "";
    result.classList.add("hidden");
    return;
  }

  const hasil = allPro.filter((buku) => {
    const judul = String(buku.Judul || "").toLowerCase();
    const author = String(buku.Author || "").toLowerCase();
    const category = String(buku.Category || "").toLowerCase();

    return (
      judul.includes(kata) ||
      author.includes(kata) ||
      category.includes(kata)
    );
  }).slice(0, 6);

  if (hasil.length === 0) {
    result.innerHTML = `
      <div class="px-4 py-4 text-center">
        <p class="text-[10px] text-gray-500">
          Buku tidak ditemukan
        </p>
      </div>
    `;

    result.classList.remove("hidden");
    return;
  }

  result.innerHTML = hasil.map((buku) => {
    return `
      <a
        href="../dist/detailHome.html?id=${buku.Id}"
        class="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 transition"
      >
        <img
          src="${buku.image}"
          alt="${buku.Judul}"
          class="w-9 h-12 object-cover rounded"
        >

        <div class="min-w-0">
          <p class="text-[11px] font-semibold text-gray-800 truncate">
            ${buku.Judul}
          </p>

          <p class="text-[9px] text-gray-400 truncate">
            ${buku.Author || "Unknown Author"}
          </p>

          <p class="text-[8px] text-[#13315C] mt-1">
            ${buku.Category || "Tanpa kategori"}
          </p>
        </div>
      </a>
    `;
  }).join("");

  result.classList.remove("hidden");
}

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

async function ambilPro() {
  try {
    const response = await fetch("../data_perpus/data_buku.json");

    if (!response.ok) {
      throw new Error("data_buku.json tidak ditemukan");
    }

    const data = await response.json();

    allPro = data;
    product = data;

    bookSlider();
    forYou();
    peringkat();
    filterCategory("Semua");
  } catch (error) {
    console.log("ERROR:", error);
  }
}

function tampilkanDataBuku(data) {
  const container = document.getElementById("output");

  if (!container) {
    console.log("output tidak ditemukan");
    return;
  }

  let hasil = "";

  data.forEach((item) => {
    const rating = item.rating?.rate || 0;

    hasil += `
      <div class="group relative w-[200px] h-[450px]">
        <div class="absolute top-2 left-0 w-[200px] h-[440px] flex flex-col border border-gray-200 px-5 py-4 rounded-2xl bg-white transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:shadow-lg">

          <a href="../dist/detailHome.html?id=${item.Id}" class="block">
            <img
              src="${item.image}"
              alt="${item.Judul}"
              class="w-full h-[240px] object-cover shadow-md rounded-lg"
            >

            <h5 class="font-bold text-gray-800 text-[16px] mt-4 leading-6 line-clamp-2">
              ${item.Judul}
            </h5>

            <p class="italic text-gray-500 text-[13px] mt-1">
              ${item.Author || "Unknown Author"}
            </p>

            <div class="flex items-center gap-1 mt-2 h-[20px]">
              ${buatBintang(rating, "text-[15px]")}

              <span class="text-gray-400 text-[12px]">
                (${rating})
              </span>
            </div>
          </a>

          <a
            href="../dist/detailHome.html?id=${item.Id}"
            class="mt-auto bg-[#0f1e3d] text-white rounded-full py-[10px] text-[13px] w-full text-center hover:bg-[#184e67] transition"
          >
            Read Now
          </a>

        </div>
      </div>
    `;
  });

  container.innerHTML = hasil;
}

function filterCategory(Category) {
  if (Category === "Semua" || !Category) {
    product = allPro;
  } else {
    product = allPro.filter(
      (item) => item.Category === Category
    );
  }

  tampilkanDataBuku(product);
}

function forYou() {
  const container = document.getElementById("forYou");

  if (!container) {
    console.log("ForYou tidak ditemukan");
    return;
  }

  container.innerHTML = "";

  let hasil = "";

  allPro.slice(0, 6).forEach((item) => {
    const rating = item.rating?.rate || 0;

    hasil += `
      <a
        href="../dist/detailHome.html?id=${item.Id}"
        class="flex items-center gap-4 w-[260px] group"
      >
        <img
          src="${item.image}"
          alt="${item.Judul}"
          class="w-[70px] h-[100px] object-cover shadow-md flex-shrink-0 group-hover:scale-105 transition"
        />

        <div class="flex flex-col min-w-0">
          <h3 class="text-[#13315C] font-bold text-[14px] leading-5 line-clamp-2">
            ${item.Judul}
          </h3>

          <p class="text-gray-400 text-[10px] mt-2 line-clamp-1">
            ${item.Author || "Unknown Author"}
          </p>

          <div class="flex items-center gap-1 mt-3">
            ${buatBintang(rating, "text-[14px]")}

            <span class="text-gray-500 text-[10px]">
              ${rating}
            </span>
          </div>
        </div>
      </a>
    `;
  });

  container.innerHTML = hasil;
}

function peringkat() {
  const container = document.getElementById("peringkat");

  if (!container) {
    console.log("Peringkat tidak ditemukan");
    return;
  }

  container.innerHTML = "";

  let hasil = "";

  const ranking = [...allPro]
    .sort((a, b) => {
      return (
        (b.rating?.rate || 0) -
        (a.rating?.rate || 0)
      );
    })
    .slice(0, 7);

  ranking.forEach((item, index) => {
    hasil += `
      <a
        href="../dist/detailHome.html?id=${item.Id}"
        class="flex items-center gap-3 mb-4 hover:bg-gray-50 p-1 rounded transition"
      >
        <span
          class="text-[13px] font-bold ${
            index === 0
              ? "text-red-500"
              : "text-gray-400"
          } w-4"
        >
          ${index + 1}
        </span>

        <p class="text-[12px] text-gray-600 flex-1 line-clamp-1">
          ${item.Judul}
        </p>
      </a>
    `;
  });

  container.innerHTML = hasil;
}

ambilPro();

window.addEventListener("pageshow", function () {
  tampilkanAkun();
});

window.addEventListener("focus", function () {
  tampilkanAkun();
});

document.addEventListener("visibilitychange", function () {
  if (!document.hidden) {
    tampilkanAkun();
  }
});

window.addEventListener("storage", function (e) {
  if (e.key === "users") {
    tampilkanAkun();
  }
},

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");

  if (!sidebar || !overlay) return;

  sidebar.classList.toggle("sidebar-open");
  overlay.classList.toggle("overlay-open");
});