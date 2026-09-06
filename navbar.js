const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        navbar.classList.add(
            "top-4",
            "left-6",
            "right-6",
            "w-auto",
            "rounded-full",
            "bg-white/70",
            "backdrop-blur-xl",
            "shadow-lg",
            "border",
            "border-white/50"
        );

        navbar.classList.remove(
            "top-0",
            "left-0"
        );

    } else {

        navbar.classList.remove(
            "top-4",
            "left-6",
            "right-6",
            "w-auto",
            "rounded-full",
            "bg-white/70",
            "backdrop-blur-xl",
            "shadow-lg",
            "border",
            "border-white/50"
        );

        navbar.classList.add(
            "top-0",
            "left-0"
        );

    }

});