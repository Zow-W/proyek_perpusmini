let bukuFavorit = [];
let kategoriAktif = "Semua";

function tampilkanProfile() {
  const usernameLogin =
    sessionStorage.getItem("username");

  if (!usernameLogin) {
    window.location.href = "../dist/login.html";
    return;
  }

  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const userTerbaru =
    users.find(function (user) {
      return user.username === usernameLogin;
    });

  const namaLogin =
    (userTerbaru && userTerbaru.nama) ||
    sessionStorage.getItem("nama");

  const emailLogin =
    (userTerbaru && userTerbaru.email) ||
    sessionStorage.getItem("email");

  const imageLogin =
    (userTerbaru && userTerbaru.image) ||
    sessionStorage.getItem("image");

  if (userTerbaru) {
    if (userTerbaru.nama) {
      sessionStorage.setItem(
        "nama",
        userTerbaru.nama
      );
    }

    if (userTerbaru.email) {
      sessionStorage.setItem(
        "email",
        userTerbaru.email
      );
    }

    if (userTerbaru.telphone) {
      sessionStorage.setItem(
        "telphone",
        userTerbaru.telphone
      );
    }

    if (userTerbaru.image) {
      sessionStorage.setItem(
        "image",
        userTerbaru.image
      );
    }
  }

  const namaUser =
    document.getElementById("namaUser");

  const emailUser =
    document.getElementById("emailUser");

  const fotoUser =
    document.getElementById("fotoUser");

  if (namaUser) {
    namaUser.textContent =
      namaLogin || "User";
  }

  if (emailUser) {
    emailUser.textContent =
      emailLogin || "";
  }

  if (fotoUser) {
    fotoUser.src =
      imageLogin || "../assets/kucing.jpg";
  }
}

function ambilFavorit() {
  const username =
    sessionStorage.getItem("username");

  if (!username) {
    return [];
  }

  return JSON.parse(
    localStorage.getItem(
      "favorit_" + username
    )
  ) || [];
}

function buatBintang(rating) {
  let hasil = "";

  const nilai =
    Math.round(
      Number(rating) || 0
    );

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

function tampilkanFavorit() {
  const container =
    document.getElementById("favorite");

  if (!container) {
    return;
  }

  bukuFavorit =
    ambilFavorit();

  let hasil =
    bukuFavorit;

  if (kategoriAktif !== "Semua") {
    hasil =
      bukuFavorit.filter(
        function (buku) {
          return (
            buku.Category ===
            kategoriAktif
          );
        }
      );
  }

  if (hasil.length === 0) {
    container.innerHTML = `
      <div
        class="
          w-full
          flex
          flex-col
          items-center
          justify-center
          text-center
          py-20
          px-4
        "
      >

        <iconify-icon
          icon="lucide:bookmark"
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
          Buku Favorite Belum Ada
        </h3>

        <p
          class="
            text-sm
            text-gray-400
            mt-2
          "
        >
          Buku yang kamu favoritkan akan
          muncul di sini.
        </p>

      </div>
    `;

    return;
  }

  container.innerHTML = `
    <div
      class="
        flex
        flex-wrap
        gap-6
        justify-start
      "
    >

      ${hasil.map(
        function (buku) {
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
                justify-between
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-lg
              "
            >

              <a
                href="./detailHome.html?id=${buku.Id}"
                class="
                  flex
                  flex-col
                  h-full
                  w-full
                "
              >

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

                <p
                  class="
                    italic
                    text-gray-500
                    text-[10px]
                    mt-1
                    truncate
                  "
                >
                  ${
                    buku.Author ||
                    "Unknown Author"
                  }
                </p>

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
        }
      ).join("")}

    </div>
  `;
}

function filterCategory(kategori) {
  kategoriAktif = kategori;

  tampilkanFavorit();
}

tampilkanProfile();
tampilkanFavorit();

window.addEventListener(
  "pageshow",
  function () {
    tampilkanProfile();
    tampilkanFavorit();
  }
);