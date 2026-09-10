function showTab(tabId, button) {
  document.querySelectorAll(".tab-content").forEach(tab => {
    tab.classList.add("hidden");
  });

  document.getElementById(tabId).classList.remove("hidden");

  document.querySelectorAll(".tab-button").forEach(btn => {
    btn.classList.remove("active-tab");
  });

  button.classList.add("active-tab");
}

function saveProfile() {
  alert("Profil berhasil diperbarui!");
}