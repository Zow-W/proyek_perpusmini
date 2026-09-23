function tampilkanUser() {
const username = sessionStorage.getItem("username");
const nama = sessionStorage.getItem("nama");
const email = sessionStorage.getItem("email");
const image = sessionStorage.getItem("image");

if (!username) {
window.location.href = "./login.html";
return;
}

const namaUser = document.getElementById("namaUser");
const emailUser = document.getElementById("emailUser");
const fotoUser = document.getElementById("fotoUser");

if (namaUser) {
namaUser.textContent = nama || username || "User";
}

if (emailUser) {
emailUser.textContent = email || "";
}

if (fotoUser) {
fotoUser.src = image || "../assets/academy.jpg";
}
}

let semuaBuku = [];

function buatBintang(rating) {
let hasil = "";
const nilai = Math.round(Number(rating) || 0);

for (let i = 1; i <= 5; i++) {
hasil += `       <span class="text-[15px] ${i <= nilai ? "text-yellow-400" : "text-gray-300"}">★</span>
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
tampilkanJumlah();


} catch (error) {
console.error("Gagal mengambil data:", error);


const container = document.getElementById("output");

if (container) {
  container.innerHTML = `
    <div class="col-span-full text-center py-20">
      <iconify-icon icon="lucide:circle-alert" width="50" class="text-red-300"></iconify-icon>
      <h3 class="text-lg font-bold text-gray-700 mt-4">Data Buku Gagal Dimuat</h3>
      <p class="text-sm text-gray-400 mt-2">Pastikan file data_buku.json berada di folder yang benar.</p>
    </div>
  `;
}


}
}

function tampilkanJumlah() {
const username = sessionStorage.getItem("username");

const totalKoleksi = document.getElementById("totalKoleksi");
const jumlahFavorit = document.getElementById("jumlahFavorit");
const jumlahKeranjang = document.getElementById("jumlahKeranjang");

if (totalKoleksi) {
totalKoleksi.textContent = semuaBuku.length;
}

if (username) {
const favorit = JSON.parse(localStorage.getItem("favorit_" + username)) || [];
const keranjang = JSON.parse(localStorage.getItem("keranjang_" + username)) || [];


if (jumlahFavorit) {
  jumlahFavorit.textContent = favorit.length;
}

if (jumlahKeranjang) {
  jumlahKeranjang.textContent = keranjang.length;
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
return (
buku.Category &&
buku.Category.trim().toLowerCase() === kategori.trim().toLowerCase()
);
});
}

if (judul) {
judul.textContent = kategori ? `Koleksi Buku ${kategori}` : "Koleksi Buku";
}

if (bukuDitampilkan.length === 0) {
container.innerHTML = `       <div class="col-span-full flex flex-col items-center justify-center text-center py-20">         <iconify-icon icon="lucide:book-open" width="50" class="text-gray-300"></iconify-icon>         <h3 class="text-lg font-bold text-gray-700 mt-4">Buku Tidak Ditemukan</h3>         <p class="text-sm text-gray-400 mt-2">Belum ada buku dalam kategori ${kategori || ""}.</p>       </div>
    `;


return;


}

container.innerHTML = bukuDitampilkan.map((buku) => {
return ` <div class="w-[180px] h-[370px] border border-gray-200 rounded-xl p-3 bg-white flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"> <a href="../dist/detailHome.html?id=${buku.Id}" class="flex flex-col h-full w-full"> <img
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


}).join("");
}

function searchBook(keyword) {
const result = document.getElementById("searchResult");

if (!result) return;

const kata = keyword.trim().toLowerCase();

if (kata === "") {
result.innerHTML = "";
result.classList.add("hidden");
return;
}

const hasil = semuaBuku.filter((buku) => {
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
result.innerHTML = `       <div class="px-4 py-4 text-center">         <p class="text-[10px] text-gray-500">Buku tidak ditemukan</p>       </div>
    `;


result.classList.remove("hidden");
return;


}

result.innerHTML = hasil.map((buku) => {
return ` <a
     href="../dist/detailHome.html?id=${buku.Id}"
     class="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 transition"
   > <img
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

document.addEventListener("click", function (event) {
const searchInput = document.getElementById("searchInput");
const searchResult = document.getElementById("searchResult");

if (!searchInput || !searchResult) return;

if (!searchInput.contains(event.target) && !searchResult.contains(event.target)) {
searchResult.classList.add("hidden");
}
});

tampilkanUser();
ambilData();
