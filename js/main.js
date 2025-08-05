document.addEventListener("DOMContentLoaded", function () {
    const footerElement = document.getElementById("footerImplement");
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            footerElement.innerHTML = data;
        })
        .catch(error => console.error("Error loading footer:", error));
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

let currentIndex = 0;
const carousel = document.getElementById('projectCarousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

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

    // Load image after card is created
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

    // Loop through all projects and update classes dynamically
    for (let i = 0; i < projects.length; i++) {
        let card = cards[i];

        // If the card doesn't exist, create it
        if (!card) {
            card = createProjectCard(projects[i], i);
            carousel.appendChild(card);
        }

        // Update classes based on the current index
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

// Event listeners
nextBtn.addEventListener('click', nextProject);
prevBtn.addEventListener('click', prevProject);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevProject();
    } else if (e.key === 'ArrowRight') {
        nextProject();
    }
});

// Auto-rotate (optional - uncomment to enable)
// setInterval(nextProject, 5000);
// Auto-rotate cards every 5 seconds
setInterval(() => {
    nextProject();
}, 4000); // 5000 milliseconds = 5 seconds
// Initialize carousel
updateCarousel();

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
