document.addEventListener("DOMContentLoaded", function () {
    // Load footer dynamically
    const footerElement = document.getElementById("footerImplement");
    const navbarElement = document.getElementById("navbarImplement")
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
            })
            .catch(error => console.error("Error loading navbar:", error));
    } else {
        console.error("Navbar element not found!");
    }

});

