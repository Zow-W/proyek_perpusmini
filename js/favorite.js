function logout() {

  const yakin = confirm("Yakin ingin logout?");

  if (yakin) {

    // Hapus data login dari session
    sessionStorage.clear();

    // Kembali ke landing
    window.location.href = "../dist/landing.html";
  }
}

const usernameLogin =
  sessionStorage.getItem("username");

const namaLogin =
  sessionStorage.getItem("nama");

const emailLogin =
  sessionStorage.getItem("email");

const telphoneLogin =
  sessionStorage.getItem("telphone");

const imageLogin =
  sessionStorage.getItem("image");


if (!usernameLogin) {

  window.location.href =
    "../dist/login.html";
}


function tampilkanAkun() {

  const namaProfile =
    document.getElementById("namaProfile");

  const usernameProfile =
    document.getElementById("usernameProfile");

  const fotoProfile =
    document.querySelector(
      'img[alt="Foto Profile"]'
    );

  const semuaInputText =
    document.querySelectorAll(
      'input[type="text"]'
    );


  const inputNama =
    semuaInputText[0];


  const inputUsername =
    semuaInputText[1];


  const inputTelphone =
    semuaInputText[2];

  const inputEmail =
    document.querySelector(
      'input[type="email"]'
    );

  if (namaProfile) {

    namaProfile.textContent =
      namaLogin || "User";
  }

  if (usernameProfile) {

    usernameProfile.textContent =
      "@" + (usernameLogin || "username");
  }

  if (inputNama) {

    inputNama.value =
      namaLogin || "";
  }

  if (inputUsername) {

    inputUsername.value =
      usernameLogin || "";
  }


  if (inputEmail) {

    inputEmail.value =
      emailLogin || "";
  }


  if (inputTelphone) {

    inputTelphone.value =
      telphoneLogin || "";
  }


  if (fotoProfile && imageLogin) {

    fotoProfile.src =
      imageLogin;
  }
}


function tampilkanJumlahFavorit() {

  // Ambil data favorit dari localStorage
  const bukuFavorit =
    JSON.parse(
      localStorage.getItem("favorit")
    ) || [];


  // Cari elemen jumlah favorite
  const jumlahFavorit =
    document.getElementById(
      "jumlahFavorit"
    );


  // Tampilkan jumlahnya
  if (jumlahFavorit) {

    jumlahFavorit.textContent =
      bukuFavorit.length;
  }
}

tampilkanAkun();

tampilkanJumlahFavorit();


window.addEventListener(
  "pageshow",
  function () {

    tampilkanJumlahFavorit();

  }
);

function showTab(tabId, button) {

  const tabs =
    document.querySelectorAll(
      ".tab-content"
    );


  tabs.forEach(function (tab) {

    tab.classList.add("hidden");

  });

  const tab =
    document.getElementById(tabId);


  if (tab) {

    tab.classList.remove("hidden");

  }

  const buttons =
    document.querySelectorAll(
      ".tab-button"
    );


  buttons.forEach(function (btn) {

    btn.classList.remove(
      "active-tab"
    );

  });

  if (button) {

    button.classList.add(
      "active-tab"
    );

  }
}


function saveProfile() {

  const semuaInputText =
    document.querySelectorAll(
      'input[type="text"]'
    );

  const inputNama =
    semuaInputText[0];


  const inputUsername =
    semuaInputText[1];


  const inputTelphone =
    semuaInputText[2];


  const inputEmail =
    document.querySelector(
      'input[type="email"]'
    );

  const nama =
    inputNama
      ? inputNama.value.trim()
      : "";


  const username =
    inputUsername
      ? inputUsername.value.trim()
      : "";


  const email =
    inputEmail
      ? inputEmail.value.trim()
      : "";


  const telphone =
    inputTelphone
      ? inputTelphone.value.trim()
      : "";

  sessionStorage.setItem(
    "nama",
    nama
  );


  sessionStorage.setItem(
    "username",
    username
  );


  sessionStorage.setItem(
    "email",
    email
  );


  sessionStorage.setItem(
    "telphone",
    telphone
  );

  tampilkanAkun();
  alert(
    "Profile berhasil disimpan!"
  );
}
let bukuFavorit = [];
let kategoriAktif = "Semua";

function buatBintang(rating) {

  let hasil = "";

  const nilai =
    Math.round(
      Number(rating) || 0
    );


  for (
    let i = 1;
    i <= 5;
    i++
  ) {

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
    document.getElementById(
      "favorite"
    );


  if (!container) return;


  bukuFavorit =
    JSON.parse(
      localStorage.getItem("favorit")
    ) || [];

  let hasil =
    bukuFavorit;


  if (
    kategoriAktif !== "Semua"
  ) {

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
                  ${
                    buku.Author ||
                    "Unknown Author"
                  }
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
                    (
                    ${
                      buku.rating?.rate ||
                      0
                    }
                    )
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

        }

      ).join("")}

    </div>

  `;
}

function filterCategory(kategori) {

  kategoriAktif =
    kategori;


  tampilkanFavorit();
}

tampilkanFavorit();
tampilkanJumlahFavorit();