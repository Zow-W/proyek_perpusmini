//SCROLL BESTSELLER
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("bookSlider");
  if (slider) {
    // Duplikat semua card sekali
    const originalCards = Array.from(slider.children);
    originalCards.forEach((card) => {
      slider.appendChild(card.cloneNode(true));
    });
    const originalSetWidth = slider.scrollWidth / 2;

    function autoScrollStep() {
      slider.scrollLeft += 1;
      if (slider.scrollLeft >= originalSetWidth) {
        slider.scrollLeft -= originalSetWidth;
      }
    }

    let autoScroll = setInterval(autoScrollStep, 20);
    slider.addEventListener("mouseenter", () => clearInterval(autoScroll));
    slider.addEventListener("mouseleave", () => {
      autoScroll = setInterval(autoScrollStep, 20);
    });
  }
});

//HAPUS
function hapusBuku(button) {
  const book = button.closest(".book-item");

  book.remove();
}

// Hapus semua buku
function hapusSemua() {
  const daftarBuku = document.getElementById("daftarBuku");

  daftarBuku.innerHTML = `

        <div class="py-10 text-center">

          <iconify-icon
            icon="solar:cart-large-2-linear"
            width="50"
            class="text-slate-300">
          </iconify-icon>

          <p class="mt-3 font-semibold text-slate-500">
            Keranjang masih kosong
          </p>

          <p class="mt-1 text-sm text-slate-400">
            Tambahkan buku yang ingin kamu pinjam.
          </p>

        </div>

      `;
}

// Submit peminjaman
document
  .getElementById("formPeminjaman")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    alert(
      "Pengajuan peminjaman berhasil!\n\n" +
        "Silakan datang ke perpustakaan untuk mengambil buku.",
    );
  });
