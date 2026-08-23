// ===============================
// MOBILE MENU
// ===============================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = document.getElementById("menuIcon");

menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("hidden");

    if (mobileMenu.classList.contains("hidden")) {

        menuIcon.setAttribute(
            "icon",
            "solar:hamburger-menu-linear"
        );

    } else {

        menuIcon.setAttribute(
            "icon",
            "solar:close-circle-linear"
        );

    }

});


// ===============================
// SEARCH
// ===============================

const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");


// Buka search
searchBtn.addEventListener("click", () => {

    searchBox.classList.remove("hidden");

    searchInput.focus();

});


// Tutup search
closeSearch.addEventListener("click", () => {

    searchBox.classList.add("hidden");

    searchInput.value = "";

});


// Search dengan Enter
searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        const keyword = searchInput.value.trim();

        if (keyword === "") {

            alert("Masukkan buku yang ingin dicari 📚");

            return;

        }

        alert(`Mencari buku: ${keyword}`);

    }

});


// ===============================
// LOGIN
// ===============================

const loginBtn = document.getElementById("loginBtn");
const mobileLoginBtn = document.getElementById("mobileLoginBtn");

loginBtn.addEventListener("click", () => {

    alert("Halaman login akan dibuat selanjutnya 📚");

});


mobileLoginBtn.addEventListener("click", () => {

    alert("Halaman login akan dibuat selanjutnya 📚");

});