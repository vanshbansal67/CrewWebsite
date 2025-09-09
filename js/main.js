document.addEventListener("DOMContentLoaded", function () {
    // Load footer dynamically
    const footerElement = document.getElementById("footerImplement");
    const navbarElement = document.getElementById("navbarImplement");
    if (footerElement) {
        fetch("footer.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch footer.html");
                }
                return response.text();
            })
            .then(data => {
                footerElement.innerHTML = data;
            })
            .catch(error => console.error("Error loading footer:", error));
    } else {
        console.error("Footer element not found!");
    }
    if (navbarElement) {
        fetch("Navbar.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch Navbar.html");
                }
                return response.text();
            })
            .then(data => {
                navbarElement.innerHTML = data;

                // Add toggle functionality after navbar is loaded
                const mobileMenuBtn = document.getElementById("mobileMenuBtn");
                const navLinks = document.getElementById("navLinks");

                if (mobileMenuBtn && navLinks) {
                    mobileMenuBtn.addEventListener("click", () => {
                        navLinks.classList.toggle("active");
                        mobileMenuBtn.classList.toggle("active");
                    });
                } else {
                    console.error("Mobile menu button or nav links not found!");
                }
            })
            .catch(error => console.error("Error loading navbar:", error));
    } else {
        console.error("Navbar element not found!");
    }
});