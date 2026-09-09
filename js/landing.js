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


function buatBintang(rating, sizeClass = "text-[15px]") {
  const persen = Math.max(0, Math.min(100, (rating / 5) * 100));

  return `
    <span class="relative inline-block ${sizeClass} tracking-tight leading-none align-middle" style="width: max-content;">
      <span class="text-gray-300 select-none">★★★★★</span>
      <span
        class="absolute top-0 left-0 overflow-hidden text-yellow-400 select-none whitespace-nowrap"
        style="width: ${persen}%;"
      >★★★★★</span>
    </span>
  `;
}

async function ambilPro() {
  try {
    const response = await fetch("../js/data_buku.json");

    if (!response.ok) {
      throw new Error("data_buku.json tidak ditemukan");
    }

    const data = await response.json();

    allPro = data;
    product = data;

    tampilkanLandingBuku();
    latestBook();
    filterCategory("Semua"); // ini udah manggil latestBook() + tampilkanDataBuku()
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

function filterCategory(Category) {
  if (Category === "Semua" || !Category) {
    product = allPro;
  } else {
    product = allPro.filter((item) => item.Category === Category);
  }

  tampilkanDataBuku(product);
}

function latestBook() {
  const container = document.getElementById("latestBook");

  if (!container) {
    console.log("latestBook tidak ditemukan");
    return;
  }

  container.innerHTML = "";

  let hasil = "";

  const warnaCard = [
    "bg-[#3D577B]",
    "bg-[#283343]",
    "bg-[#F0C9C9]",
    "bg-[#9B8175]",
    "bg-[#72B8CF]",
  ];

  const chapterCard = [
    "300 Pages · 20 Chapter",
    "1 Pages · 40 Chapter",
    "210 Pages · 90 Chapter",
    "89 Pages · 30 Chapter",
    "30 Pages · 100 Chapter",
  ];

  allPro.slice(0, 5).forEach((item, index) => {
    const rating = item.rating.rate;

    hasil += `
    <div class="relative flex-shrink-0 w-[400px] h-[300px]">
    <a href="../dist/detail.html?id=${item.Id}">

      <div class=" absolute left-0 top-[40px] w-[400px] h-[200px] ${warnaCard[index]} rounded-[20px]">
      
      <div class="ml-[180px] pr-6 h-full flex flex-col justify-center">
      <h3 class="text-[16px] font-bold text-white">
      ${item.Judul}
      </h3>
    
      <p class="text-[12px] font-medium text-white/80 mt-1">
      ${item.Author}
      </p>
      

      <div class="flex items-center gap-2 mt-2">
      ${buatBintang(rating, "text-[19px]")}
      
      <span class="text-[10px] text-white/80">
      ${rating}
      </span>
      </div>
      

      <p class="text-[11px] leading-[17px] text-white/90 mt-2 line-clamp-3"> ${item.Deskripsi}</p>
      <p class="text-[10px] text-white/80 mt-3">
      ${chapterCard[index]}
      </p>
      </div>
      </div>     

      <div class="absolute left-[18px] top-0 z-10 w-[135px] h-[200px]">
      <img src="${item.image}" alt="${item.Judul}" class="w-full h-full object-cover rounded-sm shadow-lg">
      </a>
    </div>
            
  </div>
    `;
  });

  container.innerHTML = hasil;

  let jalan = true;

  function autoSlide() {
    if (!jalan) return;

    container.scrollLeft += 1;

    // Kalau sudah sampai ujung
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
      container.scrollLeft = 0;
    }
  }

  // Hapus interval lama sebelum bikin yang baru, biar gak numpuk
  // tiap kali latestBook() dipanggil ulang (misal pas ganti kategori)
  clearInterval(container.dataset.intervalId);
  const interval = setInterval(autoSlide, 20);
  container.dataset.intervalId = interval;

  // Pakai onmouseenter/onmouseleave (bukan addEventListener) biar
  // otomatis ke-replace, gak numpuk listener tiap kali dipanggil ulang
  container.onmouseenter = () => {
    jalan = false;
  };

  container.onmouseleave = () => {
    jalan = true;
  };
}

function tampilkanDataBuku(data) {
  const container = document.getElementById("output");

  if (!container) {
    console.log("output tidak ditemukan");
    return;
  }

  let hasil = "";

  data.forEach((item) => {
    const rating = item.rating.rate;

    hasil += `
  <div class="flex flex-col w-[200px] border px-5 rounded-2xl py-4 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg mb-10 ml-7">
  <a href="../dist/detail.html?id=${item.Id}">
    <img src="${item.image}" alt="${item.Judul}" class="w-full h-[240px] object-cover shadow-md">

    <h5 class="font-bold text-gray-800 text-[16px] mt-4 leading-6 line-clamp-2">
      ${item.Judul}
    </h5>

    <p class="italic text-gray-500 text-[13px] mt-1">
      ${item.Author}
    </p>

    
    <div class="flex items-center gap-1 mt-2 h-[20px] mb-6">
      ${buatBintang(rating, "text-[15px]")}
      <span class="text-gray-400 text-[12px]">
        (${rating})
      </span>
    </div>
    </a>


    <button class="mt-auto bg-[#0f1e3d] text-white rounded-full py-[10px] text-[13px] w-full">
    <a href="../dist/login.html">
    
    Read Now
    </button>
    </a>

</div>
  `;
  });

  container.innerHTML = hasil;
}

const reviews = [
  {
    name: "Septia",
    text: `"Sukaa banget baca disini, bagus dan kualitasnya sesuai dengan yang saya harapkan."`,
    img: "../assets/foto1.jpg",
  },
  {
    name: "Nafinza Putri",
    text: `"Saya sangat suka dengan produknya. Bahannya nyaman dan modelnya juga cantik. Pasti akan order lagi."`,
    img: "../assets/foto2.jpg",
  },
  {
    name: "Ghina",
    text: `"Pelayanannya sangat baik dan produknya berkualitas. Saya puas sekali."`,
    img: "../assets/foto3.jpg",
  },
  {
    name: "Linda",
    text: `"Pelayanannya tidak mengecewakan, next time saya beli lagi borong deh"`,
    img: "../assets/foto4.jpg",
  },
];

let currentIndex = 1;

function cardHTML(item, isCenter) {
  const card = isCenter
    ? "w-[380px] h-[300px] bg-white border border-gray-200 shadow-lg p-8"
    : "w-[280px] h-[230px] bg-gray-100 opacity-60 scale-90 p-6";
  const img = isCenter ? "w-16 h-16" : "w-14 h-14";
  const name = isCenter ? "text-lg" : "text-sm";
  const text = isCenter
    ? "text-sm mt-5 text-gray-600"
    : "text-xs mt-4 text-gray-500";

  return `
    <div class="review-card flex-shrink-0 rounded-lg text-center ${card}">
      <div class="${img} mx-auto rounded-full overflow-hidden bg-white flex items-center justify-center mb-4">
        <img src="${item.img}" class="w-full h-full object-cover" alt="Profile">
      </div>
      <h3 class="font-semibold text-gray-800 ${name}">${item.name}</h3>
      <p class="leading-relaxed ${text}">${item.text}</p>
    </div>
  `;
}

function renderReviews() {
  const total = reviews.length;
  const order = [-1, 0, 1].map(
    (offset) => (currentIndex + offset + total) % total,
  );

  document.getElementById("reviewContainer").innerHTML = order
    .map((idx, pos) => cardHTML(reviews[idx], pos === 1))
    .join("");
}

function shiftReview(step) {
  currentIndex = (currentIndex + step + reviews.length) % reviews.length;
  renderReviews();
}

document
  .getElementById("nextBtn")
  .addEventListener("click", () => shiftReview(1));
document
  .getElementById("prevBtn")
  .addEventListener("click", () => shiftReview(-1));

renderReviews();


function join() {
  let email = document.getElementById("email").value.trim();

  if (email === "") {
    alert("Silahkan isi email terlebih dahulu");
  } else {
    alert("Berhasil Dikrim");
    document.getElementById("email").value = "";
  }
}

ambilPro();
