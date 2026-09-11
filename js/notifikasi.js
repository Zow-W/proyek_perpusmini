function tampilkanNotifikasi() {

    const container =
        document.getElementById("daftarNotifikasi");

    if (!container) {
        console.log("Element daftarNotifikasi tidak ditemukan");
        return;
    }

    // Ambil data notifikasi
    let notifikasi = [];

    try {
        notifikasi =
            JSON.parse(
                localStorage.getItem("notifikasi")
            ) || [];
    } catch (error) {
        console.error(
            "Data notifikasi error:",
            error
        );

        notifikasi = [];
    }


    // =========================
    // JUMLAH NOTIFIKASI
    // =========================
    const jumlahNotifikasi =
        document.getElementById("jumlahNotifikasi");

    if (jumlahNotifikasi) {
        jumlahNotifikasi.textContent =
            notifikasi.length;
    }


    // =========================
    // BELUM ADA NOTIFIKASI
    // =========================
    if (notifikasi.length === 0) {

        container.innerHTML = `
            <div class="text-center py-16">

                <iconify-icon
                    icon="solar:bell-off-outline"
                    width="50"
                    class="text-gray-300"
                ></iconify-icon>

                <p
                    class="text-sm text-gray-500 mt-4"
                >
                    Belum ada notifikasi
                </p>

                <p
                    class="text-xs text-gray-400 mt-1"
                >
                    Notifikasi peminjaman akan muncul di sini.
                </p>

            </div>
        `;

        return;
    }


    // =========================
    // NOTIFIKASI TERBARU DI ATAS
    // =========================
    const dataTerbaru =
        [...notifikasi].reverse();


    // =========================
    // TAMPILKAN NOTIFIKASI
    // =========================
    container.innerHTML =
        dataTerbaru
            .map((notif) => {

                return `
                    <div
                        class="flex gap-4 px-5 py-5 border-b border-gray-100 hover:bg-gray-50 transition"
                    >

                        <!-- ICON -->
                        <div
                            class="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0"
                        >

                            <iconify-icon
                                icon="solar:book-2-outline"
                                width="22"
                                class="text-[#123b67]"
                            ></iconify-icon>

                        </div>


                        <!-- ISI -->
                        <div class="flex-1">

                            <div
                                class="flex items-center justify-between gap-3"
                            >

                                <p
                                    class="text-sm font-semibold text-gray-800"
                                >
                                    ${notif.judul || "Notifikasi"}
                                </p>


                                ${
                                    notif.dibaca === false
                                        ? `
                                            <span
                                                class="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0"
                                            ></span>
                                          `
                                        : ""
                                }

                            </div>


                            <p
                                class="text-xs text-gray-500 mt-1"
                            >
                                ${notif.pesan || ""}
                            </p>


                            <p
                                class="text-[10px] text-gray-400 mt-2"
                            >
                                ${notif.waktu || ""}
                            </p>

                        </div>

                    </div>
                `;
            })
            .join("");
}


// =========================
// JALANKAN
// =========================
tampilkanNotifikasi();