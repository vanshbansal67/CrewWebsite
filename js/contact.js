document.addEventListener('DOMContentLoaded', function () {
    const heroSection = document.getElementById('hero_section');
    const formContainer = document.getElementById('contact-form-wrapper');

    // Function to adjust form position dynamically
    function adjustFormPosition() {
        const heroHeight = heroSection.offsetHeight;

        // Adjust form position to overlap hero and cosmic sections
        formContainer.style.top = `${heroHeight * 0.6}px`; // 60% of hero height
    }

    // Run on load and resize
    adjustFormPosition();
    window.addEventListener('resize', adjustFormPosition);
});

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
        fetch("Navbar2.html")
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
