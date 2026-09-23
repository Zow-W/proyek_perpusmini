function tampilkanAkun() {
const namaUser = document.getElementById("namaUser");
const emailUser = document.getElementById("emailUser");
const fotoUser = document.getElementById("fotoUser");

const namaLogin = sessionStorage.getItem("nama");
const emailLogin = sessionStorage.getItem("email");
const imageLogin = sessionStorage.getItem("image");

if (namaUser) {
namaUser.textContent = namaLogin || "User";
}

if (emailUser) {
emailUser.textContent = emailLogin || "Email";
}

if (fotoUser && imageLogin) {
fotoUser.src = imageLogin;
}
}

function tampilkanKeranjang() {
const container = document.getElementById("tampilKeranjang");

if (!container) return;

const username = sessionStorage.getItem("username");

if (!username) {
container.innerHTML = ` <div class="flex flex-col items-center justify-center text-center py-20"> <iconify-icon
       icon="lucide:shopping-cart"
       width="50"
       class="text-gray-300"
     ></iconify-icon>

    <h3 class="text-lg font-bold text-gray-700 mt-4">
      Silakan Login
    </h3>

    <p class="text-sm text-gray-400 mt-2">
      Silakan login terlebih dahulu untuk melihat keranjang.
    </p>
  </div>
`;

return;


}

let bukuKeranjang =
JSON.parse(localStorage.getItem("keranjang_" + username)) || [];

if (bukuKeranjang.length === 0) {
container.innerHTML = ` <div class="flex flex-col items-center justify-center text-center py-20"> <iconify-icon
       icon="lucide:shopping-cart"
       width="50"
       class="text-gray-300"
     ></iconify-icon>

    <h3 class="text-lg font-bold text-gray-700 mt-4">
      Keranjang masih kosong
    </h3>

    <p class="text-sm text-gray-400 mt-2">
      Buku yang kamu tambahkan akan muncul di sini.
    </p>
  </div>
`;

return;

}

container.innerHTML = bukuKeranjang.map(function(buku, index) {
return ` <div class="flex items-center gap-4 border border-gray-200 rounded-lg p-3">

    <input
      type="checkbox"
      class="cekBuku w-4 h-4 accent-blue-600"
      data-index="${index}"
    >

    <img
      src="${buku.image}"
      class="w-[80px] h-[110px] object-cover rounded-md"
      alt="${buku.Judul}"
    >

    <div class="flex-1">

      <h3 class="text-[12px] font-bold text-[#13315C]">
        ${buku.Judul}
      </h3>

      <p class="text-[10px] text-gray-500 mt-1">
        ${buku.Author || "Unknown Author"}
      </p>

      <p class="text-[9px] text-gray-400 mt-1">
        ${buku.Category || "Kategori tidak tersedia"}
      </p>

    </div>

    <button
      onclick="hapusDariKeranjang(${index})"
      class="w-8 h-8 text-red-500 hover:text-red-600 flex items-center justify-center"
    >
      <iconify-icon
        icon="solar:trash-bin-trash-linear"
        width="17"
      ></iconify-icon>
    </button>

  </div>
`;

}).join("");
}

function hapusDariKeranjang(index) {
const username = sessionStorage.getItem("username");

if (!username) return;

let bukuKeranjang =
JSON.parse(localStorage.getItem("keranjang_" + username)) || [];

bukuKeranjang.splice(index, 1);

localStorage.setItem(
"keranjang_" + username,
JSON.stringify(bukuKeranjang)
);

tampilkanKeranjang();
}

function hapusSemua() {
const username = sessionStorage.getItem("username");

if (!username) return;

localStorage.removeItem("keranjang_" + username);

tampilkanKeranjang();
}

function ajukanPeminjaman(event) {
event.preventDefault();

const nama = document.getElementById("nama").value.trim();
const email = document.getElementById("email").value.trim();
const sekolah = document.getElementById("sekolah").value.trim();
const whatsapp = document.getElementById("whatsapp").value.trim();
const tanggalPinjam = document.getElementById("tanggalPinjam").value;
const tanggalKembali = document.getElementById("tanggalKembali").value;

const username = sessionStorage.getItem("username");

if (!username) {
alert("Silakan login terlebih dahulu!");
return;
}

let bukuKeranjang =
JSON.parse(localStorage.getItem("keranjang_" + username)) || [];

if (bukuKeranjang.length === 0) {
alert("Keranjang masih kosong!");
return;
}

if (
nama === "" ||
email === "" ||
sekolah === "" ||
whatsapp === "" ||
tanggalPinjam === "" ||
tanggalKembali === ""
) {
alert("Silakan isi semua data terlebih dahulu!");
return;
}

if (tanggalKembali < tanggalPinjam) {
alert("Tanggal pengembalian tidak boleh sebelum tanggal peminjaman!");
return;
}

const checkbox = document.querySelectorAll(".cekBuku");

let bukuDipinjam = [];

checkbox.forEach(function(cek) {
if (cek.checked) {
const index = Number(cek.dataset.index);
bukuDipinjam.push(bukuKeranjang[index]);
}
});

if (bukuDipinjam.length === 0) {
alert("Pilih minimal satu buku!");
return;
}

const idPeminjaman = "PJM-" + Date.now();

const dataPeminjaman = {
id: idPeminjaman,
username: username,
nama: nama,
email: email,
sekolah: sekolah,
whatsapp: whatsapp,
tanggalPinjam: tanggalPinjam,
tanggalKembali: tanggalKembali,
status: "Dipinjam",
buku: bukuDipinjam
};

let riwayat =
JSON.parse(localStorage.getItem("riwayatPeminjaman")) || [];

riwayat.push(dataPeminjaman);

localStorage.setItem(
"riwayatPeminjaman",
JSON.stringify(riwayat)
);

const judulBuku = bukuDipinjam
.map(function(buku) {
return buku.Judul;
})
.join(", ");

let notifikasi =
JSON.parse(localStorage.getItem("notifikasi")) || [];

const dataNotifikasi = {
id: Date.now(),
username: username,
jenis: "peminjaman",
judul: "Peminjaman Buku Berhasil",
pesan: `Kamu baru saja mengajukan peminjaman buku: ${judulBuku}.`,
waktu: new Date().toLocaleString("id-ID"),
dibaca: false
};

notifikasi.push(dataNotifikasi);

localStorage.setItem(
"notifikasi",
JSON.stringify(notifikasi)
);

const bukuTersisa = bukuKeranjang.filter(function(buku) {
return !bukuDipinjam.includes(buku);
});

localStorage.setItem(
"keranjang_" + username,
JSON.stringify(bukuTersisa)
);

alert("Peminjaman berhasil diajukan! 📚");

tampilkanKeranjang();
}

const formPeminjaman = document.getElementById("formPeminjaman");

if (formPeminjaman) {
formPeminjaman.addEventListener(
"submit",
ajukanPeminjaman
);
}

tampilkanAkun();
tampilkanKeranjang();

window.addEventListener("pageshow", function() {
tampilkanAkun();
tampilkanKeranjang();
});
