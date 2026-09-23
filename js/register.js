function register(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const pesan = document.getElementById("pesan");

    if (!username || !email || !password) {
        pesan.textContent = "Semua data wajib diisi!";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const usernameAda = users.some(function(user) {
        return user.username === username;
    });

    if (usernameAda) {
        pesan.textContent = "Username sudah digunakan!";
        return;
    }

    const emailAda = users.some(function(user) {
        return user.email === email;
    });

    if (emailAda) {
        pesan.textContent = "Email sudah digunakan!";
        return;
    }

    const userBaru = {
        image: "../assets/user.jpg",
        username: username,
        email: email,
        password: password
    };
    
    users.push(userBaru);

    localStorage.setItem("users", JSON.stringify(users));
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("email", email);
    
    window.location.href = "./home.html";
}