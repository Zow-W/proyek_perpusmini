function logout() {
  const yakin = confirm("Yakin ingin logout?");

  if (yakin) {
    sessionStorage.clear();
    window.location.href = "../dist/landing.html";
  }
}

const usernameLogin = sessionStorage.getItem("username");

if (!usernameLogin) {
  window.location.href = "../dist/login.html";
}

function tampilkanAkun() {
  const namaProfile =
    document.getElementById("namaProfile");

  const usernameProfile =
    document.getElementById("usernameProfile");

  const fotoProfile =
    document.querySelector('img[alt="Foto Profile"]');

  const semuaInputText =
    document.querySelectorAll('input[type="text"]');

  const inputNama = semuaInputText[0];
  const inputUsername = semuaInputText[1];
  const inputTelphone = semuaInputText[2];

  const inputEmail =
    document.querySelector('input[type="email"]');

  const nama =
    sessionStorage.getItem("nama");

  const username =
    sessionStorage.getItem("username");

  const email =
    sessionStorage.getItem("email");

  const telphone =
    sessionStorage.getItem("telphone");

  const image =
    sessionStorage.getItem("image");

  if (namaProfile) {
    namaProfile.textContent = nama || "User";
  }

  if (usernameProfile) {
    usernameProfile.textContent =
      "@" + (username || "username");
  }

  if (inputNama) {
    inputNama.value = nama || "";
  }

  if (inputUsername) {
    inputUsername.value = username || "";
  }

  if (inputEmail) {
    inputEmail.value = email || "";
  }

  if (inputTelphone) {
    inputTelphone.value = telphone || "";
  }

  if (fotoProfile) {
    fotoProfile.src =
      image || "../assets/kucing.jpg";
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

function tampilkanJumlahFavorit() {
  const bukuFavorit = ambilFavorit();

  const jumlahFavorit =
    document.getElementById("jumlahFavorit");

  if (jumlahFavorit) {
    jumlahFavorit.textContent =
      bukuFavorit.length;
  }
}

function showTab(tabId, button) {
  const tabs =
    document.querySelectorAll(".tab-content");

  tabs.forEach(function(tab) {
    tab.classList.add("hidden");
  });

  const tab =
    document.getElementById(tabId);

  if (tab) {
    tab.classList.remove("hidden");
  }

  const buttons =
    document.querySelectorAll(".tab-button");

  buttons.forEach(function(btn) {
    btn.classList.remove("active-tab");
  });

  if (button) {
    button.classList.add("active-tab");
  }
}

function saveProfile() {
  const semuaInputText =
    document.querySelectorAll('input[type="text"]');

  const inputNama = semuaInputText[0];
  const inputUsername = semuaInputText[1];
  const inputTelphone = semuaInputText[2];

  const inputEmail =
    document.querySelector('input[type="email"]');

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

  if (
    !nama ||
    !username ||
    !email ||
    !telphone
  ) {
    alert("Semua data profile wajib diisi!");
    return;
  }

  const usernameLama =
    sessionStorage.getItem("username");

  if (username !== usernameLama) {
    const users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    const usernameSudahDipakai =
      users.some(function(user) {
        return user.username === username;
      });

    if (usernameSudahDipakai) {
      alert("Username tersebut sudah digunakan!");
      return;
    }

    const favoritLama =
      localStorage.getItem(
        "favorit_" + usernameLama
      );

    if (favoritLama) {
      localStorage.setItem(
        "favorit_" + username,
        favoritLama
      );

      localStorage.removeItem(
        "favorit_" + usernameLama
      );
    }

    const keranjangLama =
      localStorage.getItem(
        "keranjang_" + usernameLama
      );

    if (keranjangLama) {
      localStorage.setItem(
        "keranjang_" + username,
        keranjangLama
      );

      localStorage.removeItem(
        "keranjang_" + usernameLama
      );
    }

    const notifikasiLama =
      localStorage.getItem(
        "notifikasi_" + usernameLama
      );

    if (notifikasiLama) {
      localStorage.setItem(
        "notifikasi_" + username,
        notifikasiLama
      );

      localStorage.removeItem(
        "notifikasi_" + usernameLama
      );
    }
  }

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

  let users =
    JSON.parse(
      localStorage.getItem("users")
    ) || [];

  const userIndex =
    users.findIndex(function(user) {
      return user.username === usernameLama;
    });

  if (userIndex !== -1) {
    users[userIndex].username = username;
    users[userIndex].nama = nama;
    users[userIndex].email = email;
    users[userIndex].telphone = telphone;
  }

  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );

  tampilkanAkun();
  tampilkanJumlahFavorit();
  tampilkanFavoritProfile();

  alert("Profile berhasil disimpan!");
}

let bukuFavorit = [];

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

function tampilkanFavoritProfile() {
  const container =
    document.getElementById("favoriteProfile");

  if (!container) {
    return;
  }

  bukuFavorit = ambilFavorit();

  if (bukuFavorit.length === 0) {
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

      ${bukuFavorit.map(function(buku) {
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
                ${buku.Author || "Unknown Author"}
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
      }).join("")}

    </div>
  `;
}

tampilkanAkun();
tampilkanJumlahFavorit();
tampilkanFavoritProfile();

window.addEventListener(
  "pageshow",
  function() {
    tampilkanAkun();
    tampilkanJumlahFavorit();
    tampilkanFavoritProfile();
  }
);