class ProjectCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.project-slide');
        this.totalSlides = this.slides.length;
        this.carouselWrapper = document.getElementById('carouselWrapper');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.dotsContainer = document.getElementById('dotsContainer');
        this.currentSlideSpan = document.getElementById('currentSlide');
        this.totalSlidesSpan = document.getElementById('totalSlides');

        this.init();
    }

    init() {
        this.createDots();
        this.updateCounter();
        this.bindEvents();
        this.autoPlay();
        this.handleVideoPlayback();
    }

    createDots() {
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }

    updateCounter() {
        this.currentSlideSpan.textContent = String(this.currentSlide + 1).padStart(2, '0');
        this.totalSlidesSpan.textContent = String(this.totalSlides).padStart(2, '0');
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
    }

    goToSlide(index) {
        this.currentSlide = index;
        const translateX = -this.currentSlide * 100;
        this.carouselWrapper.style.transform = `translateX(${translateX}%)`;

        // Update dots
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentSlide);
        });

        this.updateCounter();
        this.resetAutoPlay();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(this.currentSlide);
    }

    previousSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(this.currentSlide);
    }

    autoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    resetAutoPlay() {
        clearInterval(this.autoPlayInterval);
        this.autoPlay();
    }

    handleVideoPlayback() {
        const videos = document.querySelectorAll('video');
        const playButtons = document.querySelectorAll('.play-button');

        playButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const video = videos[index];
                if (video.paused) {
                    video.play();
                    button.style.opacity = '0';
                } else {
                    video.pause();
                    button.style.opacity = '1';
                }
            });
        });

        videos.forEach((video, index) => {
            video.addEventListener('play', () => {
                clearInterval(this.autoPlayInterval);
            });

            video.addEventListener('pause', () => {
                this.resetAutoPlay();
            });

            video.addEventListener('ended', () => {
                playButtons[index].style.opacity = '1';
                this.resetAutoPlay();
            });
        });
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectCarousel();
});

// Add smooth scrolling and intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.section-header, .carousel-container');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});
