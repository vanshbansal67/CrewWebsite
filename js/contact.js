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