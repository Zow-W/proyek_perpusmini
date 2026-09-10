// =========================
// TAMPILKAN KERANJANG
// =========================
function tampilkanKeranjang() {
    const container = document.getElementById("tampilKeranjang");

    if (!container) return;

    // Ambil data dari localStorage
    let bukuKeranjang =
        JSON.parse(localStorage.getItem("keranjang")) || [];

    // =========================
    // KERANJANG KOSONG
    // =========================
    if (bukuKeranjang.length === 0) {
        container.innerHTML = `
            <div
                class="flex flex-col items-center justify-center text-center py-20"
            >
                <iconify-icon
                    icon="lucide:shopping-cart"
                    width="50"
                    class="text-gray-300"
                ></iconify-icon>

                <h3
                    class="text-lg font-bold text-gray-700 mt-4"
                >
                    Keranjang masih kosong
                </h3>

                <p
                    class="text-sm text-gray-400 mt-2"
                >
                    Buku yang kamu tambahkan akan muncul di sini.
                </p>
            </div>
        `;
        return;
    }

    // =========================
    // TAMPILKAN BUKU
    // =========================
    container.innerHTML = bukuKeranjang
        .map(
            (buku, index) => `
                <div
                    class="flex items-center gap-4 border border-gray-200 rounded-lg p-3"
                >

                    <!-- CHECKBOX -->
                    <input
                        type="checkbox"
                        checked
                        class="cekBuku w-4 h-4 accent-blue-600"
                        data-index="${index}"
                    >

                    <!-- COVER -->
                    <img
                        src="${buku.image}"
                        class="w-[80px] h-[110px] object-cover rounded-md"
                        alt="${buku.Judul}"
                    >

                    <!-- INFORMASI -->
                    <div class="flex-1">

                        <h3
                            class="text-[12px] font-bold text-[#13315C]"
                        >
                            ${buku.Judul}
                        </h3>

                        <p
                            class="text-[10px] text-gray-500 mt-1"
                        >
                            ${buku.Author || "Unknown Author"}
                        </p>

                        <p
                            class="text-[9px] text-gray-400 mt-1"
                        >
                            ${buku.Category || "Kategori tidak tersedia"}
                        </p>

                    </div>

                    <!-- HAPUS -->
                    <button
                        onclick="hapusDariKeranjang(${index})"
                        class="w-8 h-8 text-red-500 hover:text-red-600"
                    >
                        <iconify-icon
                            icon="solar:trash-bin-trash-linear"
                            width="17"
                        ></iconify-icon>
                    </button>

                </div>
            `
        )
        .join("");
}


// =========================
// HAPUS SATU BUKU
// =========================
function hapusDariKeranjang(index) {
    let bukuKeranjang =
        JSON.parse(localStorage.getItem("keranjang")) || [];

    // Hapus buku
    bukuKeranjang.splice(index, 1);

    // Simpan kembali
    localStorage.setItem(
        "keranjang",
        JSON.stringify(bukuKeranjang)
    );

    // Tampilkan ulang
    tampilkanKeranjang();
}


// =========================
// HAPUS SEMUA
// =========================
function hapusSemua() {
    localStorage.removeItem("keranjang");

    tampilkanKeranjang();
}


// =========================
// AJUKAN PEMINJAMAN
// =========================
function ajukanPeminjaman(event) {
    // Jangan refresh halaman
    event.preventDefault();

    // =========================
    // AMBIL DATA FORM
    // =========================
    const nama =
        document.getElementById("nama").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const sekolah =
        document.getElementById("sekolah").value.trim();

    const whatsapp =
        document.getElementById("whatsapp").value.trim();

    const tanggalPinjam =
        document.getElementById("tanggalPinjam").value;

    const tanggalKembali =
        document.getElementById("tanggalKembali").value;


    // =========================
    // AMBIL KERANJANG
    // =========================
    let bukuKeranjang =
        JSON.parse(localStorage.getItem("keranjang")) || [];


    // =========================
    // CEK KERANJANG
    // =========================
    if (bukuKeranjang.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }


    // =========================
    // CEK FORM
    // =========================
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


    // =========================
    // CEK TANGGAL
    // =========================
    if (tanggalKembali < tanggalPinjam) {
        alert(
            "Tanggal pengembalian tidak boleh sebelum tanggal peminjaman!"
        );
        return;
    }


    // =========================
    // AMBIL BUKU YANG DIPILIH
    // =========================
    const checkbox =
        document.querySelectorAll(".cekBuku");

    let bukuDipinjam = [];

    checkbox.forEach((cek) => {
        if (cek.checked) {
            const index =
                Number(cek.dataset.index);

            bukuDipinjam.push(
                bukuKeranjang[index]
            );
        }
    });


    // =========================
    // TIDAK ADA BUKU DIPILIH
    // =========================
    if (bukuDipinjam.length === 0) {
        alert("Pilih minimal satu buku!");
        return;
    }


    // =========================
    // BUAT ID PEMINJAMAN
    // =========================
    const idPeminjaman =
        "PJM-" + Date.now();


    // =========================
    // BUAT DATA PEMINJAMAN
    // =========================
    const dataPeminjaman = {
        id: idPeminjaman,
        nama: nama,
        email: email,
        sekolah: sekolah,
        whatsapp: whatsapp,
        tanggalPinjam: tanggalPinjam,
        tanggalKembali: tanggalKembali,

        // Status peminjaman
        status: "Dipinjam",

        buku: bukuDipinjam
    };


    // =========================
    // AMBIL RIWAYAT LAMA
    // =========================
    let riwayat =
        JSON.parse(
            localStorage.getItem("riwayatPeminjaman")
        ) || [];


    // =========================
    // MASUKKAN DATA BARU
    // =========================
    riwayat.push(dataPeminjaman);


    // =========================
    // SIMPAN RIWAYAT
    // =========================
    localStorage.setItem(
        "riwayatPeminjaman",
        JSON.stringify(riwayat)
    );


    // =========================
    // BUAT NOTIFIKASI
    // =========================

    let notifikasi =
    JSON.parse(localStorage.getItem("notifikasi")) || [];

    const judulBuku = bukuDipinjam
        .map((buku) => buku.Judul)
        .join(", ");

    const dataNotifikasi = {
        id: Date.now(),
        judul: "Peminjaman Berhasil",
        pesan: `Buku ${judulBuku} berhasil dipinjam.`,
        waktu: new Date().toLocaleString("id-ID"),
        dibaca: false
    };

    notifikasi.push(dataNotifikasi);

    localStorage.setItem(
        "notifikasi",
        JSON.stringify(notifikasi)
    );

    // =========================
    // HAPUS KERANJANG
    // =========================
    localStorage.removeItem("keranjang");


    // =========================
    // PESAN BERHASIL
    // =========================
    alert(
        "Peminjaman berhasil diajukan! 📚"
    );


    // =========================
    // TAMPILKAN KERANJANG
    // =========================
    tampilkanKeranjang();
}


// =========================
// HUBUNGKAN FORM
// =========================
const formPeminjaman =
    document.getElementById("formPeminjaman");

if (formPeminjaman) {
    formPeminjaman.addEventListener(
        "submit",
        ajukanPeminjaman
    );
}


// =========================
// JALANKAN
// =========================
tampilkanKeranjang();