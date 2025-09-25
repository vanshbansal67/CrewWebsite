// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
});

// Smooth scrolling for CTA buttons
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
});

// Form submission
function submitForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const budget = document.getElementById('budget').value;
    const projectIdea = document.getElementById('project-idea').value;

    if (!name || !email || !phone || !projectIdea) {
        alert('Please fill in all required fields.');
        return;
    }

    // Here you would normally send the data to your backend
    // For demonstration, we'll show a success message
    alert('Thank you! We have received your project details. Our team will contact you within 24 hours.');

    // Reset form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('budget').value = '';
    document.getElementById('project-idea').value = '';
}

// Add floating animation to shapes
function addFloatingAnimation() {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        shape.style.animationDelay = `-${index * 5}s`;
    });
}

// Initialize animations on page load
window.addEventListener('load', () => {
    addFloatingAnimation();
});
