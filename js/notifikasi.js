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

function tampilkanJumlahNotifikasi() {
const jumlahNotifikasi =
document.getElementById("jumlahNotifikasi");

if (!jumlahNotifikasi) return;

const username =
sessionStorage.getItem("username");

if (!username) {
jumlahNotifikasi.textContent = "";
return;
}

const semuaNotifikasi =
JSON.parse(
localStorage.getItem("notifikasi")
) || [];

const jumlahBelumDibaca =
semuaNotifikasi.filter(function(notif) {
return (
notif.username === username &&
notif.jenis === "peminjaman" &&
notif.dibaca === false
);
}).length;

if (jumlahBelumDibaca > 0) {
jumlahNotifikasi.textContent = jumlahBelumDibaca;
jumlahNotifikasi.classList.add("flex");
} else {
jumlahNotifikasi.textContent = "";
jumlahNotifikasi.classList.remove("flex");
}
}

function tampilkanNotifikasiPeminjaman() {
const container =
document.getElementById("daftarNotifikasi");

if (!container) return;

const username =
sessionStorage.getItem("username");

if (!username) {
container.innerHTML = ` <div class="text-center py-10">

    <iconify-icon
      icon="lucide:bell-off"
      width="45"
      class="text-gray-300"
    ></iconify-icon>

    <p class="text-gray-400 text-sm mt-3">
      Silakan login terlebih dahulu.
    </p>

  </div>
`;

return;

}

const semuaNotifikasi =
JSON.parse(
localStorage.getItem("notifikasi")
) || [];

const notifikasiPeminjaman =
semuaNotifikasi.filter(function(notif) {
return (
notif.username === username &&
notif.jenis === "peminjaman"
);
});

if (notifikasiPeminjaman.length === 0) {
container.innerHTML = ` <div class="text-center py-10">

    <iconify-icon
      icon="lucide:bell-off"
      width="45"
      class="text-gray-300"
    ></iconify-icon>

    <h3 class="text-lg font-bold text-gray-700 mt-4">
      Belum Ada Peminjaman
    </h3>

    <p class="text-sm text-gray-400 mt-2">
      Notifikasi peminjaman akan muncul di sini.
    </p>

  </div>
`;

return;

}

container.innerHTML =
notifikasiPeminjaman
.slice()
.reverse()
.map(function(notif) {
return ` <div
         class="
           flex
           gap-4
           p-4
           border
           border-gray-200
           rounded-xl
           bg-white
           mb-3
           shadow-sm
         "
       >

        <div
          class="
            w-10
            h-10
            rounded-full
            bg-blue-100
            flex
            items-center
            justify-center
            flex-shrink-0
          "
        >

          <iconify-icon
            icon="lucide:book-open"
            width="20"
            class="text-blue-600"
          ></iconify-icon>

        </div>

        <div class="flex-1">

          <h3
            class="
              text-sm
              font-bold
              text-gray-800
            "
          >
            ${notif.judul}
          </h3>

          <p
            class="
              text-xs
              text-gray-500
              mt-1
            "
          >
            ${notif.pesan}
          </p>

          <p
            class="
              text-[10px]
              text-gray-400
              mt-2
            "
          >
            ${notif.waktu}
          </p>

        </div>

      </div>
    `;
  })
  .join("");

}

function tandaiSudahDibaca() {
const username =
sessionStorage.getItem("username");

if (!username) return;

let notifikasi =
JSON.parse(
localStorage.getItem("notifikasi")
) || [];

notifikasi =
notifikasi.map(function(notif) {
if (
notif.username === username &&
notif.jenis === "peminjaman"
) {
notif.dibaca = true;
}


  return notif;
});

localStorage.setItem(
"notifikasi",
JSON.stringify(notifikasi)
);

tampilkanJumlahNotifikasi();
}

tampilkanAkun();
tampilkanJumlahNotifikasi();
tampilkanNotifikasiPeminjaman();

tandaiSudahDibaca();

window.addEventListener("pageshow", function() {
tampilkanAkun();
tampilkanJumlahNotifikasi();
tampilkanNotifikasiPeminjaman();
});
