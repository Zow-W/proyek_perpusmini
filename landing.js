let allPro = [];
let product = [];
let buku = [];

const landingBuku = [
  "absolute w-[60px] h-[95px] object-cover left-[-110px] top-[-110px] rotate-[3deg]",
  "absolute w-[60px] h-[95px] object-cover left-[-210px] top-[70px] -rotate-[2deg]",
  "absolute w-[40px] h-[60px] object-cover left-[-250px] top-[-150px] -rotate-[3deg]",

  "absolute w-[120px] h-[170px] object-cover left-[5px] top-[100px] -rotate-[5deg] z-30",
  "absolute w-[120px] h-[170px] object-cover left-[110px] top-[60px] z-20",
  "absolute w-[120px] h-[170px] object-cover left-[220px] top-[80px] z-30",
  "absolute w-[110px] h-[160px] object-cover left-[330px] top-[110px] -rotate-[3deg] z-40",
  "absolute w-[120px] h-[170px] object-cover left-[430px] top-[70px] -rotate-[4deg] z-30",
  "absolute w-[110px] h-[160px] object-cover left-[390px] top-[-40px] z-10",
  "absolute w-[100px] h-[150px] object-cover left-[305px] top-[-20px] -rotate-[2deg] z-20",
  "absolute w-[100px] h-[150px] object-cover left-[210px] top-[-40px] z-10",
  "absolute w-[100px] h-[150px] object-cover left-[120px] top-[-60px] -rotate-[1deg] z-10",
  "absolute w-[110px] h-[160px] object-cover left-[20px] top-[-40px] rotate-[2deg] z-5",

  "absolute w-[60px] h-[95px] object-cover right-[80px] top-[80px] rotate-[5deg]",
  "absolute w-[60px] h-[95px] object-cover right-[190px] top-[-80px] rotate-[2deg] z-5",
  "absolute w-[40px] h-[60px] object-cover right-[50px] top-[-150px] -rotate-[2deg] z-5",
];

async function ambilPro() {
  try {
    const response = await fetch("data_buku.json");

    if (!response.ok) {
      throw new Error("data_buku.json tidak ditemukan");
    }

    const data = await response.json();

    allPro = data;
    product = data;
    latestBook();
    tampilkanLandingBuku();
  } catch (error) {
    console.log("ERROR:", error);
  }
}

function tampilkanLandingBuku() {
  const container = document.getElementById("bukuLanding");

  if (!container) {
    console.log("bukuLanding tidak ditemukan");
    return;
  }

  container.innerHTML = "";

  product.forEach((item, index) => {
    if (index >= landingBuku.length) return;

    const img = document.createElement("img");

    img.src = item.image;
    img.alt = item.Judul;
    img.className = landingBuku[index];

    container.appendChild(img);
  });
}

function latestBook() {
  const container = document.getElementById("latestBook");

  container.innerHTML = "";

  let hasil = "";

  const warnaCard = [
    "bg-[#B99F91]",
    "bg-[#79C4E2]",
    "bg-[#D9A89B]",
    "bg-[#9B8175]",
    "bg-[#72B8CF]",
  ];

  product.slice(0, 5).forEach((item, index) => {
    const rating = item.rating.rate;

    // Membuat bintang berdasarkan rating
    let bintang = "";

    for (let i = 1; i <= 5; i++) {
      if (i <= Math.round(rating)) {
        bintang += "★";
      } else {
        bintang += "☆";
      }
    }

    hasil += `
      <div class="relative flex-shrink-0 w-[525px] h-[300px]">

        <!-- CARD -->
        <div
          class="
            absolute
            left-0
            top-[68px]
            w-[525px]
            h-[225px]
            ${warnaCard[index]}
            rounded-[20px]
          "
        >

          <div class="ml-[222px] pr-6 h-full flex flex-col justify-center">

            <!-- JUDUL -->
            <h3 class="text-[16px] font-bold text-white">
              ${item.Judul}
            </h3>

            <!-- AUTHOR -->
            <p class="text-[12px] font-medium text-white/80 mt-1">
              ${item.Author}
            </p>

            <!-- RATING -->
            <div class="flex items-center gap-2 mt-2">

              <div class="text-yellow-300 text-[19px] tracking-tight">
                ${bintang}
              </div>

              <span class="text-[10px] text-white/80">
                ${rating}
              </span>

            </div>

            <!-- DESKRIPSI -->
            <p
              class="
                text-[11px]
                leading-[17px]
                text-white/90
                mt-2
                line-clamp-3
              "
            >
              ${item.Deskripsi}
            </p>

            <!-- DETAIL -->
            <p class="text-[10px] text-white/80 mt-3">
              300 Pages · 20 Chapter
            </p>

          </div>

        </div>


        <!-- COVER BUKU -->
        <div
          class="
            absolute
            left-[18px]
            top-0
            z-10
            w-[180px]
            h-[270px]
          "
        >
          <img
            src="${item.image}"
            alt="${item.Judul}"
            class="w-full h-full object-cover rounded-sm shadow-lg"
          >
        </div>

      </div>
    `;
  });

  container.innerHTML = hasil;
}

ambilPro();
