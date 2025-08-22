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


const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 90; // adjust for top gap

const numPoints = 80;
const points = [];

for (let i = 0; i < numPoints; i++) {
    points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1, // depth effect
        glow: Math.random() * 15 + 5
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw glowing points
    points.forEach(p => {
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.glow);
        gradient.addColorStop(0, "rgba(0,255,255,1)");
        gradient.addColorStop(1, "rgba(0,255,255,0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw pulsing lines
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                const alpha = 1 - dist / 150;
                ctx.strokeStyle = `rgba(0,255,255,${alpha})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[j].x, points[j].y);
                ctx.stroke();
            }
        }
    }
}

function update() {
    points.forEach(p => {
        // Small random acceleration for organic motion
        p.vx += (Math.random() - 0.5) * 0.05;
        p.vy += (Math.random() - 0.5) * 0.05;

        // Limit speed
        p.vx = Math.max(Math.min(p.vx, 1), -1);
        p.vy = Math.max(Math.min(p.vy, 1), -1);

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
    });
}

function animate() {
    draw();
    update();
    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 90;
});