// Initialize carousel
document.addEventListener("DOMContentLoaded", function () {

    const carousel = document.getElementById('projectCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (carousel && prevBtn && nextBtn) {
        let currentIndex = 0;

        function createProjectCard(project, index) {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
             <div class="card-image">
                 <div class="project-placeholder">
                     <i class="fas fa-code"></i>
                 </div>
             </div>
             <div class="card-content">
                 <div class="project-title">${project.title}</div>
                 <div class="project-description">${project.description}</div>
                 <div class="project-tech">
                     ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                 </div>
             </div>
         `;

            const img = new Image();
            img.onload = function () {
                const imageDiv = card.querySelector('.card-image');
                imageDiv.innerHTML = `<img src="${project.image}" alt="${project.title}">`;
            };
            img.src = project.image;

            return card;
        }

        function updateCarousel() {
            const cards = carousel.children;

            for (let i = 0; i < projects.length; i++) {
                let card = cards[i];

                if (!card) {
                    card = createProjectCard(projects[i], i);
                    carousel.appendChild(card);
                }

                if (i === currentIndex) {
                    card.className = 'project-card center';
                } else if (i === (currentIndex - 1 + projects.length) % projects.length) {
                    card.className = 'project-card left';
                } else if (i === (currentIndex + 1) % projects.length) {
                    card.className = 'project-card right';
                } else {
                    card.className = 'project-card hidden';
                }
            }
        }

        function nextProject() {
            currentIndex = (currentIndex + 1) % projects.length;
            updateCarousel();
        }

        function prevProject() {
            currentIndex = (currentIndex - 1 + projects.length) % projects.length;
            updateCarousel();
        }

        prevBtn.addEventListener('click', prevProject);
        nextBtn.addEventListener('click', nextProject);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevProject();
            } else if (e.key === 'ArrowRight') {
                nextProject();
            }
        });

        updateCarousel();

        // Auto-rotate cards every 5 seconds
        setInterval(() => {
            nextProject();
        }, 4000); // 5000 milliseconds = 5 seconds
    } else {
        console.error("Carousel or navigation buttons not found!");
    }

    // Animate FAQ items on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Initially hide accordion items
    document.querySelectorAll('.accordion-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Contact button click handler
    document.querySelector('.contact-btn').addEventListener('click', function () {
        alert('Thank you for your interest! We will get back to you soon.');
    });

    // Add click to call functionality
    document.querySelector('.contact-item').addEventListener('click', function () {
        const phone = this.querySelector('p').textContent;
        if (phone.includes('+91')) {
            window.open(`tel:${phone}`, '_self');
        }
    });

    // Add click to email functionality
    document.querySelectorAll('.contact-item')[1].addEventListener('click', function () {
        const email = this.querySelector('p').textContent;
        window.open(`mailto:${email}`, '_self');
    });
});


// Sample project data - you can replace with your actual projects
const projects = [
    {
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce solution with payment integration and admin dashboard.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
        technologies: ["React", "Node.js", "MongoDB"]
    },
    {
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates and team features.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
        technologies: ["Vue.js", "Firebase", "CSS3"]
    },
    {
        title: "Weather Dashboard",
        description: "A responsive weather application with interactive maps and detailed forecasts.",
        image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=250&fit=crop",
        technologies: ["JavaScript", "API", "Chart.js"]
    },
    {
        title: "Portfolio Website",
        description: "A modern, responsive portfolio website with smooth animations and interactive elements.",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=250&fit=crop",
        technologies: ["HTML5", "CSS3", "JavaScript"]
    },
    {
        title: "Social Media App",
        description: "A social networking platform with real-time messaging and media sharing capabilities.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=250&fit=crop",
        technologies: ["React Native", "Node.js", "Socket.io"]
    },
    {
        title: "Learning Platform",
        description: "An online learning management system with video streaming and progress tracking.",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=250&fit=crop",
        technologies: ["Angular", "Express", "MySQL"]
    }
];



// Auto-rotate cards every 5 seconds
setInterval(() => {
    nextProject();
}, 4000); // 5000 milliseconds = 5 seconds


// Add touch/swipe support for mobile
let startX = 0;
let endX = 0;

carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const threshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            nextProject();
        } else {
            prevProject();
        }
    }
}



// code for services section 
function addRipple(event) {
    const card = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.classList.add('ripple');
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    card.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add mouse move effect for subtle card movement
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Auto-play carousel with custom interval
const carousel = new bootstrap.Carousel(document.querySelector('#testimonialCarousel'), {
    interval: 4000,
    wrap: true,
    pause: 'hover'
});

// Add click event to "See More" button
document.querySelector('.see-more-btn').addEventListener('click', function () {
    alert('See More functionality can be implemented here!');
});

// Add click events to "Read More" links
document.querySelectorAll('.read-more-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const clientName = this.closest('.testimonial-card').querySelector('.client-name').textContent;
        alert(`Read more about ${clientName}'s testimonial!`);
    });
});

// Add smooth hover animations
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

