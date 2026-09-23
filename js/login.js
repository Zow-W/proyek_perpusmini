async function temukan(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const pesan = document.getElementById("pesan");

  if (username === "" || password === "") {
    pesan.innerHTML = "Username dan password wajib diisi!";
    return;
  }

  try {
    const response = await fetch("../js/data_user.json");

    if (!response.ok) {
      throw new Error("data_user.json tidak ditemukan");
    }

    const dataUser = await response.json();
    let userLocal = JSON.parse(localStorage.getItem("users")) || [];

    const userDariLocal = userLocal.find(function(user) {
      return user.username === username;
    });

    const userDariJson = dataUser.find(function(user) {
      return user.username === username;
    });

    const ditemukan = userDariLocal || userDariJson;

    if (!ditemukan) {
      pesan.innerHTML = "Username atau password salah!";
      return;
    }

    if (String(ditemukan.password) !== password) {
      pesan.innerHTML = "Username atau password salah!";
      return;
    }

    const userIndex = userLocal.findIndex(function(user) {
      return user.username === ditemukan.username;
    });

    if (userIndex === -1) {
      userLocal.push({
        username: ditemukan.username,
        nama: ditemukan.nama || ditemukan.username,
        email: ditemukan.email || "",
        telphone: ditemukan.telphone || "",
        password: ditemukan.password,
        image: ditemukan.image || "../assets/kucing.jpg"
      });
    } else {
      userLocal[userIndex] = {
        ...userLocal[userIndex],
        nama: ditemukan.nama || userLocal[userIndex].nama || ditemukan.username,
        email: ditemukan.email || userLocal[userIndex].email || "",
        telphone: ditemukan.telphone || userLocal[userIndex].telphone || "",
        password: ditemukan.password,
        image: ditemukan.image || userLocal[userIndex].image || "../assets/kucing.jpg"
      };
    }

    localStorage.setItem("users", JSON.stringify(userLocal));

    sessionStorage.setItem("username", ditemukan.username);
    sessionStorage.setItem("nama", ditemukan.nama || ditemukan.username);
    sessionStorage.setItem("email", ditemukan.email || "");
    sessionStorage.setItem("telphone", ditemukan.telphone || "");
    sessionStorage.setItem("password", ditemukan.password);
    sessionStorage.setItem(
      "image",
      ditemukan.image || "../assets/kucing.jpg"
    );

    const keranjangKey = "keranjang_" + ditemukan.username;
    const favoritKey = "favorit_" + ditemukan.username;
    const notifikasiKey = "notifikasi_" + ditemukan.username;

    if (!localStorage.getItem(keranjangKey)) {
      localStorage.setItem(keranjangKey, JSON.stringify([]));
    }

    if (!localStorage.getItem(favoritKey)) {
      localStorage.setItem(favoritKey, JSON.stringify([]));
    }

    if (!localStorage.getItem(notifikasiKey)) {
      localStorage.setItem(notifikasiKey, JSON.stringify([]));
    }

    window.location.href = "./home.html";
  } catch (error) {
    console.log("ERROR:", error);
    pesan.innerHTML = "Terjadi kesalahan saat login!";
  }
}