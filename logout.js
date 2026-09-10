
  function logout() {
    const yakin = confirm("Anda yakin ingin logout?");

    if (yakin) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "landing.html";
    }
  }
