let allPro = [];
let product = [];
let user = [];


// async function login() {
//   try {
//     const response = await fetch("data_user.json");

//     if (!response.ok) {
//       throw new Error("data_user.json tidak ditemukan");
//     }

//     user = await response.json();

//   } catch (error) {
//     console.log("Error data user:", error);
//   }
// }

// login();


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
    "bg-[#72B8CF]",
  ];

  const teksCard = [
    "text-[#85b4e0]",
    "text-[#3D577B]",
    "text-[#F0C9C9]",
    "text-[#9B8175]",
    "text-[#72B8CF]",
  ];


  allPro.slice(0, 5).forEach((item, index) => {

    const rating = item.rating?.rate || 0;

    hasil += `
      <div
        class="
          relative
          flex-shrink-0
          w-[300px]
          h-[180px]
          ${warnaCard[index % warnaCard.length]}
          overflow-visible
        "
      >

        <a
          href="detail.html?id=${item.Id}"
          class="block w-full h-full"
        >

          <!-- TEKS -->
          <div
            class="
              absolute
              left-5
              top-5
              w-[150px]
              text-white
              z-20
            "
          >

            <!-- JUDUL -->
            <h3 class="text-[13px] font-bold line-clamp-2">
              ${item.Judul}
            </h3>

            <!-- AUTHOR -->
            <p class="text-[9px] mt-1">
              ${item.Author || "Unknown Author"}
            </p>

            <!-- RATING -->
            <div class="flex items-center gap-1 mt-2">

              ${buatBintang(rating, "text-[10px]")}

              <span class="text-[9px]">
                ${rating}
              </span>

            </div>

            <!-- DESKRIPSI -->
            <p class="text-[8px] mt-3 leading-relaxed line-clamp-2">
              ${item.Deskripsi || "Tidak ada deskripsi."}
            </p>

            <!-- BUTTON -->
            <div
              class="
                inline-block
                mt-3
                bg-white
                ${teksCard[index % teksCard.length]}
                text-[9px]
                font-semibold
                px-6
                py-2
                rounded-full
                shadow-sm
                hover:scale-105
                transition
              "
            >
              Lihat Buku
            </div>

          </div>


          <!-- COVER -->
          <img
            src="${item.image}"
            alt="${item.Judul}"
            class="
              absolute
              w-[105px]
              h-[160px]
              object-cover
              right-[10px]
              -bottom-[10px]
              shadow-lg
              z-10
              rounded-sm
            "
          >

        </a>

      </div>
    `;
  });


  container.innerHTML = hasil;



  clearInterval(slideInterval);

  jalan = true;

  slideInterval = setInterval(() => {

    if (!jalan) return;

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



// =========================
// BINTANG
// =========================

function buatBintang(
  rating,
  ukuran = "text-[15px]"
) {

  let hasil = "";

  const nilai = Math.round(
    Number(rating) || 0
  );


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



// =========================
// AMBIL DATA BUKU
// =========================

async function ambilPro() {

  try {

    const response = await fetch("data_buku.json");

    if (!response.ok) {
      throw new Error(
        "data_buku.json tidak ditemukan"
      );
    }

    const data = await response.json();

    allPro = data;
    product = data;


    // =========================
    // TAMPILKAN DATA
    // =========================

    bookSlider();

    forYou();

    peringkat();

    filterCategory("Semua");


  } catch (error) {

    console.log("ERROR:", error);

  }

}



// =========================
// TAMPILKAN SEMUA BUKU
// =========================

function tampilkanDataBuku(data) {

  const container =
    document.getElementById("output");


  if (!container) {

    console.log(
      "output tidak ditemukan"
    );

    return;
  }


  let hasil = "";


  data.forEach((item) => {

    const rating =
      item.rating?.rate || 0;


    hasil += `

      <!-- CARD -->
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

        <a
          href="detail.html?id=${item.Id}"
          class="
            flex
            flex-col
            h-full
          "
        >

          <!-- COVER -->
          <img
            src="${item.image}"
            alt="${item.Judul}"
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
            ${item.Judul}
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
            ${item.Author || "Unknown Author"}
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
              rating,
              "text-[11px]"
            )}

            <span
              class="
                text-gray-400
                text-[10px]
              "
            >
              (${rating})
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
  });


  container.innerHTML = hasil;
}



// =========================
// FILTER CATEGORY
// =========================

function filterCategory(Category) {

  if (
    Category === "Semua" ||
    !Category
  ) {

    product = allPro;

  } else {

    product = allPro.filter(
      (item) =>
        item.Category === Category
    );

  }


  tampilkanDataBuku(product);
}



// =========================
// FOR YOU
// =========================

function forYou() {

  const container =
    document.getElementById("forYou");


  if (!container) {

    console.log(
      "ForYou tidak ditemukan"
    );

    return;
  }


  container.innerHTML = "";


  let hasil = "";


  allPro.slice(0, 6).forEach((item) => {

    const rating =
      item.rating?.rate || 0;


    hasil += `

      <a
        href="detail.html?id=${item.Id}"
        class="
          flex
          items-center
          gap-4
          w-[260px]
          group
        "
      >

        <!-- COVER -->
        <img
          src="${item.image}"
          alt="${item.Judul}"
          class="
            w-[70px]
            h-[100px]
            object-cover
            shadow-md
            flex-shrink-0
            group-hover:scale-105
            transition
          "
        >


        <!-- INFO -->
        <div
          class="
            flex
            flex-col
            min-w-0
          "
        >

          <!-- JUDUL -->
          <h3
            class="
              text-[#13315C]
              font-bold
              text-[14px]
              leading-5
              line-clamp-2
            "
          >
            ${item.Judul}
          </h3>


          <!-- AUTHOR -->
          <p
            class="
              text-gray-400
              text-[10px]
              mt-2
              line-clamp-1
            "
          >
            ${item.Author || "Unknown Author"}
          </p>


          <!-- RATING -->
          <div
            class="
              flex
              items-center
              gap-1
              mt-3
            "
          >

            ${buatBintang(
              rating,
              "text-[14px]"
            )}

            <span
              class="
                text-gray-500
                text-[10px]
              "
            >
              ${rating}
            </span>

          </div>

        </div>

      </a>

    `;
  });


  container.innerHTML = hasil;
}



// =========================
// PERINGKAT
// =========================

function peringkat() {

  const container =
    document.getElementById(
      "peringkat"
    );


  if (!container) {

    console.log(
      "Peringkat tidak ditemukan"
    );

    return;
  }


  container.innerHTML = "";


  let hasil = "";


  const ranking =
    [...allPro]
      .sort((a, b) => {

        return (
          (b.rating?.rate || 0) -
          (a.rating?.rate || 0)
        );

      })
      .slice(0, 7);


  ranking.forEach(
    (item, index) => {

      hasil += `

        <a
          href="detail.html?id=${item.Id}"
          class="
            flex
            items-center
            gap-3
            mb-4
            hover:bg-gray-50
            p-1
            rounded
            transition
          "
        >

          <!-- NOMOR -->
          <span
            class="
              text-[13px]
              font-bold
              ${
                index === 0
                  ? "text-red-500"
                  : "text-gray-400"
              }
              w-4
            "
          >
            ${index + 1}
          </span>


          <!-- JUDUL -->
          <p
            class="
              text-[12px]
              text-gray-600
              flex-1
              line-clamp-1
            "
          >
            ${item.Judul}
          </p>

        </a>

      `;
    }
  );


  container.innerHTML = hasil;
}


ambilPro();