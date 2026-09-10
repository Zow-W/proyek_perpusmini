let semuaBuku = [];

// =========================
// BINTANG
// =========================
function buatBintang(rating) {
    let hasil = "";

    const nilai = Math.round(Number(rating) || 0);

    for (let i = 1; i <= 5; i++) {
        if (i <= nilai) {
            hasil += `
                <span class="text-[15px] text-yellow-400">
                    ★
                </span>
            `;
        } else {
            hasil += `
                <span class="text-[15px] text-gray-300">
                    ★
                </span>
            `;
        }
    }

    return hasil;
}


// =========================
// AMBIL DATA JSON
// =========================
async function ambilData() {
    try {
        const response = await fetch("./data_buku.json");

        if (!response.ok) {
            throw new Error("data_buku.json tidak ditemukan");
        }

        semuaBuku = await response.json();

        console.log("Semua buku:", semuaBuku);

        // Tampilkan buku
        tampilkanBuku();

        // Update total koleksi
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
                        Pastikan file data_buku.json berada di folder yang benar
                        dan format JSON tidak error.
                    </p>

                </div>
            `;
        }
    }
}


// =========================
// TAMPILKAN BUKU
// =========================
function tampilkanBuku() {

    const container = document.getElementById("output");
    const judul = document.getElementById("judulKoleksi");

    if (!container) {
        console.log("Element output tidak ditemukan");
        return;
    }


    // =========================
    // AMBIL KATEGORI DARI URL
    // =========================
    const params = new URLSearchParams(
        window.location.search
    );

    const kategori = params.get("kategori");

    console.log("Kategori dari URL:", kategori);


    // =========================
    // DEFAULT = SEMUA BUKU
    // =========================
    let bukuDitampilkan = semuaBuku;


    // =========================
    // FILTER KATEGORI
    // =========================
    if (kategori) {

        bukuDitampilkan = semuaBuku.filter((buku) => {

            if (!buku.Category) {
                return false;
            }

            const categoryBuku = buku.Category
                .trim()
                .toLowerCase();

            const categoryURL = kategori
                .trim()
                .toLowerCase();

            return categoryBuku === categoryURL;
        });
    }


    // =========================
    // UBAH JUDUL
    // =========================
    if (judul) {

        if (kategori) {
            judul.textContent = `Koleksi Buku ${kategori}`;
        } else {
            judul.textContent = "Koleksi Buku";
        }
    }


    // =========================
    // CEK HASIL
    // =========================
    console.log(
        "Buku yang ditampilkan:",
        bukuDitampilkan
    );


    // =========================
    // KALAU BUKU KOSONG
    // =========================
    if (bukuDitampilkan.length === 0) {

        container.innerHTML = `
            <div
                class="
                    col-span-full
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                    py-20
                "
            >

                <iconify-icon
                    icon="lucide:book-open"
                    width="50"
                    class="text-gray-300"
                ></iconify-icon>

                <h3
                    class="
                        text-lg
                        font-bold
                        text-gray-700
                        mt-4
                    "
                >
                    Buku Tidak Ditemukan
                </h3>

                <p
                    class="
                        text-sm
                        text-gray-400
                        mt-2
                    "
                >
                    Belum ada buku dalam kategori
                    ${kategori || ""}.
                </p>

            </div>
        `;

        return;
    }


    // =========================
    // TAMPILKAN CARD
    // =========================
    container.innerHTML = bukuDitampilkan
        .map((buku) => {

            return `
                <div
                    class="
                        w-[180px]
                        h-[370px]
                        border
                        border-gray-200
                        rounded-xl
                        p-3
                        bg-white
                        flex
                        flex-col
                        transition-all
                        duration-300
                        hover:-translate-y-2
                        hover:shadow-lg
                    "
                >

                    <!-- LINK DETAIL -->
                    <a
                        href="./detail.html?id=${buku.Id}"
                        class="
                            flex
                            flex-col
                            h-full
                            w-full
                        "
                    >

                        <!-- COVER -->
                        <img
                            src="${buku.image}"
                            alt="${buku.Judul}"
                            class="
                                w-full
                                h-[220px]
                                object-cover
                                rounded-lg
                                shadow-md
                                flex-shrink-0
                            "
                        >

                        <!-- JUDUL -->
                        <h5
                            class="
                                font-bold
                                text-gray-800
                                text-[13px]
                                mt-3
                                leading-5
                                line-clamp-2
                            "
                        >
                            ${buku.Judul}
                        </h5>

                        <!-- AUTHOR -->
                        <p
                            class="
                                italic
                                text-gray-500
                                text-[10px]
                                mt-1
                                truncate
                            "
                        >
                            ${buku.Author || "Unknown Author"}
                        </p>

                        <!-- RATING -->
                        <div
                            class="
                                flex
                                items-center
                                gap-1
                                mt-2
                            "
                        >

                            ${buatBintang(
                                buku.rating?.rate
                            )}

                            <span
                                class="
                                    text-gray-400
                                    text-[10px]
                                "
                            >
                                (${buku.rating?.rate || 0})
                            </span>

                        </div>


                        <!-- BUTTON -->
                        <div
                            class="
                                mt-auto
                                bg-[#0f1e3d]
                                text-white
                                rounded-full
                                py-2
                                text-[10px]
                                text-center
                                w-full
                                hover:bg-[#184e67]
                                transition
                            "
                        >
                            Read Now
                        </div>

                    </a>

                </div>
            `;

        })
        .join("");
}


// =========================
// JALANKAN PROGRAM
// =========================
ambilData();