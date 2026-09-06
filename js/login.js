let user = []

async function login() {
    try {
        let response = await fetch ("/js/data_user.json")
        user = await response.json()
    } catch(error) {
        console.log(error, "error");
    }
}

login()

async function temukanUser() {
    let username = document.getElementById("username").value.trim()
    let password = document.getElementById("password").value.trim()

    let ditemukan = user.find((user) => user.username === username && user.password === password)

    if(ditemukan){
        sessionStorage.setItem("username", ditemukan.username)
        sessionStorage.setItem("password", ditemukan.password)
        sessionStorage.setItem("email", ditemukan.email)
        sessionStorage.setItem("telephone", ditemukan.telephone)
        sessionStorage.setItem("image", ditemukan.image)
        window.location.href = "/dist/home.html"
    } else {
        document.getElementById("pesan").innerHTML = "Password atau email salah"
    }
}
