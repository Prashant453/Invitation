// Countdown Timer Logic
const targetDate = new Date('June 24, 2026 09:15:00').getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.innerText = days < 10 ? `0${days}` : days;
    if (hoursEl) hoursEl.innerText = hours < 10 ? `0${hours}` : hours;
    if (minutesEl) minutesEl.innerText = minutes < 10 ? `0${minutes}` : minutes;
    if (secondsEl) secondsEl.innerText = seconds < 10 ? `0${seconds}` : seconds;

    if (distance < 0) {
        clearInterval(countdownInterval);
        const countdownContainer = document.getElementById('countdown');
        if (countdownContainer) countdownContainer.innerHTML = "समारोह प्रारंभ हो चुका है!";
    }
};

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Scroll Reveal Logic
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);

// Dynamic limits for animations based on screen size
const isMobile = window.innerWidth < 768;
const maxFloatingElements = isMobile ? 12 : 30;

// Floating Flowers Logic
const flowerContainer = document.getElementById('flower-container');
const flowers = ['🌸', '🌼', '🌷', '🏵️'];

const createFlower = () => {
    if (!flowerContainer) return;
    if (flowerContainer.childElementCount >= maxFloatingElements) return;
    
    const flower = document.createElement('div');
    flower.classList.add('flower');
    flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];
    
    const left = Math.random() * 100;
    const duration = isMobile ? (8 + Math.random() * 8) : (10 + Math.random() * 15);
    const size = isMobile ? (12 + Math.random() * 12) : (15 + Math.random() * 20);
    
    flower.style.left = `${left}%`;
    flower.style.top = `-50px`;
    flower.style.animationDuration = `${duration}s`;
    flower.style.fontSize = `${size}px`;
    flower.style.opacity = Math.random() * 0.7 + 0.3;
    
    flowerContainer.appendChild(flower);
    
    setTimeout(() => {
        flower.remove();
    }, duration * 1000);
};

const createSparkle = () => {
    if (!flowerContainer) return;
    if (flowerContainer.childElementCount >= maxFloatingElements) return;
    
    const sparkle = document.createElement('div');
    sparkle.classList.add('flower'); // reuse class for generic properties
    sparkle.innerText = '✨';
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.fontSize = isMobile ? `${8 + Math.random() * 10}px` : `${10 + Math.random() * 15}px`;
    sparkle.style.opacity = '0';
    sparkle.style.position = 'fixed';
    sparkle.style.color = '#D4AF37';
    sparkle.style.textShadow = '0 0 10px #D4AF37';
    sparkle.style.transition = 'opacity 0.8s ease';
    
    flowerContainer.appendChild(sparkle);
    
    setTimeout(() => sparkle.style.opacity = '0.8', 50);
    setTimeout(() => {
        sparkle.style.opacity = '0';
        setTimeout(() => sparkle.remove(), 800);
    }, 1500);
};

// Start producing flowers and sparkles with optimized intervals
setInterval(createFlower, isMobile ? 1200 : 800);
setInterval(createSparkle, isMobile ? 800 : 400);

// Loader Logic
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                revealOnScroll(); // Initial reveal
            }, 600); // match transition speed
        }, 350); // fast transition
    }
});

// Smooth Scroll for Navigation (if added later)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

